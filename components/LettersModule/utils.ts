import { IWord } from '@types';

interface CollectProps {
  id: number;
  word: string;
}

type State = {
  isTrue: boolean | undefined,
  correct: IWord | undefined,
  options: CollectProps[],
  chosens: CollectProps[]
}

const initialState: State = {
  isTrue: undefined,
  correct: undefined,
  options: [],
  chosens: [],
};
export type { CollectProps, State}

export {initialState}