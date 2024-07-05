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
import {emailRegex, getFormattedDate} from '../../utils/helperFunction';
import {apiCall} from '../../Services/apiCall';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import SetFieldTextField from '../../components/TextField/SetFieldTextField';
import CustomModal from '../../components/Modal/CustomModal';
import DropDown from '../../components/TextField/DropDown';

const {width} = Dimensions.get('window');

const UpdateInvoice = ({navigation, route}) => {
  const updateData = route?.params?.data;
  const {control, handleSubmit, setValue, clearErrors} = useForm();

  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const [soldApartment, setSoldApartment] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('date');
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());

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

  const updateInvoice = async formData => {
    setLoading(true);
    try {
      const apartmentId = soldApartment.find(
        e => e.title === formData.apartment,
      )?.apartmentID;
      const accountId = soldApartment.find(
        e => e.title === formData.apartment,
      )?.ownerAccountID;
      let obj = {
        invoiceID: updateData?.invoiceID,
        apartmentID: apartmentId,
        accountID: accountId,
        title: formData.title,
        description: formData.description,
        invoiceDate: invoiceDate,
        dueDate: dueDate,
        amount: formData.amount,
      };
      const {message} = await apiCall.updateInvoice(obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        navigation.navigate('invoices');
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

  const getSoldApartment = async () => {
    try {
      const {data} = await apiCall.getSoldApartment();
      const apartments = [];
      data.forEach(element => {
        let obj = {
          ...element,
          title: element?.unit,
        };
        apartments.push(obj);
      });
      setSoldApartment(apartments);
      const unitName = data.find(e => e.unit === updateData.unitNumber)?.unit;
      setValue('apartment', unitName);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  const setDefaultData = () => {
    try {
      setValue('title', updateData?.title);
      setValue('building', updateData?.building);
      setValue('description', updateData?.description);
      setValue('amount', updateData?.amount.toString());
      setInvoiceDate(new Date(updateData?.invoiceDate));
      setDueDate(new Date(updateData?.dueDate));
    } catch (error) {
      console.log('file: index.js:148 => setDefaultData => error:', error);
    }
  };

  useEffect(() => {
    getSoldApartment();
    setDefaultData();
  }, [isFocused]);

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
        <Header onBack={goBack} title={'Update Invoice'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={{paddingHorizontal: width * 0.02}}>
            <FilledTextField
              editable={false}
              name={'building'}
              variant={'outlined'}
              placeholder="building"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter title.',
              }}
              onSubmitEditing={handleSubmit(updateInvoice)}
            />
            <FilledTextField
              editable={false}
              name={'apartment'}
              variant={'outlined'}
              placeholder="Title"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter title.',
              }}
              onSubmitEditing={handleSubmit(updateInvoice)}
            />
            <FilledTextField
              name={'title'}
              variant={'outlined'}
              placeholder="Title"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter title.',
              }}
              onSubmitEditing={handleSubmit(updateInvoice)}
            />
            <FilledTextField
              name={'description'}
              variant={'outlined'}
              placeholder="Description"
              type={'default'}
              multiline={true}
              numberOfLines={4}
              customInputStyle={{height: width * 0.3}}
              control={control}
              rules={{
                required: 'Please enter description.',
              }}
              onSubmitEditing={handleSubmit(updateInvoice)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <View style={{width: '47%'}}>
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
              <View style={{width: '47%'}}>
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
            <SetFieldTextField
              name={'amount'}
              type={'number-pad'}
              control={control}
              rules={{
                required: 'Please enter amount.',
              }}
              onSubmitEditing={handleSubmit(updateInvoice)}
            />

            <View style={{marginVertical: width * 0.07}}>
              <PrimaryButton
                customStyle={{padding: width * 0.032}}
                title={'Submit'}
                loader={loading}
                onPress={handleSubmit(updateInvoice)}
              />
            </View>
          </View>

          <CustomModal
            data={soldApartment.length <= 0 ? [] : soldApartment}
            modalVisible={showModal}
            closeModal={() => setShowModal(false)}
            getvalue={e => {
              setValue('apartment', e);
              clearErrors('apartment');
            }}
          />

          <DateTimePicker
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
      </View>
    </SafeAreaView>
  );
};

export default UpdateInvoice;
