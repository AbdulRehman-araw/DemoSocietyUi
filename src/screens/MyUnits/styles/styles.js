import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../styles/colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  viewbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: width * 0.025,
    width: width * 0.4,
    alignSelf: 'center',
  },
  residentuser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.2,
    borderRadius: 5,
    // width: width * 0.86,
    // height: width * 0.15,
    paddingHorizontal: width * 0.01,
    marginVertical: width * 0.02,
  },

  viewall: {
    justifyContent: 'space-around',
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.01,
  },
  viewname: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: width * 0.016,
  },
  userheading: {
    color: colors.black,
    fontSize: width * 0.04,
    marginBottom: width * 0.02,
  },
  username: {
    color: colors.primary,
    fontSize: width * 0.04,
  },
  useremail: {
    color: colors.primary,
    fontSize: width * 0.04,
    paddingRight: width * 0.1,
  },
  name: {
    color: colors.lightdarkgray,
    fontSize: width * 0.024,
  },
});
