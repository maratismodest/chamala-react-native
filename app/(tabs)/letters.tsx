import React from "react";

import { View } from "@/components";
import LettersModule from "@/components/Games/LettersModule";
import { useStore } from "@/store";
import { appStyles } from "@/styles";

export default function LettersPage() {
  const words = useStore((state) =>
    state.words.filter((word) => word.ta.length < 8),
  );

  return (
    <View style={appStyles.container}>
      <LettersModule words={words} />
    </View>
  );
}
