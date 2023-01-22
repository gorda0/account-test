import { useContext, FC, PropsWithChildren, ComponentProps } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, StatusBar, Text, ScrollView, View, ColorValue } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

import colors from "@constants/colors";
import { AccountContext } from "@contexts/AccountContext";
import { AccountNavigationProps } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";
import { isAndroid } from "@utils/platform";

import Header from "@components/Header";
import { TouchableIcon } from "@components/TouchableIcon";

const BaseAccountScreen = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation<AccountNavigationProps>();

  const getRouteName = () => navigation.getState()?.routes[navigation.getState()?.index].name;
  const isAccountRoute = () => getRouteName() === "Account";

  const [isAccountScreen, setIsAccountScreen] = useState(isAccountRoute());

  useEffect(() => {
    navigation.addListener("state", () => {
      setIsAccountScreen(isAccountRoute());
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
            name={!isAccountScreen ? "Plano de Contas" : "Inserir Conta"}
            leftItem={
              isAccountScreen && (
                <TouchableIcon name="chevron-left" onPress={() => navigation?.goBack()} color="white" size={32} />
              )
            }
            rightItem={
              <TouchableIcon
                name={isAccountScreen ? "check" : "plus"}
                onPress={() => navigation?.navigate("Account", {})}
                color="white"
                size={30}
              />
            }
            searchBar={!isAccountScreen}
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

export default BaseAccountScreen;
