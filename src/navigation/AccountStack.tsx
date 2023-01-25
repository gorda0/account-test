import { ComponentProps, FC } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "@screens/Account/Account";
import AccountListScreen from "@screens/Account/AccountList";

import { AccountStackParamMap, StackKeys } from "./types";

const Stack = createStackNavigator<AccountStackParamMap>();

type StackScreen = typeof Stack.Screen;
type UnnamedStack = Omit<ComponentProps<StackScreen>, "name">;
type StackScreenMap = Record<StackKeys, UnnamedStack>;

const accountStackMap: StackScreenMap = {
  Account: {
    component: AccountScreen,
    options: { headerShown: false },
  },
  AccountList: {
    component: AccountListScreen,
  },
};

interface AccountStackProps {
  initialRoute: StackKeys;
}

const AccountStack: FC<AccountStackProps> = ({ initialRoute }) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        header: () => null,
      }}
    >
      {(Object.keys(accountStackMap) as Array<StackKeys>).map((key, keyIdx) => (
        <Stack.Screen
          {...(accountStackMap[key] as StackScreen)}
          name={key}
          component={accountStackMap[key].component as FC}
          key={key + keyIdx}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AccountStack;
