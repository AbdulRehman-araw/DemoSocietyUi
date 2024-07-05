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
import WarningModal from '../../components/Modal/WarningModal';

const {width} = Dimensions.get('window');

const UpdateEmployeeDetails = ({navigation, route}) => {
  const updateData = route?.params?.data;
  const {control, handleSubmit, setValue} = useForm();

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

  const [errorModal1, setErrorModal1] = useState(false);
  const [alertWarning, setAlertWarning] = useState('w');

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

  const deleteAdmin = async id => {
    setLoader(true);
    try {
      const {message} = await apiCall.DeleteAdmin(id);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      setAlertType('e');
      setErrorModalText(error);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoader(false);
    }
  };

  const updateEmployee = async formData => {
    setLoading(true);
    try {
      let obj = {
        adminID: updateData?.id,
        name: formData.name,
        designation: formData.designation,
        basicSalary: formData?.salary,
        nationalID: formData?.cnic,
        contactNo: formData?.phone,
        altContactNo: '',
        addressLine1: formData?.address,
        addressLine2: '',
        email: formData?.email,
        roleID: 3, // * 3 Role Id is for Admin
        roleType: 'Admin',
        accessModule: selectedServices,
      };

      const {message} = await apiCall.updateEmployee(obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        navigation.navigate('employee');
      }, 3000);
    } catch (error) {
      setAlertType('e');
      setErrorModalText(error);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const getServices = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getServices(role);
      setServices(data);
    } catch (error) {
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
    }
  };

  const setDefaultData = () => {
    try {
      setValue('name', updateData?.name);
      setValue('cnic', updateData?.nationalID);
      setValue('phone', updateData?.contactNo);
      setValue('address', updateData?.address);
      setValue('email', updateData?.email);
      setValue('designation', updateData?.designation);
      setValue('salary', updateData.basicSalary.toString());
      const moduleArray = updateData?.accessModule?.map(element => {
        const newObj = {...element};
        delete newObj.moduleName;
        return newObj;
      });

      setSelectedServices(moduleArray);
    } catch (error) {
    }
  };

  const AlertFunction = () => {
    setAlertWarning('w');
    setErrorModalText('Are you sure you want to delete this Employee?');
    setErrorModal1(true);
  };

  const DeleteAdmin = async id => {
    setErrorModal1(false);
    setLoading(true);
    try {
      const {message} = await apiCall.DeleteAdmin(id);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
    setDefaultData();
  }, [isFocused]);
  const resentOTP = async () => {
    try {
      // setLoader(true);
      let obj = {
        adminID: updateData?.id,
      };
      const {message} = await apiCall.employeeResentOtp(obj);
      console.log(message)
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      setAlertType('e');
      setErrorModalText(error);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoader(false);
    }
  };
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

      <WarningModal
        visible={errorModal1}
        close={setErrorModal}
        text={errorModalText}
        type={alertWarning}
        button={true}
        warning={() => DeleteAdmin(updateData?.id)}
        cancel={() => setErrorModal1(false)}
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Update Employee'} />

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
              onSubmitEditing={handleSubmit(updateEmployee)}
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
              onSubmitEditing={handleSubmit(updateEmployee)}
            />
            <FilledTextField
              name={'phone'}
              placeholder="Phone Number"
              type={'number-pad'}
              maxLength={11}
              control={control}
              rules={{
                required: 'Please enter phone number.',
              }}
              onSubmitEditing={handleSubmit(updateEmployee)}
            />
            <FilledTextField
              name={'address'}
              placeholder="Address"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter home no.',
              }}
              onSubmitEditing={handleSubmit(updateEmployee)}
            />
            <FilledTextField
              editable={false}
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
              onSubmitEditing={handleSubmit(updateEmployee)}
            />
  <TouchableOpacity onPress={() => resentOTP()}>
            <CustomText
              fontWeight={fontsFamily.regular}
              style={{
                fontSize: width * 0.03,
                left: 5,
                textDecorationLine: 'underline',
                marginVertical: 5,
              }}>
              Resend OTP
            </CustomText>
          </TouchableOpacity>
            <FilledTextField
              name={'designation'}
              placeholder="Designation"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter employee designation.',
              }}
              onSubmitEditing={handleSubmit(updateEmployee)}
            />

            <FilledTextField
              name={'salary'}
              placeholder="Salary"
              type={'number-pad'}
              control={control}
              rules={{
                required: 'Please enter employee salary.',
              }}
              onSubmitEditing={handleSubmit(updateEmployee)}
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
                    No employee found
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
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
              {/* <View style={{ width: '47%' }}>
                <PrimaryButton
                  outlined
                  customStyle={{ padding: width * 0.032, marginTop: 15, borderColor: colors.primary }}
                  textStyle={{ color: colors.primary }}
                  title={'Delete'}
                  onPress={() => AlertFunction()}
                />
              </View> */}
              <View style={{width: '47%'}}>
                <PrimaryButton
                  customStyle={{padding: width * 0.032}}
                  title={'Submit'}
                  loader={loading}
                  onPress={handleSubmit(updateEmployee)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UpdateEmployeeDetails;
