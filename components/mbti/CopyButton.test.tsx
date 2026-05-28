import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CopyButton } from "./CopyButton";

const { mockToastSuccess, mockToastError } = vi.hoisted(() => ({
  mockToastSuccess: vi.fn(),
  mockToastError: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: mockToastSuccess,
    error: mockToastError,
  },
}));

const mockWriteText = vi.fn().mockResolvedValue(undefined);
Object.defineProperty(navigator, "clipboard", {
  value: { writeText: mockWriteText },
  writable: true,
  configurable: true,
});

describe("CopyButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockWriteText.mockResolvedValue(undefined);
  });

  it("renders a button with copy label", () => {
    render(<CopyButton url="https://example.com/?type=ENFP" />);
    expect(screen.getByRole("button", { name: /링크 복사/i })).toBeInTheDocument();
  });

  it("copies the URL to clipboard on click", async () => {
    render(<CopyButton url="https://example.com/?type=ENFP" />);
    fireEvent.click(screen.getByRole("button", { name: /링크 복사/i }));
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith("https://example.com/?type=ENFP");
    });
  });

  it("calls toast.success after copying", async () => {
    render(<CopyButton url="https://example.com/?type=ENFP" />);
    fireEvent.click(screen.getByRole("button", { name: /링크 복사/i }));
    await waitFor(() => {
      expect(mockToastSuccess).toHaveBeenCalledWith(expect.stringMatching(/복사/), expect.anything());
    });
  });

  it("calls toast.error when clipboard write fails", async () => {
    mockWriteText.mockRejectedValueOnce(new Error("denied"));
    render(<CopyButton url="https://example.com/?type=ENFP" />);
    fireEvent.click(screen.getByRole("button", { name: /링크 복사/i }));
    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(expect.stringMatching(/실패/), expect.anything());
    });
  });
});
