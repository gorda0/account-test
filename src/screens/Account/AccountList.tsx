import { useContext, FC } from "react";
import { Text, ScrollView } from "react-native";

import colors from "@constants/colors";
import { AccountContext } from "@contexts/AccountContext";
import { AccountNavigationProps } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";
import { PageTitle } from "./styles";

const AccountListScreen = () => {
  const navigation = useNavigation<AccountNavigationProps<"AccountList">>();
  const { accounts, addAccount } = useContext(AccountContext);

  return (
    <ScrollView
      style={{
        backgroundColor: colors.offwhite,
      }}
    >
      <PageTitle>Listagem</PageTitle>
      {accounts.map(account => (
        <Text>{account.name}</Text>
      ))}
    </ScrollView>
  );
};

export default AccountListScreen;
