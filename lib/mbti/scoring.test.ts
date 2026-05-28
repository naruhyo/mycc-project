import { describe, it, expect } from "vitest";
import { score } from "./scoring";
import type { Choice } from "@/types/mbti";

function makeAnswers(pairs: Array<[string, string]>): Choice[] {
  return pairs.map(([dimension, value]) => ({
    label: "test",
    dimension: dimension as Choice["dimension"],
    value: value as Choice["value"],
    weight: 1,
  }));
}

describe("score", () => {
  it("returns ENFP for all E/N/F/P answers", () => {
    const answers = makeAnswers([
      ["EI", "E"], ["EI", "E"], ["EI", "E"],
      ["SN", "N"], ["SN", "N"], ["SN", "N"],
      ["TF", "F"], ["TF", "F"], ["TF", "F"],
      ["JP", "P"], ["JP", "P"], ["JP", "P"],
    ]);
    expect(score(answers)).toBe("ENFP");
  });

  it("returns ISTJ for all I/S/T/J answers", () => {
    const answers = makeAnswers([
      ["EI", "I"], ["EI", "I"], ["EI", "I"],
      ["SN", "S"], ["SN", "S"], ["SN", "S"],
      ["TF", "T"], ["TF", "T"], ["TF", "T"],
      ["JP", "J"], ["JP", "J"], ["JP", "J"],
    ]);
    expect(score(answers)).toBe("ISTJ");
  });

  it("returns a valid TypeCode for any 12 answers (all 16 covered by exhaustive dims)", () => {
    const validCodes = [
      "ENFP","ENFJ","ENTP","ENTJ",
      "ESFP","ESFJ","ESTP","ESTJ",
      "INFP","INFJ","INTP","INTJ",
      "ISFP","ISFJ","ISTP","ISTJ",
    ];
    const answers = makeAnswers([
      ["EI", "E"], ["EI", "E"], ["EI", "I"],
      ["SN", "N"], ["SN", "S"], ["SN", "S"],
      ["TF", "F"], ["TF", "T"], ["TF", "T"],
      ["JP", "J"], ["JP", "J"], ["JP", "P"],
    ]);
    const result = score(answers);
    expect(validCodes).toContain(result);
  });

  it("is deterministic — same input yields same code", () => {
    const answers = makeAnswers([
      ["EI", "E"], ["EI", "I"], ["EI", "E"],
      ["SN", "N"], ["SN", "S"], ["SN", "N"],
      ["TF", "T"], ["TF", "F"], ["TF", "T"],
      ["JP", "P"], ["JP", "J"], ["JP", "P"],
    ]);
    expect(score(answers)).toBe(score(answers));
  });

  it("breaks E/I tie by picking E (first letter wins)", () => {
    const answers = makeAnswers([
      ["EI", "E"], ["EI", "I"],
      ["SN", "N"], ["SN", "N"],
      ["TF", "F"], ["TF", "F"],
      ["JP", "P"], ["JP", "P"],
    ]);
    // EI: 1E vs 1I → tie → E wins (tiebreak = first letter of dimension)
    const result = score(answers);
    expect(result[0]).toBe("E");
  });

  it("breaks S/N tie by picking S (second letter = first = S for SN dimension)", () => {
    const answers = makeAnswers([
      ["EI", "E"], ["EI", "E"],
      ["SN", "S"], ["SN", "N"],
      ["TF", "F"], ["TF", "F"],
      ["JP", "P"], ["JP", "P"],
    ]);
    // SN: 1S vs 1N → tie → S wins
    const result = score(answers);
    expect(result[1]).toBe("S");
  });

  it("breaks T/F tie by picking T", () => {
    const answers = makeAnswers([
      ["EI", "I"], ["EI", "I"],
      ["SN", "S"], ["SN", "S"],
      ["TF", "T"], ["TF", "F"],
      ["JP", "J"], ["JP", "J"],
    ]);
    const result = score(answers);
    expect(result[2]).toBe("T");
  });

  it("breaks J/P tie by picking J", () => {
    const answers = makeAnswers([
      ["EI", "I"], ["EI", "I"],
      ["SN", "S"], ["SN", "S"],
      ["TF", "T"], ["TF", "T"],
      ["JP", "J"], ["JP", "P"],
    ]);
    const result = score(answers);
    expect(result[3]).toBe("J");
  });
});
