import React from "react";

import { AccountProvider } from "@contexts/AccountContext";
import AccountStack from "@navigation/AccountStack";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import AccountBaseTemplate from "@templates/AccountBase";

function App() {
  return (
    <AccountProvider>
      <NavigationContainer>
        <AccountBaseTemplate>
          <AccountStack initialRoute="AccountList" />
        </AccountBaseTemplate>
      </NavigationContainer>
    </AccountProvider>
  );
}

export default App;
