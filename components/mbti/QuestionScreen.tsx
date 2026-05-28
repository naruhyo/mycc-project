"use client";

import { Button } from "@/components/ui/button";
import { TOTAL_QUESTIONS } from "@/config/mbti/questions";
import type { Question, Choice } from "@/types/mbti";

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  onAnswer: (choice: Choice) => void;
}

export function QuestionScreen({ question, currentIndex, onAnswer }: QuestionScreenProps) {
  const progressPercent = (currentIndex / TOTAL_QUESTIONS) * 100;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{currentIndex + 1} / {TOTAL_QUESTIONS}</span>
        </div>
        <div
          className="h-2 w-full rounded-full bg-secondary overflow-hidden"
          role="progressbar"
          aria-valuenow={currentIndex}
          aria-valuemin={0}
          aria-valuemax={TOTAL_QUESTIONS}
        >
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <p className="text-lg font-medium text-center leading-relaxed">{question.prompt}</p>

      <div className="flex flex-col gap-3">
        {question.choices.map((choice, i) => (
          <Button
            key={i}
            variant="outline"
            className="w-full h-auto py-4 px-5 text-left justify-start whitespace-normal"
            onClick={() => onAnswer(choice)}
          >
            {choice.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
