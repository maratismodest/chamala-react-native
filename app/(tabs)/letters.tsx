import React, { useCallback } from "react";

import LettersModule from "@/components/Games/LettersModule";
import { View } from "@/components/Themed";
import { useStore } from "@/store";
import { appStyles } from "@/styles";

export default function LettersPage() {
  const words = useStore(useCallback((state) => state.words, []));

  return (
    <View style={appStyles.container}>
      <LettersModule words={words.filter((word) => word.ta.length < 8)} />
    </View>
  );
}
