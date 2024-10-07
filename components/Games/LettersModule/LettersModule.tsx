import { AudioPlayer, Button } from "components/ui";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { filterByKey, prepareData } from "./helpers";
import { CollectProps, LettersModuleState } from "./types";

import { collectStyles } from "@/components/Games/CollectModule/collectStyles";
import GameModal from "@/components/Games/GameModal";
import useTranslations from "@/hooks/useTranslations";
import { useStore } from "@/store";
import { appStyles } from "@/styles";
import type { IWord } from "@/types";

type Props = {
  words: IWord[];
};

export function LettersModule({ words }: Props) {
  const { i18n } = useTranslations();
  const { profile, setProfile, setModal } = useStore();

  const [{ correct, answer, chosens, options }, setState] =
    useState<LettersModuleState>(() => prepareData(words));

  const handleNext = () => setState(() => prepareData(words));

  const handleAdd = (x: CollectProps) => {
    setState((prev) => ({
      ...prev,
      chosens: prev.chosens.concat([x]),
      options: filterByKey(options, "id", x.id),
    }));
  };

  const handleRemove = (x: CollectProps) => {
    setState((prev) => ({
      ...prev,
      chosens: filterByKey(chosens, "id", x.id),
      options: prev.options.concat([x]),
    }));
  };

  const handleCheck = () => {
    const _answer = {
      id: 0,
      ru: "ru",
      en: "en",
      audio: "audio",
      ta: chosens.map((x) => x.word).join(""),
    };

    const isCorrect = correct?.ta.toLowerCase() === _answer.ta.toLowerCase();

    const _correct = profile.correct + (isCorrect ? 1 : 0);
    const _wrong = profile.wrong + (isCorrect ? 0 : 1);

    const res = {
      ...profile,
      correct: _correct,
      wrong: _wrong,
      accuracy: _correct / (_correct + _wrong),
    };

    setState((prev) => ({ ...prev, answer: _answer }));
    setModal(true);
    setProfile(res);
  };

  if (!correct) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <AudioPlayer uri={correct.audio} />
      <View style={collectStyles.buttons}>
        {chosens.map((x) => (
          <Button
            key={x.id}
            onPress={() => handleRemove(x)}
            title={x.word}
            style={collectStyles.button}
          />
        ))}
      </View>
      <View style={[appStyles.divider]} className="bg-[#eee]" />
      <View style={collectStyles.buttons}>
        {options.map((x) => (
          <Button
            key={x.id}
            onPress={() => handleAdd(x)}
            title={x.word}
            style={collectStyles.button}
          />
        ))}
      </View>
      <Button
        disabled={chosens.length < correct.ta.length}
        className="mt-4"
        onPress={handleCheck}
        title={i18n.t("check")}
      />
      {answer && (
        <GameModal
          isCorrect={answer.ta.toLowerCase() === correct.ta.toLowerCase()}
          correct={`${correct.ta} (${correct.ru})`}
          handleNext={handleNext}
        />
      )}
    </>
  );
}
