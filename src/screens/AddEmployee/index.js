import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  BackHandler,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import {styles} from './styles/styles';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import {fontsFamily} from '../../assets/Fonts';
import FilledTextField from '../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {emailRegex} from '../../utils/helperFunction';
import {apiCall} from '../../Services/apiCall';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {Images} from '../../assets/Images';
import {baseUrl} from '../../../axios';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import PermissionModal from './permissionModal';
import AlertModal from '../../components/Modal/AlertModal';

const {width} = Dimensions.get('window');

const AddEmployee = ({navigation}) => {
  const {control, handleSubmit} = useForm();

  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const [loader, setLoader] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serviceId, setServiceId] = useState();

  const [openPermission, setOpenPermission] = useState(false);
  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const handleBack = () => {
    goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, []);

  const createEmployee = async formData => {
    setLoading(true);
    try {
      let obj = {
        name: formData.name,
        designation: formData.designation,
        nationalID: formData?.cnic,
        contactNo: formData?.phone,
        altContactNo: '',
        addressLine1: formData?.address,
        addressLine2: '',
        email: formData?.email,
        roleID: 3, // * 3 Role Id is for Admin
        roleType: 'Admin',
        accessModule: selectedServices,
        basicSalary: formData.salary,
      };

      const {message} = await apiCall.createEmployee(obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setLoading(false);
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      setAlertType('e');
      setErrorModalText(error);
      setErrorModal(true);
      setTimeout(() => {
        setLoading(false);
        setErrorModal(false);
      }, 3000);
    } finally {
    }
  };

  const getServices = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getServices(role);
      setServices(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleSelectService = data => {
    try {
      const v = Object.values(data);
      let count = 0;
      for (let index = 0; index < v.length; index++) {
        const e = v[index];
        if (e === true) {
          count += 1;
        }
      }
      const newServices = [...selectedServices];
      const index = newServices.findIndex(e => e.moduleID === data.moduleID);
      if (count > 0) {
        if (index !== -1) {
          newServices.splice(index, 1);
          newServices.push(data);
        } else {
          newServices.push(data);
        }
      } else {
        newServices.splice(index, 1);
      }
      setSelectedServices(newServices);
    } catch (error) {
      console.log('file: index.js:110 => handleSelectService => error:', error);
    }
  };

  useEffect(() => {
    getServices();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <PermissionModal
        open={openPermission}
        close={() => setOpenPermission(false)}
        serviceId={serviceId}
        selectedServices={selectedServices}
        savePermission={data => handleSelectService(data)}
      />
      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Add Employee'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={{paddingHorizontal: width * 0.02}}>
            <FilledTextField
              name={'name'}
              placeholder="Name"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter name.',
              }}
              onSubmitEditing={handleSubmit(createEmployee)}
            />
            <FilledTextField
              name={'cnic'}
              placeholder="CNIC/Passport No"
              type={'number-pad'}
              maxLength={13}
              control={control}
              rules={{
                required: 'Please enter cnic/passport no.',
              }}
              onSubmitEditing={handleSubmit(createEmployee)}
            />
            <FilledTextField
              name={'phone'}
              placeholder="Phone Number"
              type={'number-pad'}
              control={control}
              maxLength={11}
              rules={{
                required: 'Please enter phone number.',
              }}
              onSubmitEditing={handleSubmit(createEmployee)}
            />
            <FilledTextField
              name={'address'}
              placeholder="Address"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter home no.',
              }}
              onSubmitEditing={handleSubmit(createEmployee)}
            />
            <FilledTextField
              name={'email'}
              placeholder="Email"
              type={'default'}
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: emailRegex,
                  message: 'Please enter a valid email.',
                },
              }}
              onSubmitEditing={handleSubmit(createEmployee)}
            />
            <FilledTextField
              name={'designation'}
              placeholder="Designation"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter employee designation.',
              }}
              onSubmitEditing={handleSubmit(createEmployee)}
            />

            <FilledTextField
              name={'salary'}
              placeholder="Salary"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter employee salary.',
              }}
              onSubmitEditing={handleSubmit(createEmployee)}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: width * 0.03,
              }}>
              <CustomText
                fontWeight={fontsFamily.bold}
                style={{fontSize: width * 0.055}}>
                Services
              </CustomText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                gap: width * 0.005,
              }}>
              {loader ? (
                <View style={{width: width * 1, padding: width * 0.1}}>
                  <ActivityIndicator size={'large'} color={colors.primary} />
                </View>
              ) : services?.length > 0 ? (
                <>
                  {services?.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => {
                        setServiceId(item.id);
                        setOpenPermission(true);
                      }}
                      style={{
                        width: width * 0.22,
                        height: width * 0.26,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}>
                      {selectedServices.findIndex(
                        e => e.moduleID === item.id,
                      ) !== -1 && (
                        <Image
                          source={Images.checkMarkIcon}
                          resizeMode="contain"
                          style={styles.selectedIcon}
                        />
                      )}
                      <Image
                        source={{uri: baseUrl + item.icon}}
                        resizeMode="contain"
                        style={{width: '70%', height: '70%'}}
                      />
                      <CustomText style={{fontSize: width * 0.023}}>
                        {item.name}
                      </CustomText>
                    </TouchableOpacity>
                  ))}
                </>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: width * 0.035,
                      fontFamily: fontsFamily.medium,
                    }}>
                    No employ found
                  </Text>
                </View>
              )}
            </View>

            <View
              style={{
                marginTop: width * 0.1,
                marginBottom: width * 0.02,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <View style={{width: '47%'}}>
                <PrimaryButton
                  outlined
                  customStyle={{
                    padding: width * 0.032,
                    marginTop: 15,
                    borderColor: colors.primary,
                  }}
                  textStyle={{color: colors.primary}}
                  title={'Back'}
                  onPress={() => goBack()}
                />
              </View>
              <View style={{width: '47%'}}>
                <PrimaryButton
                  customStyle={{padding: width * 0.032}}
                  title={'Submit'}
                  loader={loading}
                  onPress={handleSubmit(createEmployee)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddEmployee;
