import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")



export const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor:colors.white,
    },
    viewbtnssubmit:{
    backgroundColor:colors.primary, 
    height: width*0.12, 
    width: width * 0.70,
    alignSelf:'center', 
    borderRadius: 8,
    marginTop:25 
    
    },
    textbtnssubmit:{
    color: colors.white,
    fontSize: width*0.049,
    marginTop:8,
    alignSelf:'center',
    fontFamily: 'Roboto-Regular',
    
    },
    text1:{
    alignSelf:'center',
    fontSize: width * 0.036,
    colors:colors.lightgray
    },
    text2:{
    marginTop:20,
    alignSelf:'center',
    fontSize: width * 0.035
     },
    text3:{
    marginTop:5,
    alignSelf:"center",
    fontSize: width * 0.035,
    color:colors.black,
    fontWeight:"bold"
    
    },
    textnum:{
    fontSize:width*0.032,
    color:colors.black,
    fontWeight:"bold"
    },
    btn:{
    padding:width * 0.03,
    width:width*0.77,
    height:width*0.13,
    alignSelf:'center',
    
    
    },
    viewimg:{
    width: width / 3,
    alignSelf: 'center',
    flex:0.65
    
    },
    centertext:{
    color: colors.primary,
    fontSize: width * 0.054,
    alignSelf:"center",
    marginTop:20
    },
    
    amounttext:{
        color: colors.primary,
        fontSize: width * 0.065,
        alignSelf:"center",
        marginTop:10
    },
    duesbtn:{
        borderWidth:1.6,
        borderColor:colors.primary,
        width:width*0.30,
        height:width*0.11,
        borderRadius:8,
        alignSelf:'center',
        marginTop:25
    },
    textdues:{
        textAlign:'center',
        marginTop:8,
        fontSize:width*0.034,
        color:colors.primary
    
    }
        
});
    