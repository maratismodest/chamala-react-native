import { Href } from "expo-router";

export interface TabProps {
  name: string;
  title: string;
  href: Href<string> | null;
}
