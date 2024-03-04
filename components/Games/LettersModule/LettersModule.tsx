import AudioPlayer from "@components/AudioPlayer";
import AppButton from "@components/Button";
import GameModal from "@components/Games/GameModal";
import i18n from "@i18n";
// import { storeAsyncData } from "@store/async-storage";
import { useStore } from "@store/zustand";
import { appStyles } from "@styles";
import { IWord, Profile } from "@types";
import { getShuffled } from "@utils/getShuffled";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { CollectProps, initialState, State } from "./utils";
import { collectStyles } from "../../../styles/collect";

interface Props {
  words: IWord[];
}

export default function LettersModule({ words }: Props) {
  const { profile, setProfile, modal, setModal } = useStore((state) => state);

  const [{ isTrue, correct, chosens, options, answer }, setState] =
    useState<State>(initialState);

  const getNewWord = useCallback(() => {
    setModal(false);
    const correct = getShuffled(words)[0];
    const realOptions = correct.ta.toLowerCase().split("");
    const options = getShuffled(realOptions).map((x, index) => ({
      word: x,
      id: index,
    }));
    setState({ ...initialState, options, correct });
  }, [words]);

  useEffect(() => {
    getNewWord();
  }, [getNewWord]);

  const closeModal = () => {
    getNewWord();
  };

  const handleAdd = (x: CollectProps) => {
    setState((prev) => ({
      ...prev,
      chosens: [...prev.chosens, x],
      options: prev.options.filter((item) => item.id !== x.id),
      answer: {
        id: 0,
        ru: "ru",
        ta: [...prev.chosens, x].map((x) => x.word).join(""),
        en: "en",
        audio: "audio",
      },
    }));
  };

  const handleRemove = (x: CollectProps) => {
    setState((prev) => ({
      ...prev,
      chosens: prev.chosens.filter((item) => item.id !== x.id),
      options: [...prev.options, x],
    }));
  };

  const handleCheck = () => {
    const original = correct?.ta.toLowerCase();
    const current = chosens.map((x) => x.word.toLowerCase()).join("");
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
    setState((prev) => ({ ...prev, isTrue: original === current }));
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
          <AppButton
            key={x.id}
            onPress={() => handleRemove(x)}
            title={x.word}
            style={collectStyles.button}
          />
        ))}
      </View>
      <View style={[appStyles.divider, { backgroundColor: "#eee" }]} />
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
        disabled={chosens.length < correct.ta.length}
        className="mt-4"
        onPress={handleCheck}
        title={i18n.t("check")}
        opacity={modal}
      />
      {answer && (
        <GameModal answer={answer} correct={correct} handleNext={closeModal} />
      )}
    </>
  );
}
