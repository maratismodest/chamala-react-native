import type { IWord } from "@/types";
import getShuffled from "@/utils/getShuffled";

const getNewWord = (words: IWord[]) => {
  const correct = getShuffled(words)[0];
  const _options = correct.ta.toLowerCase().split("");
  const options = getShuffled(_options).map((x, index) => ({
    id: index,
    word: x,
  }));
  return { correct, options };
};

export { getNewWord };
