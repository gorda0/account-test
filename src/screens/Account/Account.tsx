import { useContext } from "react";

import { AccountContext } from "@contexts/AccountContext";
import { AccountNavigationProps, AccountRouteProps } from "@navigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";

import AccountForm from "@components/AccountForm";
import { BlankView } from "@components/BlankView";
import MessageDialog from "@components/Dialog/MessageDialog";

const AccountScreen = () => {
  const route = useRoute<AccountRouteProps<"Account">>();
  const navigation = useNavigation<AccountNavigationProps<"Account">>();
  const { accounts, errors, addAccount, getAccountData, updateTempMethod, editAccount, cleanErrors } =
    useContext(AccountContext);
  const isEditing = route.params.accountId;

  return (
    <BlankView>
      <AccountForm
        onSubmit={isEditing ? editAccount : addAccount}
        previousAccounts={accounts}
        initialValues={isEditing ? getAccountData(route.params.accountId) : {}}
        updateTempMethod={updateTempMethod}
        onSubmitSuccess={navigation.goBack}
      />
      <MessageDialog
        isVisible={!!errors.length}
        onConfirm={() => {
          cleanErrors();
        }}
        message={errors[errors.length - 1]?.message || ""}
      />
    </BlankView>
  );
};

export default AccountScreen;
