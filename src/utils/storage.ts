import { APPLICATION_PREFIX } from "@constants/application";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async <T>(data: T) => {
  await AsyncStorage.setItem(APPLICATION_PREFIX, JSON.stringify(data));
};

export const getData = async <T>() => {
  JSON.parse((await AsyncStorage.getItem(APPLICATION_PREFIX)) || "") as T;
};
