# MBTI 캐릭터 매치 — Learnings

## 실행 순서 및 근거

의존성 우선 순서대로 실행.

1. **Task 1** (types + config skeleton + StartScreen + MbtiGame view-state machine + app/page.tsx)
2. **Task 2** (scoring + QuestionScreen + 12 questions + MbtiGame quiz/result)
3. **Task 3** (ResultScreen + type/character data)
4. **Task 4** (RESET action + e2e reload test)
5. **Task 5** (CopyButton + type-guard + ?type URL entry + Toaster)
6. **Task 6** (mobile/offline/perf invariants e2e)

Task 4 depends on Task 3 (result screen must exist for 다시하기 to make sense).
Task 5 depends on Task 3 (result screen) and Task 4 (RESET action).

---

## 판단 기록

### useEffect → synchronous useReducer initializer

**원래 접근**: `useEffect`로 URL param을 읽어 `SET_RESULT_FROM_URL` dispatch.
**발견**: Start screen briefly flickers before result screen on ?type= entry.
**결정**: Compute initial state synchronously as second arg to `useReducer`. No useEffect needed.
**근거**: React guarantees the second arg is read once on mount; derived state via useEffect always runs after first render.
**applied**: rule (pattern: `rerender-derived-state-no-effect`)

### CharacterTriple tuple type

`Record<TypeCode, [Character, Character, Character]>` enforces exactly 3 chars at compile time.
- Array type `Character[]` would allow 0, 1, 2, 4... chars silently.
- Tuple type makes incomplete data a compile error, not a runtime empty-card bug.
**applied**: not-yet (small codebase, but worth noting for any config-as-data pattern)

### ResultScreen test: `getAllByText` for name/work, `getByText` for comment

ENFP's character 나루토 has `name: "나루토"` and initially `work: "나루토"` — strict mode `getByText` throws on multiple matches.
**Fix 1**: Changed work to "나루토 질풍전" (correct series name).
**Fix 2**: Switched test assertions to `getAllByText` for name/work fields (could appear in multiple cards), `getByText` only for `comment` (unique per card).
**Lesson**: In table-driven rendering tests, use unique fields (comment) for strict assertions; use `getAllByText` for fields that may repeat across cards.
**applied**: not-yet

### vi.hoisted for toast mock

`vi.mock("sonner", () => ({ toast: { success: mockToastSuccess } }))` requires `mockToastSuccess` to be defined before the factory runs. Normal `vi.fn()` at module scope is hoisted but not available inside `vi.mock` factory.
**Fix**: Use `vi.hoisted(() => ({ mockToastSuccess: vi.fn(), mockToastError: vi.fn() }))` and destructure outside the mock factory.
**applied**: rule (pattern: always use `vi.hoisted` when mock factory needs to reference a `vi.fn()` variable)

### vitest.config.ts exclude e2e/**

Vitest by default picks up all `*.test.ts` and `*.spec.ts` files. Playwright e2e specs live in `e2e/` and import `@playwright/test` — Vitest fails to resolve these.
**Fix**: Add `"e2e/**"` to `exclude` array in `vitest.config.ts`.
**applied**: rule (add e2e exclusion to vitest config in any Next.js + Playwright project)

### Playwright hydration race: waitForLoadState('networkidle')

With `fullyParallel: true` (8 workers), dev server is under load. `page.goto()` resolves after HTML loads, but React hydration (event handler attachment) finishes async. Clicking a button before hydration has no effect.
**Symptom**: Test passes in isolation, flaky in full parallel suite. Page snapshot after 5s timeout still shows pre-click state.
**Fix**: `await page.waitForLoadState('networkidle')` after `page.goto()` before any click that depends on client-side state updates.
**applied**: rule (in Next.js e2e tests, waitForLoadState('networkidle') before first interactive action when parallel workers are in use)

### Data integrity: character config review

Initial character data had several errors:
- ISTP[2]: "Rivaille" (alias for Levi Ackerman, already in ISTP[0]) → replaced with 로로노아 조로/원피스
- ESTP: incorrect chars → fixed to 바쿠고 카츠키/나의히어로, Natsu Dragneel/페어리테일, 가프/원피스
- INFP[1]: 우메하라 유키 (non-existent in that series) → 미도리야 이즈쿠/나의히어로
- ISFP[2]: used series title "Rurouni Kenshin" as character name → 히무라 켄신/바람의검심

**Lesson**: Static config data (especially cultural knowledge like anime character names) needs domain review before relying on it. The TypeScript type system can't catch factual errors; code review flagged these.
**applied**: not-yet

---

## 잘 된 것

1. **View-state machine with `useReducer`** — Clean separation of start/quiz/result views with typed actions. Adding new views or transitions is straightforward.
2. **TDD on scoring** — Writing `scoring.test.ts` RED-first forced the tiebreak rule to be explicit in the test expected values before writing the implementation.
3. **`CharacterTriple` tuple type** — Compile-time guarantee of 3 characters. Zero runtime checks needed.
4. **Vertical slice ordering** — Each task produced a shippable slice. Task 1 produced a working (if incomplete) app; each subsequent task added a layer.
5. **Synchronous URL-to-state initialization** — No flicker, no useEffect, no race condition.

## 잘 안 된 것

1. **Character data quality** — Needed a second review pass; several anime character facts were wrong. Should have flagged this as needing domain knowledge before writing the data.
2. **CopyButton error path omission** — Initial implementation had no try/catch on clipboard write. Only caught by code review. The missing branch wasn't caught by TDD because the test was written for the happy path only.
3. **Playwright hydration race** — Took two fix attempts before identifying the root cause (hydration lag, not just a timing issue with state updates).
4. **e2e share toast assertion** — First attempt used `getByText(/복사/)` which matched both the button label and the toast text (strict mode violation). Needed to use exact string.

## 다음에도 쓸 인사이트

1. **Next.js + useReducer URL param init**: Always initialize `useReducer` state synchronously from URL params as the second arg. Never use `useEffect` for this.
2. **Playwright parallel e2e**: Add `waitForLoadState('networkidle')` before any click that triggers React state changes, especially after `page.goto()`.
3. **vi.hoisted**: Required whenever a `vi.mock` factory needs to reference a mock function variable.
4. **vitest + Playwright coexistence**: Always add `e2e/**` to vitest `exclude`.
5. **Static config data**: Treat as requiring domain review, not just type-safety. TypeScript can't catch factual errors.
6. **Test error paths explicitly**: For async operations with try/catch (clipboard, fetch, file I/O), write a RED test for the error path before implementing the catch block.
