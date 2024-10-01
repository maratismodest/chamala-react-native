import { phrases } from "@/data/phrases";
import { words } from "@/data/words";
import { initialProfile } from "@/pages-lib/profile/utils";
import { Store } from "@/store/store.types";

export const initialStoreState: Store = {
  count: 0,
  words,
  phrases,
  language: "ru",
  profile: initialProfile,
  modal: false,
};
