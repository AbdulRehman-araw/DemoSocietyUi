import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../styles/colors';


const { width, height } = Dimensions.get('window');


export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  viewbtnssubmit: {
    backgroundColor: colors.primary,
    height: width * 0.12,
    width: width * 0.70,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 25

  },
  textbtnssubmit: {
    color: colors.white,
    fontSize: width * 0.049,
    marginTop: 8,
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular',

  },
  text1: {
    alignSelf: 'center',
    fontSize: width * 0.037
  },
  text2: {
    marginTop: 0,
    alignSelf: 'center',
    fontSize: width * 0.035,
    color: colors.lightgray,
    marginBottom:10

  },
  text3: {
    marginTop: 5,
    alignSelf: "center",
    fontSize: width * 0.035,
    color: colors.black,
    fontWeight: 'bold'
  },
  btn: {
    padding: width * 0.03,
    width: width * 0.68,
    height: width * 0.13,
    alignSelf: 'center'
  },
  viewimg: {
    width: width * 0.35,
    height: width * 0.35,
    alignSelf: 'center',

  },
  centertext: {
    color: colors.primary,
    fontSize: width * 0.054,
    alignSelf: "center",
    marginTop: 5
  },

});