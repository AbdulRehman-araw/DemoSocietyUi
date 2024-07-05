import {StyleSheet, Dimensions} from 'react-native';
import { fontsFamily } from '../../../../assets/Fonts';
import { colors } from '../../../../styles/colors';


const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  additionalText:{
    color:colors.primary,
    fontSize:width * 0.032,
  },  
  signUpWithOtp:{
    width:'100%',
    // backgroundColor:'red',
    paddingVertical:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  otpText:{
    fontFamily:fontsFamily.medium,
    color:colors.primary,
    fontSize:width*0.04
  },
  
});