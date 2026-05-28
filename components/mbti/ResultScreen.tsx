"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mbtiTypes } from "@/config/mbti/types";
import { mbtiCharacters } from "@/config/mbti/characters";
import type { TypeCode } from "@/types/mbti";

interface ResultScreenProps {
  typeCode: TypeCode;
}

export function ResultScreen({ typeCode }: ResultScreenProps) {
  const meta = mbtiTypes[typeCode];
  const characters = mbtiCharacters[typeCode];

  const character = useMemo(
    () => characters[Math.floor(Math.random() * characters.length)],
    [characters],
  );

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

      <Card>
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl" aria-hidden="true">{character.emoji}</span>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="font-semibold">{character.name}</p>
              <p className="text-sm text-muted-foreground">{character.work}</p>
              <p className="text-sm mt-1">{character.comment}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
