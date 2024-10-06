import { phrases } from "@/constants/phrases";
import { words } from "@/constants/words";
import { Store } from "@/store/store.types";
import { Profile } from "@/types";

export const initialProfile: Profile = {
  correct: 0,
  wrong: 0,
  accuracy: 0,
};

export const initialStoreState: Store = {
  count: 0,
  words,
  phrases,
  language: "ru",
  profile: initialProfile,
  modal: false,
  cards: words.filter((word) => word.image),
};
