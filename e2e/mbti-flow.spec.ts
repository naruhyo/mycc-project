import { test, expect } from "@playwright/test";

test.describe("MBTI flow", () => {
  test("reload on Q5 → shows start screen", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "시작하기" }).click();

    // Answer questions 1-5 (first choice each time)
    for (let i = 0; i < 5; i++) {
      await expect(page.getByText(`${i + 1} / 12`)).toBeVisible();
      // On quiz screen, the first button is the first choice
      await page.getByRole("button").first().click();
    }

    // Now on Q6 — reload
    await page.reload();

    // Should show start screen
    await expect(page.getByText("MBTI 캐릭터 매치")).toBeVisible();
    await expect(page.getByRole("button", { name: "시작하기" })).toBeVisible();
    await expect(page.getByText("6 / 12")).not.toBeVisible();
  });

  test("다시하기 → start screen → 1 / 12 on restart", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "시작하기" }).click();

    // Answer all 12 questions (first choice each time)
    for (let i = 0; i < 12; i++) {
      await expect(page.getByText(`${i + 1} / 12`)).toBeVisible();
      await page.getByRole("button").first().click();
    }

    // Result screen — click 다시하기
    await page.getByRole("button", { name: "다시하기" }).click();
    await expect(page.getByText("MBTI 캐릭터 매치")).toBeVisible();

    // Start again → 1 / 12
    await page.getByRole("button", { name: "시작하기" }).click();
    await expect(page.getByText("1 / 12")).toBeVisible();
  });
});
