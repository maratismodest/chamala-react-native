import { initialState } from "./constants";
import { CollectProps } from "./types";

import type { IWord } from "@/types";
import { getRandomInt, getShuffled } from "@/utils";

export const getNewWord = (
  words: IWord[],
): { correct: IWord; options: CollectProps[] } => {
  const correct = words[getRandomInt(0, words.length - 1)];
  const _options = correct.ta.toLowerCase().split("");
  const options = getShuffled(_options).map((x, index) => ({
    id: index,
    word: x,
  }));
  return { correct, options };
};

export const prepareData = (words: IWord[]) => ({
  ...initialState,
  ...getNewWord(words),
});

export function filterByKey<T, K extends keyof T>(
  list: T[],
  key: K,
  value: T[K],
): T[] {
  return list.filter((item) => item[key] !== value);
}
