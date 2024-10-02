import { createContext } from "react";

import { localeContextDefaultValues } from "./LocaleProvider.constants";
import { LocaleContextType } from "./LocaleProvider.types";

export const LocaleContext = createContext<LocaleContextType>(
  localeContextDefaultValues,
);
