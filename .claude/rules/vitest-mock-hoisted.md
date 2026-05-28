# vi.mock factory에서 mock 함수 참조 — vi.hoisted 패턴

## 규칙

`vi.mock()` factory 안에서 `vi.fn()` 변수를 참조해야 할 때는 반드시 `vi.hoisted()`를 사용한다.

## 이유

`vi.mock()` 은 파일 최상단으로 hoist되어 실행된다. 일반 모듈 스코프 변수(`const mockFn = vi.fn()`)는 hoist 시점에 아직 초기화되지 않아 `undefined`가 된다.

`vi.hoisted()`로 감싸면 해당 초기화도 hoist되어 factory와 같은 시점에 실행된다.

## 패턴

```ts
// ✅ 올바른 패턴
const { mockSuccess, mockError } = vi.hoisted(() => ({
  mockSuccess: vi.fn(),
  mockError: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: { success: mockSuccess, error: mockError },
}));

// ❌ 잘못된 패턴 — factory 실행 시점에 undefined
const mockSuccess = vi.fn();
vi.mock("sonner", () => ({
  toast: { success: mockSuccess }, // undefined!
}));
```
