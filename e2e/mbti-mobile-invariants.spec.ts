import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Mobile invariants — 360px", () => {
  test.use({ viewport: { width: 360, height: 640 } });

  test("start screen: no horizontal scroll at 360px", async ({ page }) => {
    await page.goto("/");
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(360);
  });

  test("Q1 screen: no horizontal scroll at 360px", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "시작하기" }).click();
    await expect(page.getByText("1 / 12")).toBeVisible();
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(360);
  });

  test("Q5 screen: no horizontal scroll at 360px", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "시작하기" }).click();
    for (let i = 0; i < 4; i++) {
      await page.getByRole("button").first().click();
    }
    await expect(page.getByText("5 / 12")).toBeVisible();
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(360);
  });

  test("result screen: no horizontal scroll at 360px", async ({ page }) => {
    await page.goto("/?type=ENFP");
    await expect(page.getByText("ENFP")).toBeVisible();
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(360);
  });
});

test.describe("Desktop centering", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("start screen is centered at 1280px — no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const viewportWidth = 1280;
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
    // Content wrapper should be centered (its midpoint near viewport center)
    const mainBox = await page.locator("main").boundingBox();
    if (mainBox) {
      const centerX = mainBox.x + mainBox.width / 2;
      expect(Math.abs(centerX - viewportWidth / 2)).toBeLessThan(50);
    }
  });
});

test.describe("Offline invariant", () => {
  test("full flow works with all external requests blocked", async ({ page }) => {
    // Block requests to external origins
    await page.route("**/*", (route) => {
      const url = route.request().url();
      if (url.startsWith(BASE_URL) || url.startsWith("data:") || url.includes("localhost")) {
        return route.continue();
      }
      return route.abort();
    });

    await page.goto("/");
    await page.getByRole("button", { name: "시작하기" }).click();

    // Answer all 12 questions
    for (let i = 0; i < 12; i++) {
      await expect(page.getByText(`${i + 1} / 12`)).toBeVisible();
      await page.getByRole("button").first().click();
    }

    // Should reach result screen
    await expect(page.locator("main")).toBeVisible();
    // A TypeCode should appear
    const typeCodePattern = /^(ENFP|ENFJ|ENTP|ENTJ|ESFP|ESFJ|ESTP|ESTJ|INFP|INFJ|INTP|INTJ|ISFP|ISFJ|ISTP|ISTJ)$/;
    const typeBadge = page.getByText(typeCodePattern);
    await expect(typeBadge).toBeVisible();
  });
});

test.describe("Response time invariant", () => {
  test("choice click to next question takes < 100ms (measured in browser)", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "시작하기" }).click();
    await expect(page.getByText("1 / 12")).toBeVisible();

    // Inject click-time recorder into page context
    await page.evaluate(() => {
      (window as unknown as Record<string, unknown>).__clickTime = 0;
    });

    // Wire up click listener before clicking
    const firstBtn = page.getByRole("button").first();
    await firstBtn.evaluate((el) => {
      el.addEventListener(
        "click",
        () => {
          (window as unknown as Record<string, unknown>).__clickTime = Date.now();
        },
        { once: true },
      );
    });

    await firstBtn.click();
    await expect(page.getByText("2 / 12")).toBeVisible();

    // Measure elapsed time inside the browser (no IPC overhead for the DOM update itself)
    const elapsed = await page.evaluate(() => {
      return Date.now() - ((window as unknown as Record<string, unknown>).__clickTime as number);
    });

    expect(elapsed).toBeLessThan(100);
  });
});
