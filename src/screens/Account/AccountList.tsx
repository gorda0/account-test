import { useContext, useState } from "react";
import { Text, LayoutAnimation } from "react-native";

import colors from "@constants/colors";
import { AccountContext } from "@contexts/AccountContext";
import { AccountNavigationProps } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";

import { BlankView } from "@components/BlankView";
import { RowContainer } from "@components/Header/styles";
import DeleteModal from "@components/Modal/DeleteModal";
import { TouchableIcon } from "@components/TouchableIcon";

import { AccountModel, AccountType } from "@models/account";

import { AccountCounter, AccountItem, ListContainer, PageTitle, Container } from "./styles";

const createAccountLabel = (account: AccountModel | null) => (account ? `${account.code} - ${account.name}` : "");

const AccountListScreen = () => {
  const navigation = useNavigation<AccountNavigationProps<"AccountList">>();
  const { accounts, removeAccount } = useContext(AccountContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountModel | null>(null);

  return (
    <BlankView>
      <RowContainer>
        <PageTitle>Listagem</PageTitle>
        <AccountCounter>{accounts.length} registros</AccountCounter>
      </RowContainer>

      <ListContainer>
        {accounts.map((account, accountIdx) => (
          <AccountItem
            key={account.name + accountIdx}
            onPress={() => {
              navigation.navigate("Account", { accountId: account.code });
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            }}
          >
            <Container>
              <Text style={{ color: account.type === AccountType.Income ? colors.green : colors.orange }}>
                {createAccountLabel(account)}
              </Text>
              <TouchableIcon
                name="trash"
                size={20}
                color={colors.grayLight}
                onPress={() => {
                  setSelectedAccount(account);
                  setOpenDeleteModal(true);
                }}
              />
            </Container>
          </AccountItem>
        ))}
      </ListContainer>
      <DeleteModal
        isVisible={openDeleteModal}
        label={createAccountLabel(selectedAccount)}
        onCancel={() => setOpenDeleteModal(false)}
        onConfirm={() => {
          if (selectedAccount) {
            removeAccount(selectedAccount.code);
            setOpenDeleteModal(false);
          }
        }}
      />
    </BlankView>
  );
};

export default AccountListScreen;
