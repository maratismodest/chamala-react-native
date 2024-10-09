import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo } from "react";
import { ActivityIndicator } from "react-native";
import * as Progress from "react-native-progress";

import { useGuessStore } from "./GuessModule.store";
import { GuessCard, Result } from "./components";

import GameModal from "@/components/Games/GameModal";
import { Text } from "@/components/Themed";
import { useStore } from "@/store";
import { appStyles } from "@/styles";
import type { IWord } from "@/types";
import { getRandomItem, getRandomItems } from "@/utils";

type Props = {
  collection: IWord[];
  count: number;
};

export function GuessModule({ collection, count }: Props) {
  const isFocused = useIsFocused();
  const { profile, setProfile, setModal } = useStore();
  const {
    counter,
    inc,
    reset,
    options,
    setOptions,
    result,
    setResult,
    answer,
    setAnswer,
  } = useGuessStore();

  const correct = useMemo(
    () => getRandomItem(options),
    [options, count === counter],
  );

  useEffect(() => {
    setOptions(getRandomItems(collection, 4));
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset();
      };
    }, []),
  );

  const handleNext = () => {
    if (answer) {
      const resultItem = {
        id: correct.id,
        origin: correct.ta,
        correct: correct.ru,
        answer: answer.ru,
      };
      setResult([...result, resultItem]);
      inc();
      setModal(false);
      setAnswer(undefined);
      setOptions(getRandomItems(collection, 4));
    }
  };

  const handleAnswer = (id: number) => {
    const answer = options.find((x) => x.id === id);
    const isCorrect = answer === correct;
    const _correct = profile.correct + Number(isCorrect);
    const _wrong = profile.wrong + Number(!isCorrect);
    const _accuracy = _correct / (_correct + _wrong);
    setProfile({ correct: _correct, wrong: _wrong, accuracy: _accuracy });
    setAnswer(answer);
    setModal(true);
  };

  if (result.length >= count) {
    return (
      <Result
        onClick={() => {
          reset();
          setOptions(getRandomItems(collection, 4));
        }}
      />
    );
  }

  if (!correct) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <GuessCard correct={correct} options={options} onClick={handleAnswer} />
      <Text style={appStyles.text}>
        {counter + 1}&nbsp;/&nbsp;{count}
      </Text>
      <Progress.Bar
        progress={counter / count}
        borderWidth={2}
        width={null}
        color="green"
        className="w-full max-w-xs mx-auto"
      />
      <>
        {answer && (
          <GameModal
            isCorrect={answer.id === correct.id}
            correct={correct.ru}
            handleNext={handleNext}
          />
        )}
      </>
    </>
  );
}
