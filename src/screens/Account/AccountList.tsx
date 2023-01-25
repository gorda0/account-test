import { useContext, useState } from "react";
import { LayoutAnimation } from "react-native";

import colors from "@constants/colors";
import { AccountContext } from "@contexts/AccountContext";
import { AccountNavigationProps } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";

import { BlankView } from "@components/BlankView";
import DeleteDialog from "@components/Dialog/DeleteDialog";
import { RowContainer } from "@components/Header/styles";
import { TouchableIcon } from "@components/TouchableIcon";

import { AccountModel, AccountType } from "@models/account";

import { AccountCounter, AccountItem, ListContainer, PageTitle, Container, AccountLabel } from "./styles";

const AccountListScreen = () => {
  const navigation = useNavigation<AccountNavigationProps<"AccountList">>();
  const { accounts, filterItems, isSearching, removeAccount } = useContext(AccountContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountModel | null>(null);

  return (
    <BlankView>
      <RowContainer>
        <PageTitle>Listagem</PageTitle>
        <AccountCounter>{(isSearching ? filterItems : accounts).length} registros</AccountCounter>
      </RowContainer>

      <ListContainer>
        {(isSearching ? filterItems : accounts).map((account, accountIdx) => (
          <AccountItem
            key={account.fullLabel + accountIdx}
            onPress={() => {
              navigation.navigate("Account", { accountId: account.fullLabel });
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            }}
          >
            <Container>
              <AccountLabel
                style={{
                  color: account.type === AccountType.Income ? colors.green : colors.orange,
                }}
              >
                {account.fullLabel}
              </AccountLabel>
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
      <DeleteDialog
        isVisible={openDeleteModal}
        label={selectedAccount?.fullLabel || ""}
        onCancel={() => setOpenDeleteModal(false)}
        onConfirm={() => {
          if (selectedAccount) {
            removeAccount(selectedAccount);
            setOpenDeleteModal(false);
          }
        }}
      />
    </BlankView>
  );
};

export default AccountListScreen;
