import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import i18n from "../../i18n";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
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
      <Tabs.Screen
        name="pick"
        options={{
          title: i18n.t("pickGame"),
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="word"
        options={{
          title: i18n.t("word"),
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="phrase"
        options={{
          title: i18n.t("phrase"),
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="collect"
        options={{
          title: "Collect",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: i18n.t("profile"),
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
