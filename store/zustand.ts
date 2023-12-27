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
};

type Actions = {
  incrementClick: () => void;
  decrementClick: () => void;
  resetCount: () => void;
  changeLanguage: (language: Language) => void;
  setProfile: (profile: Profile) => void;
};

export const useStore = create<State & Actions>((set) => ({
  count: 0,
  words,
  phrases,
  language: "ru",
  profile: initialProfile,
  incrementClick: () => set((state) => ({ count: state.count + 1 })),
  decrementClick: () => set((state) => ({ count: state.count - 1 })),
  resetCount: () => set((state) => ({ count: 0 })),
  changeLanguage: (language: Language) => set((state) => ({ language })),
  setProfile: (profile: Profile) => set((state) => ({ profile })),
}));
