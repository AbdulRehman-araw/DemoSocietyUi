import { Dimensions, StyleSheet } from "react-native";
import { fontsFamily } from "../../../assets/Fonts";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:colors.white,
    // marginHorizontal:width * 0.032,

  },
  noData:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  noDataText:{
    fontFamily:fontsFamily.medium,
    fontSize:width*0.04,
    color:colors.black
  },
  btnStyle: {
    padding: width * 0.03,
    marginHorizontal:width * 0.01,
    marginTop:50
  },
});