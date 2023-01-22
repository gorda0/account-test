import { View } from "react-native";

import colors from "@constants/colors";
import styled from "styled-components";

export const BaseContainer = styled(View)`
  background-color: ${colors.primary};
  padding-left: 24px;
  padding-right: 24px;
  min-height: 60px;
`;

export const Container = styled(BaseContainer)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
