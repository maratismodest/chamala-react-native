import { StyleSheet } from "react-native";

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 8,
  },
  button: {
    backgroundColor: "rgb(15, 128, 18)",
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    textAlign: "center",
    textAlignVertical: "center",
    minHeight: 48,
    fontSize: 18,
    lineHeight: 18,
  },
});

export { appStyles };
