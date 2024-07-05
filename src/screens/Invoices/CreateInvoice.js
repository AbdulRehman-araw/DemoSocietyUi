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
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {colors} from '../../styles/colors';
import {styles} from './styles/styles';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import { fontsFamily } from '../../assets/Fonts';
import FilledTextField from '../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { emailRegex, getFormattedDate } from '../../utils/helperFunction';
import { apiCall } from '../../Services/apiCall';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import SetFieldTextField from '../../components/TextField/SetFieldTextField';
import DropDown from '../../components/TextField/DropDown';
import CustomModal from '../../components/Modal/CustomModal';
import CustomSearchModal from '../../components/Modal/CustomSearchModal';
import PostDatesPicker from '../../components/Modal/PostDatesPicker';
import MultipleSelectModal from '../../components/Modal/MultipleSelectModal';
import moment from 'moment';
import {RadioGroup} from 'react-native-radio-buttons-group';
const {width} = Dimensions.get('window');

const CreateInvoice = ({ navigation }) => {
  const { control, handleSubmit, setValue, clearErrors } = useForm();

  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const [soldApartment, setSoldApartment] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [soldApartmentByBuilding, setSoldApartmentByBuilding] = useState([]);
  const [unit, setUnit] = useState([]);

  const [buildingName, setBuildingName] = useState('');
  const [showUnitModal, setShowUnitModal] = useState(false);

  const [selectedId, setSelectedId] = useState(1);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('date');
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const [myApartments, setMyApartments] = useState([]);
  const [myApartmentNo, setMyApartmentNo] = useState([]);

  const [selectedApartmentNo, setSelectedApartmentNo] = useState('');

  const [selectedApartment, setSelectedApartment] = useState();
  const [sqFeet, setSqFeet] = useState(null);
  const [mainCharges, setMainCharges] = useState(null);
  const [noOfMonth, setNoOfMonth] = useState(null);
  const [defaultAmount, setDefaultAmount] = useState(null);
  const radioButtons = useMemo(
    () => [
      {
        id: 1, // acts as primary key, should be unique and non-empty string
        label: 'Residential',
        value: 'option1',
        labelStyle: {color: '#747474'},
        color: `${colors?.primary}`,
      },
      {
        id: 2,
        label: 'Commercial',
        value: 'option2',
        labelStyle: {color: '#747474'},
        color: `${colors?.primary}`,
      },
    ],
    [],
  );
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

  const createInvoice = async formData => {
    setLoading(true);
    try {
      const apartmentId = soldApartment.find(
        e => e.title === formData.apartment + ' ' + formData.apartmentID,
      )?.apartmentID;
      const accountId = soldApartment.find(
        e => e.title === formData.apartment + ' ' + formData.apartmentID,
      )?.ownerAccountID;
      // setValue('amount', (formData?.no_of_Months*formData.sq_feet*formData?.maintanceCharges));
      let obj = {
        resdient: newData,
        title: formData.title,
        description: formData.description,
        invoiceDate: moment(invoiceDate).format('YYYY-MM-DDTHH:mm'),
        dueDate: moment(dueDate).format('YYYY-MM-DDTHH:mm'),
        amount: formData.amount,
        // apartmentNo: formData.apartmentID,
      };
      let obj1 = {
        resdient: newData,
        title: formData.title,
        description: formData.description,
        invoiceDate: moment(invoiceDate).format('YYYY-MM-DDTHH:mm'),
        dueDate: moment(dueDate).format('YYYY-MM-DDTHH:mm'),
        amount:
          formData?.no_of_Months *
          formData.sq_feet *
          formData?.maintanceCharges,
        isCommercial: true,
        no_of_Months: formData?.no_of_Months,
        rentSqft: formData.sq_feet,
        maintenanceCharges: formData?.maintanceCharges,
      };
      const {message} = await apiCall.createInvoice(
        selectedId == 2 ? obj1 : obj,
      );

      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log(
        '🚀 ~ file: CreateInvoice.js:121 ~ createInvoice ~ error:',
        error,
      );
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
  const getSoldApartment = async () => {
    try {
      const { data } = await apiCall.getSoldApartment();
      const apartments = [];
      data.forEach(element => {
        let obj = {
          ...element,
          title: element?.building + ' ' + element?.unit,
        };
        apartments.push(obj);
      });
      setSoldApartment(apartments);
    } catch (error) { }
  };

  const GetSoldApartmentsByBuildings = async () => {
    try {
      const { data } = await apiCall.GetSoldApartmentsByBuildings();
      const apartments = [];
      data.forEach(element => {
        let obj = {
          // ...element,
          title: element?.building,
          apartments: element?.apartments,
        };
        apartments.push(obj);
      });
      setSoldApartmentByBuilding(apartments);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  const showAppartment = () => {
    const apartmentsNo = [];
    myApartments.forEach(element => {
      let obj = {
        title: element?.apartment,
      };
      apartmentsNo.push(obj);
    });
    setMyApartmentNo(apartmentsNo);
  };

  useEffect(() => {
    GetSoldApartmentsByBuildings();
    showAppartment();
    getSoldApartment();
  }, [isFocused, myApartments]);

  var intApartments = [];

  for (let i = 0; i <= selectedApartmentNo.length - 1; i++) {
    intArray = parseInt(selectedApartmentNo[i], 10);

    intApartments.push(intArray);
  }
  useEffect(() => {
    setDefaultAmount(sqFeet * noOfMonth * mainCharges);
  }, [sqFeet, noOfMonth, mainCharges]);
  const newData = soldApartment
    .filter(item => selectedApartmentNo.includes(item.unit))
    .map(item => ({
      apartmentID: item.apartmentID,
      accountID: item.ownerAccountID,
    }));

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

      <KeyboardAvoidingView behavior='padding' style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
        <Header onBack={goBack} title={'Create Invoice'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={{paddingHorizontal: width * 0.02}}>
          <View style={{}}>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={e => {
                  setSelectedId(e);
                  // registerAs(e);
                }}
                selectedId={selectedId}
                layout="row"
              />
            </View>
            <DropDown
              name={'apartment'}
              title="Select Building"
              type={'default'}
              variant={'outlined'}
              control={control}
              rules={{
                required: 'Please select building',
              }}
              img={false}
              onPress={() => {
                setShowModal(true), setValue('apartmentID', null);
              }}
            />

            {myApartments?.length > 0 && (
              <DropDown
                coma
                name={'apartmentID'}
                title="Apartment no"
                type={'default'}
                variant={'outlined'}
                control={control}
                rules={{
                  required: 'Please select Apartment no',
                }}
                img={false}
                value={selectedApartmentNo}
                onPress={() => {
                  setShowUnitModal(true);
                }}
              />
            )}
            {/* {selectedApartment === '2nd Building' && (
              <DropDown
                coma
                name={'apartmentID'}
                title="Apartment no"
                type={'default'}
                variant={'outlined'}
                control={control}
                rules={{
                  required: 'Please select Apartment no',
                }}
                img={false}
                value={selectedApartmentNo}
                onPress={() => {
                  setShowUnitModal(true);
                }}
              />
            )} */}

            <FilledTextField
              name={'title'}
              variant={'outlined'}
              placeholder="Title"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter title.',
              }}
              onSubmitEditing={handleSubmit(createInvoice)}
            />
            <FilledTextField
              name={'description'}
              variant={'outlined'}
              placeholder="Description"
              type={'default'}
              multiline={true}
              numberOfLines={4}
              customInputStyle={{ height: width * 0.3 }}
              control={control}
              rules={{
                required: 'Please enter description.',
              }}
              onSubmitEditing={handleSubmit(createInvoice)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                marginTop: 10,
              }}>
              <View style={{ width: '47%' }}>
                <CustomText style={{ marginLeft: 5 }}>Date</CustomText>
                <TimeDateBtn
                  variant={'light'}
                  title={
                    invoiceDate == new Date()
                      ? 'Invoice Date'
                      : getFormattedDate(invoiceDate)
                  }
                  prefixIcon={true}
                  setOpen={() => [setOpen(true), setMode('invoiceDate')]}
                />
              </View>
              <View style={{ width: '47%' }}>
                <CustomText style={{ marginLeft: 5 }}>Due Date</CustomText>
                <TimeDateBtn
                  variant={'light'}
                  title={
                    dueDate == new Date()
                      ? 'Due Date'
                      : getFormattedDate(dueDate)
                  }
                  prefixIcon={true}
                  setOpen={() => [setOpen(true), setMode('dueDate')]}
                />
              </View>
            </View>

            {selectedId == 2 ? (
              <>
                <SetFieldTextField
                  name={'Sq_feet'}
                  type={'number-pad'}
                  control={control}
                  tag={'sq-feet'}
                  priceTag={true}
                  rules={{
                    required: 'Please enter sq-feet.',
                  }}
                  justChange={setSqFeet}
                  onSubmitEditing={handleSubmit(createInvoice)}
                />

                <SetFieldTextField
                  name={'maintanceCharges'}
                  type={'number-pad'}
                  control={control}
                  tag={'Maintance Charges'}
                  rules={{
                    required: 'Please enter maintainance charges.',
                  }}
                  onSubmitEditing={handleSubmit(createInvoice)}
                  justChange={setMainCharges}
                />

                <SetFieldTextField
                  name={'no_of_Months'}
                  type={'number-pad'}
                  tag={'No. of Month'}
                  priceTag={true}
                  control={control}
                  rules={{
                    required: 'Please enter No. of month.',
                  }}
                  onSubmitEditing={handleSubmit(createInvoice)}
                  justChange={setNoOfMonth}
                />
                <SetFieldTextField
                  name={'totalAmount'}
                  type={'number-pad'}
                  editable={false}
                  control={control}
                  // defaultValue={(5000).toString()}
                  value
                  onSubmitEditing={handleSubmit(createInvoice)}
                  defaultValue={defaultAmount.toString()}
                />
              </>
            ) : (
              <SetFieldTextField
                name={'amount'}
                type={'number-pad'}
                control={control}
                rules={{
                  required: 'Please enter amount.',
                }}
                onSubmitEditing={handleSubmit(createInvoice)}
              />
            )}

            <View style={{ marginVertical: width * 0.07 }}>
              <PrimaryButton
                customStyle={{ padding: width * 0.032 }}
                title={'Submit'}
                loader={loading}
                onPress={handleSubmit(createInvoice)}
              />
            </View>
          </View>

          <CustomSearchModal
            search="Search"
            data={
              soldApartmentByBuilding.length <= 0 ? [] : soldApartmentByBuilding
            }
            modalVisible={showModal}
            closeModal={() => setShowModal(false)}
            getvalue={e => {
              const allApartments = soldApartmentByBuilding.find(
                v => v.title === e,
              )?.apartments;
              setMyApartments(allApartments);
              setValue('apartment', e);
              setSelectedApartment(e);
              setBuildingName(e);
              clearErrors('apartment');
            }}
          />

          <MultipleSelectModal
            search="Search"
            data={myApartmentNo.length <= 0 ? [] : myApartmentNo}
            modalVisible={showUnitModal}
            closeModal={() => setShowUnitModal(false)}
            getvalue={e => {
              setValue('apartmentID', e);
              setSelectedApartmentNo(e);
              clearErrors('apartmentID');
            }}
          />
          <PostDatesPicker
            setDate={
              mode == 'dueDate'
                ? e => {
                  setDueDate(e);
                }
                : e => {
                  setInvoiceDate(e);
                }
            }
            closeModal={() => setOpen(false)}
            date={mode == 'dueDate' ? dueDate : invoiceDate}
            modalVisible={open}
            mode={'date'}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={{
        height:100
      }}></View>
    </SafeAreaView>
  );
};

export default CreateInvoice;
