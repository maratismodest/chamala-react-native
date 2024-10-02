import React from "react";
import { StyleSheet, View } from "react-native";

import { AnswerProps } from "../../types/GuessModule.types";

import { Text } from "@/components/Themed";

type Props = {
  item: AnswerProps;
  index: number;
};

export default function ResultItem({ item, index }: Props) {
  const { answer, correct, origin } = item;
  return (
    <View style={styles.container}>
      <Text className={answer === correct ? "text-green-500" : "text-red-500"}>
        <>{index + 1}&nbsp;</>
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
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    marginHorizontal: "auto",
    width: "100%",
  },
});
