import { Link } from "expo-router";
import React, { useContext } from "react";

import Button from "@/components/Button";
import { Text, View } from "@/components/Themed";
import { LocaleContext } from "@/providers/LocaleProvider";
import { appStyles } from "@/styles";

export default function PickPage() {
  const { i18n } = useContext(LocaleContext);
  const buttons = [
    {
      id: 1,
      title: i18n.t("word"),
      href: "/word",
      isDisabled: false,
    },
    {
      id: 2,
      title: i18n.t("phrase"),
      href: "/phrase",
      isDisabled: true,
    },
    {
      id: 3,
      title: i18n.t("collect"),
      href: "/collect",
      isDisabled: true,
    },
    {
      id: 4,
      title: i18n.t("letters"),
      href: "/letters",
      isDisabled: true,
    },
  ] as const;
  return (
    <View style={appStyles.container}>
      <Text style={appStyles.h1}>{i18n.t("pickGame")}</Text>
      <View style={{ gap: 16, marginTop: 16 }}>
        {buttons.map(({ id, href, title, isDisabled }) => (
          <Link key={id} href={href} asChild>
            <Button title={title} />
          </Link>
        ))}
      </View>
    </View>
  );
}
