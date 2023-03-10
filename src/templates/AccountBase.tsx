import { PropsWithChildren, useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { LayoutAnimation, StatusBar } from "react-native";

import colors from "@constants/colors";
import testIds from "@constants/testIds";
import { AccountContext } from "@contexts/AccountContext";
import { AccountNavigationProps } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";

import Header from "@components/Header";
import SearchInput from "@components/SearchInput";
import { TouchableIcon } from "@components/TouchableIcon";

import { ApplicationContainer, BaseChildren, Container, SafeContainer } from "./styles";

const {
  baseTemplate: {
    backButton: backButtonId,
    finishButton: finishButtonId,
    insertButton: insertButtonId,
    searchInput: searchInputId,
  },
} = testIds;

const BaseAccoutTemplate = ({ children }: PropsWithChildren) => {
  const { accounts, tempMethod, resetTempMethod, setFilterItems, errors } = useContext(AccountContext);
  const navigation = useNavigation<AccountNavigationProps>();

  const getRouteName = () => navigation.getState()?.routes[navigation.getState()?.index].name;
  const isAccountRoute = () => getRouteName() === "Account";

  const getRouteParams = () => navigation.getState()?.routes[navigation.getState()?.index].params;
  const isEditing = () => getRouteParams()?.accountId || false;

  const [isAccountScreen, setIsAccountScreen] = useState(isAccountRoute());
  const [isEditingAccount, setIsEditingAccount] = useState(isEditing());

  const headerLabel = !isAccountScreen ? "Plano de Contas" : isEditingAccount ? "Visualização/Edição" : "Inserir Conta";

  useEffect(() => {
    navigation.addListener("state", () => {
      setIsAccountScreen(isAccountRoute());
      setIsEditingAccount(isEditing());
    });
  }, []);

  return (
    <ApplicationContainer>
      <Container>
        <SafeContainer>
          <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
          <Header
            name={headerLabel}
            leftItem={
              isAccountScreen && (
                <TouchableIcon
                  testID={backButtonId}
                  name="chevron-left"
                  onPress={() => {
                    navigation?.goBack();
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  }}
                  color="white"
                  size={32}
                />
              )
            }
            rightItem={
              <TouchableIcon
                testID={isAccountScreen ? finishButtonId : insertButtonId}
                name={isAccountScreen ? "check" : "plus"}
                onPress={() => {
                  if (isAccountScreen) {
                    tempMethod.method?.();
                    resetTempMethod();
                  } else {
                    navigation?.navigate("Account", {});
                  }

                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setFilterItems([], "");
                }}
                color="white"
                size={30}
              />
            }
            bottomItem={
              !isAccountScreen && (
                <SearchInput
                  testID={searchInputId}
                  onSearch={value =>
                    setFilterItems(
                      accounts.filter(account => account.fullLabel.includes(value)),
                      value,
                    )
                  }
                />
              )
            }
          />
        </SafeContainer>
      </Container>

      <BaseChildren>{children}</BaseChildren>
    </ApplicationContainer>
  );
};

export default BaseAccoutTemplate;
