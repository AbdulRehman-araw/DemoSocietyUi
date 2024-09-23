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
import Header from '../../components/Header/Header';
import {useForm} from 'react-hook-form';
import {apiCall} from '../../Services/apiCall';
import DropDown from '../../components/TextField/DropDown';
import CustomModal from '../../components/Modal/CustomModal';
import {useIsFocused} from '@react-navigation/native';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import {getFormattedDate} from '../../utils/helperFunction';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import {StyleSheet} from 'react-native';
import {DataTable} from 'react-native-paper';
import PrimaryButton from '../../components/Button/PrimaryButton';
import CustomText from '../../components/CustomText';
import {fontsFamily} from '../../assets/Fonts';
import { Images } from '../../assets/Images';
import LinearGradientPrimaryButton from '../../components/Button/LinearGradientPrimaryButton';

const {width} = Dimensions.get('window');

const VendorStatements = ({navigation}) => {
  const isFocused = useIsFocused();
  const {control, handleSubmit, setValue, clearErrors} = useForm();

  const [loader, setLoader] = useState(false);

  const [vendors, setVendors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [toDate, setToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [mode, setMode] = useState('toDate');
  const [open, setOpen] = useState(false);

  const [vendorStatements, setVendorStatements] = useState();
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
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

  const getVendorStatements = async formData => {
    setLoader(true);
    try {
      const vendorId = vendors.find(e => e.title === formData.vendor)?.vendorID;
      console.log('fromDate =>', fromDate);
      console.log('toDate =>', toDate);
      const {data} = await apiCall.getVendorStatements(
        vendorId,
        fromDate,
        toDate,
      );
      setVendorStatements(data?.statement);
      setTotalDebit(data?.totalDebit);
      setTotalCredit(data?.totalCredit);
      setTotalBalance(data?.totalCredit - data?.totalDebit);
    } catch (error) {
      console.log('file: index.js:49 => getVendorStatements => error:', error);
    } finally {
      setLoader(false);
    }
  };

  const getVendors = async () => {
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
      setVendors(vendorData);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  useEffect(() => {
    getVendors();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Vendor Statements'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={{paddingHorizontal: width * 0.02}}>
            <DropDown
              name={'vendor'}
              title="Select Vendor"
              type={'default'}
              variant={'outlined'}
              control={control}
              rules={{
                required: 'Please select vendor',
              }}
              img={Images.userIcon}
              leftIconStyle={{tintColor:colors.primary}}
              onPress={() => {
                setShowModal(true);
              }}
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
                    fromDate == new Date()
                      ? 'From Date'
                      : getFormattedDate(fromDate)
                  }
                  prefixIcon={true}
                  icon={Images.calender_outlined}
                  setOpen={() => [setOpen(true), setMode('fromDate')]}
                />
              </View>
              <View style={{width: '47%'}}>
                <TimeDateBtn
                  variant={'light'}
                  title={
                    toDate == new Date() ? 'To Date' : getFormattedDate(toDate)
                  }
                  prefixIcon={true}
                  icon={Images.calender_outlined}
                  setOpen={() => [setOpen(true), setMode('toDate')]}
                />
              </View>
            </View>
            <View style={{marginVertical: width * 0.01}}>
              <LinearGradientPrimaryButton
                customStyle={{padding: width * 0.032}}
                title={'View Statements'}
                onPress={handleSubmit(getVendorStatements)}
              />
            </View>

            {loader ? (
              <View style={{marginVertical: width * 0.1}}>
                <ActivityIndicator size={'large'} color={colors.primary} />
              </View>
            ) : (
              vendorStatements && (
                <Fragment>
                  {vendorStatements.length > 0 ? (
                    <DataTable
                      style={{
                        borderColor: colors.gray,
                        borderWidth: 1,
                        borderRadius: 9,
                      }}>
                      <DataTable.Header
                        style={{
                          backgroundColor: colors.primary,
                          borderTopLeftRadius: 9,
                          borderTopRightRadius: 9,
                        }}>
                        <DataTable.Title style={styles.tableTitle}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{color: colors.white}}>
                            Particulars
                          </CustomText>
                        </DataTable.Title>
                        <DataTable.Title
                          numeric
                          style={[styles.tableCell, styles.border]}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{color: colors.white}}>
                            Debit
                          </CustomText>
                        </DataTable.Title>
                        <DataTable.Title
                          numeric
                          style={[styles.tableCell, styles.border]}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{color: colors.white}}>
                            Credit
                          </CustomText>
                        </DataTable.Title>
                        <DataTable.Title numeric style={styles.tableCell}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{color: colors.white}}>
                            Balance
                          </CustomText>
                        </DataTable.Title>
                      </DataTable.Header>

                      {vendorStatements.map((item, index) => (
                        <DataTable.Row key={index}>
                          <DataTable.Cell style={styles.tableTitle}>
                            <Text
                              style={{
                                fontFamily: fontsFamily.medium,
                                color: colors.primary,
                              }}>
                              {item?.detail}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell
                            style={[styles.tableCell, styles.border]}>
                            <Text
                              style={{
                                fontFamily: fontsFamily.medium,
                                color: colors.primary,
                              }}>
                              {item?.debit}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell
                            style={[styles.tableCell, styles.border]}>
                            <Text
                              style={{
                                fontFamily: fontsFamily.medium,
                                color: colors.primary,
                              }}>
                              {item?.credit}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell style={styles.tableCell}>
                            <Text
                              style={{
                                fontFamily: fontsFamily.medium,
                                color: colors.primary,
                              }}>
                              {item?.balance}
                            </Text>
                          </DataTable.Cell>
                        </DataTable.Row>
                      ))}

                      <DataTable.Header
                        style={{
                          backgroundColor: colors.primary,
                          borderBottomLeftRadius: 9,
                          borderBottomRightRadius: 9,
                        }}>
                        <DataTable.Title style={styles.tableTitle}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{color: colors.white}}>
                            Total
                          </CustomText>
                        </DataTable.Title>
                        <DataTable.Title
                          numeric
                          style={[styles.tableCell, styles.border]}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{color: colors.white}}>
                            {totalDebit}
                          </CustomText>
                        </DataTable.Title>
                        <DataTable.Title
                          style={[styles.tableCell, styles.border]}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{color: colors.white}}>
                            {totalCredit}
                          </CustomText>
                        </DataTable.Title>
                        <DataTable.Title numeric style={styles.tableCell}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{color: colors.white}}>
                            {totalBalance}
                          </CustomText>
                        </DataTable.Title>
                      </DataTable.Header>
                    </DataTable>
                  ) : (
                    <View
                      style={{
                        marginVertical: width * 0.1,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: colors.black,
                          fontSize: width * 0.035,
                          fontFamily: fontsFamily.medium,
                        }}>
                        No Statement
                      </Text>
                    </View>
                  )}
                </Fragment>
              )
            )}
          </View>

          <CustomModal
            data={vendors.length <= 0 ? [] : vendors}
            modalVisible={showModal}
            closeModal={() => setShowModal(false)}
            getvalue={e => {
              setValue('vendor', e);
              clearErrors('vendor');
            }}
          />

          <DateTimePicker
            setDate={
              mode == 'toDate'
                ? e => {
                    setToDate(e);
                  }
                : e => {
                    setFromDate(e);
                  }
            }
            closeModal={() => setOpen(false)}
            date={mode == 'toDate' ? toDate : fromDate}
            modalVisible={open}
            mode={'date'}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default VendorStatements;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tableTitle: {
    flex: 2,
  },
  tableCell: {
    justifyContent: 'center',
  },
  border: {
    borderColor: colors.gray,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});
