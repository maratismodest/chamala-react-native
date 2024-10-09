interface IWord {
  id: number;
  ru: string;
  ta: string;
  en: string;
  audio: string;
  image?: string;
}

type Language = "en" | "ru";

export type { IWord, Language };
