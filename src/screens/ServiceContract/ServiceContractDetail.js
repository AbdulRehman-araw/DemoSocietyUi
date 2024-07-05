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
import DropDown from '../../components/TextField/DropDown';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {Images} from '../../assets/Images';
import {DataTable} from 'react-native-paper';
import CustomModal from '../../components/Modal/CustomModal';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const ServiceContractDetail = ({navigation, route}) => {
  const updateData = route?.params?.data;
  const {control, handleSubmit, setValue, clearErrors, resetField} = useForm();

  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const [loading, setLoading] = useState(false);

  const [loader, setLoader] = useState(false);

  const [selectedPaymentType, setSelectedPaymentType] = useState();

  const [date, setDate] = useState(new Date());

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const [serviceDetails, setServiceDetails] = useState();
  console.log('🚀 ~ ServiceContractDetail ~ serviceDetails:', serviceDetails);
  const [totalAmount, setTotalAmount] = useState(0);

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

  const deleteServiceContract = async id => {
    setLoading(true);
    try {
      const {message} = await apiCall.deleteServiceContract(id);
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

  const getVendors = async j => {
    try {
      const {data} = await apiCall.getVendors();
      const vendorData = [];
      data.forEach(element => {
        let obj = {
          ...element,
          title: element?.name,
        };
        vendorData.push(obj);
      });
      const vendorName = data.find(e => e.vendorID === j?.vendorID)?.name;
      setValue('vendor', vendorName);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  const getPaymentTypes = async j => {
    try {
      const {data} = await apiCall.getPaymentTypes();
      const paymentTypeData = [];
      data.forEach(element => {
        let obj = {
          ...element,
          title: element?.typeName,
        };
        paymentTypeData.push(obj);
      });
      const typeName = data.find(e => e.typeID === j?.paymentTypeID)?.typeName;
      setValue('paymentType', typeName);
      setSelectedPaymentType(typeName);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  const getBanks = async j => {
    try {
      const {data} = await apiCall.getBanks();
      const bankData = [];
      data.forEach(element => {
        let obj = {
          ...element,
          title: element?.accountTitle,
        };
        bankData.push(obj);
      });
      const bankName = data.find(e => e.bankID === j?.bankAccountID)?.bankName;
      setValue('bankAccount', bankName);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  const getServiceContractDetail = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getServiceContractDetail(
        updateData?.serviceContractID,
      );
      setServiceDetails(data);
      setValue('name', data?.expenseName);
      setValue('description', data?.description);
      setValue('totalAmount', data?.totalAmount.toString());
      setTotalAmount(data?.totalAmount);
      setDate(new Date(data?.purchaseDate));
      const updateProduct = [];
      data?.items.forEach(element => {
        let obj = {
          ...element,
          item: element?.itemName,
        };
        updateProduct.push(obj);
      });
      getVendors(data);
      getPaymentTypes(data);
      getBanks(data);
    } catch (error) {
      console.log('file: index.js:54 => getPurchases => error:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getServiceContractDetail();
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
        <Header onBack={() => goBack()} title={'Service Contract Detail'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          {loader ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : (
            <View style={{paddingHorizontal: width * 0.02}}>
              <View style={styles.viewname}>
                <View>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Vendor
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {serviceDetails?.vendorName}
                  </CustomText>
                </View>
              </View>
              <View style={styles.viewname}>
                <View>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Date
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {moment(serviceDetails?.date).format('DD/MM/YYYY')}
                  </CustomText>
                </View>
              </View>
              <View style={styles.viewname}>
                <View>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Remarks
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {serviceDetails?.remarks}
                  </CustomText>
                </View>
              </View>
              <View style={styles.viewname}>
                <View>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Total Amount
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {serviceDetails?.installmentPlans[0]?.totalAmount}
                  </CustomText>
                </View>
              </View>

              <View style={styles.viewname}>
                <View>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Total Paid
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {serviceDetails?.totalPaid}
                  </CustomText>
                </View>
              </View>
              <View style={styles.viewname}>
                <View>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Total Balance
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {serviceDetails?.balance}
                  </CustomText>
                </View>
              </View>

              <View style={styles.viewname}>
                <View>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Current Payable
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {serviceDetails?.currentPayable}
                  </CustomText>
                </View>
              </View>

              <View
                style={{marginTop: height * 0.03, marginBottom: height * 0.01}}>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={[styles.name, {fontSize: width * 0.4}]}>
                  Service Details
                </CustomText>
              </View>
              {serviceDetails?.serviceDetails.length > 0 && (
                <DataTable
                  style={{
                    borderColor: colors.gray,
                    borderWidth: 1,
                    borderRadius: 9,
                  }}>
                  <DataTable.Header
                    style={{
                      paddingHorizontal: 0,
                      backgroundColor: colors.primary,
                      borderTopLeftRadius: 9,
                      borderTopRightRadius: 9,
                    }}>
                    <DataTable.Title
                      style={[styles.tableCell, styles.border, {flex: 0.3}]}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[styles.tableText, {color: colors.white}]}>
                        #
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title
                      numberOfLines={3}
                      style={[styles.tableTitle, styles.border]}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[styles.tableText, {color: colors.white}]}>
                        Description
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title style={[styles.tableCell, styles.border]}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[styles.tableText, {color: colors.white}]}>
                        Qty
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title style={[styles.tableCell, styles.border]}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[styles.tableText, {color: colors.white}]}>
                        Rate
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title style={styles.tableCell}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[styles.tableText, {color: colors.white}]}>
                        Total
                      </Text>
                    </DataTable.Title>
                  </DataTable.Header>

                  {serviceDetails?.serviceDetails.map((item, index) => (
                    <DataTable.Header
                      key={index}
                      style={{paddingHorizontal: 0}}>
                      <DataTable.Title
                        style={[styles.tableCell, styles.border, {flex: 0.3}]}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText]}>
                          {index + 1}
                        </Text>
                      </DataTable.Title>
                      <DataTable.Title
                        numberOfLines={3}
                        style={[styles.tableTitle, styles.border]}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText]}>
                          {item?.description}
                        </Text>
                      </DataTable.Title>
                      <DataTable.Title
                        style={[styles.tableCell, styles.border]}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText]}>
                          {item?.qty}
                        </Text>
                      </DataTable.Title>
                      <DataTable.Title
                        style={[styles.tableCell, styles.border]}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText]}>
                          {item?.rate}
                        </Text>
                      </DataTable.Title>
                      <DataTable.Title style={styles.tableCell}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText]}>
                          {item?.amount}
                        </Text>
                      </DataTable.Title>
                    </DataTable.Header>
                  ))}
                </DataTable>
              )}

              <View
                style={{marginTop: height * 0.03, marginBottom: height * 0.01}}>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={[styles.name, {fontSize: width * 0.4}]}>
                  Installments
                </CustomText>
              </View>
              {serviceDetails?.installmentPlans.length > 0 && (
                <DataTable
                  style={{
                    borderColor: colors.gray,
                    borderWidth: 1,
                    borderRadius: 9,
                  }}>
                  <DataTable.Header
                    style={{
                      paddingHorizontal: 0,
                      backgroundColor: colors.primary,
                      borderTopLeftRadius: 9,
                      borderTopRightRadius: 9,
                    }}>
                    <DataTable.Title
                      style={[styles.tableCell, styles.border, {flex: 0.3}]}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[styles.tableText, {color: colors.white}]}>
                        #
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title
                      numberOfLines={3}
                      style={[styles.tableTitle, styles.border, {flex: 2}]}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[styles.tableText, {color: colors.white}]}>
                        Plan Type
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title style={[styles.tableCell, styles.border]}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[styles.tableText, {color: colors.white}]}>
                        Installment
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title style={styles.tableCell}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[styles.tableText, {color: colors.white}]}>
                        Total
                      </Text>
                    </DataTable.Title>
                  </DataTable.Header>

                  {serviceDetails?.installmentPlans.map((item, index) => (
                    <DataTable.Header
                      key={index}
                      style={{paddingHorizontal: 0}}>
                      <DataTable.Title
                        style={[styles.tableCell, styles.border, {flex: 0.3}]}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText]}>
                          {index + 1}
                        </Text>
                      </DataTable.Title>
                      <DataTable.Title
                        numberOfLines={3}
                        style={[styles.tableTitle, styles.border, {flex: 2}]}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText]}>
                          {item?.planType}
                        </Text>
                      </DataTable.Title>
                      <DataTable.Title
                        style={[styles.tableCell, styles.border]}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText]}>
                          {item?.totalInstallments}
                        </Text>
                      </DataTable.Title>
                      <DataTable.Title style={styles.tableCell}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText]}>
                          {item?.totalAmount}
                        </Text>
                      </DataTable.Title>
                    </DataTable.Header>
                  ))}
                </DataTable>
              )}

              <View
                style={{marginTop: height * 0.03, marginBottom: height * 0.01}}>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={[styles.name, {fontSize: width * 0.4}]}>
                  Installment Plans
                </CustomText>
              </View>
              {serviceDetails?.serviceInstallments.length > 0 && (
                <DataTable
                  style={{
                    borderColor: colors.gray,
                    borderWidth: 1,
                    borderRadius: 9,
                  }}>
                  <DataTable.Header
                    style={{
                      paddingHorizontal: 0,
                      backgroundColor: colors.primary,
                      borderTopLeftRadius: 9,
                      borderTopRightRadius: 9,
                    }}>
                    <DataTable.Title
                      style={[styles.tableCell, styles.border, {flex: 0.3}]}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[styles.tableText, {color: colors.white}]}>
                        #
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title
                      numberOfLines={3}
                      style={[styles.tableTitle, styles.border]}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[styles.tableText, {color: colors.white}]}>
                        Installment
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title style={[styles.tableCell, styles.border]}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[
                          styles.tableText,
                          {color: colors.white, fontSize: width * 0.02},
                        ]}>
                        Amount
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title
                      numberOfLines={3}
                      style={[styles.tableCell, styles.border]}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[
                          styles.tableText,
                          {color: colors.white, fontSize: width * 0.02},
                        ]}>
                        Due Date
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title
                      numberOfLines={3}
                      style={[styles.tableCell, styles.border]}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[
                          styles.tableText,
                          {color: colors.white, fontSize: width * 0.02},
                        ]}>
                        Due Amount
                      </Text>
                    </DataTable.Title>
                    <DataTable.Title numberOfLines={3} style={styles.tableCell}>
                      <Text
                        fontWeight={fontsFamily.semiBold}
                        style={[
                          styles.tableText,
                          {color: colors.white, fontSize: width * 0.02},
                        ]}>
                        Status
                      </Text>
                    </DataTable.Title>
                  </DataTable.Header>

                  {serviceDetails?.serviceInstallments.map((item, index) => (
                    <DataTable.Header
                      key={index}
                      style={{paddingHorizontal: 0}}>
                      <DataTable.Title
                        style={[styles.tableCell, styles.border, {flex: 0.3}]}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText]}>
                          {index + 1}
                        </Text>
                      </DataTable.Title>
                      <DataTable.Title
                        numberOfLines={3}
                        style={[styles.tableTitle, styles.border]}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText]}>
                          {item?.planType}, {item?.installmentNo}
                        </Text>
                      </DataTable.Title>
                      <DataTable.Title
                        style={[styles.tableCell, styles.border]}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText]}>
                          {item?.totalAmount}
                        </Text>
                      </DataTable.Title>
                      <DataTable.Title
                        numberOfLines={3}
                        style={[styles.tableCell, styles.border]}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[
                            styles.tableText,
                            {fontSize: width * 0.02},
                            styles.border,
                          ]}>
                          {moment(item?.dueDate).format('D/M/YY')}
                        </Text>
                      </DataTable.Title>

                      <DataTable.Title
                        style={[styles.tableCell, styles.border]}>
                        <Text
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText]}>
                          {item?.remainingAmount}
                        </Text>
                      </DataTable.Title>

                      <DataTable.Title
                        numberOfLines={3}
                        style={[styles.tableCell, styles.border]}>
                        <Text
                          numberOfLines={3}
                          fontWeight={fontsFamily.semiBold}
                          style={[styles.tableText, {fontSize: width * 0.02}]}>
                          {item?.paymentStatus}
                        </Text>
                      </DataTable.Title>
                    </DataTable.Header>
                  ))}
                </DataTable>
              )}

              <View
                style={{
                  marginVertical: width * 0.07,
                  flexDirection: 'row',
                  gap: 8,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  disabled={loading}
                  onPress={() =>
                    deleteServiceContract(serviceDetails?.serviceContractID)
                  }
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
                    navigation.navigate('updateServiceContract', {
                      data: serviceDetails,
                    })
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
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ServiceContractDetail;
