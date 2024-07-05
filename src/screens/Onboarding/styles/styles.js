import {StyleSheet, Dimensions} from 'react-native';
import { fontsFamily } from '../../../assets/Fonts';
import { colors } from '../../../styles/colors';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems:'center',
    justifyContent:'center'
  },

  contStyle: {
    marginTop: height * 0.04,
    paddingBottom: height * 0.04,
  },
  bottomImage:{
    height:width*0.4,
    width:width*0.4,
    position:'absolute',
    bottom:0
  },
  img:{
    height:'100%',
    width:'100%'
  },
  centerImg:{
    height:width*0.4,
    width:width*0.4
  },
  TopBar:{
    width:width*0.95,
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'flex-end',
    // marginTop:width*0.02
  },
  TopBarLeftImg:{
    width:width*0.35,
    height:width*0.1
  },
  TopBarLeftText:{
    textTransform:"capitalize",
    fontFamily:fontsFamily.semiBold,
    color:colors.primary,
    fontSize:width*0.035,
    right:width*0.02,
    opacity:0.7
  },


});