import { View } from "@/components";
import GuessModule from "@/components/Games/GuessModule";
import { useStore } from "@/store";
import { appStyles } from "@/styles";

export default function PhrasePage() {
  const phrases = useStore((state) => state.phrases);
  return (
    <View style={appStyles.container}>
      <GuessModule collection={phrases} count={4} />
    </View>
  );
}
