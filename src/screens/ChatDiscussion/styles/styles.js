import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")



export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:colors.white,
  },
  discussion1:{
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center",
    width:width*0.86,
    height:width*0.15,
    marginTop:20,

  },
 viewdescription: {
    width: width*0.85,
    height:width*0.45,
    borderRadius: 10,
    borderColor: colors.gray,
    borderWidth: 1,
    alignSelf:"center",
    marginTop:15
  },
  inputdescription: {
  fontFamily: 'OpenSans-Medium',
  fontSize: width*0.044,
  fontWeight:"bold",
  marginLeft:10,
  color:colors.gray,
     
  },
  viewtitle: {
    width: width*0.85,
    height:width*0.11,
    borderRadius: 10,
    borderColor: colors.gray,
    borderWidth: 0.8,
    alignSelf:"center",
    marginTop:25
  },
  inputtitle: {
  fontFamily: 'OpenSans-Medium',
  fontSize: width*0.042,
  fontWeight:"bold",
  marginLeft:10,
  color:colors.gray
  },
  

});