import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { initialProfile, initialStoreState } from "./store.constants";
import { Store, StoreActions } from "./store.types";

const createActions = (
  set: (fn: (state: Store) => Partial<Store>) => void,
): StoreActions => ({
  setCounter: (counter) => set(() => ({ counter })),
  resetCounter: () => set(() => ({ counter: 0 })),
  changeLanguage: (language) => set(() => ({ language })),
  setProfile: (profile) => set(() => ({ profile })),
  setModal: (visible) => set(() => ({ modal: visible })),
  resetProfile: () => set(() => ({ profile: initialProfile })),
});

export const useStore = create(
  persist<Store & StoreActions>(
    (set) => ({
      ...initialStoreState,
      ...createActions(set),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1.16,
    },
  ),
);
