import { Dimensions, Platform, StyleSheet } from "react-native";
import { fontsFamily } from "../../../assets/Fonts";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")



export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: width * 0.03
  },
  water: {
    flexDirection: 'row',
    alignItems: "center",
    width: width * 0.80,
    alignSelf: 'center',
    // backgroundColor:'red',
    paddingVertical: width * 0.02
    , paddingHorizontal: width * 0.01
    // height:width*0.15,
    // marginTop:40,
    // marginLeft:20
  },
  electric: {
    flexDirection: 'row',
    alignItems: "center",
    width: width * 0.86,
    height: width * 0.15,
    marginTop: 10,
    marginLeft: 20
  },
  elevator: {
    flexDirection: 'row',
    alignItems: "center",
    width: width * 0.86,
    height: width * 0.15,
    marginTop: 10,
    marginLeft: 20
  },
  maintenance: {
    flexDirection: 'row',
    alignItems: "center",
    width: width * 0.86,
    height: width * 0.15,
    marginTop: 10,
    marginLeft: 20
  },
  modalMain: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    marginTop: Platform.OS == "ios" ? 50 : 0
  },
  ImageCon: {
    width: width,
    height: height * 0.9,
    // backgroundColor:colors.black
  },
  img: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: width,
    alignSelf: 'center',
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.02,
    backgroundColor: colors.docHeader,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0
  },
  HeaderCross: {
    width: width * 0.04,
    height: width * 0.04,
  },
  HeaderDownload: {
    width: width * 0.05,
    height: width * 0.05,
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',

  },
  upperCon: {
    width: '100%'
  },
  textMainCon: {
    width: '100%',
    alignSelf: 'center'
  },
  textTitle: {
    color: colors.black,
    fontSize: width * 0.04,
    marginVertical: width * 0.05
  },
  textInput: {
    width: '100%',
    borderColor: colors.gray,
    borderWidth: 1,
    color: colors.black,
    borderRadius: width * 0.02,
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.03,
    fontFamily: fontsFamily.regular,
    fontSize: width * 0.03
  },
  addAttach: {
    width: '100%',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: width * 0.03,
    paddingLeft: width * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  browse: {
    fontSize: width * 0.032,
    color: colors.gray,
    width: width * 0.75,
  },
  browseImgCon: {
    width: width * 0.13,
    height: width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderTopRightRadius: width * 0.03,
    borderBottomRightRadius: width * 0.03,
  }
});