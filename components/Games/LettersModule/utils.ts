import { IWord } from "@types";
import { getShuffled } from "@utils/getShuffled";

interface CollectProps {
  id: number;
  word: string;
}

type LettersModuleState = {
  correct: IWord | undefined;
  answer: IWord | undefined;
  options: CollectProps[];
  chosens: CollectProps[];
};

const initialState: LettersModuleState = {
  correct: undefined,
  answer: undefined,
  options: [],
  chosens: [],
};
const getNewWord = (words: IWord[]) => {
  const correct = getShuffled(words)[0];
  const _options = correct.ta.toLowerCase().split("");
  const options = getShuffled(_options).map((x, index) => ({
    id: index,
    word: x,
  }));
  return { correct, options };
};

export { getNewWord, initialState };
export type { CollectProps, LettersModuleState };
