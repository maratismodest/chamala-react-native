import AudioPlayer from "@components/AudioPlayer";
import AppButton from "@components/Button";
import GameModal from "@components/Games/GameModal";
import useTransitions from "@hooks/useTransitions";
import { useStore } from "@store/zustand";
import { appStyles } from "@styles";
import { IWord, Profile } from "@types";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";

import {
  CollectProps,
  getNewWord,
  initialState,
  LettersModuleState,
} from "./utils";
import { collectStyles } from "../../../styles/collect";

interface Props {
  words: IWord[];
}

export default function LettersModule({ words }: Props) {
  const { i18n } = useTransitions();
  const { profile, setProfile, modal, setModal } = useStore((state) => state);

  const [state, setState] = useState<LettersModuleState>(() => {
    const { correct, options } = getNewWord(words);
    return {
      ...initialState,
      correct,
      options,
    };
  });
  const { correct, answer, chosens, options } = state;

  const handleNext = () => {
    setModal(false);
    const { correct, options } = getNewWord(words);
    setState({
      ...initialState,
      correct,
      options,
    });
  };

  const handleAdd = (x: CollectProps) => {
    setState((prev) => ({
      ...prev,
      chosens: [...prev.chosens, x],
      options: prev.options.filter((item) => item.id !== x.id),
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
    const current = chosens
      .map((x) => x.word)
      .join("")
      .toLowerCase();
    const _answer = {
      id: 0,
      ru: "ru",
      en: "en",
      audio: "audio",
      ta: current,
    };
    const original = correct?.ta.toLowerCase();
    const isCorrect = original === current;
    const _correct = profile.correct + Number(isCorrect);
    const _wrong = profile.wrong + Number(isCorrect);
    const _accuracy = _correct / (_correct + _wrong);
    const res: Profile = {
      ...profile,
      correct: _correct,
      wrong: _wrong,
      accuracy: _accuracy,
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
        <GameModal answer={answer} correct={correct} handleNext={handleNext} />
      )}
    </>
  );
}
