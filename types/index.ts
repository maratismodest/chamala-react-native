interface IWord {
  id: number;
  ru: string;
  ta: string;
  en: string;
  audio: string;
  image?: string;
}

type Language = "en" | "ru";

interface Profile {
  correct: number;
  wrong: number;
  accuracy: number;
}

export type { IWord, Language, Profile };
