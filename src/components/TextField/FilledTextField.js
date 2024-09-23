import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Fragment } from 'react';
import { colors } from '../../styles/colors';
import { Images } from '../../assets/Images';
import { Controller } from 'react-hook-form';
import { Error } from '../UI/Error';
import { fontsFamily } from '../../assets/Fonts';

const { width } = Dimensions.get('window');

const FilledTextField = ({
  name,
  control,
  rules = {},
  maxLength,
  onSubmitEditing,
  editable,
  changeSecureTextEntry,
  blurOnSubmit,
  showEyeIcon,
  secureTextEntry,
  multiline,
  placeholder,
  img,
  type,
  onFocus,
  variant,
  rightIconImg,
  showRightIcon,
  customInputStyle,
  containerStyle,
  leftIconStyle,
  rightIconStyle,
  lines,
  justChange,
  showDeleteIcon,
  defaultValue,
  isLeftSearch,
  isCalender
}) => {
  return (
    <View style={{ marginVertical: width * 0.02 }}>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Fragment>
            <View style={[styles.inputContainer, containerStyle, variant == "outlined" ? styles.outlined : styles.filled]}>
              {img && (
                <Image
                  style={[styles.leftIcon, leftIconStyle]}
                  source={img}
                  resizeMode="contain"
                />
              )}
              {showRightIcon && isLeftSearch && (
                <View
                  style={{ flex: 0.1, alignItems: "center" }}>
                  <Image style={[styles.rightIcon, rightIconStyle]} source={rightIconImg} resizeMode="contain" />
                </View>
              )}
              <TextInput
                editable={editable}
                secureTextEntry={secureTextEntry}
                onChangeText={(e) => {
                  onChange(e);
                  if (justChange) {
                    justChange(e)
                  }
                }}
                onBlur={onBlur}
                blurOnSubmit={blurOnSubmit}
                onFocus={onFocus}
                value={defaultValue ? defaultValue : value}
                onSubmitEditing={onSubmitEditing}
                keyboardType={type}
                placeholder={placeholder}
                placeholderTextColor={variant == "outlined" ? colors.darkGray : colors.primary}
                style={[styles.inputStyle, customInputStyle, { flex: showEyeIcon ? 0.9 : 1, textAlignVertical: multiline ? 'top' : 'auto' }]}
                multiline={multiline}
                maxLength={maxLength}
                numberOfLines={lines}
                cursorColor={colors.primary}
              />
              {showEyeIcon && (
                <TouchableOpacity
                  style={{ flex: 0.1, alignItems: "center" }}
                  onPress={changeSecureTextEntry}>
                  {secureTextEntry ? (
                    <Image style={styles.rightIcon} source={Images.eyeOpen} resizeMode="contain" />
                  ) : (
                    <Image style={styles.rightIcon} source={Images.eyeOpen} resizeMode="contain" />
                  )}
                </TouchableOpacity>
              )}

              {showDeleteIcon && (
                <TouchableOpacity
                  style={{ flex: 0.1, alignItems: "center" }}
                  onPress={changeSecureTextEntry}>
                  <Image style={[styles.rightIcon, { tintColor: colors.darkGray }]} source={Images.icondelete} resizeMode="contain" />
                </TouchableOpacity>
              )}

              {showRightIcon && !isLeftSearch && (
                <View
                  style={{ flex: 0.1, alignItems: "center" }}>
                  <Image style={[styles.rightIcon, rightIconStyle]} source={rightIconImg} resizeMode="contain" />
                </View>
              )}
              {showRightIcon && isCalender && (
                <View
                  style={{ flex: 0.1, alignItems: "center" }}>
                  <Image style={[styles.rightIcon, rightIconStyle]} source={Images.search_calender} resizeMode="contain" />
                </View>
              )}
            </View>
            {error && <Error>{error.message}</Error>}
          </Fragment>
        )}
        name={name}
      />
    </View>
  );
};

export default FilledTextField;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius: 8,
    paddingHorizontal: width * 0.02,
    // borderWidth:1
  },
  filled: {
    backgroundColor: colors.primaryLight,
  },
  outlined: {
    borderBottomWidth: 1,
    borderColor: colors.primary,
    backgroundColor: 'transparent'
  },
  imgStyle: {
    width: 18,
    height: 18,
    marginHorizontal: 8,
    left: 10,
    opacity: 0.6,
  },
  inputStyle: {
    fontFamily: fontsFamily.regular,
    color: colors.black,
    fontSize: width * 0.032,
    paddingVertical: Platform.OS == 'ios' ? width * 0.034 : width * 0.024,
  },
  leftIcon: {
    flex: 0.1,
    width: width * 0.04,
    height: width * 0.04,
    paddingHorizontal: 8,
    tintColor: colors.primary
  },
  rightIcon: {
    // flex: 0.1,
    width: width * 0.04,
    height: width * 0.04,
    tintColor: colors.primary
  }
});
