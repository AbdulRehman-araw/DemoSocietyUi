import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")


export const styles = StyleSheet.create({

  userimage: {
    marginVertical: width * 0.20,
    marginLeft: 10,
    marginLeft: 40,
    height: height * 0.125,
    width: width * 0.80,
    borderRadius: 20,

  },
  viewcard: {
    width: "100%",
    flex: 1,
    paddingHorizontal: width * 0.07,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.white,
    borderColor: colors.lightoffwhite,
    // position: "absolute",
    // top: 300
  },
  viewall: {
    marginVertical: width * 0.015,
  },
  viewnumber: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: width * 0.01
  },
  imgBG_Color: {
    backgroundColor: colors.lightgreen, borderRadius: 20, alignItems: 'center', justifyContent: 'center'
  },
  viewaddress: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  viewtime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewphone: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
    marginTop: 25
  },
  number: {
    color: colors.black,
    fontSize: width * 0.037,
    marginLeft: 10
  },
  address: {
    color: colors.black,
    fontSize: width * 0.037,
    marginLeft: 10
  },
  time: {
    color: colors.black,
    fontSize: width * 0.037,
    marginLeft: 10
  },
  viewdetail: {
    color: colors.black,
    fontSize: width * 0.033,

  },
});

