import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet

} from 'react-native';
import React, { Fragment, useState } from 'react';

import { colors } from '../../styles/colors';
import { Images } from '../../assets/Images';
import { text } from '../../res/strings';
import CustomText from '../../components/CustomText';
import { fontsFamily } from '../../assets/Fonts';
import { Controller } from 'react-hook-form';
import { Error } from '../UI/Error';


const { width, height } = Dimensions.get("window")


const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;


const SetFieldTextField = ({
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
  tag,
  priceTag
}) => {

  return (
    <View style={{ marginVertical: width * 0.02 }}>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Fragment>
            <View style={{ borderWidth: 1, borderRadius: 10, borderColor: colors.gray, marginVertical: width * 0.01, marginTop: width * 0.08 }}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.enteramountview}>{tag?tag:'Enter Amount'}</CustomText>

              <View style={styles.amountcard}>
                <CustomText font style={{ fontSize: width * 0.045, paddingHorizontal: width * 0.01, }}>{!priceTag?"Rs":""}</CustomText>
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
                  multiline={multiline}
                  maxLength={maxLength}
                  numberOfLines={lines}
                  style={[styles.textinputfield, { height: 40 }]}
                />
              </View>
            </View>
            {error && <Error>{error.message}</Error>}
          </Fragment>
        )}
        name={name}
      />
    </View>

  );
};


export const styles = StyleSheet.create({

  amountcard: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: width * 0.035,
    marginVertical: width * 0.01
  },
  enteramountview: {
    color: colors.black,
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    position: 'absolute',
    top: -10,
    left: 14
  },
  textinputfield: {
    flex: 1,
    fontFamily: "Montserrat-Bold",
    fontSize: width * 0.045,
    color: colors.black
  },
  labelContainer: {
    marginLeft: 25,
    paddingHorizontal: 15, // Amount of spacing between border and first/last letter
    marginStart: 10, // How far right do you want the label to start
    zIndex: 1, // Label must overlap border
    elevation: 1, // Needed for android
    shadowColor: colors.white, // Same as background color because elevation: 1 creates a shadow that we don't want
    position: "absolute", // Needed to be able to precisely overlap label with border
    top: -5, // Vertical position of label. Eyeball it to see where label intersects border.
    marginTop: 30,

  },


});



export default SetFieldTextField;