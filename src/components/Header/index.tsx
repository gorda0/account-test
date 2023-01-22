import { ReactNode } from "react";
import { TouchableWithoutFeedback, TouchableOpacity, Text, View } from "react-native";

import colors from "@constants/colors";

import SearchInput from "@components/SearchInput";

import { Container, RowContainer, Title, BaseContainer } from "./styles";

interface HeaderProps {
  name: string;
  leftItem?: ReactNode;
  rightItem?: ReactNode;
  searchBar?: boolean;
}

const Header = ({ name, leftItem, rightItem, searchBar }: HeaderProps) => {
  return (
    <View>
      <Container>
        <RowContainer>
          {leftItem && <TouchableWithoutFeedback>{leftItem}</TouchableWithoutFeedback>}
          <Title>{name}</Title>
        </RowContainer>
        {rightItem && <TouchableOpacity>{rightItem}</TouchableOpacity>}
      </Container>
      {searchBar && (
        <BaseContainer>
          <SearchInput />
        </BaseContainer>
      )}
    </View>
  );
};

export default Header;
