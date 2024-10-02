import { Button } from "components/ui";
import React, { useCallback } from "react";
import { FlatList } from "react-native";

import ResultItem from "./ResultItem";

import Happy from "@/assets/svg/happy.svg";
import { AnswerProps } from "@/components/Games/GuessModule/GuessModule.types";
import useTranslations from "@/hooks/useTranslations";
import { useStore } from "@/store";

type Props = {
  result: AnswerProps[];
  setResult: (result: AnswerProps[]) => void;
};

export const Result = ({ result, setResult }: Props) => {
  const { i18n } = useTranslations();
  const reset = useStore(useCallback((state) => state.resetCount, []));

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
        onPress={() => {
          setResult([]);
          reset();
        }}
        title={i18n.t("next")}
        className="w-[200[px] mx-auto mt-4"
      />
    </>
  );
};
