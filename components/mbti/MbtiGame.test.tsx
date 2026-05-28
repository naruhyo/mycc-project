import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MbtiGame } from "./MbtiGame";
import { questions, TOTAL_QUESTIONS } from "@/config/mbti/questions";

const mockSearchParams = { get: vi.fn().mockReturnValue(null) };

vi.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams,
}));

const VALID_TYPE_CODES = [
  "ENFP","ENFJ","ENTP","ENTJ",
  "ESFP","ESFJ","ESTP","ESTJ",
  "INFP","INFJ","INTP","INTJ",
  "ISFP","ISFJ","ISTP","ISTJ",
];

describe("MbtiGame", () => {
  beforeEach(() => {
    mockSearchParams.get.mockReturnValue(null);
  });

  it("shows title and start button on load", () => {
    render(<MbtiGame />);
    expect(screen.getByText("MBTI 캐릭터 매치")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "시작하기" })).toBeInTheDocument();
  });

  it("navigates to first question with 1 / 12 progress on start", () => {
    render(<MbtiGame />);
    fireEvent.click(screen.getByRole("button", { name: "시작하기" }));
    expect(screen.getByText("1 / 12")).toBeInTheDocument();
    expect(screen.getByText(questions[0].prompt)).toBeInTheDocument();
  });

  it("advances to Q2 with 2 / 12 after clicking first choice", () => {
    render(<MbtiGame />);
    fireEvent.click(screen.getByRole("button", { name: "시작하기" }));
    fireEvent.click(screen.getByRole("button", { name: questions[0].choices[0].label }));
    expect(screen.getByText("2 / 12")).toBeInTheDocument();
    expect(screen.getByText(questions[1].prompt)).toBeInTheDocument();
  });

  it("progress bar aria-valuenow reflects answered count", () => {
    render(<MbtiGame />);
    fireEvent.click(screen.getByRole("button", { name: "시작하기" }));
    // Click first 2 choices
    fireEvent.click(screen.getByRole("button", { name: questions[0].choices[0].label }));
    fireEvent.click(screen.getByRole("button", { name: questions[1].choices[0].label }));

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "2");
  });

  it("reset from result → start screen with 시작하기 button", () => {
    render(<MbtiGame />);
    fireEvent.click(screen.getByRole("button", { name: "시작하기" }));
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      fireEvent.click(screen.getByRole("button", { name: questions[i].choices[0].label }));
    }
    // Should now be on result screen — click 다시하기
    fireEvent.click(screen.getByRole("button", { name: "다시하기" }));
    expect(screen.getByText("MBTI 캐릭터 매치")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "시작하기" })).toBeInTheDocument();
  });

  it("after reset, starting again shows 1 / 12", () => {
    render(<MbtiGame />);
    fireEvent.click(screen.getByRole("button", { name: "시작하기" }));
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      fireEvent.click(screen.getByRole("button", { name: questions[i].choices[0].label }));
    }
    fireEvent.click(screen.getByRole("button", { name: "다시하기" }));
    fireEvent.click(screen.getByRole("button", { name: "시작하기" }));
    expect(screen.getByText("1 / 12")).toBeInTheDocument();
  });

  it("shows result screen with valid 4-letter TypeCode after answering all 12 questions", () => {
    render(<MbtiGame />);
    fireEvent.click(screen.getByRole("button", { name: "시작하기" }));

    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      fireEvent.click(screen.getByRole("button", { name: questions[i].choices[0].label }));
    }

    expect(screen.queryByText("1 / 12")).not.toBeInTheDocument();
    const shownCode = VALID_TYPE_CODES.find((code) => screen.queryByText(code));
    expect(shownCode).toBeTruthy();
  });

  it("shows result screen directly for valid ?type= URL", () => {
    mockSearchParams.get.mockReturnValue("ENFP");
    render(<MbtiGame />);
    expect(screen.getByText("ENFP")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "나도 해보기" })).toBeInTheDocument();
  });

  it("shows start screen for invalid ?type= URL (fallback)", () => {
    mockSearchParams.get.mockReturnValue("XYZ");
    render(<MbtiGame />);
    expect(screen.getByText("MBTI 캐릭터 매치")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "시작하기" })).toBeInTheDocument();
  });

  it("나도 해보기 click from URL result → start screen", () => {
    mockSearchParams.get.mockReturnValue("INTJ");
    render(<MbtiGame />);
    fireEvent.click(screen.getByRole("button", { name: "나도 해보기" }));
    expect(screen.getByText("MBTI 캐릭터 매치")).toBeInTheDocument();
  });
});
