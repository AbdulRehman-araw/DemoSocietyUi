import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../styles/colors';


const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    elevation:6

  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingVertical: width * 0.06,


  },
  cont: {
    paddingHorizontal: width * 0.04,
    paddingBottom: width * 0.2,
    marginTop: height * 0.06
  },
  iconStyle: {
    width: width * 0.08,
    height: width * 0.08,
  },
  iconimg: {
    width: width * 0.3,
    height: width * 0.3,
  },
  viewcard: {
    paddingHorizontal: width * 0.03,
    // marginHorizontal: width * 0.08,

    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderColor: colors.gray,
    elevation: 1,
  },
  viewemail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: width * 0.02,
  },

  emailaddress: {
    color: colors.black,
    fontSize: width * 0.036,
  },
  email: {
    color: colors.black,
    fontSize: width * 0.03,
  },
  viewphone: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: width * 0.12,
  },
  phonename: {
    color: colors.lightgray,
    fontSize: width * 0.034,
    marginLeft: 20
  },
  phonenumber: {
    color: colors.black,
    fontSize: width * 0.038,
    marginLeft: 20
  },
  viewpassword: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: width * 0.12,
  },
  passwordname: {
    color: colors.black,
    fontSize: width * 0.036,
    marginLeft: 20
  },
  password: {
    color: colors.black,
    fontSize: width * 0.032,
    marginLeft: 20
  },
  viewTerms: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: width * 0.12,
  },
  termsname: {
    color: colors.black,
    fontSize: width * 0.034,
    marginLeft: 20
  },
  viewprivacy: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: width * 0.12,
  },
  privacyname: {
    color: colors.black,
    fontSize: width * 0.034,
    marginLeft: 22
  },
  viewlogout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    height: width * 0.12,
  },
  logoutname: {
    color: colors.black,
    fontSize: width * 0.036,
    marginLeft: 22
  },


});