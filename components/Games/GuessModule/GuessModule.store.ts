import { create } from "zustand";

import { AnswerProps } from "@/components/Games/GuessModule/GuessModule.types";
import { IWord } from "@/types";

type GuessModuleStore = {
  counter: number;
  inc: () => void;
  reset: () => void;
  options: IWord[];
  setOptions: (options: IWord[]) => void;
  result: AnswerProps[];
  setResult: (result: AnswerProps[]) => void;
  answer: IWord | undefined;
  setAnswer: (answer: IWord | undefined) => void;
};

export const useGuessStore = create<GuessModuleStore>()((set) => ({
  counter: 0,
  inc: () => set((state) => ({ counter: state.counter + 1 })),
  reset: () => set({ counter: 0, options: [], result: [], answer: undefined }),
  options: [],
  setOptions: (options) => set((state) => ({ options })),
  result: [],
  setResult: (result) => set((state) => ({ result })),
  answer: undefined,
  setAnswer: (answer) => set((state) => ({ answer })),
}));
