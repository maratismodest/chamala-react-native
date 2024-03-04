import React from "react";
import { StyleSheet } from "react-native";

import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";

// const data = [
//   "16.02.2024: Исправлено поведение темной темы",
//   "18.02.2024: Ограничение ширины окна в играх Собери",
// ];

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Приложение для изучения татарского в игровой форме
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)"
        >
          <MonoText>05.03.2024</MonoText>
        </View>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Приложение находится в режиме разработки
        </Text>
        {/*<FlatList*/}
        {/*  data={data}*/}
        {/*  renderItem={({ item, index }) => <Text key={index}>{item}</Text>}*/}
        {/*/>*/}
      </View>

      <View style={styles.helpContainer}>
        <ExternalLink style={styles.helpLink} href="https://t.me/maratfaizer">
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Связаться с разработчиком
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
