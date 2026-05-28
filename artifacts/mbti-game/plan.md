# MBTI 캐릭터 매치 구현 계획

## 아키텍처 결정

| 결정 | 선택 | 이유 |
|---|---|---|
| 페이지 위치 | `app/page.tsx` 덮어쓰기 (현 `ComponentExample` 데모 제거) | 사용자 결정 + spec "단일 페이지 경험" |
| 라우팅 모델 | 단일 페이지 내부 클라이언트 view-state 머신 (`start` → `quiz` → `result`). URL 변경 없음 | 선택지 클릭 → 다음 질문 < 100ms (불변: 빠른 응답). 공유 URL은 `?type=XXXX`만 추가 |
| `?type` 읽기 | 클라이언트 `useSearchParams()` (`next/navigation`) | 단일 클라이언트 컴포넌트. RSC 분리 불필요. spec "오프라인 동작" 충족 |
| 동점 처리 | 차원별 점수 동률 시 첫 글자(E / S / T / J) 우선 채택 | 결정적 + 통상 컨벤션. Scenario 7 "결정성" 충족, 테스트 expected 고정 가능 |
| Toast 메커니즘 | `sonner` (`Toaster`를 `app/layout.tsx`에 마운트) | `.claude/rules/shadcn-guard.md`와 shadcn SKILL의 critical rule "Toast via sonner" |
| 캐릭터 카드 표현 | 이모지 + 텍스트 카드 (외부 이미지 자산 0) | spec "이미지·일러스트 제외" + wireframe 이모지 reconcile (시스템 폰트, 외부 의존 없음) |
| 데이터 위치 | `types/mbti.ts` → `config/mbti/*.ts` → `lib/mbti/*.ts` | CLAUDE.md 아키텍처 레이어 (types → config → lib → components → app) |
| Wizard 상태 | `useReducer`로 `MbtiGame` 내부에 보관 (localStorage 미사용) | spec "중간 저장 제외" + Scenario 5 "새로고침 시 시작 화면" |
| 클립보드 API | `navigator.clipboard.writeText` (HTTPS/localhost 보장됨) | shadcn 스택 표준, 외부 의존 없음 |

## 인프라 리소스

| 리소스 | 유형 | 선언 위치 | 생성 Task |
|---|---|---|---|
| (None) | — | — | — |

## 데이터 모델

### `Dimension` (`types/mbti.ts`)
- 리터럴 유니온: `"EI" | "SN" | "TF" | "JP"`

### `Choice` (`types/mbti.ts`)
- `label: string` (사용자에게 보이는 한국어 텍스트)
- `dimension: Dimension`
- `value: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P"`
- `weight: number` (보통 1; 동점 케이스 검증용)

### `Question` (`types/mbti.ts`)
- `id: number` (1..12, 진행 표시용)
- `prompt: string` (질문 본문, 줄바꿈 포함 가능)
- `choices: Choice[]` (2~4개)

### `TypeCode` (`types/mbti.ts`)
- 16-멤버 리터럴 유니온: `"ENFP" | "INTJ" | ... `

### `TypeMeta` (`types/mbti.ts`)
- `code: TypeCode`
- `nickname: string` (예: "재기발랄한 활동가")
- `description: string` (2-3문장)

### `Character` (`types/mbti.ts`)
- `name: string`
- `work: string` (작품명)
- `emoji: string` (시그니처 3-emoji 묶음)
- `comment: string` (한 줄)

### `CharacterTriple` (`types/mbti.ts`)
- `Record<TypeCode, [Character, Character, Character]>` — 항상 3개

## 필요 스킬

| 스킬 | 적용 Task | 용도 |
|---|---|---|
| `shadcn` | 1, 3, 5 | Button / Card / Progress(or chip) 컴포넌트 사용, sonner Toaster 설치, semantic token, `data-icon` 패턴 |
| `next-best-practices` | 1, 5 | `useSearchParams` 클라이언트 사용, `"use client"` 디렉티브, file-conventions |
| `vercel-react-best-practices` | 1-4 | `rerender-derived-state-no-effect` (결과는 reducer 상태에서 파생), 불필요 effect 회피 |
| `vercel-composition-patterns` | 1-3 | view-state 머신 분리(`StartScreen` / `QuestionScreen` / `ResultScreen` compound) |
| `web-design-guidelines` | 6 | 모바일 360px / 외부 의존 없음 / 접근성 1차 점검 |

## 영향 받는 파일

| 파일 경로 | 변경 유형 | 관련 Task |
|---|---|---|
| `types/mbti.ts` | New | 1 |
| `config/mbti/questions.ts` | New | 1, 2 |
| `config/mbti/types.ts` | New | 3 |
| `config/mbti/characters.ts` | New | 3 |
| `lib/mbti/scoring.ts` | New | 2 |
| `lib/mbti/scoring.test.ts` | New | 2 |
| `lib/mbti/type-guard.ts` | New | 5 |
| `lib/mbti/type-guard.test.ts` | New | 5 |
| `components/mbti/MbtiGame.tsx` | New | 1, 2, 4, 5 |
| `components/mbti/MbtiGame.test.tsx` | New | 1, 2, 4 |
| `components/mbti/StartScreen.tsx` | New | 1 |
| `components/mbti/QuestionScreen.tsx` | New | 2 |
| `components/mbti/ResultScreen.tsx` | New | 3 |
| `components/mbti/ResultScreen.test.tsx` | New | 3 |
| `components/mbti/CopyButton.tsx` | New | 5 |
| `components/mbti/CopyButton.test.tsx` | New | 5 |
| `components/ui/sonner.tsx` | New (shadcn add) | 5 |
| `app/layout.tsx` | Modify (Toaster 마운트, metadata 갱신) | 5 |
| `app/page.tsx` | Modify (ComponentExample → MbtiGame) | 1 |
| `e2e/mbti-flow.spec.ts` | New | 4 |
| `e2e/mbti-share.spec.ts` | New | 5 |
| `e2e/mbti-mobile-invariants.spec.ts` | New | 6 |

## Tasks

### Task 1: 시작 화면 → 첫 질문 진입 (vertical slice 1)

- **담당 시나리오**: Scenario 1 (앞부분 — 시작 화면 + Q1 진입), Scenario 4 (시작 화면 표시만)
- **크기**: M (5 파일)
- **의존성**: None
- **참조**:
  - shadcn — Button(variant=primary), Card, Badge(시작 화면 정보 chip 3개: "⏱ 약 2분" / "📱 모바일 최적화" / "🎭 16유형", 질문 화면 `Q1` chip), semantic token, `"use client"`
  - next-best-practices — file-conventions, directives
  - wireframe.html — Screen 0 (시작), Screen 1 (질문 — 첫 진입 부분)
- **구현 대상**:
  - `types/mbti.ts`
  - `config/mbti/questions.ts` — **최소 1개 문항만**(샘플). 12개 채우기는 Task 2.
  - `components/mbti/StartScreen.tsx`
  - `components/mbti/MbtiGame.tsx` — view-state `"start" | "quiz" | "result"` reducer (skeleton). 결과 화면은 placeholder.
  - `components/mbti/MbtiGame.test.tsx`
  - `app/page.tsx` — `<MbtiGame />` 렌더 (`ComponentExample` 제거)
- **수용 기준**:
  - [x] 페이지 로드 시 "MBTI 캐릭터 매치" 제목과 "시작하기" 버튼이 보인다
  - [x] "시작하기" 클릭 → 1번 질문 본문과 진행 표시 "1 / 12"가 보인다
- **검증**:
  - `bun run test -- mbti` (Vitest — `MbtiGame.test.tsx`)
  - `bun run build` (타입/빌드 통과)

---

### Task 2: 12문항 완주 + scoring + 결과 코드 표시 (vertical slice 2)

- **담당 시나리오**: Scenario 1 (완주 부분 — 진행 갱신, 12번째 → 결과 코드), Scenario 7 (전체 — 동점 결정성)
- **크기**: M (5 파일)
- **의존성**: Task 1 (`MbtiGame`, `types`, `questions.ts` 골격)
- **참조**:
  - vercel-react-best-practices — `rerender-derived-state-no-effect` (결과는 답안 배열에서 derive)
  - shadcn — `Progress` 컴포넌트(또는 wireframe `w-progress-track/bar`와 동등한 막대) — 너비를 `(currentIndex / 12) * 100%`로 바인딩
  - wireframe.html — Screen 1 progress bar (L266-271)
  - 동점 규칙: `[아키텍처 결정]` E/S/T/J 우선
- **구현 대상**:
  - `config/mbti/questions.ts` — **12개로 확장**, 차원별 균등 분포 (각 3문항)
  - `lib/mbti/scoring.ts` — `score(answers: Choice[]): TypeCode` (pure)
  - `lib/mbti/scoring.test.ts` — 결정성, 동점, 16개 출력 cover
  - `components/mbti/QuestionScreen.tsx` — 질문 카드 + 선택지 + 진행 막대(shadcn `Progress` 또는 동등 구현)
  - `components/mbti/MbtiGame.tsx` — 진행/답안/결과 reducer 확장, 결과 화면에 4글자 코드 표시 (placeholder 별명/설명/카드)
  - `components/mbti/MbtiGame.test.tsx` — 12 클릭 시나리오
- **수용 기준**:
  - [x] 1번 질문에서 선택지 클릭 → 2번 질문 + "2 / 12"가 보인다 (이후 N번도 동일 패턴)
  - [x] 선택지 클릭마다 진행 막대 너비가 N/12 비율로 갱신된다 (예: 2번째 클릭 후 약 16.7%, 12번째 직전 약 91.7%) — 막대 요소의 인라인 width 또는 ARIA `valuenow` 단언
  - [x] 12번째 선택지 클릭 → 결과 화면 전환, 4글자 유형 코드(E/I + S/N + T/F + J/P) 텍스트가 보인다
  - [x] 12개 답안 중 한 차원 이상이 동점인 입력 → 16유형 중 정확히 하나의 코드가 결정된다 (`scoring.test.ts`)
  - [x] 동일 입력 → 동일 코드 (결정성, `scoring.test.ts`)
- **검증**:
  - `bun run test -- mbti` (Vitest)
  - `bun run build`

---

### Checkpoint: Tasks 1-2 이후

- [x] 모든 테스트 통과: `bun run test`
- [x] 빌드 성공: `bun run build`
- [x] "시작하기 → 12개 선택 → 4글자 유형 코드"가 브라우저에서 end-to-end로 동작 (수동: `bun dev`로 한 번 클릭해서 확인)

---

### Task 3: 결과 화면 완성 — 별명·설명·캐릭터 3카드 (vertical slice 3)

- **담당 시나리오**: Scenario 1 (결과 화면 카드/별명/설명 부분), 불변 "결과의 완결성" (16유형 모두 빈칸 없음)
- **크기**: M (5 파일)
- **의존성**: Task 2 (`TypeCode`, `MbtiGame`의 결과 view)
- **참조**:
  - shadcn — Card 전체 composition(`CardHeader/Title/Description/Content/Footer`), Badge
  - wireframe.html — Screen 2 (결과, self 모드)
- **구현 대상**:
  - `config/mbti/types.ts` — 16유형 × `{nickname, description}` (한국어 초안)
  - `config/mbti/characters.ts` — 16유형 × `[Character, Character, Character]` (이름·작품명·이모지·코멘트)
  - `components/mbti/ResultScreen.tsx` — hero(유형/별명/설명) + 캐릭터 카드 3개
  - `components/mbti/ResultScreen.test.tsx` — 16유형 각각 렌더 단언 (table-driven)
  - `components/mbti/MbtiGame.tsx` — placeholder 결과를 `<ResultScreen typeCode={...} />`로 교체
- **수용 기준**:
  - [x] 결과 화면에 유형 코드, 한 줄 별명, 2-3문장 설명 텍스트가 모두 보인다
  - [x] 결과 화면에 캐릭터 카드 정확히 3개가 렌더된다
  - [x] 각 캐릭터 카드에 이름·작품명·한 줄 코멘트 텍스트가 모두 보인다
  - [x] 16유형 어느 코드를 주어도 hero 4필드(코드/별명/설명)와 카드 3개가 모두 채워진다 (table-driven 단위 테스트)
- **검증**:
  - `bun run test -- ResultScreen` (Vitest)
  - `bun run build`

---

### Task 4: 다시하기 + 새로고침 시 시작 화면 (vertical slice 4)

- **담당 시나리오**: Scenario 4 (전체 — 다시하기), Scenario 5 (전체 — 새로고침)
- **크기**: S (2 파일 + 1 e2e)
- **의존성**: Task 3 (결과 화면 완성)
- **참조**:
  - shadcn — Button(variant=outline) for 다시하기
- **구현 대상**:
  - `components/mbti/MbtiGame.tsx` — `RESET` 액션 추가 (reducer 초기화), `ResultScreen`에 "다시하기" 버튼 prop 노출
  - `components/mbti/MbtiGame.test.tsx` — 다시하기 → 시작 화면, 다시 진행 → "1 / 12"
  - `e2e/mbti-flow.spec.ts` — 5번 질문에서 `page.reload()` → 시작 화면 단언
- **수용 기준**:
  - [x] 결과 화면 "다시하기" 클릭 → "시작하기" 버튼이 보이는 시작 화면이 나타난다
  - [x] 시작 화면에서 다시 "시작하기" 클릭 → 1번 질문과 "1 / 12"
  - [x] 5번째 질문 화면에서 새로고침 → 시작 화면이 표시된다 (5번 질문이 아님)
- **검증**:
  - `bun run test -- MbtiGame` (Vitest)
  - `bun run test:e2e -- mbti-flow` (Playwright — `reload()`)

---

### Task 5: 링크 복사 + `?type` URL 진입 + fallback + "나도 해보기"

- **담당 시나리오**: Scenario 2 (전체 — 링크 복사 + 토스트), Scenario 3 (전체 — 공유 진입 + CTA), Scenario 6 (전체 — 잘못된 type fallback + 콘솔 무에러)
- **크기**: M (6 파일)
- **의존성**: Task 3 (결과 화면), Task 4 (RESET 액션 — "나도 해보기"가 재사용)
- **참조**:
  - shadcn — sonner 설치(`npx shadcn@latest add sonner`), `toast()` 사용
  - next-best-practices — `useSearchParams` from `next/navigation`
  - 불변 "외부 의존 없음" — `?type` 화이트리스트는 코드 내 16-멤버 배열
- **구현 대상**:
  - `lib/mbti/type-guard.ts` — `isValidTypeCode(s: string | null): s is TypeCode` (16-멤버 화이트리스트)
  - `lib/mbti/type-guard.test.ts` — `"ENFP"`, `"XYZ"`, `"enfp"`, `""`, `null` 분기 모두 cover
  - `components/mbti/CopyButton.tsx` — `navigator.clipboard.writeText` + `toast.success("링크가 복사되었습니다")`
  - `components/mbti/CopyButton.test.tsx` — clipboard mock + toast 호출 단언
  - `components/mbti/MbtiGame.tsx` — 초기 mount 시 `useSearchParams()` 읽고 valid면 `result` view로 직진. 결과 view가 query 진입이면 primary "나도 해보기"(→ RESET) + secondary "링크 복사"; 자가 완료면 primary "링크 복사" + secondary "다시하기"
  - `app/layout.tsx` — `<Toaster />` 마운트, `metadata.title` "MBTI 캐릭터 매치"로 갱신
  - `e2e/mbti-share.spec.ts` — 3 시나리오:
    1. 결과 도달 → 링크 복사 → 클립보드 값이 `?type=<코드>`로 끝남 + "복사" 토스트
    2. `/?type=ENFP` 진입 → 결과 화면 + "나도 해보기" 보임 → 클릭 시 1번 질문 진입 가능
    3. `/?type=XYZ`, `/?type=enfp`, `/?type=` → 시작 화면 + `page.on('console')`로 콘솔 에러 0건
- **수용 기준**:
  - [x] 결과 화면 "링크 복사" 클릭 → 클립보드 내용이 `?type=<유형코드>`로 끝나는 URL
  - [x] "링크 복사" 클릭 직후 "복사" 또는 "복사되었습니다" 피드백 텍스트가 화면에 나타난다
  - [x] 위 피드백 텍스트는 일정 시간 후(sonner 기본 4초 이내) 자동으로 사라진다 — `expect(...).toBeHidden()` with timeout 검증
  - [x] `/?type=ENFP` 진입 → 유형 코드 "ENFP"가 결과 화면에 보인다
  - [x] 공유 진입 결과 화면에 "나도 해보기" (또는 동등 의미) 버튼이 보인다
  - [x] "나도 해보기" 클릭 → 시작 화면 + 1번 질문 진입 가능
  - [x] `/?type=XYZ`, `/?type=enfp`(소문자), `/?type=` → 시작 화면이 표시된다
  - [x] 위 잘못된 type 진입 시 콘솔 에러가 발생하지 않는다
- **검증**:
  - `bun run test -- type-guard CopyButton MbtiGame` (Vitest)
  - `bun run test:e2e -- mbti-share` (Playwright — `evaluate(() => navigator.clipboard.readText())`, `page.on('console')`, `context.grantPermissions(['clipboard-read', 'clipboard-write'])`)

---

### Checkpoint: Tasks 1-5 이후

- [x] 모든 테스트 통과: `bun run test` + `bun run test:e2e`
- [x] 빌드 성공: `bun run build`
- [x] 7개 spec 시나리오 모두 브라우저 end-to-end 동작 (수동: `bun dev`로 self / copied / shared / 잘못된 type / 새로고침 / 다시하기 / 동점(모두 첫 선택지)을 한 차례씩 확인)

---

### Task 6: 불변 규칙 검증 — 모바일 360px · 외부 의존 0 · 빠른 응답

- **담당 시나리오**: 불변 "모바일 우선" (360px 가로 스크롤·텍스트 잘림 없음), 불변 "외부 의존 없음" (오프라인 동작), 불변 "빠른 응답" (< 100ms)
- **크기**: S (1 파일)
- **의존성**: Tasks 1-5 (전체 동작)
- **참조**:
  - web-design-guidelines — 모바일·접근성 1차 점검
  - Playwright — `viewport`, `route('**/*', r => r.abort())`로 외부 네트워크 차단
- **구현 대상**:
  - `e2e/mbti-mobile-invariants.spec.ts`
- **수용 기준**:
  - [x] 360×640 뷰포트에서 시작/질문(1·5·12번)/결과 화면 모두 `document.documentElement.scrollWidth <= 360`
  - [x] 1280×800 데스크톱 뷰포트에서 콘텐츠가 가운데 정렬되고 컨테이너 최대 너비를 초과하지 않는다 (스크롤 가능 너비 = 뷰포트 너비, 콘텐츠 wrapper의 `boundingBox().x + width / 2 ≈ viewportWidth / 2`)
  - [x] 외부 origin 네트워크 요청 차단 후에도 시작 → 12 질문 → 결과 → 링크 복사 플로우가 통과한다 (`page.route('**/*', route => route.request().url().startsWith(baseURL) ? route.continue() : route.abort())`)
  - [x] 질문 화면에서 선택지 클릭 → 다음 질문 본문 표시까지의 경과시간이 100ms 미만이다 (Playwright `Date.now()` 비교)
- **검증**:
  - `bun run test:e2e -- mbti-mobile-invariants` (Playwright)

---

## 미결정 항목

- 없음 (모든 high-cost 결정은 [아키텍처 결정] 표에 명시)
