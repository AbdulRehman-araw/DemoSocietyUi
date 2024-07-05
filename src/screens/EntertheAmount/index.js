import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  Alert,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {colors} from '../../styles/colors';
import {Images} from '../../assets/Images';
import {text} from '../../res/strings';
import PrimaryButton from '../../components/Button/PrimaryButton';
import CustomText from '../../components/CustomText';
import {fontsFamily} from '../../assets/Fonts';
import {styles} from './styles';
import PaymentCards from '../../components/DetailCard/PaymentsCard';
import SetFieldTextField from '../../components/TextField/SetFieldTextField';
import HeaderClose from '../../components/Header/HeaderClose';
import FilledTextField from '../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import {getFormattedDate} from '../../utils/helperFunction';
import ImageCropPicker from 'react-native-image-crop-picker';
import {apiCall} from '../../Services/apiCall';
import {baseUrl} from '../../../axios';
import AlertModal from '../../components/Modal/AlertModal';
import {useSelector} from 'react-redux';
import DropDown from '../../components/TextField/DropDown';
import CustomModal from '../../components/Modal/CustomModal';
import {useIsFocused} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const EnterAmount = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const updateData = route?.params?.data;
  const {control, handleSubmit, setValue, clearErrors} = useForm();

  const [selectedCard, setSelectedCard] = useState('MasterCard');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [invoices, setInvoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState();

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const [imageLoader, setImageLoader] = useState(false);

  const cardData = [
    {
      id: 0,
      cardName: 'MasterCard',
      cardNumber: '**** **** *** 3245',
      cardImg: Images.mastercardlogo,
    },
    {
      id: 1,
      cardName: 'Visa',
      cardNumber: '**** **** *** 3245',
      cardImg: Images.visalogo,
    },
    {
      id: 2,
      cardName: 'Bank',
      cardNumber: '',
      cardImg: Images.bankpayment,
    },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const uploadImage = async () => {
    try {
      ImageCropPicker.openPicker({
        compressImageQuality: 0.7,
        cropping: true,
      }).then(async file => {
        let filePath = file.path.split('/');
        const formData = new FormData();
        formData.append('file', {
          uri: file.path,
          type: file.mime,
          name: filePath[filePath.length - 1],
        });
        const {data} = await apiCall.uploadReceipt(formData);
        setImage(data);
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const submitPayment = async formData => {
    setLoader(true);
    try {
      const invoiceId = invoices.find(
        e => e.title === formData.invoice,
      )?.invoiceID;
      let obj = {
        invoiceID: invoiceId,
        description: formData.description,
        paymentDate: moment(date).format('YYYY-MM-DDTHH:mm'),
        voucherImage: image,
        amount: formData.amount,
      };
      const {message} = await apiCall.addReceiving(obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        navigation.navigate('eBilling');
      }, 3000);
    } catch (error) {
      console.log(
        'file: addContact.js:77 => addEmergencyContact => error:',
        error,
      );
    } finally {
      setLoader(false);
    }
  };

  const handleInvoiceAmount = invoice => {
    try {
      const invoiceAmount = invoices.find(e => e.title === invoice)?.amount;
      setValue('amount', invoiceAmount.toString());
    } catch (error) {
      console.log('file: index.js:149 => handleInvoiceAmount => error:', error);
    }
  };

  const getInvoices = async () => {
    setLoader(true);
    try {
      const isPaid = false;
      const {data} = await apiCall.getInvoices(role, isPaid);
      setInvoices(data);
      if (updateData) {
        const invoiceData = data.find(e => e.title === updateData.title);
        setValue('invoice', invoiceData?.title);
        setValue('amount', invoiceData?.amount.toString());
      }
    } catch (error) {
      console.log('file: index.js:54 => getInvoices => error:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getInvoices();
  }, [isFocused]);

  const setImageLoading = () => {
    setTimeout(() => {
      setImageLoader(true);
    }, 1000);
  };

  const handlePicWithLoading = async () => {
    setImageLoading(true); // Start the loader

    try {
      // Call your image upload logic
      await uploadImage();

      // When the image is uploaded successfully:
      setImageLoading(false); // Stop the loader
    } catch (error) {
      console.log('🚀 ~ file: index.js:105 ~ handlePic ~ error:', error);
      setImageLoading(false); // Stop the loader on error
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent
        backgroundColor={colors.white}
        barStyle="light-content"
      />

      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <View style={{paddingHorizontal: width * 0.025, flex: 1, marginTop: 40}}>
        <HeaderClose
          onBack={goBack}
          leftarrow={{marginLeft: 10}}
          title={'Enter the Amount'}
          showRightBtn={true}
        />

        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.lightoffwhite,
            shadowColor: '#4d4d4d',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.8,
            shadowRadius: 13.1,
            elevation: 10,
            marginTop: 5,
          }}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
            marginHorizontal: width * 0.015,
          }}>
          {/* <CustomText
            fontWeight={fontsFamily.bold}
            style={{
              color: colors.black,
              fontSize: width * 0.033,
              marginTop: 25,
            }}>
            Current Balance: Rs {data?.currentBalance}
          </CustomText> */}

          <DropDown
            name={'invoice'}
            title="Select Invoice"
            type={'default'}
            variant={'outlined'}
            control={control}
            rules={{
              required: 'Please select invoice',
            }}
            img={false}
            onPress={() => {
              setShowModal(true);
            }}
          />
          <SetFieldTextField
            editable={false}
            name={'amount'}
            type={'number-pad'}
            control={control}
          />
          <View style={{width: '100%'}}>
            <TimeDateBtn
              variant={'light'}
              title={date == new Date() ? 'Date' : getFormattedDate(date)}
              prefixIcon={true}
              setOpen={() => setOpen(false)}
            />
          </View>

          {/* <View style={{flexDirection:'row', align}}>
          <Image source={Images.calendar} resizeMode='contain' style={{ height: '100%', width: "100%" }} />
          <CustomText style={{color:colors.black}}>{getFormattedDate(date)}</CustomText>
          </View> */}

          <FilledTextField
            name={'description'}
            placeholder="Description"
            type={'default'}
            variant={'outlined'}
            multiline={true}
            numberOfLines={4}
            customInputStyle={{height: width * 0.3}}
            control={control}
            rules={{
              required: 'Please enter description.',
            }}
            onSubmitEditing={handleSubmit(submitPayment)}
          />

          <View style={{width: '100%'}}>
            {/* <TimeDateBtn
              variant={'light'}
              title={'Upload Image (optional)'}
              prefixIcon={true}
              showRightIcon={true}
              rightIconImg={Images.camera}
              setOpen={() => uploadImage()}
            />
            {image &&
              <View>
                <Image source={{ uri: baseUrl + image }} resizeMode="contain" style={{ width: 'auto', height: width * 0.6 }} />
              </View>
            } */}

            <TimeDateBtn
              variant={'primary'}
              title={'Upload image'}
              prefixIcon={true}
              showRightIcon={true}
              rightIconImg={Images.camera}
              setOpen={handlePicWithLoading}
            />

            {imageLoader && (
              <ActivityIndicator
                size={'large'}
                color={colors.primary}
                style={{marginTop: 20}}
              />
            )}
            {image && (
              <View>
                <Image
                  onLoad={() => setImageLoader(false)}
                  source={{uri: baseUrl + image}}
                  resizeMode="contain"
                  style={{width: 'auto', height: width * 0.6}}
                />
              </View>
            )}
          </View>

          {/* <View style={styles.paymentview}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={Images.ioscard}
                resizeMode="contain"
                style={{
                  width: width * 0.044,
                }} />
              <CustomText
                fontWeight={fontsFamily.bold}
                style={{
                  color: colors.black,
                  fontSize: width * 0.04,
                  marginHorizontal: 8,
                }}>
                Payment Method
              </CustomText>
            </View>
            <TouchableOpacity>
              <CustomText
                fontWeight={fontsFamily.bold}
                style={{
                  color: colors.primary,
                  fontSize: width * 0.033,
                  marginTop: 8,
                }}>
                Add New
              </CustomText>
            </TouchableOpacity>

          </View> */}

          {/* {cardData.map((item, index) => (
            <PaymentCards
              selectedCard={selectedCard}
              setSelectedCard={(e) => setSelectedCard(e)}
              cardName={item.cardName}
              cardImage={item.cardImg}
              cardNumber={item.cardNumber}
            />
          ))} */}

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <PrimaryButton
              customStyle={{padding: width * 0.03}}
              title={'Submit'}
              paytitle={{fontSize: width * 0.04}}
              loader={loader}
              onPress={handleSubmit(submitPayment)}
            />
          </View>

          <CustomModal
            data={invoices?.length <= 0 ? [] : invoices}
            modalVisible={showModal}
            closeModal={() => setShowModal(false)}
            getvalue={e => {
              setValue('invoice', e);
              handleInvoiceAmount(e);
              clearErrors('invoice');
            }}
          />

          <DateTimePicker
            setDate={e => setDate(e)}
            closeModal={() => setOpen(false)}
            date={date}
            modalVisible={open}
            mode={'date'}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EnterAmount;
