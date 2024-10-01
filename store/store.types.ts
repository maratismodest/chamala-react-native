import { IWord, Language, Profile } from "@/types";

type Store = {
  count: number;
  words: IWord[];
  phrases: IWord[];
  language: Language;
  profile: Profile;
  modal: boolean;
};

type StoreActions = {
  incrementClick: () => void;
  decrementClick: () => void;
  resetCount: () => void;
  changeLanguage: (language: Language) => void;
  setProfile: (profile: Profile) => void;
  setModal: (visible: boolean) => void;
};

export type { Store, StoreActions };
