import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")



export const styles = StyleSheet.create({


    line:{
        borderBottomWidth: 1,
        borderColor: colors.lightoffwhite,
        shadowColor: "#4d4d4d",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.8,
        shadowRadius: 13.10,
        elevation: 10,
        marginTop: 5,
        
     },
     btn:{
        borderWidth:1,
        borderRadius:10,
        backgroundColor:colors.primary,
        width:width*0.90,
        height:width*0.15,
        marginTop:40,
        marginLeft:5,  

     },
     btn2:{
        borderWidth:1,
        borderRadius:10,
        backgroundColor:colors.white,
        width:width*0.90,
        height:width*0.15,
        marginTop:22,
        marginLeft:5,
          
     },
     viewtextimg:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:3
     },
     img:{
        width: width * 0.16,
        height:width*0.07,
        marginTop:10,
        tintColor:colors.black
     },
     txt:{
        color: colors.primary,
        fontSize: width * 0.038,
        marginTop:10,
        alignItems:'center'
     },
     txt1:{
        color: colors.primary,
        fontSize: width * 0.038,
        marginTop:10,
        alignItems:'center'
     },
     viewtext:{
        color: colors.black,
        fontSize: width * 0.050,
        marginLeft:10,
        marginTop:55,
        alignItems:'center'
     },
     viewtext2:{
        color: colors.black,
        fontSize: width * 0.050,
        marginLeft:10,
        marginTop:10,
        alignItems:'center'
     },
     bullet:{
      borderWidth:1,
      width:25,
      height:25,
      borderRadius:25,
      borderColor:colors.gray,
      alignItems:"center",
      justifyContent:"center"
    },
    bulletSelected:{
      width:17,
      height:17,
      borderRadius:25,
    }
    
    
    
     
    })