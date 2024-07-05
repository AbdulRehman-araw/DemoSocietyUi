import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import Header from '../../components/Header/Header';
import {styles} from './styles/styles';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {apiCall} from '../../Services/apiCall';
import FilledTextField from '../../components/TextField/FilledTextField';
import {Images} from '../../assets/Images';
import DropDown from '../../components/TextField/DropDown';
import {emailRegex} from '../../utils/helperFunction';
import PrimaryButton from '../../components/Button/PrimaryButton';
import CustomModal from '../../components/Modal/CustomModal';
import AlertModal from '../../components/Modal/AlertModal';
import CustomText from '../../components/CustomText';
import {fontsFamily} from '../../assets/Fonts';

const {width} = Dimensions.get('window');

const MyUnitsUpdate = ({navigation, route}) => {
  const updateData = route?.params?.detail;
  console.log('🚀 ~ MyUnitsUpdate ~ updateData:', updateData);
  const unitId = route?.params?.unitId ? route?.params?.unitId : null;
  const role = useSelector(state => state.userDataReducer.userRole);
  const userData = useSelector(state => state.userDataReducer.userData);
  const {control, handleSubmit, setValue, clearErrors} = useForm();
  const [showModal, setShowModal] = useState(false);
  const [unitTypes, setUnitTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [DeleteLoading, setDeleteLoading] = useState(false);

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [Otp, setOtp] = useState(0);

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

  const updateResident = async formData => {
    const unitTypeId = unitTypes.find(
      e => e.title === formData.relationship,
    )?.id;
    try {
      setLoading(true);
      let obj = {
        unitID:
          updateData?.unitType === 'RentalOwner' ? unitId : updateData?.id,
        apartmentID: userData?.apartmentID,
        name: formData.name,
        email: formData.email,
        unitTypeID: updateData?.unitTypeID,
        contactNo: formData.contactNo,
        altContactNo: '',
        nationalID: formData.nationalID,
        addressLine1: formData?.address,
        machineID: formData?.machineID ? formData?.machineID : '',
        isRental: updateData?.unitType === 'RentalOwner' ? true : false,
      };
      console.log('🚀 ~ updateResident ~ obj:', obj);
      const {message} = await apiCall?.updateResident(obj);

      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
        goBack();
      }, 3000);
    } catch (error) {
      console.log('🚀 ~ updateResident ~ error:', error);
    } finally {
      setLoading(false);
    }
    // }
  };
  const resentOTP = async () => {
    if (updateData?.unitType === 'RentalOwner') {
      try {
        // setLoader(true);
        let obj = {
          apartmentID: updateData?.apartmentID,
          rentalOwnerId: unitId,
        };
        console.log('🚀 ~ resentOTP ~ obj:', obj);
        const {message} = await apiCall.tenentResentOtp(obj);
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
      }
    } else {
      try {
        // setLoader(true);
        let obj = {
          unitId: updateData?.id,
          apartmentID: updateData?.apartmentID,
        };
        const {message} = await apiCall.unitMemberResentOtp(obj);
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
        // setLoader(false);
      }
    }
  };
  const deleteResident = async () => {
    try {
      const {message} = await apiCall.deleteResident(updateData?.id);
      goBack();
      goBack();
    } catch (error) {
    } finally {
      setDeleteLoading(false);
    }
  };
  const updateRentalResident = async formData => {
    const unitTypeId = unitTypes.find(
      e => e.title === formData.relationship,
    )?.id;
    try {
      setLoading(true);
      let obj = {
        unitID: updateData?.id,
        apartmentID: userData?.apartmentID,
        name: formData.name,
        email: formData.email,
        unitTypeID: updateData?.unitTypeID,
        contactNo: formData.contactNo,
        altContactNo: '',
        nationalID: formData.nationalID,
        addressLine1: formData?.address,
        machineID: formData?.machineID ? formData?.machineID : '',
      };
      const {message} = await apiCall?.updateRentalResident(obj);

      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
        goBack();
      }, 3000);
    } catch (error) {
      console.log('🚀 ~ updateRentalResident ~ error:', error);
    } finally {
      setLoading(false);
    }
    // }
  };
  const setDefaultData = () => {
    try {
      setValue('name', updateData?.name);
      setValue('nationalID', updateData?.nationalID);
      setValue('contactNo', updateData?.contactNo);
      setValue('email', updateData?.email);
      setValue('relationship', updateData?.unitType);
      setValue('address', updateData?.addressLine1);
      setValue('machineID', updateData?.machineID);
    } catch (error) {}
  };

  const justChange = text => {
    setOtp(text);
  };

  const getUnitTypes = async () => {
    try {
      const {data} = await apiCall.getUnitTypes();
      let newData = [];
      data.forEach(element => {
        let obj = {id: element.id, title: element.type};
        newData.push(obj);
      });
      setUnitTypes(newData);
    } catch (error) {}
  };

  useEffect(() => {
    getUnitTypes();
    setDefaultData();
    justChange();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <Header
        onBack={goBack}
        title={'Update Resident'}
        showRightBtn={true}
        headerContainer={{paddingHorizontal: width * 0.03}}
      />

      <View
        style={{
          flex: 1,
          paddingVertical: width * 0.04,
          paddingHorizontal: width * 0.06,
        }}>
        {role !== 'User' && (
          <>
            <FilledTextField
              name={'name'}
              placeholder="Name"
              type={'default'}
              control={control}
              addnewstyles={{
                backgroundColor: colors.primaryLight,
                width: width * 0.86,
                alignSelf: 'center',
              }}
              newInput={{color: colors.black, fontSize: width * 0.037}}
              rules={{
                required: 'Name is required',
              }}
              img={Images.userIcon}
            />

            <FilledTextField
              name={'machineID'}
              placeholder="machineID"
              type={'default'}
              control={control}
              img={Images?.report2}
              rules={{
                required: 'machineID is required',
                pattern: {
                  message: 'Please enter a valid machineID.',
                },
              }}
            />
          </>
        )}

        {/* <DropDown
          name={'relationship'}
          title="Select Relationship"
          type={'default'}
          control={control}
          img={Images.featherusers}
          rules={{
            required: 'Please select relationship',
          }}
          onPress={() => {
            setShowModal(true);
          }}
        /> */}
        <FilledTextField
          name={'nationalID'}
          placeholder="Identity Number"
          type={'number-pad'}
          maxLength={13}
          control={control}
          addnewstyles={{
            backgroundColor: colors.primaryLight,
            width: width * 0.86,
            alignSelf: 'center',
          }}
          newInput={{color: colors.black, fontSize: width * 0.037}}
          rules={{
            required: 'Identity number is required',
          }}
          img={Images.usercard}
        />
        {/* address */}
        <FilledTextField
          name={'address'}
          placeholder="Address"
          type={'default'}
          control={control}
          img={Images.usercard}
          rules={{
            required: 'Address is required',
          }}
        />
        <FilledTextField
          name={'contactNo'}
          placeholder="Mobile Number"
          type={'number-pad'}
          control={control}
          maxLength={11}
          addnewstyles={{
            backgroundColor: colors.primaryLight,
            width: width * 0.86,
            alignSelf: 'center',
          }}
          newInput={{color: colors.black, fontSize: width * 0.037}}
          rules={{
            required: 'Contact number is required',
          }}
          img={Images.userphone}
        />
        {updateData?.unitType !== 'Owner' &&
          updateData?.unitType !== 'RentalOwner' && (
            <FilledTextField
              name={'email'}
              placeholder="email"
              control={control}
              addnewstyles={{
                backgroundColor: colors.primaryLight,
                width: width * 0.86,
                alignSelf: 'center',
              }}
              newInput={{color: colors.black, fontSize: width * 0.037}}
              rules={{
                required: 'Contact number is required',
              }}
              img={Images.userIcon}
            />
          )}

        {updateData?.unitType !== 'Owner' && !userData?.isRental && (
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
        {errorMessage ? (
          <CustomText style={{color: colors.danger}}>{errorMessage}</CustomText>
        ) : null}
      </View>

      <View style={{flex: 0.3, alignSelf: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <PrimaryButton
            customStyle={{padding: width * 0.03, width: width * 0.37}}
            loader={loading}
            title={'Update'}
            onPress={handleSubmit(
              userData?.isRental ? updateRentalResident : updateResident,
            )}
          />
          {/* {role === 'User' && (
            <View style={{left: 10}}>
              <PrimaryButton
                customStyle={{padding: width * 0.03, width: width * 0.37}}
                loader={DeleteLoading}
                title={'Delete'}
                onPress={() => deleteResident()}
              />
            </View>
          )} */}
        </View>
      </View>

      <CustomModal
        data={unitTypes?.length <= 0 ? [] : unitTypes}
        modalVisible={showModal}
        closeModal={() => setShowModal(false)}
        getvalue={e => {
          setValue('relationship', e);
          clearErrors('relationship');
        }}
      />
    </SafeAreaView>
  );
};

export default MyUnitsUpdate;
