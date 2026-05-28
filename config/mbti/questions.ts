import type { Question } from "@/types/mbti";

export const TOTAL_QUESTIONS = 12;

export const questions: Question[] = [
  {
    id: 1,
    prompt: "주말 약속이 갑자기 취소됐다. 나는?",
    choices: [
      { label: "바로 다른 친구에게 연락해 새 약속을 잡는다", dimension: "EI", value: "E", weight: 1 },
      { label: "혼자 집에서 쉬며 재충전한다", dimension: "EI", value: "I", weight: 1 },
    ],
  },
];
