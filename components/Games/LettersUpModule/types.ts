import type { IWord } from "@/types";

type CollectProps = {
  id: number;
  word: string;
};

type LettersModuleState = {
  correct: IWord | undefined;
  answer: IWord | undefined;
  options: CollectProps[];
  chosens: CollectProps[];
};

export type { CollectProps, LettersModuleState };
