import { IWord } from "@types";
import { create } from "zustand";

import { phrases } from "./data/phrases";
import { words } from "./data/words";

type State = {
  count: number;
  words: IWord[];
  phrases: IWord[];
};

type Actions = {
  incrementClick: () => void;
  decrementClick: () => void;
  resetCount: () => void;
};

export const useStore = create<State & Actions>((set) => ({
  count: 0,
  words,
  phrases,
  incrementClick: () => set((state) => ({ count: state.count + 1 })),
  decrementClick: () => set((state) => ({ count: state.count - 1 })),
  resetCount: () => set((state) => ({ count: 0 })),
}));
