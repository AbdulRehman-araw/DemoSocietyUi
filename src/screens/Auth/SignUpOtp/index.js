import React, {useState, useRef, Fragment} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Image,
} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import {Images} from '../../../assets/Images';
import {colors} from '../../../styles/colors';
import CustomText from '../../../components/CustomText';
import {apiCall} from '../../../Services/apiCall';
import styles from './styles';
import {fontsFamily} from '../../../assets/Fonts';
import FilledTextField from '../../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  setUserAccountDetails,
  setUserData,
  setUserRole,
} from '../../../redux/slices/userDataSlice';
import {StackActions} from '@react-navigation/native';
import AlertModal from '../../../components/Modal/AlertModal';

const {width} = Dimensions.get('window');

const Index = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const [jsxCount, setJsxCount] = useState(0);
  const {control, handleSubmit, watch} = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const [otp, setOtp] = useState('');
  const [passwordEye, setPasswordEye] = useState(true);
  const [loader, setLoader] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [otpError, setOtpError] = useState();
  const [errorModal, seterrorModal] = useState(false);
  const [errorModalText, seterrorModalText] = useState('');
  const verifyOtp = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.verifyOtp(otp);
      setUserDetail(data);
      setJsxCount(1);
    } catch (error) {
      setOtpError(error);
    } finally {
      setLoader(false);
    }
  };

  const registerUser = async formData => {
    setLoader(true);
    try {
      let obj = {
        userName: formData?.userName,
        name: userDetail?.name,
        addressLine1: userDetail?.addressLine1,
        // addressLine2: userDetail?.addressLine2,
        contactNo: userDetail?.contactNo,
        // altContactNo: userDetail?.altContactNo,
        nationalID: userDetail?.nationalID,
        email: userDetail?.email,
        password: formData?.password,
        roleID: userDetail?.roleID,
        userID: userDetail?.userID,
        type: userDetail?.type,
        apartmentID: userDetail?.apartmentID,
        societyID: userDetail?.societyID,
      };
      console.log('🚀 ~ file: index.js:77 ~ registerUser ~ obj:', obj);
      const {data} = await apiCall.register(obj);
      console.log('🚀 ~ file: index.js:78 ~ registerUser ~ data:', data);
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
        })
        .catch(err => console.log('error account', err));
      // navigation.dispatch(StackActions.replace(data?.role?.length > 1 ? 'AuthorizationPage' : 'drawer'));
      // setLoader(false)
    } catch (error) {
      console.log('file: index.js:82 => registerUser => error:', error);
      seterrorModalText(error);
      seterrorModal(true);
      // alert(error)
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={colors.white} />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contStyle}
          showsVerticalScrollIndicator={false}>
          <View style={styles.mainImg}>
            <Image
              source={Images.logo}
              style={styles.img}
              resizeMode="contain"
            />
          </View>
          {jsxCount == 0 ? (
            <>
              <View
                style={{
                  width: '80%',
                  alignSelf: 'center',
                  marginBottom: width * 0.03,
                }}>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.textToVerify}>
                  Enter Otp to verify:{' '}
                </CustomText>
              </View>
              <OTPTextView
                tintColor={colors.primary}
                handleTextChange={e => setOtp(e)}
                containerStyle={styles.textInputContainer}
                textInputStyle={styles.roundedTextInput}
              />
              {otpError && (
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{color: colors.red}}>
                  {otpError}
                </CustomText>
              )}
            </>
          ) : (
            <>
              <FilledTextField
                name={'userName'}
                placeholder="Username"
                type={'default'}
                control={control}
                containerStyle={{width: '80%'}}
                rules={{
                  required: 'Username is required',
                }}
                img={Images.userIcon}
                onSubmitEditing={handleSubmit(registerUser)}
              />
              <FilledTextField
                showEyeIcon={true}
                secureTextEntry={passwordEye}
                name={'password'}
                placeholder="Password"
                type={'default'}
                control={control}
                containerStyle={{width: '80%'}}
                changeSecureTextEntry={() => setPasswordEye(!passwordEye)}
                rules={{
                  required: 'Password is required',
                }}
                img={Images.lockIcon}
                onSubmitEditing={handleSubmit(registerUser)}
              />
              <FilledTextField
                showEyeIcon={true}
                secureTextEntry={passwordEye}
                name={'confirmPassword'}
                placeholder="Confirm Password"
                type={'default'}
                control={control}
                containerStyle={{width: '80%'}}
                changeSecureTextEntry={() => setPasswordEye(!passwordEye)}
                rules={{
                  required: 'Confirm Password is required',
                  validate: value =>
                    value === password.current ||
                    'Confirm password does not match',
                }}
                img={Images.lockIcon}
                onSubmitEditing={handleSubmit(registerUser)}
              />
              <PrimaryButton
                customStyle={{padding: width * 0.032, width: width * 0.32}}
                title={'Login'}
                loader={loader}
                onPress={handleSubmit(registerUser)}
              />
            </>
          )}

          <View
            style={[
              styles.btnMainView,
              jsxCount == 0
                ? {justifyContent: 'space-evenly'}
                : {justifyContent: 'center'},
            ]}>
            {jsxCount == 0 && (
              <Fragment>
                <PrimaryButton
                  customStyle={{padding: width * 0.032, width: width * 0.32}}
                  title={'Cancel'}
                  onPress={() => navigation.goBack()}
                />
                <PrimaryButton
                  customStyle={{padding: width * 0.032, width: width * 0.32}}
                  title={'Apply'}
                  loader={loader}
                  onPress={() => verifyOtp()}
                />
              </Fragment>
            )}
          </View>
        </ScrollView>
        <AlertModal
          visible={errorModal}
          close={seterrorModal}
          text={errorModalText}
          type={'e'}
        />
      </SafeAreaView>
      {/* {loader && <Loader />} */}
    </>
  );
};

export default Index;
