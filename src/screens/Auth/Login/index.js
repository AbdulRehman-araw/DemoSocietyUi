import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';

import styles from './styles/styles';

import CustomText from '../../../components/CustomText';
import { Images } from '../../../assets/Images';
import { colors } from '../../../styles/colors';
import { text } from '../../../res/strings';
import { fontsFamily } from '../../../assets/Fonts';
import FilledTextField from '../../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import { apiCall } from '../../../Services/apiCall';
import {
  setUserAccountDetails,
  setUserData,
  setUserRole,
} from '../../../redux/slices/userDataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import { Error } from '../../../components/UI/Error';
import { globalVariable } from '../../../enviroment/GlobalVariable';
import RegistrationModal from '../../../components/Modal/RegistrationModal';
import LinearGradientPrimaryButton from '../../../components/Button/LinearGradientPrimaryButton';

const { width } = Dimensions.get('window');


const Login = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const [loader, setLoader] = useState(false);
  const [passwordEye, setPasswordEye] = useState(true);
  const dispatch = useDispatch();
  const [inputError, setInputError] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const loginUser = async formData => {
    setLoader(true);
    try {
      setInputError(false);
      let obj = {
        username: formData?.UserName,
        password: formData?.Password,
        society: globalVariable?.society,
      };
      const { data } = await apiCall.login(obj);
      console.log("data after login====>", { data });
      if (data) {
        AsyncStorage.setItem('token', JSON.stringify(data?.access_token));
        if (data?.role?.length === 1) {
          dispatch(setUserRole(data?.role[0]));
        }
        dispatch(setUserData(data));
        apiCall
          .getAccountDetails(data?.accountID)
          .then(res => {
            dispatch(setUserAccountDetails(res.data));
            navigation.dispatch(
              StackActions.replace(
                data?.role?.length > 1 ? 'AuthorizationPage' : 'drawer',
              ),
            );
            setLoader(false);
          })
          .catch(err => console.log('error account', err));
      }
    } catch (error) {
      console.log('🚀 ~ file: index.js:72 ~ loginUser ~ error:', error);
      setInputError(true);
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      <ImageBackground source={Images.lightBG} style={styles.container}>

        <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: width * 0.1 }}>
          <View
            style={{
              width: width / 2.2,
              alignSelf: 'center',
              height: width / 2.6,
            }}>
            <Image
              source={Images.logo}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginHorizontal: width * 0.05,
              marginTop: 30
            }}>
            <View style={{ flex: 0.2 }}>
              <CustomText
                fontWeight={fontsFamily.bold}
                style={{ color: colors.primaryDark, fontSize: width * 0.058 }}>
                {text.welcomeBack}
              </CustomText>
              <CustomText style={{ fontSize: width * 0.03 }}>
                {text.loginText}
              </CustomText>
            </View>

            <View style={{ flex: 1 }}>
              <FilledTextField
                name={'UserName'}
                placeholder="Username"
                type={'default'}
                control={control}
                rules={{
                  required: 'Username is required',
                }}
                variant={'outlined'}
                img={Images.userIcon}
                onSubmitEditing={handleSubmit(loginUser)}
              />
              <FilledTextField
                showEyeIcon={true}
                secureTextEntry={passwordEye}
                name={'Password'}
                placeholder="Password"
                type={'default'}
                control={control}
                variant={'outlined'}
                changeSecureTextEntry={() => setPasswordEye(!passwordEye)}
                rules={{
                  required: 'Password is required',
                }}
                img={Images.lockIcon}
                onSubmitEditing={handleSubmit(loginUser)}
              />
              {inputError && (
                <Error>
                  {'You have entered an invalid username or password.'}
                </Error>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  paddingHorizontal: width * 0.01,
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CustomText style={styles.additionalText}>
                    Registration
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgetPwd')}>
                  <CustomText style={styles.additionalText}>
                    {text.forgotPassword}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.signUpWithOtp}>
              <Text
                onPress={() => navigation.navigate('SignUpOtp')}
                style={styles.otpText}>
                Sign Up{' '}
                <Text style={{ color: colors.black }}>via Activation Code</Text>
              </Text>
            </View>


            <View
              style={{ flex: 0.8, marginVertical: width * 0.032, }}
            >
              <LinearGradientPrimaryButton
                customStyle={{ padding: width * 0.1 }}
                title={text.login}
                loader={loader}
                textStyle={{ fontSize: 14 }}
                onPress={handleSubmit(loginUser)}
              />
            </View>

          </View>

          <View style={{ height: 100 }}>
            <Image
              source={Images.banner}
              style={{ width: '100%', height: '100%', tintColor: colors.primary }}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
        <RegistrationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
