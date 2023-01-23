import { useContext } from "react";
import { Text, View } from "react-native";

import colors from "@constants/colors";
import { AccountContext } from "@contexts/AccountContext";
import { AccountRouteProps } from "@navigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";

import AccountForm from "@components/AccountForm";
import { BlankView } from "@components/BlankView";

const AccountScreen = () => {
  const route = useRoute<AccountRouteProps<"Account">>();
  const { accounts, addAccount, getAccountData, updateTempMethod, editAccount } = useContext(AccountContext);
  const isEditing = route.params.accountId;

  return (
    <BlankView>
      <AccountForm
        onSubmit={isEditing ? editAccount : addAccount}
        previousAccounts={accounts.filter(account => account.isRelease)}
        initialValues={isEditing ? getAccountData(route.params.accountId) : {}}
        updateTempMethod={updateTempMethod}
      />
    </BlankView>
  );
};

export default AccountScreen;
