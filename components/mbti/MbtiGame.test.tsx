import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MbtiGame } from "./MbtiGame";
import { questions } from "@/config/mbti/questions";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(""),
}));

describe("MbtiGame", () => {
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
});
