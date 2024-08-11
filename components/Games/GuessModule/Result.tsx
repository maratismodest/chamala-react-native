import React, { useCallback } from "react";
import { FlatList } from "react-native";

import Happy from "@/assets/svg/happy.svg";
import AppButton from "@/components/Button";
import ResultItem from "@/components/Games/GuessModule/ResultItem";
import { AnswerProps } from "@/components/Games/GuessModule/utils";
import useTransitions from "@/hooks/useTransitions";
import { useStore } from "@/store/zustand";

type Props = {
  result: AnswerProps[];
  setResult: (result: AnswerProps[]) => void;
};

const Result = ({ result, setResult }: Props) => {
  const { i18n } = useTransitions();
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

export default Result;
