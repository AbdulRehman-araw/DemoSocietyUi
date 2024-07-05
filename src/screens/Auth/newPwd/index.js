import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React, {useRef, useState} from 'react';

import styles from './styles/styles';

import CustomText from '../../../components/CustomText';
import {Images} from '../../../assets/Images';
import {colors} from '../../../styles/colors';
import {text} from '../../../res/strings';
import {fontsFamily} from '../../../assets/Fonts';
import FilledTextField from '../../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import {apiCall} from '../../../Services/apiCall';
import {
  setUserAccountDetails,
  setUserData,
  setUserRole,
} from '../../../redux/slices/userDataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {StackActions} from '@react-navigation/native';
import {Error} from '../../../components/UI/Error';
import AlertModal from '../../../components/Modal/AlertModal';

const {width} = Dimensions.get('window');

const NewPwd = ({navigation}) => {
  const {control, handleSubmit, watch} = useForm();
  const [loader, setLoader] = useState(false);
  const [passwordEye, setPasswordEye] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [errorType, setErrorType] = useState('');
  const password = watch('password', ''); // Get the value of the password field
  const newPwd = async formData => {
    setLoader(true);
    try {
      let obj = {
        Password: formData?.password,
        OldPassword: formData?.oldPassword,
      };
      const result = await apiCall.changePwd(obj);
      setErrorModal(true);
      setErrorType('s');
      setErrorModalText('Change Password sucessfully');
      setTimeout(() => {
        setErrorModal(false);
        navigation.goBack();
      }, 3000);
    } catch (error) {
      setErrorModal(true);
      setErrorModalText(error);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      <ScrollView contentContainerStyle={{flexGrow: 1, marginTop: width * 0.1}}>
        <View
          style={{
            width: width / 2.2,
            alignSelf: 'center',
            height: width / 2.2,
          }}>
          <Image
            source={Images.logo}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: width * 0.05,
          }}>
          <View style={{flex: 0.2}}>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{color: colors.primary, fontSize: width * 0.058}}>
              {'Create New Password'}
            </CustomText>
          </View>
          <FilledTextField
            showEyeIcon={true}
            secureTextEntry={passwordEye}
            name={'oldPassword'}
            placeholder="Old password"
            type={'default'}
            control={control}
            containerStyle={{width: '100%'}}
            changeSecureTextEntry={() => setPasswordEye(!passwordEye)}
            rules={{
              required: 'Old password is required',
              // validate: value =>
              //   value === password.current ||
              //   'Confirm password does not match',
            }}
            img={Images.lockIcon}
            // onSubmitEditing={handleSubmit(resetPwd)}
          />
          <FilledTextField
            showEyeIcon={true}
            secureTextEntry={passwordEye}
            name={'password'}
            placeholder="New Password"
            type={'default'}
            control={control}
            containerStyle={{width: '100%'}}
            changeSecureTextEntry={() => setPasswordEye(!passwordEye)}
            rules={{
              required: 'New Password is required',
            }}
            img={Images.lockIcon}
            onSubmitEditing={handleSubmit(newPwd)}
          />
          <FilledTextField
            showEyeIcon={true}
            secureTextEntry={passwordEye}
            name={'confirmPassword'}
            placeholder="Confirm Password"
            type={'default'}
            control={control}
            containerStyle={{width: '100%'}}
            changeSecureTextEntry={() => setPasswordEye(!passwordEye)}
            rules={{
              required: 'Confirm Password is required',
              validate: value => value === password || 'Passwords do not match',
            }}
            img={Images.lockIcon}
            onSubmitEditing={handleSubmit(newPwd)}
          />

          <View style={{flex: 1, marginVertical: width * 0.032}}>
            <PrimaryButton
              customStyle={{padding: width * 0.032}}
              title={text.login}
              loader={loader}
              onPress={handleSubmit(newPwd)}
            />
          </View>
        </View>

        <View style={{height: 100}}>
          <Image
            source={Images.banner}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <AlertModal
          visible={errorModal}
          close={setErrorModal}
          text={errorModalText}
          type={errorType}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPwd;
