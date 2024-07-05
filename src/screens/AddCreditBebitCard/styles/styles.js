import {
    Dimensions,
    StyleSheet
  
  } from 'react-native';
  
  import { colors } from '../../../styles/colors';
  
  
  const { width, height } = Dimensions.get("window")
  
  
  
  export const styles = StyleSheet.create({
  
    input1: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      marginTop: 35,
      borderRadius: 10,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltext:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.034,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfield:{
      height:width*0.11,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.045,

    },
    labelContainer: {
      marginLeft: 20,
      paddingHorizontal: 20, // Amount of spacing between border and first/last letter
      marginStart: 10, // How far right do you want the label to start
      zIndex: 1, // Label must overlap border
      elevation: 1, // Needed for android
      shadowColor: colors.white, // Same as background color because elevation: 1 creates a shadow that we don't want
      position: "absolute", // Needed to be able to precisely overlap label with border
      top: -5, // Vertical position of label. Eyeball it to see where label intersects border.
      marginTop: 30,
  
    },
    Ownerstyle:{
      color: colors.black, 
      fontSize:width*0.039,
      marginTop:20,
      marginLeft:15

    },
    label2:{
      marginLeft: 2,
      paddingHorizontal: 25, 
      marginStart: 10, 
      zIndex: 1, 
      elevation: 1, 
      shadowColor: colors.white, 
      position: "absolute", 
      top: -5, 
      marginTop:15,
  
    },
    input2: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      marginLeft:5,
      width:width*0.40,
      height:width*0.14,
      marginTop: 20,
      borderRadius: 10,
      borderColor: colors.lightgray,
  
    },
    labeltext2:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.034,
      fontWeight:"bold",
      marginTop:4

    },
    textinputfield2:{
      height:width*0.11,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.045,

    },
  
    label3:{
      marginLeft: 2,
      paddingHorizontal: 25, 
      marginStart: 10, 
      zIndex: 1, 
      elevation: 1, 
      shadowColor: colors.white, 
      position: "absolute", 
      top: -5, 
      marginTop: 15,
  
    },
    input3: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      width:width*0.40,
      height:width*0.14,
      marginTop: 20,
      borderRadius: 10,
      borderColor: colors.lightgray,
  
    },
    labeltext3:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.034,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfield3:{
      height:width*0.11,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.045,

    },
  
    label4:{
      marginLeft: 20,
      paddingHorizontal: 25, 
      marginStart: 10, 
      zIndex: 1, 
      elevation: 1, 
      shadowColor: colors.white, 
      position: "absolute", 
      top: -5, 
      marginTop: 15,
  
    },
    input4: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      marginTop: 20,
      borderRadius: 10,
      height:width*0.15,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltext4:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.034,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfield4:{
      height:width*0.11,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.045,

    },
  
  
  });
  
  
  
