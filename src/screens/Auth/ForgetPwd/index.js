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
import React, {useState} from 'react';

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

const {width} = Dimensions.get('window');

const ForgetPwd = ({navigation}) => {
  const {control, handleSubmit} = useForm();
  const [loader, setLoader] = useState(false);
  const [passwordEye, setPasswordEye] = useState(true);
  const dispatch = useDispatch();
  const [inputError, setInputError] = useState();

  const forgetUser = async formData => {
    setLoader(true);
    try {
      setInputError(false);
      let obj = {
        username: formData?.UserName,
      };
      const result = await apiCall.forgetPwd(obj);
      navigation.navigate('ForgetPwdOtp');
      if (data) {
      }
    } catch (error) {
      // setInputError(true);
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
              {text.welcomeBack}
            </CustomText>
            <CustomText style={{fontSize: width * 0.03}}>
              {text.forgetText}
            </CustomText>
          </View>

          <View style={{flex: 1}}>
            <FilledTextField
              name={'UserName'}
              placeholder="Username"
              type={'default'}
              control={control}
              rules={{
                required: 'Username is required',
              }}
              img={Images.userIcon}
              onSubmitEditing={handleSubmit(forgetUser)}
            />

            {/* {inputError && (
              <Error>
                {'You have entered an invalid username or password.'}
              </Error>
            )} */}
          </View>

          <View style={{flex: 1, marginVertical: width * 0.032}}>
            <PrimaryButton
              customStyle={{padding: width * 0.032}}
              title={text.login}
              loader={loader}
              onPress={handleSubmit(forgetUser)}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPwd;
