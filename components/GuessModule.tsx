import Happy from "@assets/svg/happy.svg";
import Sad from "@assets/svg/sad.svg";
import AudioPlayer from "@components/AudioPlayer";
import AppButton from "@components/Button";
import { Text } from "@components/Themed";
import useTransitions from "@hooks/useTransitions";
import { useIsFocused } from "@react-navigation/native";
import { storeAsyncData } from "@store/async-storage";
import { useStore } from "@store/zustand";
import { appStyles } from "@styles";
import { IWord, Profile } from "@types";
import { getShuffled } from "@utils/getShuffled";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Modal, View } from "react-native";
import * as Progress from "react-native-progress";

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
      style={{
        flexDirection: "row",
        gap: 4,
        marginHorizontal: "auto",
        width: "100%",
      }}
    >
      <Text className={answer === correct ? "text-green-500" : "text-red-500"}>
        <>{index + 1}</>
        <>&nbsp;</>
        {answer === correct ? <>&#9745;</> : <>&#9746;</>}
      </Text>
      <Text className="text-left">{origin}</Text>
      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", flex: 1 }}
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
  count = 6,
}: GuessModuleProps) {
  const { i18n } = useTransitions();
  const isFocused = useIsFocused();
  const click = useStore(useCallback((state) => state.count, []));
  const inc = useStore(useCallback((state) => state.incrementClick, []));
  const reset = useStore(useCallback((state) => state.resetCount, []));
  const { profile, setProfile, modal, setModal } = useStore((state) => state);
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
    setAnswer(list.find((x) => x.id === id));
    setModal(true);
  };

  useEffect(() => {
    if (result.length >= count) {
      const correct = result.filter((x) => x.answer === x.correct).length;
      const wrong = result.filter((x) => x.answer !== x.correct).length;
      const accuracy = correct / (correct + wrong);
      const statistics: Profile = {
        correct,
        wrong,
        accuracy,
      };

      const _correct = statistics.correct + profile.correct;
      const _wrong = statistics.wrong + profile.wrong;
      const _accuracy = _correct / (_correct + _wrong);
      const res: Profile = {
        ...statistics,
        correct: _correct,
        wrong: _wrong,
        accuracy: _accuracy,
      };
      setProfile(res);
      storeAsyncData("statistics", res);
    }
  }, [result.length, count]);

  if (result.length >= count) {
    return (
      <>
        <Happy width={96} height={96} style={{ marginHorizontal: "auto" }} />
        <FlatList
          data={result}
          style={{
            flexGrow: 0,
            marginTop: 16,
            width: "100%",
            maxWidth: 400,
          }}
          renderItem={({ item, index }) => <Result item={item} index={index} />}
          contentContainerStyle={{ gap: 8 }}
        />
        <AppButton
          onPress={() => {
            setResult([]);
            reset();
          }}
          title={i18n.t("next")}
          style={{ width: 200, marginHorizontal: "auto", marginTop: 16 }}
        />
      </>
    );
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
            title={item.ru}
            onPress={() => handleAnswer(item.id)}
            style={{}}
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

      <Modal
        animationType="slide"
        transparent
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModal(!modal);
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
                  <Text>{i18n.t("correct")}</Text>
                ) : (
                  <>
                    <Text style={{ color: "rgb(239, 68, 68)" }}>
                      {i18n.t("wrong")}
                    </Text>
                    <Text>
                      {i18n.t("correct")}: {correct.ru}
                    </Text>
                  </>
                )}
              </View>
            </View>

            <AppButton
              title={i18n.t("next")}
              onPress={handleNext}
              style={{ width: 200 }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
