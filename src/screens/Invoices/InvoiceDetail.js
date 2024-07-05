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
import React, {Fragment, useEffect, useState} from 'react';
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
import {Image} from 'react-native';
import {Images} from '../../assets/Images';
import {TouchableOpacity} from 'react-native';
import moment from 'moment';
import ConvertToPdf from '../../components/CreatePdf';

const {width} = Dimensions.get('window');

const InvoiceDetail = ({navigation, route}) => {
  const updateData = route?.params?.data;
  const {control, handleSubmit, setValue, clearErrors} = useForm();

  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const [loading, setLoading] = useState(false);

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

  const deleteInvoice = async id => {
    setLoading(true);
    try {
      const {message} = await apiCall.deleteInvoice(id);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
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
      const unitName = data.find(e => e.unit === updateData.unitNumber)?.unit;
      setValue('apartment', unitName);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  const setDefaultData = () => {
    try {
      setValue('title', updateData?.title);
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

  console.log(updateData);

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
        <Header onBack={goBack} title={'Invoice Detail'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={{paddingHorizontal: width * 0.02}}>
            <View style={{}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Invoice Date
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {moment(updateData.invoiceDate).format('DD MMMM YYYY')}
              </CustomText>
            </View>

            <View style={{marginTop: width * 0.03}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Due Date
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {moment(updateData.dueDate).format('DD MMMM YYYY')}
              </CustomText>
            </View>

            <View style={{marginTop: width * 0.03}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Invoice ID
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData.invoiceID}
              </CustomText>
            </View>

            <View style={{marginTop: width * 0.03}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Building Type
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData.isCommercial ? 'Commercial' : 'Residential'}
              </CustomText>
            </View>

            <View style={{marginTop: width * 0.03}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Apartment Number
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData.building + ', ' + updateData?.unitNumber}
              </CustomText>
            </View>
            <View style={{marginTop: width * 0.03}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Machine ID
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData?.machineID}
              </CustomText>
            </View>
            <View style={{marginTop: width * 0.03}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Resident Owner name
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData.residentName}
              </CustomText>
            </View>

            <View style={{marginTop: width * 0.03}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Title
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData.title}
              </CustomText>

              <View style={{marginTop: width * 0.03}}>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.name}>
                  Description
                </CustomText>

                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.username}>
                  {updateData.description}
                </CustomText>
              </View>

              {updateData.isPaid !== false && (
                <View style={{marginTop: width * 0.03}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Submitted Date and time
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {updateData.submitDate}
                  </CustomText>
                </View>
              )}

              {updateData.isCommercial && (
                <>
                  <View style={{marginTop: width * 0.03}}>
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={styles.name}>
                      Sq Feet
                    </CustomText>

                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={styles.username}>
                      {updateData.rentSqft}
                    </CustomText>
                  </View>
                  <View style={{marginTop: width * 0.03}}>
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={styles.name}>
                      Maintenance Charges
                    </CustomText>

                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={styles.username}>
                      {updateData.maintenanceCharges}
                    </CustomText>
                  </View>

                  <View style={{marginTop: width * 0.03}}>
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={styles.name}>
                      No. of month
                    </CustomText>

                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={styles.username}>
                      {updateData.no_of_Months}
                    </CustomText>
                  </View>
                </>
              )}

              <View style={{marginTop: width * 0.03}}>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.name}>
                  Amount
                </CustomText>

                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.username}>
                  {updateData.amount}
                </CustomText>
              </View>

              {updateData.isPaid == true && (
                <View style={{marginTop: width * 0.03}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Status
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{
                      color:
                        updateData.isVerify === false
                          ? colors.pending
                          : colors.primary,
                      fontSize: width * 0.04,
                    }}>
                    {updateData.isVerify === false ? 'Pending' : 'Approved'}
                  </CustomText>
                </View>
              )}

              <View style={{}}>
                {/* <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.name}>
                Apartment ID
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData.unitNumber}
              </CustomText> */}
              </View>
            </View>
            {/* <FilledTextField
              editable={false}
              name={'description'}
              variant={'outlined'}
              placeholder="Description"
              type={'default'}
              multiline={true}
              numberOfLines={4}
              customInputStyle={{ height: width * 0.3 }}
              control={control}
            /> */}
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: "wrap" }}>
              <View style={{ width: '47%' }}>
                <TimeDateBtn
                  variant={'light'}
                  title={invoiceDate == new Date() ? 'Invoice Date' : getFormattedDate(invoiceDate)}
                  prefixIcon={true}
                  setOpen={() => ""}
                />
              </View>
              <View style={{ width: '47%' }}>
                <TimeDateBtn
                  variant={'light'}
                  title={dueDate == new Date() ? 'Due Date' : getFormattedDate(dueDate)}
                  prefixIcon={true}
                  setOpen={() => ""}
                />
              </View>
            </View> */}
            {/* <SetFieldTextField
              editable={false}
              name={'amount'}
              type={'number-pad'}
              control={control}
            /> */}

            {!updateData?.isPaid && (
              <Fragment>
                {role == 'User' ? (
                  <View style={{marginVertical: width * 0.07}}>
                    <PrimaryButton
                      customStyle={{
                        padding: width * 0.03,
                      }}
                      title={'PayNow'}
                      paytitle={{fontSize: width * 0.043}}
                      onPress={() =>
                        navigation.navigate('enterAmount', {data: updateData})
                      }
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      marginVertical: width * 0.07,
                      flexDirection: 'row',
                      gap: 8,
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      disabled={loading}
                      onPress={() => deleteInvoice(updateData?.invoiceID)}
                      activeOpacity={1}
                      style={{
                        width: width * 0.13,
                        height: width * 0.13,
                        marginRight: width * 0.02,
                        backgroundColor: colors.danger,
                        borderRadius: 10,
                        padding: width * 0.02,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{
                          tintColor: colors.white,
                          width: width * 0.06,
                          height: width * 0.06,
                        }}
                        source={Images.icondelete}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('updateInvoice', {data: updateData})
                      }
                      activeOpacity={1}
                      style={{
                        width: width * 0.13,
                        height: width * 0.13,
                        marginRight: width * 0.02,
                        backgroundColor: colors.primary,
                        borderRadius: 10,
                        padding: width * 0.02,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{
                          tintColor: colors.white,
                          width: width * 0.06,
                          height: width * 0.06,
                        }}
                        source={Images.editIcon}
                      />
                    </TouchableOpacity>

                    <ConvertToPdf data={updateData} />
                  </View>
                )}
              </Fragment>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default InvoiceDetail;
