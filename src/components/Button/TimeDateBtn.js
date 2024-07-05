import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import {fontsFamily} from '../../assets/Fonts';
import {colors} from '../../styles/colors';
import {Image} from 'react-native';
import {Images} from '../../assets/Images';
import {View} from 'react-native';
import {Platform} from 'react-native';

const {width} = Dimensions.get('window');

const TimeDateBtn = ({
  setOpen,
  variant,
  prefixIcon,
  icon,
  title,
  showRightIcon,
  rightIconImg,
  rightIconStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("opennnn");
        setOpen(true)
      }}
      style={{
        ...styles.btnStyle,
        // width: variant == 'light' ? width * 0.45 : width * 0.42,
        borderColor: variant == 'light' ? colors.gray : colors.white,
        borderRadius: variant == 'light' ? 12 : 8,
        backgroundColor:
          variant == 'light' ? colors.white : colors.primaryLight,
        flex: 1,
      }}>
      {prefixIcon ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!showRightIcon && (
            <View style={styles.img}>
              <Image
                source={icon ? icon : Images.calendar}
                resizeMode="contain"
                style={{height: '100%', width: '100%'}}
              />
            </View>
          )}
          <View style={{flex: 1, marginLeft: showRightIcon ? 0 : 10}}>
            <CustomText
              fontWeight={fontsFamily.regular}
              style={{
                ...styles.textStyle,
                color: variant == 'light' ? colors.black : colors.primary,
              }}>
              {title}
            </CustomText>
          </View>
          {showRightIcon && (
            <View>
              <Image
                style={[styles.rightIcon, rightIconStyle]}
                source={rightIconImg}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      ) : (
        <CustomText
          fontWeight={fontsFamily.regular}
          style={{...styles.textStyle, color: colors.primary}}>
          Date
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default TimeDateBtn;

const styles = StyleSheet.create({
  btnStyle: {
    borderWidth: 1,
    marginVertical: 10,
    justifyContent: 'center',
    height: width * 0.12,
    paddingHorizontal: 7,
  },
  textStyle: {
    fontSize: width * 0.032,
    color: colors.darkGray,
  },
  img: {
    width: 30,
    height: 30,
  },
  rightIcon: {
    width: width * 0.04,
    height: width * 0.04,
  },
});
