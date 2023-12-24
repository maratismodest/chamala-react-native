import AsyncStorage from "@react-native-async-storage/async-storage";

const storeAsyncData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

const getAsyncData = async (key: "statistics" | 'token') => {
  console.log("key", key);
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      // Alert.alert(value);
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

const deleteAsyncData = async (key: "statistics") => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
  }
};

export { storeAsyncData, getAsyncData, deleteAsyncData };
