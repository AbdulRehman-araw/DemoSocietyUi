import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")



export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  residentuser: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.2,
    borderRadius: 5,
    width: width * 0.86,
    height: width * 0.15,
    marginHorizontal: width * 0.05,
    marginTop: 10

  },
  viewbtnssubmit: {
    backgroundColor: colors.primary,
    height: width * 0.12,
    width: width * 0.70,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 25

  },
  textbtnssubmit: {
    color: colors.white,
    fontSize: width * 0.049,
    marginTop: 8,
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular',

  },
  text1: {
    alignSelf: 'center',
    fontSize: width * 0.037
  },
  text2: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: width * 0.035,
    color: colors.lightgray

  },
  text3: {
    marginTop: 5,
    alignSelf: "center",
    fontSize: width * 0.035,
    color: colors.black
  },
  btn: {
    padding: width * 0.03,
    width: width * 0.68,
    height: width * 0.13,
    alignSelf: 'center'
  },
  viewimg: {
    width: width / 3,
    alignSelf: 'center',
    flex: 0.45

  },
  centertext: {
    color: colors.primary,
    fontSize: width * 0.054,
    alignSelf: "center",
    marginTop: 5
  },
  btntext: {
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.08,
    marginHorizontal: 8,
    borderRadius: width * 0.08,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.primary,

  },

});