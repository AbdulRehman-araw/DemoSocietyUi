import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  selectedIcon: {
    width: '20%',
    height: '20%',
    tintColor: colors.primary,
    position: 'absolute',
    top: width * 0.01,
    left: width * 0.01,
  },
  datebtn: {
    backgroundColor: colors.primary,
    width: width * 0.23,
    height: width * 0.13,
    borderTopStartRadius: 12,
    borderBottomColor: colors.primary,
    position: 'absolute'
  },
  textbtn: {
    fontSize: width * 0.034,
    color: colors.white,
    textAlign: 'center',
    marginVertical: width * 0.035
  },
  imgcard: {
    width: width * 0.94,
    height: width * 0.43,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopWidth: 1,
    marginTop: 8
  },
  uploadCircle: {
    backgroundColor: colors.primaryLight,
    borderRadius: width / 2,
    padding: width * 0.03,
    width: width * 0.18,
    marginHorizontal: width / 3,
    marginVertical: width * 0.04,
  },
  eventTitle: {
    position: 'absolute',
    right: width * 0.03,
    bottom: width * 0.02,
  }
});
