import { describe, it, expect } from "vitest";
import { isValidTypeCode } from "./type-guard";

describe("isValidTypeCode", () => {
  it("returns true for valid uppercase TypeCode", () => {
    expect(isValidTypeCode("ENFP")).toBe(true);
    expect(isValidTypeCode("ISTJ")).toBe(true);
    expect(isValidTypeCode("INTJ")).toBe(true);
  });

  it("returns false for lowercase input", () => {
    expect(isValidTypeCode("enfp")).toBe(false);
    expect(isValidTypeCode("Enfp")).toBe(false);
  });

  it("returns false for invalid code", () => {
    expect(isValidTypeCode("XYZ")).toBe(false);
    expect(isValidTypeCode("XXXX")).toBe(false);
    expect(isValidTypeCode("ABCD")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isValidTypeCode("")).toBe(false);
  });

  it("returns false for null", () => {
    expect(isValidTypeCode(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isValidTypeCode(undefined)).toBe(false);
  });

  it("covers all 16 valid codes", () => {
    const codes = [
      "ENFP","ENFJ","ENTP","ENTJ",
      "ESFP","ESFJ","ESTP","ESTJ",
      "INFP","INFJ","INTP","INTJ",
      "ISFP","ISFJ","ISTP","ISTJ",
    ];
    for (const code of codes) {
      expect(isValidTypeCode(code)).toBe(true);
    }
  });
});
