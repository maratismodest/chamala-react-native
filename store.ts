import {create} from "zustand";
import {words} from "./data/words";
import {IWord} from "./types";

type State = {
  click: number;
  words: IWord[]
};

type Actions = {
  incrementClick: () => void;
  decrementClick: () => void;
};

export const useStore = create<State & Actions>((set) => ({
  click: 0,
  words: words,
  incrementClick: () => set((state) => ({click: state.click + 1})),
  decrementClick: () => set((state) => ({click: state.click - 1})),
}));
