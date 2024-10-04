import { Button } from "components/ui";
import React from "react";
import { Modal, View } from "react-native";

import Happy from "@/assets/svg/happy.svg";
import Sad from "@/assets/svg/sad.svg";
import { modalStyles } from "@/components/Games/GameModal/styles";
import { Text } from "@/components/Themed";
import useTranslations from "@/hooks/useTranslations";
import { useStore } from "@/store";

type Props = {
  isCorrect: boolean;
  correct: string;
  handleNext: () => void;
};

export const GameModal = ({ isCorrect, correct, handleNext }: Props) => {
  const { i18n } = useTranslations();
  const { modal, setModal } = useStore((state) => state);
  return (
    <Modal
      animationType="slide"
      transparent
      visible={modal}
      onRequestClose={() => setModal(!modal)}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <View className="flex-row items-center">
            {isCorrect ? (
              <>
                <Happy width={90} height={90} />
                <View>
                  <Text>{i18n.t("correct")}</Text>
                </View>
              </>
            ) : (
              <>
                <Sad width={90} height={90} />
                <View>
                  <Text className="text-red-500">{i18n.t("wrong")}</Text>
                  <Text>
                    {i18n.t("correct")}: {correct}
                  </Text>
                </View>
              </>
            )}
          </View>

          <Button
            title={i18n.t("next")}
            onPress={handleNext}
            className="w-48"
          />
        </View>
      </View>
    </Modal>
  );
};
