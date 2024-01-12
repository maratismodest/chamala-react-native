import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import useTransitions from "@hooks/useTransitions";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

interface TabProps {
  name: string;
  title: string;
  href?: null;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { i18n } = useTransitions();

  const tabs: TabProps[] = [
    {
      name: "pick",
      title: i18n.t("pickGame"),
      href: null,
    },
    {
      name: "word",
      title: i18n.t("word"),
      href: null,
    },
    {
      name: "phrase",
      title: i18n.t("word"),
      href: null,
    },
    {
      name: "collect",
      title: i18n.t("collect"),
      href: null,
    },
    {
      name: "profile",
      title: i18n.t("profile"),
    },
    {
      name: "letters",
      title: i18n.t("letters"),
      href: null,
    },
  ];
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chamala",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      {tabs.map(({ name, href, title }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
            href,
          }}
        />
      ))}
    </Tabs>
  );
}
