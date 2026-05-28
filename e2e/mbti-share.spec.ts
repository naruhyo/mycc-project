import { test, expect } from "@playwright/test";

test.describe("MBTI share", () => {
  test("copy link button copies ?type=<code> URL and shows toast", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await page.getByRole("button", { name: "시작하기" }).click();

    // Answer all 12 questions
    for (let i = 0; i < 12; i++) {
      await expect(page.getByText(`${i + 1} / 12`)).toBeVisible();
      await page.getByRole("button").first().click();
    }

    // Click 링크 복사
    await page.getByRole("button", { name: "링크 복사" }).click();

    // Clipboard should contain ?type=<code>
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toMatch(/\?type=[A-Z]{4}$/);

    // Toast should appear with the success message
    await expect(page.getByText("링크가 복사되었습니다")).toBeVisible();
  });

  test("?type=ENFP direct entry shows ENFP result and 나도 해보기", async ({ page }) => {
    await page.goto("/?type=ENFP");
    await expect(page.getByText("ENFP")).toBeVisible();
    await expect(page.getByRole("button", { name: "나도 해보기" })).toBeVisible();
  });

  test("나도 해보기 click → start screen → can start quiz", async ({ page }) => {
    await page.goto("/?type=ENFP");
    await page.getByRole("button", { name: "나도 해보기" }).click();
    const startButton = page.getByRole("button", { name: "시작하기" });
    await expect(startButton).toBeVisible();
    await startButton.click();
    await expect(page.getByText("1 / 12")).toBeVisible();
  });

  test("invalid ?type=XYZ → shows start screen with no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/?type=XYZ");
    await expect(page.getByRole("button", { name: "시작하기" })).toBeVisible();
    expect(errors).toHaveLength(0);
  });

  test("lowercase ?type=enfp → shows start screen", async ({ page }) => {
    await page.goto("/?type=enfp");
    await expect(page.getByRole("button", { name: "시작하기" })).toBeVisible();
  });

  test("empty ?type= → shows start screen", async ({ page }) => {
    await page.goto("/?type=");
    await expect(page.getByRole("button", { name: "시작하기" })).toBeVisible();
  });
});
