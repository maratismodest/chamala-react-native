import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { collectStyles } from "./collectStyles";

import AudioPlayer from "@/components/AudioPlayer";
import AppButton from "@/components/Button";
import GameModal from "@/components/Games/GameModal";
import i18n from "@/i18n";
import { useStore } from "@/store";
import { appStyles } from "@/styles";
import type { IWord, Profile } from "@/types";
import getRandomInt from "@/utils/getRandomInt";
import getShuffled from "@/utils/getShuffled";

interface CollectProps {
  id: number;
  word: string;
}

export function CollectModule() {
  const { phrases, profile, setProfile, modal, setModal } = useStore(
    (state) => state,
  );
  const [correct, setCorrect] = useState<IWord | undefined>();
  const [answer, setAnswer] = useState<IWord | undefined>();
  const [options, setOptions] = useState<CollectProps[]>([]);
  const [chosens, setChosens] = useState<CollectProps[]>([]);

  const getNewPhrase = useCallback(() => {
    const correct = phrases[getRandomInt(phrases.length)];
    const fake = phrases[getRandomInt(phrases.length)];
    const realOptions = correct.ta.toLowerCase().split(" ");
    const fakeOptions = fake.ta.toLowerCase().split(" ");

    const realFakeOptions = getShuffled([...realOptions, ...fakeOptions]).map(
      (x, index) => ({
        word: x,
        id: index,
      }),
    );

    setOptions(realFakeOptions);
    setChosens([]);
    setCorrect(correct);

    setModal(false);
  }, [phrases]);

  useEffect(() => {
    getNewPhrase();
  }, [getNewPhrase]);

  const closeModal = () => {
    getNewPhrase();
  };

  const handleAdd = (x: CollectProps) => {
    setChosens((prev) => [...prev, x]);
    setOptions((prev) => prev.filter((item) => item.id !== x.id));
  };

  const handleRemove = (x: CollectProps) => {
    setChosens((prev) => prev.filter((item) => item.id !== x.id));
    setOptions((prev) => [...prev, x]);
  };

  const handleCheck = () => {
    const original = correct?.ta.toLowerCase();
    const current = chosens.map((x) => x.word.toLowerCase()).join(" ");
    setAnswer({
      id: 0,
      ru: "ru",
      ta: current,
      en: "en",
      audio: "audio",
    });
    setModal(true);
    const isCorrect = original === current;
    const _correct = profile.correct + (isCorrect ? 1 : 0);
    const _wrong = profile.wrong + (!isCorrect ? 1 : 0);
    const _accuracy = _correct / (_correct + _wrong);
    const res: Profile = {
      ...profile,
      correct: _correct,
      wrong: _wrong,
      accuracy: _accuracy,
    };
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
          <AppButton
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
          <AppButton
            key={x.id}
            onPress={() => handleAdd(x)}
            title={x.word}
            style={collectStyles.button}
          />
        ))}
      </View>
      <AppButton
        disabled={chosens.length === 0}
        className="mt-4"
        onPress={handleCheck}
        title={i18n.t("check")}
        opacity={modal}
      />
      {answer && (
        <GameModal correct={correct} answer={answer} handleNext={closeModal} />
      )}
    </>
  );
}
