import { ComponentPropsWithRef } from "react";
import { TouchableOpacity, ColorValue } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export const TouchableIcon = ({
  name,
  color,
  size,
  ...props
}: ComponentPropsWithRef<typeof TouchableOpacity> & { name: string; size: number; color?: ColorValue }) => (
  <TouchableOpacity {...props}>
    <Icon name={name} size={size} color={color} />
  </TouchableOpacity>
);
