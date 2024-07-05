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
      marginLeft: 30,
      paddingHorizontal: 15, // Amount of spacing between border and first/last letter
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
      marginLeft: 25,
      paddingHorizontal: 15, 
      marginStart: 10, 
      zIndex: 1, 
      elevation: 1, 
      shadowColor: colors.white, 
      position: "absolute", 
      top: -5, 
      marginTop:28,
  
    },
    input2: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      marginTop: 35,
      borderRadius: 10,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
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
      marginLeft: 25,
      paddingHorizontal: 15, 
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
      marginLeft: 25,
      paddingHorizontal: 15, 
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
      fontSize:width*0.034,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfield4:{
      height:width*0.11,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.045,

    },
    label5:{
      marginLeft: 25,
      paddingHorizontal: 15, 
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
      fontSize:width*0.034,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfield5:{
      height:width*0.11,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.045,

    },
  
    label6:{
      marginLeft: 25,
      paddingHorizontal: 15, 
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
      fontSize:width*0.034,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfield6:{
      height:width*0.11,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.045,

    },
    
    label7:{
      marginLeft: 25,
      paddingHorizontal: 15, 
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
      fontSize:width*0.034,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfield7:{
      height:width*0.11,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.045,

    },
    labelFrom:{
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
    inputFrom: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      marginTop: 20,
      borderRadius: 10,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltextFrom:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.034,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfieldFrom:{
      height:width*0.11,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.045,

    },
    labelTo:{
      marginLeft:25,
      paddingHorizontal: 15, 
      marginStart: 10, 
      zIndex: 1, 
      elevation: 1, 
      shadowColor: colors.white, 
      position: "absolute", 
      top: -5, 
      marginTop: 15,
  
    },
    inputTo: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      marginTop: 20,
      borderRadius: 10,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltextTo:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.034,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfieldTo:{
      height:width*0.11,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.045,

    },
    labelresgiatration:{
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
    inputresgiatration: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      marginTop: 20,
      borderRadius: 10,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltextresgiatration:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.034,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfieldresgiatration:{
      height:width*0.11,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.045,

    },
    labelWorker:{
      marginLeft: 25,
      paddingHorizontal: 15, 
      marginStart: 10, 
      zIndex: 1, 
      elevation: 1, 
      shadowColor: colors.white, 
      position: "absolute", 
      top: -5, 
      marginTop: 20,
  
    },
    inputWorker: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      marginTop: 25,
      borderRadius: 10,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltextWorker:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.034,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfieldWorker:{
      height:width*0.11,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.045,

    },
    labelWorkername:{
      marginLeft: 25,
      paddingHorizontal: 15, 
      marginStart: 10, 
      zIndex: 1, 
      elevation: 1, 
      shadowColor: colors.white, 
      position: "absolute", 
      top: -5, 
      marginTop: 15,
  
    },
    inputWorkername: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      marginTop: 20,
      borderRadius: 10,
      borderColor: colors.lightgray,
      marginHorizontal: width * 0.05,
  
    },
    labeltextWorkername:{
      color: colors.black, 
      backgroundColor: colors.white, 
      fontSize:width*0.034,
      fontWeight:"bold",
      marginTop:3

    },
    textinputfieldWorkername:{
      height:width*0.11,
      fontFamily: "Montserrat-Bold", 
      fontSize: width * 0.045,

    },
    
      
  
  
  });
  
  
  
