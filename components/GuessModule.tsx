import Happy from "@assets/svg/happy.svg";
import Sad from "@assets/svg/sad.svg";
import AudioButton from "@components/AudioButton";
import AppButton from "@components/Button";
import { IWord } from "@types";
import { getShuffled } from "@utils/getShuffled";
import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Progress from "react-native-progress";

import { useStore } from "../store";

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
    <View
      className="flex flex-row gap-2 items-center"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <Text className={answer === correct ? "text-green-500" : "text-red-500"}>
        {answer === correct ? (
          <>{index + 1} &#9745;</>
        ) : (
          <>{index + 1} &#9746;</>
        )}
      </Text>
      <Text className="text-left">{origin}</Text>
      <View
        className="text-left"
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "auto",
        }}
      >
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
  if (result.length >= count) {
    return (
      <ScrollView className="w-full h-full flex flex-1">
        <Happy width={96} height={96} className="mx-auto" />
        <FlatList
          data={result}
          renderItem={({ item, index }) => <Result item={item} index={index} />}
          contentContainerStyle={{ gap: 8 }}
        />
        <AppButton
          onPress={() => {
            setResult([]);
            reset();
          }}
          title="Go!"
          style={{ width: 200, marginHorizontal: "auto", marginTop: 16 }}
        />
      </ScrollView>
    );
  }

  return (
    <SafeAreaView>
      <View>
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
          data={list}
          renderItem={({ item }) => (
            <AppButton
              key={item.id}
              title={item.ru}
              onPress={() => handleAnswer(item.id)}
            />
          )}
          contentContainerStyle={{ gap: 16 }}
          style={{ width: 280, marginTop: 16 }}
        />
        <Text style={{ textAlign: "center" }}>
          {click + 1} / {count}
        </Text>
      </View>
      <Progress.Bar progress={click / 6} borderWidth={2} width={null} />
      <View style={{ marginTop: 16 }}>
        <Button title="Сбросить счет" onPress={reset} />
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible(!visible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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

            <AppButton title="Дальше" onPress={handleNext} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: 'center',
    // marginTop: 22,
    marginBottom: 28,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
