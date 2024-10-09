import { IWord, Language } from "@/types";

type Profile = {
  correct: number;
  wrong: number;
  accuracy: number;
};

type Store = {
  counter: number;
  words: IWord[];
  phrases: IWord[];
  language: Language;
  profile: Profile;
  modal: boolean;
};

type StoreActions = {
  setCounter: (counter: number) => void;
  resetCounter: () => void;
  changeLanguage: (language: Language) => void;
  setProfile: (profile: Profile) => void;
  setModal: (visible: boolean) => void;
  resetProfile: () => void;
};

export type { Store, StoreActions, Profile };
