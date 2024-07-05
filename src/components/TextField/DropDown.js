import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment} from 'react';
import {colors} from '../../styles/colors';
import {Images} from '../../assets/Images';
import {Controller} from 'react-hook-form';
import {Error} from '../UI/Error';
import CustomText from '../CustomText';
import {fontsFamily} from '../../assets/Fonts';

const {width} = Dimensions.get('window');

export default function DropDown({
  name,
  control,
  rules = {},
  title,
  changeSecureTextEntry,
  showEyeIcon,
  secureTextEntry,
  img,
  onChange,
  variant,
  rightIconImg,
  showRightIcon,
  containerStyle,
  onPress,
  leftIconStyle,
  coma,
}) {
  return (
    <View style={{marginVertical: width * 0.02}}>
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <TouchableOpacity
              onPress={onPress}
              style={[
                styles.inputContainer,
                variant == 'outlined' ? styles.outlined : styles.filled,
              ]}
              activeOpacity={0.8}>
              {img && (
                <Image
                  style={[styles.leftIcon, leftIconStyle]}
                  source={img}
                  resizeMode="contain"
                />
              )}
              <View style={{flex: 1}}>
                <CustomText
                  children={
                    coma ? (value ? value + ' ' : title) : value ? value : title
                  }
                  style={{
                    paddingVertical:
                      Platform.OS == 'ios' ? width * 0.034 : width * 0.036,
                    color:
                      variant == 'outlined' ? colors.black : colors.primary,
                  }}
                  fontWeight={fontsFamily.regular}
                />
              </View>

              <View style={{flex: 0.1, alignItems: 'center'}}>
                <Image
                  style={styles.rightIcon}
                  source={Images.dropDown}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            {error && <Error>{error.message}</Error>}
          </>
        )}
        name={name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: width * 0.02,
  },
  filled: {
    backgroundColor: colors.primaryLight,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.gray,
  },
  imgStyle: {
    width: 18,
    height: 18,
    marginHorizontal: 8,
    left: 10,
    opacity: 0.6,
  },
  inputStyle: {
    color: colors.black,
    fontSize: width * 0.032,
    paddingVertical: Platform.OS == 'ios' ? width * 0.034 : width * 0.024,
  },
  leftIcon: {
    flex: 0.1,
    width: width * 0.04,
    height: width * 0.04,
    paddingHorizontal: 8,
  },
  rightIcon: {
    width: width * 0.03,
    height: width * 0.03,
  },
});
