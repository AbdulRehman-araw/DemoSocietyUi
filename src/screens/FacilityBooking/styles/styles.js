import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")



export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:colors.white,
  },
  card1:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
    alignSelf:'center',
    borderWidth:1.3,
    borderColor:colors.gray,
    borderRadius:8,
    width:width*0.86,
    height:width*0.15,
    marginTop:20,
    
    
},
card2:{
  flexDirection:'row',
  justifyContent:"space-between",
  alignItems:"center",
  alignSelf:'center',
  borderWidth:1.5,
  borderColor:colors.lightoffwhite,
  borderRadius:8,
  width:width*0.86,
  height:width*0.15,
  marginTop:15
  
},
card3:{
  flexDirection:'row',
  justifyContent:"space-between",
  alignItems:"center",
  alignSelf:'center',
  borderWidth:1.5,
  borderColor:colors.lightoffwhite,
  borderRadius:8,
  width:width*0.86,
  height:width*0.15,
  marginTop:15
  
},
card4:{
  flexDirection:'row',
  justifyContent:"space-between",
  alignItems:"center",
  alignSelf:'center',
  borderWidth:1.5,
  borderColor:colors.lightoffwhite,
  borderRadius:8,
  width:width*0.86,
  height:width*0.15,
  marginTop:15
  
},
card5:{
  flexDirection:'row',
  justifyContent:"space-between",
  alignItems:"center",
  alignSelf:'center',
  borderWidth:1.5,
  borderColor:colors.lightoffwhite,
  borderRadius:8,
  width:width*0.86,
  height:width*0.15,
  marginTop:15
  
},
card6:{
  flexDirection:'row',
  justifyContent:"space-between",
  alignItems:"center",
  alignSelf:'center',
  borderWidth:1.5,
  borderColor:colors.lightoffwhite,
  borderRadius:8,
  width:width*0.86,
  height:width*0.15,
  marginTop:15
  
},




});