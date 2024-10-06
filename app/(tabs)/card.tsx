import clsx from "clsx";
import { Image } from "expo-image";
import { useMemo, useState } from "react";

import { View } from "@/components/Themed";
import { AudioPlayer, Button } from "@/components/ui";
import useTranslations from "@/hooks/useTranslations";
import { useStore } from "@/store";
import { appStyles } from "@/styles";
import { getRandomInt } from "@/utils";

export default function CardsPage() {
  const { i18n } = useTranslations();
  const words = useStore((state) => state.words);
  const [pressed, setPressed] = useState(false);
  const withImages = useMemo(() => words.filter((word) => word.image), [words]);
  const [index, setIndex] = useState(() =>
    getRandomInt(0, withImages.length - 1),
  );

  const currentWord = withImages[index];

  return (
    <View style={appStyles.container} className="flex-col justify-evenly">
      <View className="border rounded-2xl flex-col justify-around items-center p-4 w-80 h-96">
        <Image source={currentWord.image} className="w-40 h-40" />
        <AudioPlayer uri={currentWord.audio} />
        <Button
          className={clsx(
            "w-64 py-6",
            pressed ? "bg-orange-500" : "bg-blue-500 !text-4xl",
          )}
          onPress={() => setPressed((prev) => !prev)}
          title={pressed ? currentWord.ru : currentWord.ta}
        />
      </View>

      <Button
        className="mt-8"
        onPress={() => {
          setIndex(getRandomInt(0, withImages.length - 1));
          setPressed(false);
        }}
        title={i18n.t("next")}
      />
    </View>
  );
}
