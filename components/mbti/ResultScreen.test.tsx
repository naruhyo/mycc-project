import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResultScreen } from "./ResultScreen";
import { mbtiTypes } from "@/config/mbti/types";
import { mbtiCharacters } from "@/config/mbti/characters";
import type { TypeCode } from "@/types/mbti";

const ALL_CODES: TypeCode[] = [
  "ENFP","ENFJ","ENTP","ENTJ",
  "ESFP","ESFJ","ESTP","ESTJ",
  "INFP","INFJ","INTP","INTJ",
  "ISFP","ISFJ","ISTP","ISTJ",
];

describe("ResultScreen", () => {
  it("shows type code, nickname, and description for ENFP", () => {
    render(<ResultScreen typeCode="ENFP" />);
    expect(screen.getByText("ENFP")).toBeInTheDocument();
    expect(screen.getByText(mbtiTypes["ENFP"].nickname)).toBeInTheDocument();
    expect(screen.getByText(mbtiTypes["ENFP"].description)).toBeInTheDocument();
  });

  it("renders exactly 3 character cards for ENFP", () => {
    render(<ResultScreen typeCode="ENFP" />);
    const characters = mbtiCharacters["ENFP"];
    for (const char of characters) {
      expect(screen.getByText(char.comment)).toBeInTheDocument();
    }
  });

  it.each(ALL_CODES)("renders complete result for %s — no empty fields", (code) => {
    render(<ResultScreen typeCode={code} />);
    expect(screen.getByText(code)).toBeInTheDocument();
    expect(screen.getByText(mbtiTypes[code].nickname)).toBeInTheDocument();
    expect(screen.getByText(mbtiTypes[code].description)).toBeInTheDocument();
    const chars = mbtiCharacters[code];
    expect(chars).toHaveLength(3);
    for (const char of chars) {
      expect(screen.getAllByText(char.name).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(char.work).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(char.comment)).toBeInTheDocument();
    }
  });
});
