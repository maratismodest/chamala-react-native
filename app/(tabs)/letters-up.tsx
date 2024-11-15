import React from "react";

import { View } from "@/components";
import { LettersUpModule } from "@/components/Games/LettersUpModule";
import { useStore } from "@/store";
import { appStyles } from "@/styles";

export default function LettersPage() {
  const words = useStore((state) => state.words);

  return (
    <View style={appStyles.container}>
      <LettersUpModule words={words} />
    </View>
  );
}
