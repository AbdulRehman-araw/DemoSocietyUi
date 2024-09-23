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
import {emailRegex, getFormattedDate} from '../../utils/helperFunction';
import {apiCall} from '../../Services/apiCall';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import SetFieldTextField from '../../components/TextField/SetFieldTextField';
import DropDown from '../../components/TextField/DropDown';
import CustomModal from '../../components/Modal/CustomModal';
import {Images} from '../../assets/Images';
import moment from 'moment';
import {DataTable} from 'react-native-paper';

const {width} = Dimensions.get('window');

const ExpenseDetail = ({navigation, route}) => {
  const updateData = route?.params?.data;
  const {control, setValue} = useForm();

  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  const [selectedPaymentType, setSelectedPaymentType] = useState();
  const [date, setDate] = useState(new Date());

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

  const deleteExpense = async id => {
    setLoading(true);
    try {
      const {message} = await apiCall.deleteExpense(id);
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

  const getExpenseAccounts = async () => {
    try {
      const {data} = await apiCall.getExpenseAccounts();
      const accountData = [];
      data.forEach(element => {
        let obj = {
          ...element,
          title: element?.expenseAccountName,
        };
        accountData.push(obj);
      });
      const expenseAccountName = data.find(
        e => e.expenseAccountID === updateData.expenseAccountID,
      )?.expenseAccountName;
      setValue('expense', expenseAccountName);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  const getPaymentTypes = async () => {
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
      const typeName = data.find(
        e => e.typeID === updateData.paymentTypeID,
      )?.typeName;
      setValue('paymentType', typeName);
      setSelectedPaymentType(typeName);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  const getBanks = async () => {
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
      const bankName = data.find(
        e => e.bankID === updateData.bankAccountID,
      )?.bankName;
      setValue('bankAccount', bankName);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  const setDefaultData = () => {
    try {
      setValue('name', updateData?.expenseName);
      setValue('description', updateData?.description);
      setValue('amount', updateData?.amount.toString());
      setDate(new Date(updateData?.date));
    } catch (error) {
      console.log('file: index.js:148 => setDefaultData => error:', error);
    }
  };

  useEffect(() => {
    getExpenseAccounts();
    getPaymentTypes();
    getBanks();
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
        <Header onBack={goBack} title={'Expense Detail'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={{paddingHorizontal: width * 0.02}}>
            {/* <View style={styles.viewall}>
              <View style={styles.viewname}>
                <Image source={Images.attach} resizeMode="contain" style={{ width: width * 0.06, height: width * 0.06, marginHorizontal: width * 0.035 }} />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Name
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {updateData?.expenseName}
                  </CustomText>
                </View>
              </View>

              <View style={styles.viewname}>
                <Image source={Images.documents} resizeMode="contain" style={{ width: width * 0.06, height: width * 0.06, marginHorizontal: width * 0.035 }} />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Expense Account
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {updateData?.accountName}
                  </CustomText>
                </View>
              </View>

              <View style={styles.viewname}>
                <Image source={Images.documents} resizeMode="contain" style={{ width: width * 0.06, height: width * 0.06, marginHorizontal: width * 0.035 }} />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Description
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {updateData?.description}
                  </CustomText>
                </View>
              </View>

              <View style={styles.viewname}>
                <Image source={Images.documents} resizeMode="contain" style={{ width: width * 0.06, height: width * 0.06, marginHorizontal: width * 0.035 }} />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Quantity
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {updateData?.quantity}
                  </CustomText>
                </View>
              </View>


              <View style={styles.viewname}>
                <Image source={Images.calendar} resizeMode="contain" style={{ width: width * 0.06, height: width * 0.06, marginHorizontal: width * 0.035 }} />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Date
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                      {moment(updateData?.date).format('DD/MM/YYYY')}
                  </CustomText>
                </View>
              </View>


              <View style={styles.viewname}>
                <Image source={Images.attach} resizeMode="contain" style={{ width: width * 0.06, height: width * 0.06, marginHorizontal: width * 0.035 }} />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Payment Type
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {updateData?.paymentTypeID === 1 ? 'Cash' : 'Bank'}
                  </CustomText>
                </View>
              </View>


              {updateData?.bankName !== null && (
              <View style={styles.viewname}>
                <Image source={Images.bankpayment} resizeMode="contain" style={{ width: width * 0.06, height: width * 0.06, marginHorizontal: width * 0.035 }} />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Bank Account
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {updateData?.bankName}
                  </CustomText>
                </View>
              </View>
              )}

              <View style={styles.viewname}>
                <Image source={Images.attach} resizeMode="contain" style={{ width: width * 0.06, height: width * 0.06, marginHorizontal: width * 0.035 }} />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Expense Amount
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {updateData?.amount}
                  </CustomText>
                </View>
              </View>






            </View> */}

            <CustomText
              fontWeight={fontsFamily.bold}
              style={{...styles.name, fontSize: 20, marginVertical: 20}}>
              Expense Detail
            </CustomText>

            <View style={styles.viewname}>
              <View style={{}}>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{...styles.name, fontSize:14, color:colors.darkGray}}>
                  Expense Account
                </CustomText>

                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={styles.username}>
                  {updateData?.accountName}
                </CustomText>
              </View>
            </View>

            <ScrollView horizontal={true} style={{flex: 1}}>
              <View
                style={{
                  // paddingHorizontal: width * 0.01,
                  flex: 1,
                  marginTop: 10,
                  paddingBottom: width * 0.1,
                  width: '100%',
                }}>
                <DataTable
                  style={{
                    // borderColor: colors.gray,
                    // borderWidth: 1,
                    // borderRadius: 9,
                  }}>
                  <DataTable.Row
                    style={{
                      // backgroundColor: colors.primary,
                      // borderTopLeftRadius: 9,
                      // borderTopRightRadius: 9,
                    }}>
                    {/* <DataTable.Cell style={{flex: 0.05}}>
                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={{color: colors.white}}>
                        S.No
                      </CustomText>
                    </DataTable.Cell> */}
                    <DataTable.Title
                      numeric
                      style={[styles.tableCell, styles.border]}>
                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={{color: colors.darkGray, fontSize:12}}>
                        Title
                      </CustomText>
                    </DataTable.Title>
                    <DataTable.Title
                      numeric
                      style={[styles.tableCell, styles.border]}>
                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={{color: colors.darkGray, fontSize:12}}>
                        Description
                      </CustomText>
                    </DataTable.Title>
                    <DataTable.Title
                      numeric
                      style={[styles.tableCell, styles.border]}>
                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={{color: colors.darkGray, fontSize:12}}>
                        Quantity
                      </CustomText>
                    </DataTable.Title>
                    <DataTable.Title
                      numeric
                      style={[styles.tableCell, styles.border]}>
                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={{color: colors.darkGray, fontSize:12}}>
                        Date
                      </CustomText>
                    </DataTable.Title>
                    <DataTable.Title
                      numeric
                      style={[styles.tableCell, styles.border]}>
                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={{color: colors.darkGray, fontSize:12}}>
                        Amount
                      </CustomText>
                    </DataTable.Title>
                  </DataTable.Row>

                  <DataTable.Row>
                    {/* <DataTable.Cell style={{flex: 0.05}}>
                      <Text
                        style={{
                          fontFamily: fontsFamily.medium,
                          color: colors.primary,
                        }}>
                        {1}
                      </Text>
                    </DataTable.Cell> */}
                    <DataTable.Cell style={[styles.tableCell, styles.border]}>
                      <Text
                        style={{
                          fontFamily: fontsFamily.medium,
                          color: colors.black,
                        }}>
                        {updateData?.expenseName}
                      </Text>
                    </DataTable.Cell>

                    <DataTable.Title
                      numberOfLines={3}
                      style={[styles.tableCellDec, styles.border]}>
                      <Text
                        style={{
                          fontFamily: fontsFamily.medium,
                          color: colors.black,
                        }}>
                        {' '}
                        {updateData?.description}
                      </Text>
                    </DataTable.Title>
                    <DataTable.Cell style={[styles.tableCell, styles.border]}>
                      <Text
                        style={{
                          fontFamily: fontsFamily.medium,
                          color: colors.black,
                        }}>
                        {updateData?.quantity}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, styles.border]}>
                      <Text
                        style={{
                          fontFamily: fontsFamily.medium,
                          color: colors.black,
                        }}>
                        {moment(updateData?.date).format('l')}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, styles.border]}>
                      <Text
                        style={{
                          fontFamily: fontsFamily.medium,
                          color: colors.black,
                        }}>
                        {updateData?.amount.toLocaleString('en-US')}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>

                {/* <CustomText>{SalaryMonth[0].payID}</CustomText> */}
              </View>
            </ScrollView>

            <View
              style={{
                marginVertical: width * 0.07,
                flexDirection: 'row',
                gap: 8,
                justifyContent: 'center',
              }}>
              {/* <TouchableOpacity disabled={loading} onPress={() => deleteExpense(updateData?.expenseID)} activeOpacity={1} style={{
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
                  resizeMode='contain'
                  style={{ tintColor: colors.white, width: width * 0.06, height: width * 0.06 }}
                  source={Images.icondelete}
                />
              </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={() => navigation.navigate('updateExpense', { data: updateData })} activeOpacity={1} style={{
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
                  resizeMode='contain'
                  style={{ tintColor: colors.white, width: width * 0.06, height: width * 0.06 }}
                  source={Images.editIcon}
                />
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExpenseDetail;
