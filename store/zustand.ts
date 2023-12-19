import { IWord, Language } from "@types";
import { create } from "zustand";

import { phrases } from "../data/phrases";
import { words } from "../data/words";

type State = {
  count: number;
  words: IWord[];
  phrases: IWord[];
  language: Language;
};

type Actions = {
  incrementClick: () => void;
  decrementClick: () => void;
  resetCount: () => void;
  changeLanguage: (language: Language) => void;
};

export const useStore = create<State & Actions>((set) => ({
  count: 0,
  words,
  phrases,
  language: "ru",
  incrementClick: () => set((state) => ({ count: state.count + 1 })),
  decrementClick: () => set((state) => ({ count: state.count - 1 })),
  resetCount: () => set((state) => ({ count: 0 })),
  changeLanguage: (language: Language) => set((state) => ({ language })),
}));
