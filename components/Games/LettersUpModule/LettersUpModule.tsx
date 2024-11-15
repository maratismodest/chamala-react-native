import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { CollectProps } from "./types";

import { Text } from "@/components";
import { collectStyles } from "@/components/Games/CollectModule/collectStyles";
import GameModal from "@/components/Games/GameModal";
import { AudioPlayer, Button } from "@/components/ui";
import useTranslations from "@/hooks/useTranslations";
import { useStore } from "@/store";
import { appStyles } from "@/styles";
import type { IWord } from "@/types";
import { getRandomItem } from "@/utils";

type Props = {
  words: IWord[];
};

export function LettersUpModule({ words }: Props) {
  const { i18n } = useTranslations();
  const { profile, setProfile, setModal } = useStore();

  const [correct, setCorrect] = useState<IWord | null>(words[0]);
  const [answer, setAnswer] = useState<IWord | null>();

  const [availableOptions, setAvailableOptions] = useState<CollectProps[]>([]);
  const [pickedWords, setPickedWords] = useState<CollectProps[]>([
    { id: 1, word: "м" },
    { id: 2, word: "и" },
    { id: 3, word: "н" },
  ]);

  const getNewPhrase = useCallback(() => {
    const correct = getRandomItem(words);

    setCorrect(correct);
    setAnswer(null);
    setPickedWords([]);

    setModal(false);
  }, [words]);

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
    const current = pickedWords.map((x) => x.word.toLowerCase()).join("");
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

  console.warn("pickedWords", pickedWords);

  return (
    <>
      <AudioPlayer uri={correct.audio} />
      <View style={collectStyles.buttons}>
        {pickedWords.map((item) => (
          <Text key={item.id} className="bg-white w-9 h-9 px-3 text-2xl">
            {item.word}
          </Text>
        ))}
      </View>
      <View style={[appStyles.divider]} className="bg-[#eee]" />
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
