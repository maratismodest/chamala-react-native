import { initialProfile } from "@pages-lib/profile/utils";
import { IWord, Language, Profile } from "@types";
import { create } from "zustand";

import { phrases } from "../data/phrases";
import { words } from "../data/words";

type State = {
  count: number;
  words: IWord[];
  phrases: IWord[];
  language: Language;
  profile: Profile;
  modal: boolean;
};

type Actions = {
  incrementClick: () => void;
  decrementClick: () => void;
  resetCount: () => void;
  changeLanguage: (language: Language) => void;
  setProfile: (profile: Profile) => void;
  setModal: (visible: boolean) => void;
};

export const useStore = create<State & Actions>((set) => ({
  count: 0,
  words,
  phrases,
  language: "ru",
  profile: initialProfile,
  modal: false,
  incrementClick: () => set((state) => ({ count: state.count + 1 })),
  decrementClick: () => set((state) => ({ count: state.count - 1 })),
  resetCount: () => set((state) => ({ count: 0 })),
  changeLanguage: (language) => set((state) => ({ language })),
  setProfile: (profile) => set((state) => ({ profile })),
  setModal: (visible) => set((state) => ({ modal: visible })),
}));
