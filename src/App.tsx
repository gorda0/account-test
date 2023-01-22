import React from "react";

import { AccountProvider } from "@contexts/AccountContext";
import AccountStack from "@navigation/AccountStack";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import AccountBaseTemplate from "@templates/AccountBase";
import { AccountNavigationProps } from "@navigation/types";

function App() {
  const navigationContainerRef = useNavigationContainerRef<AccountNavigationProps>();

  return (
    <AccountProvider>
      <NavigationContainer ref={navigationContainerRef}>
        <AccountBaseTemplate>
          <AccountStack initialRoute="AccountList" />
        </AccountBaseTemplate>
      </NavigationContainer>
    </AccountProvider>
  );
}

export default App;
