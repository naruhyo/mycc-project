import type { Choice, TypeCode } from "@/types/mbti";

// Tiebreak: first letter of each dimension wins (E, S, T, J)
const TIEBREAK: Record<string, string> = {
  EI: "E",
  SN: "S",
  TF: "T",
  JP: "J",
};

export function score(answers: Choice[]): TypeCode {
  const counts: Record<string, Record<string, number>> = {
    EI: { E: 0, I: 0 },
    SN: { S: 0, N: 0 },
    TF: { T: 0, F: 0 },
    JP: { J: 0, P: 0 },
  };

  for (const answer of answers) {
    counts[answer.dimension][answer.value] += answer.weight;
  }

  function pick(dim: string, a: string, b: string): string {
    const ca = counts[dim][a] ?? 0;
    const cb = counts[dim][b] ?? 0;
    if (ca > cb) return a;
    if (cb > ca) return b;
    return TIEBREAK[dim];
  }

  const e = pick("EI", "E", "I");
  const s = pick("SN", "S", "N");
  const t = pick("TF", "T", "F");
  const j = pick("JP", "J", "P");

  return `${e}${s}${t}${j}` as TypeCode;
}
