import type { TypeCode } from "@/types/mbti";

const VALID_TYPE_CODES = new Set<string>([
  "ENFP","ENFJ","ENTP","ENTJ",
  "ESFP","ESFJ","ESTP","ESTJ",
  "INFP","INFJ","INTP","INTJ",
  "ISFP","ISFJ","ISTP","ISTJ",
]);

export function isValidTypeCode(s: string | null | undefined): s is TypeCode {
  return typeof s === "string" && VALID_TYPE_CODES.has(s);
}
