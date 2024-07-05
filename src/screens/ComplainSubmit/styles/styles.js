import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../styles/colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal:width * 0.034
  },
  subText: {
    alignSelf: 'center',
    fontSize: width * 0.037,
    color: colors.darkGray,
    marginVertical:5
  },
  btnStyle: {
    padding: width * 0.03,
    marginHorizontal:width * 0.05,
    marginTop:10
  },
  viewimg: {
    width: width / 3,
    alignSelf: 'center',
    flex: 0.45,
  },
  centertext: {
    color: colors.primary,
    fontSize: width * 0.054,
    alignSelf: 'center',
    marginTop: 5,
  },
});
