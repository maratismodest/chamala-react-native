import { IWord } from "@types";

interface CollectProps {
  id: number;
  word: string;
}

type State = {
  isTrue: boolean | undefined;
  correct: IWord | undefined;
  answer: IWord | undefined;
  options: CollectProps[];
  chosens: CollectProps[];
};

const initialState: State = {
  isTrue: undefined,
  correct: undefined,
  answer: undefined,
  options: [],
  chosens: [],
};
export type { CollectProps, State };

export { initialState };
