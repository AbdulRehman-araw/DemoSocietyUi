import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";

const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
  cardWrapper: {
    backgroundColor: colors.white,
    padding: width * 0.03,
  },
  card: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
  },
  divider: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    marginVertical: width * 0.03,
  },
  viewCard: {
    width: "100%",
    flex: 1,
    justifyContent: 'space-between',
    // paddingTop: width * 0.07,
    // paddingHorizontal: width * 0.07,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.white,
    borderColor: colors.lightoffwhite,
  },
});
