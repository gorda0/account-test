import React from "react";
import { Platform, UIManager } from "react-native";

import { AccountProvider } from "@contexts/AccountContext";
import AccountStack from "@navigation/AccountStack";
import { AccountNavigationProps } from "@navigation/types";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import BaseAccoutTemplate from "@templates/AccountBase";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App() {
  const navigationContainerRef = useNavigationContainerRef<AccountNavigationProps>();

  return (
    <AccountProvider>
      <NavigationContainer ref={navigationContainerRef}>
        <BaseAccoutTemplate>
          <AccountStack initialRoute="AccountList" />
        </BaseAccoutTemplate>
      </NavigationContainer>
    </AccountProvider>
  );
}

export default App;
