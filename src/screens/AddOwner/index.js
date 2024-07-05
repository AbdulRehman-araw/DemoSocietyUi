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
import {Images} from '../../assets/Images';
import {DataTable} from 'react-native-paper';
import Attachments from '../Auth/Registration/components/Attachments';
import DocumentPicker from 'react-native-document-picker';
const {width} = Dimensions.get('window');

const AddOwner = ({navigation, route}) => {
  const {apartmentID, unitTitle} = route?.params?.data;

  // console.log(typeof apartmentID, typeof unitTitle);

  const {control, handleSubmit, setValue, resetField} = useForm();

  const [loader, setLoader] = useState(false);
  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [products, setProducts] = useState([]);
  const [frcUrl, setFrcUrl] = useState('');
  const [workingLetter, setWorkingLetter] = useState('');
  const [possessionLetter, setPossessionLetter] = useState('');
  const [checkingList, setCheckingList] = useState('');
  const [carRunningPage, setCarRunningPage] = useState('');
  const [acknowledgement, setAcknowledgement] = useState('');
  const [frcLoader, setFrcLoader] = useState(false);
  const [workingLetterLoader, setWorkingLetterLoader] = useState(false);
  const [possesionLetterLoader, setPossesionLetterLoader] = useState(false);
  const [cheackingListLoader, setCheackingListLoader] = useState(false);
  const [carRunngingPageLoader, setCarRunngingPageLoader] = useState(false);
  const [acknowledgementLoader, setAcknowledgementLoader] = useState(false);
  

  const [vehicleObj, setVehicleObj] = useState();
  const goBack = () => {
    navigation.goBack();
  };

  const handleBack = () => {
    goBack();
    return true;
  };
  useEffect(() => {
    setValue('houseNo', unitTitle);
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
      } else if (type === 'workingLetter') {
        setWorkingLetterLoader(true);
      } else if (type === 'possessionLetter') {
        setPossesionLetterLoader(true);
      } else if (type === 'checkingList') {
        setCheackingListLoader(true);
      } else if (type === 'carRunningPage') {
        setCarRunngingPageLoader(true);
      } else {
        setAcknowledgementLoader(true);
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
        let {data} = await apiCall.uploadRegistrationDoc(formdata);
        if (type === 'FRC') setFrcUrl(data);
        else if (type === 'workingLetter') {
          setWorkingLetter(data);
        } else if (type === 'possessionLetter') {
          setPossessionLetter(data);
        } else if (type === 'checkingList') {
          setCheckingList(data);
        } else if (type === 'carRunningPage') {
          setCarRunningPage(data);
        } else {
          setAcknowledgement(data);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
        setAcknowledgementLoader(false);
        setFrcLoader(false);
        setWorkingLetterLoader(false);
        setPossesionLetterLoader(false);
        setCarRunngingPageLoader(false);
        setCheackingListLoader(false);
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    } finally {
      setAcknowledgementLoader(false);
      setFrcLoader(false);
      setWorkingLetterLoader(false);
      setPossesionLetterLoader(false);
      setCarRunngingPageLoader(false);
      setCheackingListLoader(false);
    }
  };
  const createOwner = async formData => {
    console.log('🚀 ~ file: index.js:61 ~ createOwner ~ formData:', products);
    try {
      // await submitVehicle();

      setLoader(true);
      const obj = {
        apartmentID: apartmentID,
        machineID: formData?.machineId,
        name: formData?.name,
        nationalID: formData?.cnic,
        contactNo: formData?.phone,
        altContactNo: '',
        addressLine1: formData?.address,
        addressLine2: '',
        email: formData?.email,
        ownerVehicles: products,
        frc: frcUrl,
        workingLetter: workingLetter,
        possessionLetter: possessionLetter,
        checkingList: checkingList,
        vehicleRunningpage: carRunningPage,
        ackPossession: acknowledgement,
      };
      const {message} = await apiCall.createOwner(obj);
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

  console.log(typeof vehicleObj, '', typeof machineId);

  const createProduct = formData => {
    try {
      let ownerVehicles = {
        id: Math.random().toString(36).substring(2),
        vehicleNo: formData?.vehicle,
      };
      setProducts(prev => [...prev, ownerVehicles]);
      resetField('vehicle');
    } catch (error) {
      console.log(
        'file: GenerateSalary.js:130 => createProduct => error:',
        error,
      );
    }
  };
  const handleRemove = obj => {
    setProducts(products.filter(item => item.id !== obj?.id));
  };
  const submitVehicle = async () => {
    try {
      let obj = {
        ownerVehicles: products,
      };
      setVehicleObj(obj);
    } catch (error) {
      console.log(
        'file: CreatePurchase.js:115 => submitVehicle => error:',
        error,
      );
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
        <Header onBack={goBack} title={'Add Owner'} />


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
              Add Owner Details
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
              onSubmitEditing={handleSubmit(createOwner)}
            />
            <FilledTextField
              name={'name'}
              placeholder="Name"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter name.',
              }}
              onSubmitEditing={handleSubmit(createOwner)}
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
              onSubmitEditing={handleSubmit(createOwner)}
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
              onSubmitEditing={handleSubmit(createOwner)}
            />
            <FilledTextField
              name={'address'}
              placeholder="Address"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter home no.',
              }}
              onSubmitEditing={handleSubmit(createOwner)}
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
              onSubmitEditing={handleSubmit(createOwner)}
            />
            <FilledTextField
              name={'vehicle'}
              placeholder="Vehicle Registration"
              type={'default'}
              control={control}
              onSubmitEditing={handleSubmit(createOwner)}
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
              setFrcUrl={setFrcUrl}
              frcLoader={frcLoader}
              setFrcLoader={setFrcLoader}
              possessionLetter={possessionLetter}
              setPossessionLetter={setPossessionLetter}
              carRunningPage={carRunningPage}
              setCarRunningPage={setCarRunningPage}
              workingLetter={workingLetter}
              setWorkingLetter={setWorkingLetter}
              acknowledgement={acknowledgement}
              setAcknowledgement={setAcknowledgement}
              checkingList={checkingList}
              setCheckingList={setCheckingList}
              possesionLetterLoader={possesionLetterLoader}
              workingLetterLoader={workingLetterLoader}
              carRunngingPageLoader={carRunngingPageLoader}
              acknowledgementLoader={acknowledgementLoader}
              cheackingListLoader={cheackingListLoader}
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
                  onPress={handleSubmit(createOwner)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddOwner;
