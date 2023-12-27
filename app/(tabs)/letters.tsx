import LettersModule from "@components/LettersModule";
import { View } from "@components/Themed";
import { appStyles } from "@styles";
import React from "react";

export default function LettersPage() {
  return (
    <View style={appStyles.container}>
      <LettersModule />
    </View>
  );
}
