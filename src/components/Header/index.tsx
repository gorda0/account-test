import { ReactNode } from "react";
import { TouchableWithoutFeedback, TouchableOpacity, Text, View } from "react-native";

import colors from "@constants/colors";

import SearchInput from "@components/SearchInput";

import { Container, BaseContainer } from "./styles";

interface HeaderProps {
  name: string;
  leftItem: ReactNode;
  rightItem: ReactNode;
}

const Header = ({ name, leftItem, rightItem }: HeaderProps) => {
  return (
    <View style={{ flex: 1 }}>
      <Container>
        <TouchableWithoutFeedback>{leftItem}</TouchableWithoutFeedback>
        <Text>Titulo</Text>
        <TouchableOpacity>{rightItem}</TouchableOpacity>
      </Container>
      <SearchInput />
    </View>
  );
};

export default Header;
