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
  },
  userimage: {
    marginVertical: width * 0.04,
  },
  viewall: {
    justifyContent: 'space-around',
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.01,
  },
  viewname: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: width * 0.016,
  },
  btnStyle: {
    marginVertical: width * 0.012,
    padding: width * 0.015,
    paddingHorizontal: width * 0.06,
    borderRadius: 1
  },
  viewhouse: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
    marginTop: 10
  },
  viewcard: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
    marginTop: 10,
  },
  viewphone: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
    marginTop: 10
  },
  viewemail: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
    marginTop: 5
  },
  viewvehicle: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
  },
  userheading: {
    color: colors.black,
    fontSize: width * 0.04,
    marginBottom: width * 0.02
  },
  username: {
    color: colors.primary,
    fontSize: width * 0.04,
  },
  name: {
    color: colors.lightdarkgray,
    fontSize: width * 0.024,
  },
  housename: {
    color: colors.lightdarkgray,
    fontSize: width * 0.028,
    marginLeft: 10
  },
  housenumber: {
    color: colors.primary,
    fontSize: width * 0.039,
    marginLeft: 10
  },
  cardname: {
    color: colors.lightdarkgray,
    fontSize: width * 0.028,
    marginLeft: 7
  },
  cardnumber: {
    color: colors.primary,
    fontSize: width * 0.039,
    marginLeft: 7
  },
  namenumber: {
    color: colors.lightdarkgray,
    fontSize: width * 0.028,
    marginLeft: 10
  },
  phonenumber: {
    color: colors.primary,
    fontSize: width * 0.040,
    marginLeft: 10
  },
  email: {
    color: colors.primary,
    fontSize: width * 0.040,
    marginLeft: 10
  },
  emailname: {
    color: colors.lightdarkgray,
    fontSize: width * 0.028,
    marginLeft: 10
  },
  namevehicle: {
    color: colors.lightdarkgray,
    fontSize: width * 0.028,
    marginLeft: 10
  },
  vehicle: {
    color: colors.primary,
    fontSize: width * 0.040,
    marginLeft: 10
  },
  residence: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingHorizontal: width * 0.025,
    paddingVertical: width * 0.02,
    marginVertical: width * 0.01,
    borderColor: colors.gray,
    borderWidth: width * 0.001,
    borderRadius: width * 0.01,
  },
});
