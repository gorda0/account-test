import { Text, View } from "react-native";

import colors from "@constants/colors";
import styled from "styled-components";

export const RowContainer = styled(View)`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const Container = styled(RowContainer)`
  min-height: 60px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const LeftContainer = styled(RowContainer)`
  flex: 1;
  justify-content: flex-start;
`;

export const Title = styled(Text)`
  font-size: 26px;
  font-weight: 600;
  color: white;
`;
