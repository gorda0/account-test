import { ReactNode } from "react";
import { TouchableWithoutFeedback, TouchableOpacity, View } from "react-native";

import { Container, RowContainer, Title } from "./styles";

interface HeaderProps {
  name: string;
  leftItem?: ReactNode;
  rightItem?: ReactNode;
  bottomItem?: ReactNode;
}

const Header = ({ name, leftItem, rightItem, bottomItem }: HeaderProps) => {
  return (
    <View>
      <Container>
        <RowContainer>
          {leftItem && <TouchableWithoutFeedback>{leftItem}</TouchableWithoutFeedback>}
          <Title>{name}</Title>
        </RowContainer>
        {rightItem && <TouchableOpacity>{rightItem}</TouchableOpacity>}
      </Container>
      {bottomItem && <Container>{bottomItem}</Container>}
    </View>
  );
};

export default Header;
