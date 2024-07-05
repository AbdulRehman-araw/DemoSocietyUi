import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../styles/colors';


const { width } = Dimensions.get('window');

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconStyle: {
    width: width * 0.06, height: width * 0.06,
    marginRight: 10
  },
  arrow: {
    width: 16, height: 16, resizeMode: 'contain',
    transform: [{ scaleX: -1 }]
  }

});
