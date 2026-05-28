"use client";

import { useReducer } from "react";
import { useSearchParams } from "next/navigation";
import { StartScreen } from "./StartScreen";
import { questions, TOTAL_QUESTIONS } from "@/config/mbti/questions";
import type { Choice, TypeCode } from "@/types/mbti";

type ViewState = "start" | "quiz" | "result";

interface State {
  view: ViewState;
  answers: Choice[];
  resultCode: TypeCode | null;
  fromUrl: boolean;
  currentIndex: number;
}

type Action =
  | { type: "START" }
  | { type: "ANSWER"; choice: Choice }
  | { type: "RESET" }
  | { type: "SET_RESULT_FROM_URL"; code: TypeCode };

const initialState: State = {
  view: "start",
  answers: [],
  resultCode: null,
  fromUrl: false,
  currentIndex: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return { ...state, view: "quiz", answers: [], currentIndex: 0 };
    case "ANSWER": {
      const newAnswers = [...state.answers, action.choice];
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= questions.length) {
        return { ...state, answers: newAnswers, view: "result", resultCode: "ENFP" as TypeCode, currentIndex: nextIndex };
      }
      return { ...state, answers: newAnswers, currentIndex: nextIndex };
    }
    case "RESET":
      return { ...initialState };
    case "SET_RESULT_FROM_URL":
      return { ...initialState, view: "result", resultCode: action.code, fromUrl: true };
    default:
      return state;
  }
}

export function MbtiGame() {
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Task 5: URL 진입 처리 — isValidTypeCode 추가 후 여기서 dispatch SET_RESULT_FROM_URL
  void searchParams;

  const { view, currentIndex, resultCode } = state;

  if (view === "start") {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <StartScreen onStart={() => dispatch({ type: "START" })} />
        </div>
      </main>
    );
  }

  if (view === "quiz") {
    const question = questions[currentIndex];
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg flex flex-col gap-6">
          <p className="text-sm text-muted-foreground text-center">
            {currentIndex + 1} / {TOTAL_QUESTIONS}
          </p>
          <p className="text-lg font-medium text-center">{question.prompt}</p>
          <div className="flex flex-col gap-3">
            {question.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => dispatch({ type: "ANSWER", choice })}
                className="w-full p-4 text-left rounded-lg border border-border bg-card text-card-foreground hover:bg-accent transition-colors"
              >
                {choice.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg text-center flex flex-col gap-4">
        <p className="text-4xl font-bold">{resultCode}</p>
        <p className="text-muted-foreground">결과 화면 (Task 3에서 완성)</p>
        <button onClick={() => dispatch({ type: "RESET" })} className="underline text-sm">
          다시하기
        </button>
      </div>
    </main>
  );
}
