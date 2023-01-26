import { APPLICATION_PREFIX } from "@constants/application";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async <T>(data: T) => {
  try {
    return await AsyncStorage.setItem(APPLICATION_PREFIX, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

export const getData = async <T>() => {
  try {
    return JSON.parse((await AsyncStorage.getItem(APPLICATION_PREFIX)) || "{}") as T;
  } catch (e) {
    console.log(e);
  }
};
