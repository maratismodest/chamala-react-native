import GuessModule from "@components/GuessModule";
import { View } from "@components/Themed";
import { appStyles } from "@styles";

import { useStore } from "../../store";

export default function TabFour() {
  const _phrases = useStore((state) => state.phrases);
  return (
    <View style={appStyles.container}>
      <GuessModule collection={_phrases} option="phrases" />
    </View>
  );
}
