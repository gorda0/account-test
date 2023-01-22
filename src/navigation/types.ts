import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type AccountStackParamMap = {
  Account: {
    accountId?: string;
  };
  AccountList: undefined;
};

export type StackKeys = keyof AccountStackParamMap;
export type AccountNavigationProps<T extends StackKeys | undefined = undefined> = T extends StackKeys
  ? StackNavigationProp<AccountStackParamMap, T>
  : StackNavigationProp<AccountStackParamMap>;
export type AccountRouteProps<T extends StackKeys | undefined = undefined> = T extends StackKeys
  ? RouteProp<AccountStackParamMap, T>
  : RouteProp<AccountStackParamMap>;
