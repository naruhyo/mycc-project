"use client";

import { useReducer, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StartScreen } from "./StartScreen";
import { QuestionScreen } from "./QuestionScreen";
import { ResultScreen } from "./ResultScreen";
import { CopyButton } from "./CopyButton";
import { questions, TOTAL_QUESTIONS } from "@/config/mbti/questions";
import { score } from "@/lib/mbti/scoring";
import { isValidTypeCode } from "@/lib/mbti/type-guard";
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

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (isValidTypeCode(typeParam)) {
      dispatch({ type: "SET_RESULT_FROM_URL", code: typeParam });
    }
    // only run on mount — searchParams identity changes are intentionally ignored
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { view, currentIndex, resultCode, fromUrl } = state;
  const shareUrl = typeof window !== "undefined" && resultCode
    ? `${window.location.origin}/?type=${resultCode}`
    : "";

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

  const reset = () => dispatch({ type: "RESET" });

  return (
    <main className="min-h-screen flex items-start justify-center p-4 pt-8">
      <div className="w-full max-w-lg flex flex-col gap-4">
        <ResultScreen typeCode={resultCode!} />
        <div className="flex flex-col gap-2">
          {fromUrl ? (
            <>
              <Button className="w-full" onClick={reset}>나도 해보기</Button>
              {shareUrl && <CopyButton url={shareUrl} />}
            </>
          ) : (
            <>
              {shareUrl && <CopyButton url={shareUrl} />}
              <Button variant="outline" className="w-full" onClick={reset}>다시하기</Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
