"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mbtiTypes } from "@/config/mbti/types";
import { mbtiCharacters } from "@/config/mbti/characters";
import type { TypeCode } from "@/types/mbti";

interface ResultScreenProps {
  typeCode: TypeCode;
  onReset: () => void;
  fromUrl?: boolean;
  onTryMyself?: () => void;
}

export function ResultScreen({ typeCode, onReset, fromUrl = false, onTryMyself }: ResultScreenProps) {
  const meta = mbtiTypes[typeCode];
  const characters = mbtiCharacters[typeCode];

  return (
    <div className="flex flex-col gap-6">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center">
            <Badge variant="secondary" className="text-2xl font-bold px-4 py-2">
              {typeCode}
            </Badge>
          </div>
          <CardTitle className="text-xl mt-2">{meta.nickname}</CardTitle>
          <CardDescription className="text-base leading-relaxed">{meta.description}</CardDescription>
        </CardHeader>
      </Card>

      <p className="text-sm font-medium text-muted-foreground text-center">나와 닮은 캐릭터</p>

      <div className="flex flex-col gap-3">
        {characters.map((char, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">{char.emoji}</span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="font-semibold">{char.name}</p>
                  <p className="text-sm text-muted-foreground">{char.work}</p>
                  <p className="text-sm mt-1">{char.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-2 pt-2">
        {fromUrl ? (
          <>
            <Button className="w-full" onClick={onTryMyself ?? onReset}>
              나도 해보기
            </Button>
            <Button variant="outline" className="w-full" onClick={onReset}>
              처음으로
            </Button>
          </>
        ) : (
          <Button variant="outline" className="w-full" onClick={onReset}>
            다시하기
          </Button>
        )}
      </div>
    </div>
  );
}
