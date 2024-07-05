import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")


export const styles= StyleSheet.create({
  
  code1:{
      flexDirection:'row',
      alignItems:"center",
      borderWidth:1,
      marginTop:10,
      borderRadius:10,
      borderColor:colors.lightgray,
      width:width*0.13,
      height:width*0.13,
      marginHorizontal:width*0.02,
      
  },
  code2:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
    borderWidth:1,
    borderRadius:10,
    borderColor:colors.lightgray,
    width:width*0.13,
    height:width*0.13,
    marginHorizontal:width*0.02,
    marginTop:8
  
  },
  code3:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
    borderWidth:1,
    borderRadius:10,
    borderColor:colors.lightgray,
    width:width*0.13,
    height:width*0.13,
    marginHorizontal:width*0.02,
    marginTop:8
 },
 code4:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
    borderWidth:1,
    marginTop:8,
    borderRadius:10,
    borderColor:colors.lightgray,
    width:width*0.13,
    height:width*0.13,
    marginHorizontal:width*0.02,
 
 },
 
  
});
