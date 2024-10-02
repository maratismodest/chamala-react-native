import { I18n } from "i18n-js";

import { LocaleContextType } from "./LocaleProvider.types";

import { LOCALE } from "@/constants";
import translations from "@/translations";

export const localeContextDefaultValues: LocaleContextType = {
  locale: LOCALE,
  setLocale: () => {},
  i18n: new I18n(translations),
};
