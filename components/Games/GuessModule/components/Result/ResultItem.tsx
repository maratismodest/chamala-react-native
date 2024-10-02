import React from "react";
import { View } from "react-native";

import { AnswerProps } from "./../../types";

import { Text } from "@/components/Themed";

type Props = {
  item: AnswerProps;
  index: number;
};

export default function ResultItem({ item, index }: Props) {
  const { answer, correct, origin } = item;
  const isCorrect = answer === correct;
  const isCorrectStyle = isCorrect ? "text-green-500" : "text-red-500";

  return (
    <View className="flex-row gap-4 w-full">
      <View className="flex-row gap-1 items-center">
        <Text className={isCorrectStyle}>{index + 1}</Text>
        <Text className={isCorrectStyle}>
          {answer === correct ? <>&#9745;</> : <>&#9746;</>}
        </Text>
        <Text>{origin}</Text>
      </View>
      <View className="flex flex-row justify-end flex-1 gap-1">
        {!isCorrect && (
          <Text className="text-red-500 line-through">{answer}</Text>
        )}
        <Text className="text-green-500">{correct}</Text>
      </View>
    </View>
  );
}
