import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")


export const styles = StyleSheet.create({

  card: {
    marginVertical: width * 0.75,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.086,
    width: width * 0.85,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: colors.primary,
    position: "absolute",
    top: -10
  },
  datetime: {
    marginTop: width * 0.08,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: width * 0.025,
    width: width * 0.3,

  },
  viewbtn1: {
    flexDirection: 'row',
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.white,
    width: width * 0.31,
    marginTop: 20,
    height: width * 0.11,
    marginLeft: 20,
    borderRadius: 10
  },
  imageOverlay: {
    backgroundColor: colors.black,
    width: width,
    height: width * 0.82,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
  },


  card: {
    marginVertical: width * 0.75,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.086,
    width: width * 0.85,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: colors.primary,
    position: "absolute",
    top: -10
  },
  datetime: {
    marginTop: width * 0.08,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: width * 0.025,
    width: width * 0.4,

  },
  viewbtn1: {
    flexDirection: 'row',
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.white,
    width: width * 0.31,
    marginTop: 20,
    height: width * 0.11,
    marginLeft: 20,
    borderRadius: 10
  },
  imageOverlay: {
    backgroundColor: colors.black,
    width: width,
    height: width * 0.82,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
  },


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

  root: {
    flex: 1,
    backgroundColor: colors.white,
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
    width: width * 0.91,
    height: width * 0.55,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopWidth: 1,
    marginTop: 0
  },
  imageOverlay: {
    backgroundColor: colors.black,
    width: width,
    height:width * 0.82,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
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









 






