import {
  TextInput,
  BackHandler,
  Button,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';

import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import {styles} from './styles/styles';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import ComplainTextField from '../../components/TextField/complainTextField';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {text} from '../../res/strings';
import {fontsFamily} from '../../assets/Fonts';

import {Images} from '../../assets/Images';
import FilledTextField from '../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import CustomHeaderColor from '../../components/Header/HeaderColor';
import {apiCall} from '../../Services/apiCall';
import {emailRegex} from '../../utils/helperFunction';
import DropDown from '../../components/TextField/DropDown';
import CustomModal from '../../components/Modal/CustomModal';
import {useSelector} from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';
import Attachments from '../Auth/RegistrationTenant/components/Attachments';
import DocumentPicker from 'react-native-document-picker';

const {width} = Dimensions.get('window');

const MyUnitsAddNew = ({navigation}) => {
  const userData = useSelector(state => state.userDataReducer.userData);
  const {control, handleSubmit, setValue, clearErrors} = useForm();
  const [showModal, setShowModal] = useState(false);
  const [unitTypes, setUnitTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [residentType, setResidentType] = useState(null);
  console.log("🚀 ~ MyUnitsAddNew ~ residentType:", residentType)
  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [frcUrl, setFrcUrl] = useState('');
  const [undertakingLetter, setUndertakingLetter] = useState('');
  const [agreement, setAgreement] = useState('');
  const [noc, setNoc] = useState('');
  const [policeVerification, setPoliceVerification] = useState('');
  const [frcLoader, setFrcLoader] = useState(false);
  const [agreementLoader, setAgreementLoader] = useState(false);
  const [nocLoader, setNocLoader] = useState(false);
  const [undertakingLetterLoader, setUndertakingLetterLoader] = useState(false);
  const [policeVerificationLoader, setPoliceVerificationLoader] =
    useState(false);

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

  const docFilePdf = async type => {
    //Opening Document Picker for selection of one file
    try {
      if (type === 'FRC') {
        setFrcLoader(true);
      } else if (type === 'agreement') {
        setAgreementLoader(true);
      } else if (type === 'noc') {
        setNocLoader(true);
      } else if (type === 'undertaking') {
        setUndertakingLetterLoader(true);
      } else {
        setPoliceVerificationLoader(true);
      }
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      const filename = res[0].uri.replace('file://', '');
      const formdata = new FormData();
      formdata.append('file', {
        uri: filename,
        type: res[0].type,
        name: res[0].name,
      });
      try {
        let {data} = await apiCall.uploadTenantDoc(formdata);
        if (type === 'FRC') setFrcUrl(data);
        else if (type === 'agreement') {
          setAgreement(data);
        } else if (type === 'noc') {
          setNoc(data);
        } else if (type === 'undertaking') {
          setUndertakingLetter(data);
        } else {
          setPoliceVerification(data);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
        setPoliceVerificationLoader(false);
        setFrcLoader(false);
        setAgreementLoader(false);
        setUndertakingLetterLoader(false);
        setNocLoader(false);
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    } finally {
      setPoliceVerificationLoader(false);
      setFrcLoader(false);
      setAgreementLoader(false);
      setUndertakingLetterLoader(false);
      setNocLoader(false);
    }
  };

  const addResident = async formData => {
    setLoading(true);
    try {
      const unitTypeId = unitTypes.find(
        e => e.title === formData.relationship,
      )?.id;
      let obj = {
        apartmentID: userData?.apartmentID,
        name: formData.name,
        email: formData.email,
        unitTypeID: unitTypeId,
        contactNo: formData.contactNo,
        altContactNo: '',
        nationalID: formData.nationalID,
        addressLine1: formData?.address,
        machineID: formData?.machineID,
        frc: frcUrl,
        undertakingLetter: undertakingLetter,
        agreement: agreement,
        noc: noc,
        policeVerification: policeVerification,
      };
      const {message} = await apiCall.addResident(obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      setAlertType('w');
      setErrorModalText(error);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const addRentalResident = async formData => {
    setLoading(true);
    try {
      const unitTypeId = unitTypes.find(
        e => e.title === formData.relationship,
      )?.id;
      let obj = {
        apartmentID: userData?.apartmentID,
        name: formData.name,
        email: formData.email,
        unitTypeID: unitTypeId,
        contactNo: formData.contactNo,
        altContactNo: '',
        nationalID: formData.nationalID,
        addressLine1: formData?.address,
        machineID: formData?.machineID,
        frc: frcUrl,
        undertakingLetter: undertakingLetter,
        agreement: agreement,
        noc: noc,
        policeVerification: policeVerification,
      };
      const {message} = await apiCall.addRentalResident(obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      setAlertType('w');
      setErrorModalText(error);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const getUnitTypes = async () => {
    try {
      const {data} = await apiCall.getUnitTypes(
        userData?.isRental ? true : false,
      );
      let newData = [];
      data.forEach(element => {
        let obj = {id: element.id, title: element.type};
        newData.push(obj);
      });
      setUnitTypes(newData);
    } catch (error) {
      console.log('file: index.js:77 => getUnitTypes => error:', error);
    }
  };

  useEffect(() => {
    getUnitTypes();
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
        title={'Add New'}
        showRightBtn={true}
        headerContainer={{paddingHorizontal: width * 0.03}}
      />
      <ScrollView contentContainerStyle={{paddingBottom: 80}}>
        <CustomHeaderColor
          children={'Add New Resident'}
          style={{fontSize: width * 0.036}}
          fontWeight={fontsFamily.bold}
          headerstyle={{marginTop: 10}}
        />

        <View
          style={{
            flex: 1,
            paddingVertical: width * 0.04,
            paddingHorizontal: width * 0.06,
          }}>
          <DropDown
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
          />

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
            name={'contactNo'}
            placeholder="Mobile Number"
            type={'number-pad'}
            maxLength={11}
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
            img={Images.userphone}
          />
          <FilledTextField
            name={'machineID'}
            placeholder="Machine ID"
            type={'number-pad'}
            maxLength={11}
            control={control}
            addnewstyles={{
              backgroundColor: colors.primaryLight,
              width: width * 0.86,
              alignSelf: 'center',
            }}
            newInput={{color: colors.black, fontSize: width * 0.037}}
            rules={{
              required: 'Machine ID is required',
            }}
            img={Images.Reports}
          />
          {(residentType === 'Member' ||
            residentType === 'Rental') && (
              <FilledTextField
                name={'email'}
                placeholder="Email"
                type={'default'}
                control={control}
                img={Images.userIcon}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: emailRegex,
                    message: 'Please enter a valid email.',
                  },
                }}
              />
            )}

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
          {residentType === 'Rental' && (
            <Attachments
              docFilePdf={docFilePdf}
              frcUrl={frcUrl}
              undertakingLetter={undertakingLetter}
              noc={noc}
              policeVerification={policeVerification}
              agreement={agreement}
              agreementLoader={agreementLoader}
              frcLoader={frcLoader}
              undertakingLetterLoader={undertakingLetterLoader}
              policeVerificationLoader={policeVerificationLoader}
              nocLoader={nocLoader}
            />
          )}

          <View style={{flex: 0.3, alignSelf: 'center'}}>
            <PrimaryButton
              customStyle={{padding: width * 0.03, width: width * 0.37}}
              loader={loading}
              title={text.AddNow}
              onPress={handleSubmit(
                userData?.isRental ? addRentalResident : addResident,
              )}
            />
          </View>
        </View>

        <CustomModal
          data={unitTypes?.length <= 0 ? [] : unitTypes}
          modalVisible={showModal}
          closeModal={() => setShowModal(false)}
          getvalue={e => {
            setValue('relationship', e);
            setResidentType(e);
            clearErrors('relationship');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyUnitsAddNew;
