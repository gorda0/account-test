import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import colors from "@constants/colors";
import styled from "styled-components";

export const SearchContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  max-height: 60px;
  background-color: #fff;
  border-radius: 100px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const SearchIcon = styled(Icon)`
  padding: 10px;
`;

export const Input = styled(TextInput)`
  flex: 1;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 0px;
  color: ${colors.gray};
`;
