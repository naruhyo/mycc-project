# Vitest + Playwright 공존 설정

## 규칙

`vitest.config.ts`의 `exclude` 배열에 `"e2e/**"` 를 반드시 포함한다.

Playwright 스펙 파일(`*.spec.ts`)은 `@playwright/test`를 import하는데, Vitest가 이를 해석하려 하면 모듈 resolve 에러가 발생한다.

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    exclude: ["node_modules", "e2e/**"],
  },
});
```
