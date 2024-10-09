import { Button } from "components/ui";
import React from "react";
import { FlatList } from "react-native";

import ResultItem from "./ResultItem";

import Happy from "@/assets/svg/happy.svg";
import { useGuessStore } from "@/components/Games/GuessModule/GuessModule.store";
import useTranslations from "@/hooks/useTranslations";

type Props = {
  onClick: () => void;
};

export const Result = ({ onClick }: Props) => {
  const { i18n } = useTranslations();
  const { result } = useGuessStore();
  return (
    <>
      <Happy width={96} height={96} className="mx-auto" />
      <FlatList
        data={result}
        className="grow-0 mt-4 w-full max-w-[400px]"
        renderItem={({ item, index }) => (
          <ResultItem item={item} index={index} />
        )}
        contentContainerStyle={{ gap: 8 }}
      />
      <Button
        onPress={onClick}
        title={i18n.t("next")}
        className="w-[200[px] mx-auto mt-4"
      />
    </>
  );
};
