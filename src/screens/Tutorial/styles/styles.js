import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:colors.white,
    // backgroundColor: "rgba(255,255,255,0.4)",
  },
  viewcenter:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:5
  },
  namestyle:{
    marginTop:30,
    marginLeft:10,
    fontSize: width * 0.028,
    color:colors.primary

  },
  styletext:{
    marginTop:5,
    alignSelf:'center',
    fontSize: width * 0.038
  },

  
});