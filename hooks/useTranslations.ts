import { useContext } from "react";

import { LocaleContext } from "@/providers/LocaleProvider";

export default function useTranslations() {
  return useContext(LocaleContext);
}
