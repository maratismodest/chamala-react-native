import GuessModule from "@components/GuessModule";
import { View } from "@components/Themed";
import { appStyles } from "@styles";

import { useStore } from "../../store";

export default function TabTwoThree() {
  const _words = useStore((state) => state.words);
  return (
    <View style={appStyles.container}>
      <GuessModule collection={_words} option="words" />
    </View>
  );
}
