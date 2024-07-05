import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../styles/colors';


const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.038,
  },
  iconStyle: {
    width: width * 0.06,
    height: width * 0.06
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: width * 0.025
    // paddingHorizontal: width * 0.038,
  },
  accordion: {
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: width * 0.038,
    paddingVertical: width * 0.03,
    marginVertical: width * 0.01,
  },
  communityIconStyle: {
    width: width * 0.06,
    height: width * 0.06
  },
  dropdownIconStyle: {
    width: width * 0.03,
    height: width * 0.03
  },
  residence: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingHorizontal: width * 0.045,
    paddingVertical: width * 0.01,
    marginVertical: width * 0.01,
  },
  profileAvatar: {
    width: width * 0.08,
    height: width * 0.08
  },
});
