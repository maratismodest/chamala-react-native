import { CollectProps } from "./types";

import type { IWord } from "@/types";
import getShuffled from "@/utils/getShuffled";

export const getNewWord = (
  words: IWord[],
): { correct: IWord; options: CollectProps[] } => {
  const correct = getShuffled(words)[0];
  const _options = correct.ta.toLowerCase().split("");
  const options = getShuffled(_options).map((x, index) => ({
    id: index,
    word: x,
  }));
  return { correct, options };
};
