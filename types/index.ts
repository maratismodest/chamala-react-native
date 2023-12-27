export interface IWord {
  id: number;
  ru: string;
  ta: string;
  en: string;
  audio: string;
}

export type Language = "en" | "ru";

export interface Profile {
  correct: number;
  wrong: number;
  accuracy: number;
}
