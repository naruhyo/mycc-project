"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-12 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">MBTI 캐릭터 매치</h1>
        <p className="text-muted-foreground">12개 질문으로 나와 닮은 애니 캐릭터를 찾아보세요</p>
        <div className="flex gap-2 flex-wrap justify-center">
          <Badge variant="secondary">⏱ 약 2분</Badge>
          <Badge variant="secondary">📱 모바일 최적화</Badge>
          <Badge variant="secondary">🎭 16유형</Badge>
        </div>
      </div>
      <Button size="lg" onClick={onStart}>
        시작하기
      </Button>
    </div>
  );
}
