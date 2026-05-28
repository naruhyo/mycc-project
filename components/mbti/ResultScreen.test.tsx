import { vi, describe, it, expect, afterEach } from "vitest";
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

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ResultScreen", () => {
  it("shows type code, nickname, and description for ENFP", () => {
    render(<ResultScreen typeCode="ENFP" />);
    expect(screen.getByText("ENFP")).toBeInTheDocument();
    expect(screen.getByText(mbtiTypes["ENFP"].nickname)).toBeInTheDocument();
    expect(screen.getByText(mbtiTypes["ENFP"].description)).toBeInTheDocument();
  });

  it("renders exactly 1 character card for ENFP", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    render(<ResultScreen typeCode="ENFP" />);
    const chars = mbtiCharacters["ENFP"];
    expect(screen.getByText(chars[0].comment)).toBeInTheDocument();
    expect(screen.queryByText(chars[1].comment)).not.toBeInTheDocument();
    expect(screen.queryByText(chars[2].comment)).not.toBeInTheDocument();
  });

  it("picks different character based on random value", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    render(<ResultScreen typeCode="ENFP" />);
    const chars = mbtiCharacters["ENFP"];
    expect(screen.getByText(chars[2].comment)).toBeInTheDocument();
  });

  it.each(ALL_CODES)("renders complete result for %s — no empty fields", (code) => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    render(<ResultScreen typeCode={code} />);
    expect(screen.getByText(code)).toBeInTheDocument();
    expect(screen.getByText(mbtiTypes[code].nickname)).toBeInTheDocument();
    expect(screen.getByText(mbtiTypes[code].description)).toBeInTheDocument();
    const char = mbtiCharacters[code][0];
    expect(screen.getByText(char.name)).toBeInTheDocument();
    expect(screen.getByText(char.work)).toBeInTheDocument();
    expect(screen.getByText(char.comment)).toBeInTheDocument();
  });
});
