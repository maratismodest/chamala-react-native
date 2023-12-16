import Happy from "@assets/svg/happy.svg";
import Sad from "@assets/svg/sad.svg";
import AudioButton from "@components/AudioButton";
import AppButton from "@components/Button";
import { appStyles } from "@styles";
import { IWord } from "@types";
import { getShuffled } from "@utils/getShuffled";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Modal, Text, View } from "react-native";
import * as Progress from "react-native-progress";

import { useStore } from "../store";
import { getAsyncData, storeAsyncData } from "../store/async-storage";

interface GuessModuleProps {
  collection: IWord[];
  option: "words" | "phrases";
  count?: number;
}

interface AnswerProps {
  id: number;
  origin: string;
  correct: string | number;
  answer: string | number | undefined;
}

interface Result {
  item: AnswerProps;
  index: number;
}

const Result = ({ item, index }: Result) => {
  const { answer, correct, origin } = item;
  return (
    <View className="flex-row gap-2 mx-auto">
      <Text className={answer === correct ? "text-green-500" : "text-red-500"}>
        <>{index + 1}</>
        <>&nbsp;</>
        {answer === correct ? <>&#9745;</> : <>&#9746;</>}
      </Text>
      <Text className="text-left">{origin}</Text>
      <View className="flex-row flex-1 justify-end">
        <Text
          className="text-red-500"
          style={{ textDecorationLine: "line-through" }}
        >
          {answer !== correct && answer}
        </Text>
        <Text>&nbsp;</Text>
        <Text className="text-green-500">{correct}</Text>
      </View>
    </View>
  );
};

export default function GuessModule({
  collection,
  option,
  count = 2,
}: GuessModuleProps) {
  const [visible, setVisible] = useState(false);
  const click = useStore(useCallback((state) => state.count, []));
  const inc = useStore(useCallback((state) => state.incrementClick, []));
  const reset = useStore(useCallback((state) => state.resetCount, []));
  const [list, setList] = useState<IWord[]>(() =>
    getShuffled(collection).slice(0, 4),
  );
  const correct = useMemo(() => getShuffled(list)[0], [list]);
  const [answer, setAnswer] = useState<IWord | undefined>(undefined);
  const [result, setResult] = useState<AnswerProps[]>([]);

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
    setVisible(false);
    setAnswer(undefined);
    setList(
      getShuffled(
        collection.filter((x) => !result.map((x) => x.id).includes(x.id)),
      ).slice(0, 4),
    );
  };

  const handleAnswer = (id: number) => {
    setAnswer(list.find((x) => x.id === id));
    setVisible(true);
  };

  useEffect(() => {
    if (result.length >= count) {
      getAsyncData("statistics").then((previousStat) => {
        const statistics = {
          correct: result.filter((x) => x.answer === x.correct).length,
          wrong: result.filter((x) => x.answer !== x.correct).length,
        };

        if (previousStat) {
          const _x = JSON.parse(previousStat);
          const res = {
            ...statistics,
            correct: statistics.correct + _x.correct,
            wrong: statistics.wrong + _x.wrong,
          };
          storeAsyncData("statistics", res);
        } else {
          storeAsyncData("statistics", statistics);
        }
      });
    }
  }, [result.length, count]);

  if (result.length >= count) {
    return (
      <>
        <Happy width={96} height={96} className="mx-auto" />
        <FlatList
          data={result}
          style={{
            flexGrow: 0,
            marginTop: 16,
            width: "100%",
          }}
          renderItem={({ item, index }) => <Result item={item} index={index} />}
          contentContainerStyle={{ gap: 8 }}
        />
        <AppButton
          onPress={() => {
            setResult([]);
            reset();
          }}
          title="Снова"
          style={{ width: 200, marginHorizontal: "auto", marginTop: 16 }}
        />
      </>
    );
  }

  return (
    <>
      <AudioButton uri={correct.audio} />
      <Text
        style={{
          fontSize: 24,
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {correct.ta}
      </Text>
      <FlatList
        style={{
          flexGrow: 0,
          marginTop: 16,
        }}
        data={list}
        renderItem={({ item }) => (
          <AppButton
            key={item.id}
            title={item.ru}
            onPress={() => handleAnswer(item.id)}
            style={{ width: 240 }}
          />
        )}
        contentContainerStyle={{ gap: 16 }}
      />
      <Text style={{ textAlign: "center" }}>
        {click + 1} / {count}
      </Text>
      <Progress.Bar
        progress={click / count}
        borderWidth={2}
        width={null}
        color="green"
        className="w-full"
      />

      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible(!visible);
        }}
      >
        <View style={appStyles.centeredView}>
          <View style={appStyles.modalView}>
            <View className="flex-row items-center">
              {correct.id === answer?.id ? (
                <Happy width={90} height={90} />
              ) : (
                <Sad width={90} height={90} />
              )}
              <View>
                {correct.id === answer?.id ? (
                  <Text>Верно</Text>
                ) : (
                  <>
                    <Text style={{ color: "rgb(239, 68, 68)" }}>Неверно</Text>
                    <Text>Верно: {correct.ru}</Text>
                  </>
                )}
              </View>
            </View>

            <AppButton
              title="Дальше"
              onPress={handleNext}
              style={{ width: 200 }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
