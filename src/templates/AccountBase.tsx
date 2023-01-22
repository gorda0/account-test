import { useContext, FC, PropsWithChildren, ComponentProps } from "react";
import { SafeAreaView, StatusBar, Text, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

import colors from "@constants/colors";
import { AccountContext } from "@contexts/AccountContext";
import { AccountNavigationProps, AccountRouteProps } from "@navigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import { isAndroid } from "@utils/platform";

import Header from "@components/Header";

const NewAccountButton = (props: ComponentProps<typeof TouchableOpacity>) => (
  <TouchableOpacity {...props}>
    <Icon name="plus" size={20} />
  </TouchableOpacity>
);

const BaseAccountScreen = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation<AccountNavigationProps>();

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
            name={"doglas"}
            leftItem={<Icon name="airplay" size={20} />}
            rightItem={<NewAccountButton onPress={() => navigation?.navigate("Account", {})} />}
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
