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
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {styles} from './styles/styles';
import {apiCall} from '../../../Services/apiCall';
import AlertModal from '../../../components/Modal/AlertModal';
import Header from '../../../components/Header/Header';
import CustomText from '../../../components/CustomText';
import FilledTextField from '../../../components/TextField/FilledTextField';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import {Images} from '../../../assets/Images';
import {useForm} from 'react-hook-form';
import {colors} from '../../../styles/colors';
import {fontsFamily} from '../../../assets/Fonts';
import {cnicRegex, emailRegex} from '../../../utils/helperFunction';
import {DataTable} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Attachments from './components/Attachments';
const {width} = Dimensions.get('window');

const RegistrationTenant = ({navigation, route}) => {
  const {control, handleSubmit, setValue, resetField} = useForm();
  const {data} = route?.params;
  const [loader, setLoader] = useState(false);
  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [products, setProducts] = useState([]);
  const [frcUrl, setFrcUrl] = useState('');
  const [undertakingLetter, setUndertakingLetter] = useState('');
  const [agreement, setAgreement] = useState('');
  const [noc, setNoc] = useState('');
  const [policeVerification, setPoliceVerification] = useState('');
  const [frcLoader, setFrcLoader] = useState(false);
  const [agreementLoader, setAgreementLoader] = useState(false);
  const [nocLoader, setNocLoader] = useState(false);
  const [undertakingLetterLoader, setUndertakingLetterLoader] = useState(false);
  const [policeVerificationLoader, setPoliceVerificationLoader] = useState(false);
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
  const createTenant = async formData => {
    try {
      setLoader(true);
      const obj = {
        apartmentID: data?.appartmentId,
        societyID: data?.societyId,
        name: formData?.name,
        nationalID: formData?.cnic,
        contactNo: formData?.phone,
        altContactNo: '',
        addressLine1: formData?.address,
        addressLine2: '',
        email: formData?.email,
        rentalVehicles: products,
        frc: frcUrl,
        undertakingLetter: undertakingLetter,
        agreement: agreement,
        noc: noc,
        policeVerification: policeVerification,
      };
      const {result} = await apiCall.tenantRegistrationRequest(obj);
      setAlertType('s');
      setErrorModalText('Registration request submitted successfully');
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log('🚀 ~ createTenant ~ error:', error);
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
  const createProduct = formData => {
    try {
      let ownerVehicles = {
        id: Math.random().toString(36).substring(2),
        vehicleNo: formData?.vehicle,
      };
      setProducts(prev => [...prev, ownerVehicles]);
      resetField('vehicle');
    } catch (error) {}
  };
  const handleRemove = obj => {
    setProducts(products.filter(item => item.id !== obj?.id));
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
        <Header onBack={goBack} title={'Registration'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={{marginVertical: width * 0.02}}>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{fontSize: width * 0.035}}>
              Registration Form
            </CustomText>
          </View>

          <View style={{paddingHorizontal: width * 0.02}}>
            <FilledTextField
              name={'name'}
              placeholder="Name"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter name.',
              }}
              onSubmitEditing={handleSubmit(createTenant)}
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
              onSubmitEditing={handleSubmit(createTenant)}
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
              onSubmitEditing={handleSubmit(createTenant)}
            />
            <FilledTextField
              name={'address'}
              placeholder="Address"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter home no.',
              }}
              onSubmitEditing={handleSubmit(createTenant)}
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
              onSubmitEditing={handleSubmit(createTenant)}
            />
            <FilledTextField
              name={'vehicle'}
              placeholder="Vehicle Registration"
              type={'default'}
              control={control}
              onSubmitEditing={handleSubmit(createTenant)}
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

            {products?.length > 0 && (
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>#</DataTable.Title>
                  <DataTable.Title>Vehicle</DataTable.Title>
                  <DataTable.Title></DataTable.Title>
                </DataTable.Header>

                {products?.map((item, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{index + 1}</DataTable.Cell>
                    <DataTable.Cell> {`${item.vehicleNo}`}</DataTable.Cell>
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
                  onPress={handleSubmit(createTenant)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationTenant;
