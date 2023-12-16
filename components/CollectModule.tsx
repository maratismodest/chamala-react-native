import Happy from "@assets/svg/happy.svg";
import Sad from "@assets/svg/sad.svg";
import AudioButton from "@components/AudioButton";
import AppButton from "@components/Button";
import { appStyles } from "@styles";
import { IWord } from "@types";
import { getShuffled } from "@utils/getShuffled";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, Text, View } from "react-native";

import { useStore } from "../store";

interface CollectProps {
  id: number;
  word: string;
}

export default function CollectModule() {
  const phrases = useStore((state) => state.phrases);
  const [isTrue, setIsTrue] = useState(false);
  const [correct, setCorrect] = useState<IWord | undefined>(undefined);
  const [options, setOptions] = useState<CollectProps[]>([]);
  const [chosens, setChosens] = useState<CollectProps[]>([]);
  const [visible, setVisible] = useState(false);

  const getNewPhrase = useCallback(() => {
    const correct = getShuffled(phrases)[0];
    const fake = getShuffled(phrases)[1];
    setCorrect(correct);
    const realOptions = correct.ta.toLowerCase().split(" ");
    const fakeOptions = fake.ta.toLowerCase().split(" ");

    setOptions(
      getShuffled([...realOptions, ...fakeOptions]).map((x, index) => ({
        word: x,
        id: index,
      })),
    );
    setVisible(false);
    setIsTrue(false);
    setChosens([]);
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
    setIsTrue(original === current);
    setVisible(true);
  };

  if (!correct) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <Text className="text-3xl">{correct.ta}</Text>
      <AudioButton uri={correct.audio} />
      <Text style={{ minHeight: 100 }}>
        {chosens.map((x) => (
          <AppButton
            key={x.id}
            onPress={() => handleRemove(x)}
            title={x.word}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              margin: 4,
            }}
          />
        ))}
      </Text>
      <View style={[appStyles.divider, { backgroundColor: "#eee" }]} />
      <Text style={{ minHeight: 100 }}>
        {options.map((x) => (
          <AppButton
            key={x.id}
            onPress={() => handleAdd(x)}
            title={x.word}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              margin: 4,
            }}
          />
        ))}
      </Text>
      <AppButton
        disabled={chosens.length === 0}
        className="mt-4"
        onPress={handleCheck}
        title="Дальше"
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
              {isTrue ? (
                <Happy width={90} height={90} />
              ) : (
                <Sad width={90} height={90} />
              )}
              <View>
                {isTrue ? (
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
              onPress={closeModal}
              style={{ width: 200 }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
