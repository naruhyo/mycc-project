export type Dimension = "EI" | "SN" | "TF" | "JP";

export type DimensionValue = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Choice {
  label: string;
  dimension: Dimension;
  value: DimensionValue;
  weight: number;
}

export interface Question {
  id: number;
  prompt: string;
  choices: Choice[];
}

export type TypeCode =
  | "ENFP" | "ENFJ" | "ENTP" | "ENTJ"
  | "ESFP" | "ESFJ" | "ESTP" | "ESTJ"
  | "INFP" | "INFJ" | "INTP" | "INTJ"
  | "ISFP" | "ISFJ" | "ISTP" | "ISTJ";

export interface TypeMeta {
  code: TypeCode;
  nickname: string;
  description: string;
}

export interface Character {
  name: string;
  work: string;
  emoji: string;
  comment: string;
}

export type CharacterTriple = Record<TypeCode, [Character, Character, Character]>;
