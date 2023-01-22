import React from "react";

import { AccountProvider } from "@contexts/AccountContext";
import AccountStack from "@navigation/AccountStack";
import { AccountNavigationProps } from "@navigation/types";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import BaseAccoutTemplate from "@templates/AccountBase";

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
