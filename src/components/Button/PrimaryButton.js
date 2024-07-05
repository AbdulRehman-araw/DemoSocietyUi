import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import { colors } from '../../styles/colors';
import { fontsFamily } from '../../assets/Fonts';
import { ActivityIndicator } from 'react-native';
import { Images } from '../../assets/Images';

const { width } = Dimensions.get('window');

const PrimaryButton = ({
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
      style={[outlined ? styles.outlineBtn : styles.buttonStyle, customStyle]}>
      {loader ? (
        <ActivityIndicator size={'small'} color={colors.white} />
      ) : (
        <View style={styles.row}>
          <View style={{ flex: 0.8, alignItems: "center" }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={{
                ...(outlined ? styles.outlineTitle : styles.titleStyle),
                ...textStyle,
              }}>
              {title}
            </CustomText>
          </View>
          <Image source={Images.logo} style={styles.btnArrow} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    // alignItems: 'center',
    marginTop: 15,
    paddingVertical: 4,
    maxWidth: '70%',
    minWidth:'70%'
  },
  outlineBtn: {
    borderRadius: 18,
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightRed,
    paddingVertical: 6
  },
  titleStyle: {
    color: colors.white,
    fontSize: width * 0.038,
  },
  outlineTitle: {
    color: colors.lightRed,
    fontSize: width * 0.038,
  },
  row: {
    flexDirection: 'row', alignItems: 'center',
  },
  btnArrow: {
    width: 30, height: 30, resizeMode: 'contain'
  }
});
