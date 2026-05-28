import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CopyButton } from "./CopyButton";

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

// Mock clipboard API
const mockWriteText = vi.fn().mockResolvedValue(undefined);
Object.defineProperty(navigator, "clipboard", {
  value: { writeText: mockWriteText },
  writable: true,
  configurable: true,
});

import { toast } from "sonner";

describe("CopyButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
      expect(toast.success).toHaveBeenCalledWith(expect.stringMatching(/복사/));
    });
  });
});
