import {StyleSheet, Dimensions} from 'react-native';
import { colors } from '../../../styles/colors';


const {width, height} = Dimensions.get('window');


export const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor:colors.white,
      paddingHorizontal: width * 0.032,
      justifyContent:'center',
      alignItems:'center'
    },
    text:{
    marginTop:10,
    alignSelf:'center',
    marginLeft:5,
    fontSize: width * 0.031,
    color:colors.black,
    textAlign:'center'
    },
    btn:{
    padding:width * 0.03,
    width:width*0.32,
    height:width*0.11,
    alignSelf:'center',
    margin:10,   
    },
    viewbtn:{
    flexDirection:'row',
    alignSelf:'center',
    marginTop:20,
    },
    viewimg:{
    alignSelf: 'center',
    marginVertical:20,
    height:width*0.40,
    width:width*0.40
  },
    centertext:{
    color: colors.primary,
    fontSize: width * 0.055,
    alignSelf:"center",
    },
     
    });