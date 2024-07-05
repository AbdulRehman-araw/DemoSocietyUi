import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")


export const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor:colors.white,
  },
  viewimages:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center",
    width:'85%',
    height:width*0.10,
    marginTop:20,
    marginLeft:20       
},

communitytext:{
  color: colors.black, 
  fontSize: width * 0.038,
  marginTop:10,
  marginLeft:15
},
services:{
  backgroundColor:colors.lightoffwhite,
  width:width,
  height:width*0.10,
  marginTop:10
},
servicestext:{
  color: colors.black, 
  fontSize: width * 0.040,
  marginTop:10,
  marginLeft:15
},
pestcontroltext:{
  color: colors.black, 
  fontSize: width * 0.026,
  marginTop:10,
  marginLeft:8
},
cleaningtext:{
  color: colors.black, 
  fontSize: width * 0.026,
  marginTop:10,
},
laundrytext:{
  color: colors.black, 
  fontSize: width * 0.026,
  marginTop:10,
  
},
blindstext:{
  color: colors.black, 
  fontSize: width * 0.026,
  marginTop:10,
},
viewtext:{
  flexDirection:'row',
  justifyContent:'space-between'
}

});

