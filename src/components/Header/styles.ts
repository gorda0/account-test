import { Text, View } from "react-native";

import colors from "@constants/colors";
import styled from "styled-components";

export const BaseContainer = styled(View)`
  padding-left: 10px;
  padding-right: 10px;
`;

export const Container = styled(BaseContainer)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
`;

export const RowContainer = styled(BaseContainer)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0px;
`;

export const Title = styled(Text)`
  font-size: 26px;
  font-weight: 600;
  color: white;
`;
