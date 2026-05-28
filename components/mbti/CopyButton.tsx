"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CopyButtonProps {
  url: string;
}

export function CopyButton({ url }: CopyButtonProps) {
  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    toast.success("링크가 복사되었습니다");
  }

  return (
    <Button variant="outline" className="w-full" onClick={handleCopy}>
      링크 복사
    </Button>
  );
}
