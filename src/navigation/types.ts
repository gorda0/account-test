import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type AccountStackParamMap = {
  Account: {
    accountId?: number;
  };
  AccountList: undefined;
};

export type StackKeys = keyof AccountStackParamMap;
export type AccountNavigationProps<T = undefined> = T extends StackKeys
  ? StackNavigationProp<AccountStackParamMap, T>
  : StackNavigationProp<AccountStackParamMap>;
export type AccountRouteProps<T extends StackKeys> = RouteProp<AccountStackParamMap, T>;
