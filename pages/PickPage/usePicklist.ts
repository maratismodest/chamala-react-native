import { useMemo } from "react";

import { PickButtonProps } from "./types";

import useTranslations from "@/hooks/useTranslations";

export function usePicklist() {
  const { i18n } = useTranslations();
  return useMemo(
    (): PickButtonProps[] => [
      {
        id: 1,
        title: i18n.t("word"),
        href: "/word",
      },
      {
        id: 2,
        title: i18n.t("phrase"),
        href: "/phrase",
      },
      {
        id: 3,
        title: i18n.t("collect"),
        href: "/collect",
      },
      {
        id: 4,
        title: i18n.t("letters"),
        href: "/letters",
      },
      {
        id: 5,
        title: "Карточка",
        href: "/card",
      },
    ],
    [i18n],
  );
}
