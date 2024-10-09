import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import { collectStyles } from "./collectStyles";
import { CollectProps } from "./types";

import { View } from "@/components";
import GameModal from "@/components/Games/GameModal";
import { AudioPlayer, Button } from "@/components/ui";
import useTranslations from "@/hooks/useTranslations";
import { useStore } from "@/store";
import { appStyles } from "@/styles";
import type { IWord } from "@/types";
import { getRandomItem, getShuffled } from "@/utils";

type Props = {
  phrases: IWord[];
};

export function CollectModule({ phrases }: Props) {
  const { i18n } = useTranslations();
  const { profile, setProfile, setModal } = useStore();

  const [correct, setCorrect] = useState<IWord | null>();
  const [answer, setAnswer] = useState<IWord | null>();

  const [availableOptions, setAvailableOptions] = useState<CollectProps[]>([]);
  const [pickedWords, setPickedWords] = useState<CollectProps[]>([]);

  const getNewPhrase = useCallback(() => {
    const correct = getRandomItem(phrases);
    const fake = getRandomItem(phrases);

    const allWords = [correct.ta, fake.ta]
      .map((word) => word.toLowerCase().split(" "))
      .flat();

    const realFakeOptions = getShuffled(allWords).map((word, index) => ({
      word,
      id: index,
    }));

    setCorrect(correct);
    setAnswer(null);
    setAvailableOptions(realFakeOptions);
    setPickedWords([]);

    setModal(false);
  }, [phrases]);

  useEffect(() => {
    getNewPhrase();
  }, []);

  const handleAdd = (item: CollectProps) => {
    setPickedWords((prev) => [...prev, item]);
    setAvailableOptions((prev) => prev.filter(({ id }) => id !== item.id));
  };

  const handleRemove = (item: CollectProps) => {
    setPickedWords((prev) => prev.filter(({ id }) => id !== item.id));
    setAvailableOptions((prev) => [...prev, item]);
  };

  const handleCheck = () => {
    const original = correct?.ta.toLowerCase();
    const current = pickedWords.map((x) => x.word.toLowerCase()).join(" ");
    setAnswer({
      id: 0,
      ru: "ru",
      ta: current,
      en: "en",
      audio: "audio",
    });
    const isCorrect = original === current;
    const _correct = profile.correct + (isCorrect ? 1 : 0);
    const _wrong = profile.wrong + (!isCorrect ? 1 : 0);
    const _accuracy = _correct / (_correct + _wrong);

    setProfile({
      correct: _correct,
      wrong: _wrong,
      accuracy: _accuracy,
    });
    setModal(true);
  };

  if (!correct) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <AudioPlayer uri={correct.audio} />
      <View style={collectStyles.buttons}>
        {pickedWords.map((item) => (
          <Button
            key={item.id}
            onPress={() => handleRemove(item)}
            title={item.word}
            style={collectStyles.button}
          />
        ))}
      </View>
      <View style={[appStyles.divider]} className="bg-[#eee]" />
      <View style={collectStyles.buttons}>
        {availableOptions.map((item) => (
          <Button
            key={item.id}
            onPress={() => handleAdd(item)}
            title={item.word}
            style={collectStyles.button}
          />
        ))}
      </View>
      <Button
        disabled={pickedWords.length === 0}
        className="mt-4"
        onPress={handleCheck}
        title={i18n.t("check")}
      />
      {answer && (
        <GameModal
          isCorrect={answer.ta.toLowerCase() === correct.ta.toLowerCase()}
          correct={`${correct.ta} (${correct.ru})`}
          handleNext={getNewPhrase}
        />
      )}
    </>
  );
}
