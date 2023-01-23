import { PropsWithChildren, Ref, useContext, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";

import colors from "@constants/colors";
import { AccountContext } from "@contexts/AccountContext";
import { AccountNavigationProps } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";
import { isAndroid } from "@utils/platform";

import Header from "@components/Header";
import SearchInput from "@components/SearchInput";
import { TouchableIcon } from "@components/TouchableIcon";

const BaseAccoutTemplate = ({ children }: PropsWithChildren) => {
  const { tempMethod } = useContext(AccountContext);
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
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <View style={{ minHeight: 200, backgroundColor: colors.primary }}>
        <SafeAreaView
          style={{
            backgroundColor: colors.primary,
            paddingTop: isAndroid ? StatusBar.currentHeight : 0,
            maxHeight: 90,
          }}
        >
          <Header
            name={headerLabel}
            leftItem={
              isAccountScreen && (
                <TouchableIcon name="chevron-left" onPress={() => navigation?.goBack()} color="white" size={32} />
              )
            }
            rightItem={
              <TouchableIcon
                name={isAccountScreen ? "check" : "plus"}
                onPress={() => {
                  if (isAccountScreen) {
                    tempMethod.method?.();
                    navigation?.goBack();
                  } else {
                    navigation?.navigate("Account", {});
                  }
                }}
                color="white"
                size={30}
              />
            }
            bottomItem={!isAccountScreen && <SearchInput />}
          />
        </SafeAreaView>
      </View>

      <View
        style={{
          backgroundColor: colors.offwhite,
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default BaseAccoutTemplate;
