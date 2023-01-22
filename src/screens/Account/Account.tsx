import { Text, View } from "react-native";

import colors from "@constants/colors";
import { AccountRouteProps } from "@navigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";

const AccountScreen = () => {
  const route = useRoute<AccountRouteProps<"Account">>();

  return (
    <View
      style={{
        backgroundColor: colors.offwhite,
        flex: 1,
      }}
    >
      <Text>Account Screen</Text>
    </View>
  );
};

export default AccountScreen;
