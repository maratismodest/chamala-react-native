import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { phrases } from "@/data/phrases";
import { words } from "@/data/words";
import { initialProfile } from "@/pages-lib/profile/utils";
import { IWord, Language, Profile } from "@/types";

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

export const useStore = create(
  persist<State & Actions>(
    (set) => ({
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
    }),
    {
      name: "app-storage", // unique name
      getStorage: () => AsyncStorage, // Add this here!
      version: 1.3,
    },
  ),
);
