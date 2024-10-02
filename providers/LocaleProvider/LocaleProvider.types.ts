import { I18n } from "i18n-js";
import { Dispatch, SetStateAction } from "react";

type LocaleContextType = {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
  i18n: I18n;
};

export type { LocaleContextType };
