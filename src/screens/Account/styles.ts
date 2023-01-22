import { ScrollView, Text, TouchableOpacity } from "react-native";

import colors from "@constants/colors";
import styled from "styled-components";

export const PageTitle = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.grayBold};
`;

export const AccountCounter = styled(Text)`
  color: ${colors.grayLight};
`;

export const ListContainer = styled(ScrollView)`
  margin-top: 10;
  flex: 1;
`;

export const AccountItem = styled(TouchableOpacity)`
  flex: 1;
  background-color: #fff;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;
