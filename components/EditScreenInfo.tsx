import React from "react";

import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

import Colors from "@/constants/Colors";

type Props = {
  path: string;
};

export default function EditScreenInfo({ path }: Props) {
  return (
    <View>
      <View className="items-center mx-12">
        <Text
          className="text-center"
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Приложение для изучения татарского в игровой форме
        </Text>

        <View
          className="my-2 rounded px-1"
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)"
        >
          <MonoText>09.10.2024</MonoText>
        </View>
        <Text
          className="text-center"
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Приложение находится в режиме разработки
        </Text>
      </View>

      <View className="mt-4 mx-5 items-center">
        <ExternalLink className="py-4" href="https://t.me/maratfaizer">
          <Text className="text-center" lightColor={Colors.light.tint}>
            Связаться с разработчиком
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}
