import { useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import colors from "@constants/colors";
import { AccountContext } from "@contexts/AccountContext";
import { AccountNavigationProps } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";

import { BlankView } from "@components/BlankView";
import { Container, RowContainer, Title } from "@components/Header/styles";
import { TouchableIcon } from "@components/TouchableIcon";

import { AccountType } from "@models/account";

import { AccountCounter, AccountItem, ListContainer, PageTitle } from "./styles";

const AccountListScreen = () => {
  const navigation = useNavigation<AccountNavigationProps<"AccountList">>();
  const { accounts, removeAccount } = useContext(AccountContext);

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
            onPress={() => navigation.navigate("Account", { accountId: account.code })}
          >
            <Container>
              <Text>
                {account.code} - {account.name}
              </Text>
              <TouchableIcon
                name="trash"
                size={20}
                color={colors.grayLight}
                onPress={() => removeAccount(account.code)}
              />
            </Container>
          </AccountItem>
        ))}
      </ListContainer>
    </BlankView>
  );
};

export default AccountListScreen;
