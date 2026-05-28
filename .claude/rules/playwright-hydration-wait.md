# Playwright 클라이언트 hydration 대기

## 규칙

Next.js e2e 테스트에서 `page.goto()` 이후 React 상태를 변경하는 첫 번째 click 전에 반드시 `await page.waitForLoadState('networkidle')` 를 호출한다.

## 이유

`page.goto()` 는 HTML 로드 완료 후 resolve되지만, React 이벤트 핸들러 부착(hydration)은 비동기적으로 그 이후에 완료된다. `fullyParallel: true`로 여러 워커가 동시에 dev server를 사용할 때 hydration이 지연될 수 있다.

hydration 전 클릭은 DOM 이벤트만 발생시키고 React handler가 실행되지 않아 상태가 변경되지 않는다. 테스트 단독 실행 시 통과하지만 병렬 실행 시 flaky해지는 원인이 된다.

## 적용

```ts
await page.goto("/?type=ENFP");
await page.waitForLoadState("networkidle"); // React 이벤트 핸들러 부착 완료 대기
await page.getByRole("button", { name: "나도 해보기" }).click();
```

visibility-only 단언(getByText, toBeVisible)은 대기 없이 사용해도 무방하다.
