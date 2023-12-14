import Happy from "@assets/svg/happy.svg";
import Sad from "@assets/svg/sad.svg";
import { appStyles } from "@styles";
import { IWord } from "@types";
import { getShuffled } from "@utils/getShuffled";
import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Pressable,
  SafeAreaView,
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

export default function GuessModule({
  collection,
  option,
  count = 6,
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
    // handleNext();
    setVisible(true);
  };

  // const audioUrl =
  //   process.env.NEXT_PUBLIC_FILE_SERVER +
  //   '/audio/' +
  //   option +
  //   '/' +
  //   correct.ta.toLowerCase() +
  //   '.mp3';

  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {correct.ta}
        </Text>
        <View style={{ width: 280, gap: 8, marginTop: 16 }}>
          {list.map((x) => (
            <Pressable key={x.id} onPress={() => handleAnswer(x.id)}>
              <Text style={appStyles.button}>{x.ru}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={{ textAlign: "center" }}>
          {click}
          {/*{result.length + 1} / {count}*/}
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

            <Pressable onPress={handleNext}>
              <Text style={{ ...appStyles.button }}>Дальше</Text>
            </Pressable>
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
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  // buttonClose: {
  //   backgroundColor: '#2196F3',
  // },
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },
});

// const styles = StyleSheet.create({
//   fill: {
//     flex: 1
//   },
//   upper: {
//     height: 100,
//     backgroundColor: '#DDD',
//     opacity: .5
//   },
//   lower: {
//     flex: 1,
//     backgroundColor: 'white'
//   },
//   grey: {
//     backgroundColor: '#DDD'
//   }
// })
