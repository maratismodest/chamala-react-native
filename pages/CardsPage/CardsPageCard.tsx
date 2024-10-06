import clsx from "clsx";
import { Image } from "expo-image";
import React, { FC, useEffect, useState } from "react";

import { View } from "@/components/Themed";
import { AudioPlayer, Button } from "@/components/ui";
import { IWord } from "@/types";

type Props = {
  word: IWord;
};
export const CardsPageCard: FC<Props> = ({ word }) => {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    setPressed(false);
  }, [word]);

  const { image, audio, ru, ta } = word;
  return (
    <View className="border rounded-2xl flex-col justify-around items-center p-4 w-80 h-96">
      <Image source={image} style={{ width: 160, height: 160 }} />
      <AudioPlayer uri={audio} />
      <Button
        className={clsx(
          "w-64 py-6",
          pressed ? "bg-orange-500" : "bg-blue-500 !text-4xl",
        )}
        onPress={() => setPressed((prev) => !prev)}
        title={pressed ? ru : ta}
      />
    </View>
  );
};

export default CardsPageCard;
