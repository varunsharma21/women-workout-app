import AsyncStorage from "@react-native-async-storage/async-storage";

// value is an Object.
export const saveToLocalStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (err) {
    console.error("Error saving data: ", err);
  }
};

// An Object will be returned.
export const getFromLocalStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.error("Error reading data: ", err);
    return null;
  }
};

export const removeFromLocalStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.error("Error removing data: ", err);
  }
};
