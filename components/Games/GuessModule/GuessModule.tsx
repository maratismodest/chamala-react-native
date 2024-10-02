import { useIsFocused } from "@react-navigation/native";
import { AudioPlayer, Button as AppButton } from "components/ui";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import * as Progress from "react-native-progress";

import { Result } from "./components";
import { AnswerProps } from "./types";

import GameModal from "@/components/Games/GameModal";
import { Text } from "@/components/Themed";
import useTranslations from "@/hooks/useTranslations";
import { useStore } from "@/store";
import { appStyles } from "@/styles";
import type { IWord, Language } from "@/types";
import getShuffled from "@/utils/getShuffled";

type Props = {
  collection: IWord[];
  count?: number;
};

export function GuessModule({ collection, count = 6 }: Props) {
  const { i18n } = useTranslations();
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
        className="grow-0 mt-4 w-full max-w-[300px]"
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
        className="w-full max-w-[300px] mx-auto"
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
