import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import { Images } from '../../assets/Images';
import { fontsFamily } from '../../assets/Fonts';
import { colors } from '../../styles/colors';

const { width } = Dimensions.get('window');

const Header = ({
  handleRightBtn,
  title,
  showRightBtn,
  icon,
  iconText,
  onBack,
  textStyle,
  headerContainer,
  iconStyle,
  rightIconStyle,
}) => {
  return (
    <View style={{ ...styles.container, ...headerContainer }}>
      <TouchableOpacity onPress={onBack} style={{ flex: 0.2 }}>
        <Image
          source={Images.newBackArrow}
          resizeMode="contain"
          style={{ width: width * 0.085, height: width * 0.085, ...iconStyle }}
        />
        {/* <Image source={Images.newBackArrow} style={{width:30, height:30, resizeMode:'contain'}}/> */}
      </TouchableOpacity>
      <View style={{ flex: 0.9, alignItems: 'center' }}>
        <CustomText
          fontWeight={fontsFamily.bold}
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{ ...styles.title, ...textStyle }}>
          {title}
        </CustomText>
      </View>
      <TouchableOpacity
        onPress={handleRightBtn}
        style={{ flex: 0.2, alignItems: 'center' }}>
        {showRightBtn &&
          (icon ? (
            <Image
              source={icon}
              resizeMode="contain"
              style={{ width: width * 0.085, height: width * 0.085, ...rightIconStyle }}
            />
          ) : (
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={{ color: colors.primary, fontSize: width * 0.028 }}>
              {iconText}
            </CustomText>
          ))}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: width * 0.05,
    marginBottom: width * 0.02,
  },
  title: {
    fontSize: width * 0.047,
    color: colors.black,
    fontWeight: '600',
  },
});
