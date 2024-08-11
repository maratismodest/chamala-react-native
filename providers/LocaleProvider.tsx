import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { LOCALE } from "@/constants";
import { useStore } from "@/store/zustand";
import translations from "@/translations";

type LocaleContextType = {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
  i18n: I18n;
};

const localeContextDefaultValues: LocaleContextType = {
  locale: LOCALE,
  setLocale: () => {},
  i18n: new I18n(translations),
};

export const LocaleContext = createContext<LocaleContextType>(
  localeContextDefaultValues,
);

type AppProviderProps = {
  children: ReactNode;
};

export default function LocaleProvider({ children }: AppProviderProps) {
  const { language } = useStore();
  const [locale, setLocale] = useState(Localization.locale);
  const i18n = new I18n(translations);
  i18n.locale = locale;
  i18n.enableFallback = true;
  i18n.defaultLocale = LOCALE;

  useEffect(() => {
    setLocale(language);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, i18n }}>
      {children}
    </LocaleContext.Provider>
  );
}
