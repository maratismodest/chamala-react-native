import AudioPlayer from "@components/AudioPlayer";
import AppButton from "@components/Button";
import GameModal from "@components/Games/GameModal";
import Result from "@components/Games/GuessModule/Result";
import { Text } from "@components/Themed";
import useTransitions from "@hooks/useTransitions";
import { useIsFocused } from "@react-navigation/native";
import { useStore } from "@store/zustand";
import { appStyles } from "@styles";
import { IWord, Language } from "@types";
import { getShuffled } from "@utils/getShuffled";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import * as Progress from "react-native-progress";

import { AnswerProps } from "./utils";

interface GuessModuleProps {
  collection: IWord[];
  count?: number;
}

export default function GuessModule({
  collection,
  count = 6,
}: GuessModuleProps) {
  const { i18n } = useTransitions();
  const isFocused = useIsFocused();
  const click = useStore(useCallback((state) => state.count, []));
  const inc = useStore(useCallback((state) => state.incrementClick, []));
  const reset = useStore(useCallback((state) => state.resetCount, []));
  const { profile, setProfile, setModal } = useStore((state) => state);
  const [list, setList] = useState<IWord[]>(() =>
    getShuffled(collection).slice(0, 4),
  );
  const correct = useMemo(() => getShuffled(list)[0], [list]);
  const [answer, setAnswer] = useState<IWord | undefined>(undefined);
  const [result, setResult] = useState<AnswerProps[]>([]);

  useEffect(() => {
    console.log("called");

    // Call only when screen open or when back on screen
    if (isFocused) {
      reset();
      setResult([]);
    }

    return () => setModal(false);
  }, [isFocused]);

  const handleNext = () => {
    setResult((prevState) =>
      prevState.concat({
        id: correct.id,
        origin: correct?.ta,
        correct: correct?.ru,
        answer: answer?.ru,
      }),
    );
    inc();
    setModal(false);
    setAnswer(undefined);
    setList(
      getShuffled(
        collection.filter((x) => !result.map((x) => x.id).includes(x.id)),
      ).slice(0, 4),
    );
  };

  const handleAnswer = (id: number) => {
    const answer = list.find((x) => x.id === id);
    const isCorrect = answer === correct;
    const _correct = profile.correct + Number(isCorrect);
    const _wrong = profile.wrong + Number(!isCorrect);
    const _accuracy = _correct / (_correct + _wrong);
    setProfile({ correct: _correct, wrong: _wrong, accuracy: _accuracy });
    setAnswer(answer);
    setModal(true);
  };

  if (result.length >= count) {
    return <Result result={result} setResult={setResult} />;
  }

  return (
    <>
      <AudioPlayer uri={correct.audio} />
      <Text style={[appStyles.h1, { textTransform: "capitalize" }]}>
        {correct.ta}
      </Text>
      <FlatList
        style={{
          flexGrow: 0,
          marginTop: 16,
          maxWidth: 300,
          width: "100%",
        }}
        data={list}
        renderItem={({ item }) => (
          <AppButton
            key={item.id}
            title={item[i18n.locale as Language]}
            onPress={() => handleAnswer(item.id)}
          />
        )}
        contentContainerStyle={{ gap: 16 }}
      />
      <Text style={appStyles.text}>
        {click + 1} / {count}
      </Text>
      <Progress.Bar
        progress={click / count}
        borderWidth={2}
        width={null}
        color="green"
        style={{ maxWidth: 300, marginHorizontal: "auto", width: "100%" }}
      />
      <>
        {answer && (
          <GameModal
            answer={answer}
            correct={correct}
            handleNext={handleNext}
          />
        )}
      </>
    </>
  );
}
