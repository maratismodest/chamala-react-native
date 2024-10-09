import React, { FC } from "react";
import { FlatList } from "react-native";

import { Text } from "@/components/Themed";
import { AudioPlayer, Button } from "@/components/ui";
import useTranslations from "@/hooks/useTranslations";
import { appStyles } from "@/styles";
import type { IWord, Language } from "@/types";

type Props = {
  correct: IWord;
  options: IWord[];
  onClick: (id: number) => void;
};

export const GuessCard: FC<Props> = ({ correct, options, onClick }) => {
  const { i18n } = useTranslations();
  return (
    <>
      <AudioPlayer uri={correct.audio} />
      <Text style={[appStyles.h1, { textTransform: "capitalize" }]}>
        {correct.ta}
      </Text>
      <FlatList
        className="grow-0 mt-4 w-full max-w-[300px]"
        data={options}
        renderItem={({ item }) => (
          <Button
            key={item.id}
            title={item[i18n.locale as Language]}
            onPress={() => onClick(item.id)}
          />
        )}
        contentContainerStyle={{ gap: 16 }}
      />
    </>
  );
};
