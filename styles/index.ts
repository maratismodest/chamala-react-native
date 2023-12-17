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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  divider: {
    marginVertical: 4,
    height: 1,
    width: "80%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  h1: { fontSize: 30, lineHeight: 36, maxWidth: 512 },
  text: { fontSize: 18, lineHeight: 28 },
});

export { appStyles };
