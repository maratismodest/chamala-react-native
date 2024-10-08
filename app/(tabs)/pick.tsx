import { Link } from "expo-router";
import React from "react";

import { Text, View } from "@/components/Themed";
import { Button } from "@/components/ui";
import useTranslations from "@/hooks/useTranslations";
import { usePicklist } from "@/pages/PickPage";
import { appStyles } from "@/styles";

export default function PickPage() {
  const { i18n } = useTranslations();
  const buttons = usePicklist();
  return (
    <View style={appStyles.container}>
      <Text style={appStyles.h1}>{i18n.t("pickGame")}</Text>
      <View className="gap-4 mt-4">
        {buttons.map(({ id, href, title }) => (
          <Link key={id} href={href} asChild>
            <Button title={title} />
          </Link>
        ))}
      </View>
    </View>
  );
}
