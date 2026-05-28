"use client";

import { useReducer } from "react";
import { useSearchParams } from "next/navigation";
import { StartScreen } from "./StartScreen";
import { QuestionScreen } from "./QuestionScreen";
import { ResultScreen } from "./ResultScreen";
import { questions, TOTAL_QUESTIONS } from "@/config/mbti/questions";
import { score } from "@/lib/mbti/scoring";
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
      if (nextIndex >= TOTAL_QUESTIONS) {
        return {
          ...state,
          answers: newAnswers,
          view: "result",
          resultCode: score(newAnswers),
          currentIndex: nextIndex,
        };
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
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <QuestionScreen
            question={questions[currentIndex]}
            currentIndex={currentIndex}
            onAnswer={(choice) => dispatch({ type: "ANSWER", choice })}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-start justify-center p-4 pt-8">
      <div className="w-full max-w-lg">
        <ResultScreen
          typeCode={resultCode!}
          onReset={() => dispatch({ type: "RESET" })}
          fromUrl={state.fromUrl}
        />
      </div>
    </main>
  );
}
