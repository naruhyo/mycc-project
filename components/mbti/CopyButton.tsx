"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CopyButtonProps {
  url: string;
}

export function CopyButton({ url }: CopyButtonProps) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("링크가 복사되었습니다", { id: "copy-link" });
    } catch {
      toast.error("복사에 실패했어요. URL을 직접 복사해 주세요.", { id: "copy-link" });
    }
  }

  return (
    <Button variant="outline" className="w-full" onClick={handleCopy}>
      링크 복사
    </Button>
  );
}
