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
import {colors} from '../../styles/colors';
import {Images} from '../../assets/Images';
import {Controller} from 'react-hook-form';
import { Error } from '../UI/Error';

const {width} = Dimensions.get('window');

const ComplainTextField = ({
  name,
  control,
  rules = {},
  maxLength,
  onSubmitEditing,
  editable,
  changeSecureTextEntry,
  blurOnSubmit,
  showEyeIcon,
  Iconstyle,
  textstyle,
  newstyle,
  secureTextEntry,
  multiline,
  placeholder,
  discussstyle,
  stylesearch,
  titlediscuss,
  img,
  type,
  onFocus,
  justChange,
  InputPolling,
}) => {
  return (
  <View style={{marginVertical:width * 0.02}}>
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <Fragment>
          <View style={[{...styles.inputContainer,...newstyle}]}>
            {img && (
              <Image
                style={{...styles.leftIcon}}
                source={img}
                resizeMode="contain"
              />
            )}
            <TextInput
              onChangeText={(e) =>  {onChange(e);
                if (justChange) {
                  justChange(e)  
                }
                }}
              onBlur={onBlur}
              blurOnSubmit={blurOnSubmit}
              onFocus={onFocus}
              value={value}
              onSubmitEditing={onSubmitEditing}
              keyboardType={type}
              placeholder={placeholder}
              placeholderTextColor={colors.darkGray}
              style={[{...styles.inputStyle,flex:showEyeIcon ? 0.8:0.9}]}
              multiline={multiline}
              maxLength={maxLength}
            />
            {showEyeIcon && (
              <TouchableOpacity
                style={{flex:0.1,alignItems:"center"}}
                onPress={changeSecureTextEntry}>
                {secureTextEntry ? (
                  <Image style={styles.rightIcon} source={Images.eyeOpen} resizeMode="contain"  />
                ) : (
                  <Image style={styles.rightIcon} source={Images.eyeOpen} resizeMode="contain"/>
                )}
              </TouchableOpacity>
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

export default ComplainTextField;



const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row-reverse",
    alignItems: 'center',
    alignSelf:"center",
    borderRadius: 8,
    borderColor:colors.gray,
    borderWidth:1,
    width:width*0.89,
    marginTop:8
    
    // backgroundColor: colors.gray,
  },

  imgStyle: {
    width: 25,
    height: 25,
    marginHorizontal: 8,
    left: 10,
    opacity: 0.6,
    
  },
  inputStyle: {
    color: colors.darkGray,
    fontSize: width * 0.044,
    marginLeft:10,
    paddingVertical: Platform.OS == 'ios' ? width * 0.034 : width * 0.024,
   
  },
  leftIcon: {
    flex: 0.1,
    width: width * 0.076,
    height: width * 0.054,
    marginRight:10
  },
  rightIcon:{
    // flex: 0.1,
    width: width * 0.05,
    height: width * 0.05,
  }
});
