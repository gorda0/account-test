import { useContext, FC } from "react";
import { Text, ScrollView } from "react-native";

import colors from "@constants/colors";
import { AccountContext } from "@contexts/AccountContext";
import { AccountNavigationProps } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";
const AccountListScreen = () => {
  const navigation = useNavigation<AccountNavigationProps<"AccountList">>();
  const { accounts, addAccount } = useContext(AccountContext);

  return (
    <ScrollView
      style={{
        backgroundColor: colors.offwhite,
      }}
    >
      <Text>Account List Screen</Text>
      {accounts.map(account => (
        <Text>{account.name}</Text>
      ))}
    </ScrollView>
  );
};

export default AccountListScreen;
