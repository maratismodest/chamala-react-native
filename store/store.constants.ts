import { Profile, Store } from "./store.types";

import { phrases } from "@/constants/phrases";
import { words } from "@/constants/words";

export const initialProfile: Profile = {
  correct: 0,
  wrong: 0,
  accuracy: 0,
};

export const initialStoreState: Store = {
  counter: 0,
  words,
  phrases,
  language: "ru",
  profile: initialProfile,
  modal: false,
};
