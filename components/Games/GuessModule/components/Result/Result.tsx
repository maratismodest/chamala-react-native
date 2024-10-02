import React, { useCallback } from "react";
import { FlatList } from "react-native";

import ResultItem from "./ResultItem";
import { AnswerProps } from "../../types/GuessModule.types";

import Happy from "@/assets/svg/happy.svg";
import AppButton from "@/components/Button";
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
      <Happy width={96} height={96} style={{ marginHorizontal: "auto" }} />
      <FlatList
        data={result}
        style={{
          flexGrow: 0,
          marginTop: 16,
          width: "100%",
          maxWidth: 400,
        }}
        renderItem={({ item, index }) => (
          <ResultItem item={item} index={index} />
        )}
        contentContainerStyle={{ gap: 8 }}
      />
      <AppButton
        onPress={() => {
          setResult([]);
          reset();
        }}
        title={i18n.t("next")}
        style={{ width: 200, marginHorizontal: "auto", marginTop: 16 }}
      />
    </>
  );
};
