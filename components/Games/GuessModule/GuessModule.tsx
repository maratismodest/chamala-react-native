import { useIsFocused } from "@react-navigation/native";
import { AudioPlayer, Button as AppButton } from "components/ui";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import * as Progress from "react-native-progress";

import { AnswerProps } from "./GuessModule.types";
import { Result } from "./components";

import GameModal from "@/components/Games/GameModal";
import { Text } from "@/components/Themed";
import useTranslations from "@/hooks/useTranslations";
import { useStore } from "@/store";
import { appStyles } from "@/styles";
import type { IWord, Language } from "@/types";
import getRandomInt from "@/utils/getRandomInt";
import getShuffled from "@/utils/getShuffled";

type Props = {
  collection: IWord[];
  count?: number;
};

export function GuessModule({ collection, count = 6 }: Props) {
  const { i18n } = useTranslations();
  const isFocused = useIsFocused();
  const {
    count: click,
    incrementClick: inc,
    resetCount: reset,
    profile,
    setProfile,
    setModal,
  } = useStore();

  const [list, setList] = useState<IWord[]>(() =>
    getShuffled(collection).slice(0, 4),
  );

  const correct = useMemo(() => list[getRandomInt(0, list.length - 1)], [list]);
  const [answer, setAnswer] = useState<IWord | undefined>(undefined);
  const [result, setResult] = useState<AnswerProps[]>([]);

  useEffect(() => {
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
            isCorrect={answer.id === correct.id}
            answer={answer}
            correct={correct.ru}
            handleNext={handleNext}
          />
        )}
      </>
    </>
  );
}
