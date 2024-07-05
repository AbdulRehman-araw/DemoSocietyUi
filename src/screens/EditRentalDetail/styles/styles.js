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
      marginTop: 30,
      borderRadius: 10,
      backgroundColor: colors.lightoffwhite,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltext:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.033,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfield:{
      height:width*0.09,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.032,
      marginTop:2,
      marginLeft:11,     

    },
    labelContainer: {
      marginLeft: 30,
      paddingHorizontal: 25, 
      marginStart: 10, 
      zIndex: 1, 
      elevation: 1, 
      shadowColor: colors.white, 
      position: "absolute", 
      top: -5, 
      marginTop:52,
  
    },
    rentaldetailstyle:{
      color: colors.black, 
      fontSize:width*0.039,
      marginTop:10,
      

    },
    rentalstyle:{
        color: colors.black, 
        fontSize:width*0.039,
        marginTop:15,
        marginLeft:15
  
    },
     
    label2:{
      marginLeft: 25,
      paddingHorizontal: 25, 
      marginStart: 10, 
      zIndex: 1, 
      elevation: 1, 
      shadowColor: colors.white, 
      position: "absolute", 
      top: -5, 
      marginTop:18,
  
    },
    input2: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      marginTop: 25,
      borderRadius: 10,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltext2:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.033,
      fontWeight:"bold",
      marginTop:4

    },
    textinputfield2:{
      height:width*0.09,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.032,
      marginLeft:11,
      marginTop:3,
      

    },
    label3:{
      marginLeft: 25,
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
      marginTop: 20,
      borderRadius: 10,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltext3:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.033,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfield3:{
      height:width*0.09,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.032,
      marginLeft:11,
      marginTop:4

    },
    label4:{
      marginLeft: 25,
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
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltext4:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.031,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfield4:{
      height:width*0.09,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.032,
      marginLeft:15,
      marginTop:3

    },
    label5:{
      marginLeft: 25,
      paddingHorizontal: 25, 
      marginStart: 10, 
      zIndex: 1, 
      elevation: 1, 
      shadowColor: colors.white, 
      position: "absolute", 
      top: -5, 
      marginTop: 15,
  
    },
    input5: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      marginTop: 20,
      borderRadius: 10,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltext5:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.032,
      fontWeight:"bold",
      marginTop:2

    },
    textinputfield5:{
      height:width*0.09,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.033,
      marginLeft:15,
      marginTop:4

    },
  
    label6:{
      marginLeft: 25,
      paddingHorizontal: 25, 
      marginStart: 10, 
      zIndex: 1, 
      elevation: 1, 
      shadowColor: colors.white, 
      position: "absolute", 
      top: -5, 
      marginTop: 15,
  
    },
    input6: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      marginTop: 20,
      borderRadius: 10,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltext6:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.032,
      fontWeight:"bold",
      marginTop:1

    },
    textinputfield6:{
      height:width*0.09,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.032,
      marginLeft:15,
      marginTop:4

    },
    
    label7:{
      marginLeft: 25,
      paddingHorizontal: 25, 
      marginStart: 10, 
      zIndex: 1, 
      elevation: 1, 
      shadowColor: colors.white, 
      position: "absolute", 
      top: -5, 
      marginTop: 15,
  
    },
    input7: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      marginTop: 20,
      borderRadius: 10,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltext7:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.032,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfield7:{
      height:width*0.09,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.031,
      marginLeft:15,
      marginTop:4

    },
         
  
  
  });
  
  
  
