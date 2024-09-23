import { Dimensions, StyleSheet } from "react-native";
import { fontsFamily } from "../../../assets/Fonts";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: width * 0.03
  },
  upperCon: {
    width: '100%'
  },
  textMainCon: {
    width: '90%',
    alignSelf: 'center'
  },
  textTitle: {
    color: colors.black,
    fontSize: width * 0.04,
    marginVertical: width * 0.05
  },
  textLimit: {
    color: colors.black,
    fontSize: width * 0.02,
    marginVertical: width * 0.01,
    textAlign: 'right',
  },
  textInput: {
    width: '100%',
    borderColor: colors.gray,
    borderBottomWidth: 1,
    color: colors.black,
    // borderRadius: width * 0.02,
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.03,
    fontFamily: fontsFamily.regular,
    fontSize: width * 0.03,
    marginVertical:14
  },
  username: {
    color: colors.black,
    fontSize: width * 0.03,
  },
  name: {
    color: colors.black,
    fontSize: width * 0.05,
  },
  viewname: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: width * 0.016
  },

});