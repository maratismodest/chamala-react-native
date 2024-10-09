import { View } from "@/components";
import GuessModule from "@/components/Games/GuessModule";
import { useStore } from "@/store";
import { appStyles } from "@/styles";

export default function WordPage() {
  const words = useStore((state) => state.words);

  return (
    <View style={appStyles.container}>
      <GuessModule collection={words} count={6} />
    </View>
  );
}
