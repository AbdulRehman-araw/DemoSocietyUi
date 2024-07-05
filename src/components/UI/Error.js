import { Text } from "react-native";
import { colors } from "../../styles/colors";

export const Error = ({ children, style }) => {
  return (
    <Text style={{ color: colors.red, fontSize: 12, ...style }}>{children}</Text>
  );
}