import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  BackHandler,
  TouchableOpacity,
  Image,
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
import {cnicRegex, emailRegex} from '../../utils/helperFunction';
import {apiCall} from '../../Services/apiCall';
import AlertModal from '../../components/Modal/AlertModal';
import {useIsFocused} from '@react-navigation/native';
import {Images} from '../../assets/Images';
import {DataTable} from 'react-native-paper';

const {width} = Dimensions.get('window');

const UpdateOwner = ({navigation, route}) => {
  const updateData = route?.params?.data;
  console.log('🚀 ~ file: index.js:32 ~ UpdateOwner ~ updateData:', updateData);
  const isFocused = useIsFocused();
  const {control, handleSubmit, setValue, resetField} = useForm();

  const [loader, setLoader] = useState(false);
  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const [products, setProducts] = useState(updateData?.ownerVehicles);

  const [vehicleObj, setVehicleObj] = useState([]);

  const goBack = () => {
    navigation.replace('resident', {
      data: {apartmentId: updateData?.apartmentID},
    });
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

  const updateOwner = async formData => {
    try {
      await submitVehicle();

      setLoader(true);
      let obj = {
        ownerId: updateData?.ownerId,
        apartmentID: updateData?.apartmentID,
        machineID: formData?.machineId,
        name: formData?.name,
        nationalID: formData?.cnic,
        contactNo: formData?.phone,
        altContactNo: '',
        addressLine1: formData?.address,
        addressLine2: '',
        email: formData?.email,
        ownerVehicles: products,
      };
      const {message} = await apiCall.updateOwner(obj);
      console.log('========>', obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log(error);
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
  const handleRemove = obj => {
    setProducts(products.filter(item => item.id !== obj?.id));
  };
  const createProduct = formData => {
    try {
      let ownerVehicles = {
        vehicleNo: formData?.vehicle,
      };
      setProducts(prev => [...prev, ownerVehicles]);
      resetField('vehicle');
    } catch (error) {
      console.log('test');
      console.log(
        'file: GenerateSalary.js:130 => createProduct => error:',
        error,
      );
    }
  };

  const submitVehicle = async () => {
    try {
      // let obj = {
      //   ownerVehicles: products,
      // };
      setVehicleObj(obj);
    } catch (error) {
      console.log(
        'file: CreatePurchase.js:115 => submitVehicle => error:',
        error,
      );
    }
  };

  const setDefaultData = () => {
    try {
      setValue('houseNo', updateData?.houseNo);
      setValue('machineId', updateData?.machineID);
      setValue('name', updateData?.name);
      setValue('cnic', updateData?.nationalID);
      setValue('phone', updateData?.contactNo);
      setValue('address', updateData?.addressLine1);
      setValue('email', updateData?.email);
      setValue('vehicle1', updateData?.vehicleNo1);
      setValue('vehicle2', updateData?.vehicleNo2);
    } catch (error) {
      console.log('file: index.js:148 => setDefaultData => error:', error);
    }
  };

  useEffect(() => {
    setDefaultData();
  }, [isFocused]);

  const resentOTP = async () => {
    try {
      setLoader(true);
      let obj = {
        ownerId: updateData?.ownerId,
        apartmentID: updateData?.apartmentID,
      };

      const {message} = await apiCall.resentOtp(obj);
      console.log('========>', message);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log(error);
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

      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Update Owner'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={{marginVertical: width * 0.02}}>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{fontSize: width * 0.035, marginBottom: 2}}>
              Owner Details
            </CustomText>
            <FilledTextField
              name={'houseNo'}
              placeholder="Unit/House No"
              type={'default'}
              editable={false}
              control={control}
            />
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{fontSize: width * 0.035}}>
              Owner's Particular
            </CustomText>
          </View>

          <View style={{paddingHorizontal: width * 0.02}}>
            <FilledTextField
              name={'machineId'}
              placeholder="Machine ID"
              type={'number-pad'}
              control={control}
              rules={{
                required: 'Please enter owner machine id.',
              }}
              onSubmitEditing={handleSubmit(updateOwner)}
            />
            <FilledTextField
              name={'name'}
              placeholder="Name"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter name.',
              }}
              onSubmitEditing={handleSubmit(updateOwner)}
            />
            <FilledTextField
              name={'cnic'}
              placeholder="CNIC/Passport No"
              type={'number-pad'}
              maxLength={13}
              control={control}
              rules={{
                required: 'Please enter cnic/passport no.',
                pattern: {
                  value: cnicRegex,
                  message: 'Please enter a valid Cnic Number',
                },
              }}
              onSubmitEditing={handleSubmit(updateOwner)}
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
              onSubmitEditing={handleSubmit(updateOwner)}
            />
            <FilledTextField
              name={'address'}
              placeholder="Address"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter home no.',
              }}
              onSubmitEditing={handleSubmit(updateOwner)}
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
              onSubmitEditing={handleSubmit(updateOwner)}
            />
            {!updateData?.accountID && (
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
            )}

            <FilledTextField
              name={'vehicle'}
              placeholder="Vehicle Registration"
              type={'default'}
              control={control}
              onSubmitEditing={handleSubmit(updateOwner)}
            />

            <TouchableOpacity
              onPress={handleSubmit(createProduct)}
              style={{flex: 0.2, alignItems: 'center'}}>
              <Image
                source={Images.Addcircle}
                resizeMode="contain"
                style={{width: width * 0.08, height: width * 0.08}}
              />
            </TouchableOpacity>

            {products.length > 0 && (
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>#</DataTable.Title>
                  <DataTable.Title>Vehicle</DataTable.Title>
                  <DataTable.Title></DataTable.Title>
                </DataTable.Header>
                {products.map((item, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{index + 1}</DataTable.Cell>
                    <DataTable.Cell>{item.vehicleNo}</DataTable.Cell>
                    <DataTable.Cell>
                      <TouchableOpacity onPress={() => handleRemove(item)}>
                        <Image
                          resizeMode="contain"
                          style={{
                            tintColor: colors.darkGray,
                            width: width * 0.04,
                            height: width * 0.04,
                          }}
                          source={Images.icondelete}
                        />
                      </TouchableOpacity>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            )}
            <View
              style={{
                marginTop: width * 0.15,
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
                  loader={loader}
                  onPress={handleSubmit(updateOwner)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UpdateOwner;
