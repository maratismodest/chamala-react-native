import { useMemo } from "react";

import useTranslations from "@/hooks/useTranslations";
import { TabProps } from "@/pages";

export function useTabsList() {
  const { i18n } = useTranslations();
  return useMemo(
    (): TabProps[] => [
      {
        name: "pick",
        title: i18n.t("pickGame"),
        href: null,
      },
      {
        name: "word",
        title: i18n.t("word"),
        href: null,
      },
      {
        name: "phrase",
        title: i18n.t("word"),
        href: null,
      },
      {
        name: "collect",
        title: i18n.t("collect"),
        href: null,
      },
      {
        name: "profile",
        title: i18n.t("profile"),
      },
      {
        name: "letters",
        title: i18n.t("letters"),
        href: null,
      },
    ],
    [],
  );
}
