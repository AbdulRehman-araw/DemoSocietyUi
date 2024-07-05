import {StyleSheet, Dimensions} from 'react-native';
import { colors } from '../../../styles/colors';


const {width, height} = Dimensions.get('window');

export default styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:colors.white
  },
topView:{
  flexDirection:"row",
  justifyContent:"space-between",
},
iconStyle:{
  width:width * 0.06,height:width*0.06
},

});