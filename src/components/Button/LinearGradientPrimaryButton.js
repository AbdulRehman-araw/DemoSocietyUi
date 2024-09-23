import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import {colors} from '../../styles/colors';
import {fontsFamily} from '../../assets/Fonts';
import {ActivityIndicator} from 'react-native';
import {Images} from '../../assets/Images';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const LinearGradientPrimaryButton = ({
  title,
  onPress,
  outlined,
  customStyle,
  loader,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      disabled={loader ? true : false}
      activeOpacity={0.8}
      onPress={onPress}
      style={{width: '100%'}}>
      <LinearGradient
        colors={outlined ? [colors.white, colors.white] : colors.gradientColor}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[
          outlined ? styles.outlineBtn : styles.buttonStyle,
          styles.row,
          customStyle,
        ]}>
        {loader ? (
          <View style={{flex: 1, alignItems: 'center', paddingVertical: 16}}>
            <ActivityIndicator size={'small'} color={colors.white} />
          </View>
        ) : (
          <>
            <View style={{flex: 0.8, alignItems: 'center'}}>
              <CustomText
                fontWeight={fontsFamily.medium}
                style={{
                  ...(outlined ? styles.outlineTitle : styles.titleStyle),
                  ...textStyle,
                }}>
                {title}
              </CustomText>
            </View>
            <Image
              source={Images.btnArrow}
              style={{
                ...styles.btnArrow,
                tintColor: outlined && colors.primary,
              }}
            />
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LinearGradientPrimaryButton;

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 30,
    marginTop: 15,
    paddingVertical: 2,
    maxWidth: '100%',
    minWidth: '60%',
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 6,
    borderRadius: 30,
    marginTop: 15,
    paddingVertical: 2,
    maxWidth: '100%',
    minWidth: '60%',
  },
  titleStyle: {
    color: colors.white,
    fontSize: width * 0.034,
  },
  outlineTitle: {
    color: colors.lightRed,
    fontSize: width * 0.038,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnArrow: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginVertical: 8,
  },
});
