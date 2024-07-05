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
  Alert,
} from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { colors } from '../styles/colors';
import Header from '../components/Header/Header';
import { useForm } from 'react-hook-form';
 import { apiCall } from '../Services/apiCall';
// import DropDown from '../components/TextField/DropDown';
import CustomModal from '../components/Modal/CustomModal';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import PrimaryButton from '../components/Button/PrimaryButton';
import CustomText from '../components/CustomText';
import { fontsFamily } from '../assets/Fonts';
import TimeDateBtn from '../components/Button/TimeDateBtn';
import DateTimePicker from '../components/Modal/DateTimePicker';
import { getFormattedDate } from '../utils/helperFunction';
const { width } = Dimensions.get('window');

const ExpenseStatement = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { control, handleSubmit, setValue, clearErrors } = useForm();
  const [loader, setLoader] = useState(false);
  const [soldApartment, setSoldApartment] = useState([]);
  const [soldBuilding, setSoldBuilding] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [mode, setMode] = useState('toDate');
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBuildingModal, setShowBuildingModal] = useState(false);
  const [soldApartmentByBuilding, setSoldApartmentByBuilding] = useState([]);
  const [customerStatements, setCustomerStatements] = useState();
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [myApartments, setMyApartments] = useState([]);
  const [myApartmentNo, setMyApartmentNo] = useState([]);
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

  const getCashStatements = async formData => {
    setLoader(true);
    try {
      const accountId = soldApartment.find(
        e => e.unit === formData.apartmentID,
      )?.ownerAccountID;
      // const { data } = await apiCall.getStatements(
     const { data } = await apiCall.getExpenseStatment(
        5,
        fromDate,
        toDate,
      );
      // console.log("Expense Statement",data)
      setCustomerStatements(data?.statement);
      setTotalDebit(data?.totalDebit);
      setTotalCredit(data?.totalCredit);
      setTotalBalance(data?.totalCredit - data?.totalDebit);
    } catch (error) {
      
      console.log(
        'file: index.js:49 => getExpenseStatement => error:',
        error,
      );
    } finally {
      setLoader(false);
    }
  };
  const getSoldApartment = async () => {
    try {
      const uniqueNames = {};
      const { data } = await apiCall.getSoldApartment();
      const apartments = [];
      const building = [];
      data.forEach(element => {
        let obj1 = {
          ...element,
          title: element?.building,
        };
        let obj = {
          ...element,
          title: element?.unit,
        };
        apartments.push(obj);
        building.push(obj1);
      });
      const filteredArray = building.filter(obj => {
        if (!uniqueNames[obj.building]) {
          uniqueNames[obj.building] = true;
          return true;
        }
        return false;
      });
      // setSoldApartment(apartments);
      setSoldBuilding(filteredArray);
      setSoldBuilding;
    } catch (error) { }
  };
  const getSoldBuilding = async () => {
    try {
      const { data } = await apiCall.getSoldApartment();
      const apartments = [];
      data.forEach(element => {
        if (element?.building === selectedBuilding) {
          let obj = {
            ...element,
            title: element?.unit,
          };
          apartments.push(obj);
        }
      });
      setSoldBuilding(building);
      setSoldBuilding;
    } catch (error) { }
  };
  useEffect(() => {
    getSoldApartment();
  }, [isFocused]);
  useEffect(() => {
    getSoldBuilding();
  }, [selectedBuilding]);

  const getSoldApartmentForApi = async () => {
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
    getSoldApartmentForApi()
  }, [isFocused, myApartments]);


  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
        <Header onBack={goBack} title={'Expense Statements'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={{ paddingHorizontal: width * 0.02 }}>
            {/* <DropDown
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
                setShowBuildingModal(true);
              }}
            />
            <DropDown
              name={'apartmentID'}
              title="Select Apartment"
              type={'default'}
              variant={'outlined'}
              control={control}
              rules={{
                required: 'Please select apartment',
              }}
              img={false}
              onPress={() => {
                setShowModal(true);
              }}
            /> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <View style={{ width: '47%' }}>
                <TimeDateBtn
                  variant={'light'}
                  title={
                    fromDate == new Date()
                      ? 'From Date'
                      : getFormattedDate(fromDate)
                  }
                  prefixIcon={true}
                  setOpen={() => [setOpen(true), setMode('fromDate')]}
                />
              </View>
              <View style={{ width: '47%' }}>
                <TimeDateBtn
                  variant={'light'}
                  title={
                    toDate == new Date() ? 'To Date' : getFormattedDate(toDate)
                  }
                  prefixIcon={true}
                  setOpen={() => [setOpen(true), setMode('toDate')]}
                />
              </View>
            </View>
            <View style={{ marginVertical: width * 0.01 }}>
              <PrimaryButton
                customStyle={{ padding: width * 0.032 }}
                title={'View Statements'}
                onPress={handleSubmit(getCashStatements)}
              />
            </View>

            {loader ? (
              <View style={{ marginVertical: width * 0.1 }}>
                <ActivityIndicator size={'large'} color={colors.primary} />
              </View>
            ) : (
              customerStatements && (
                <Fragment>
                  {customerStatements.length > 0 ? (
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
                            style={{ color: colors.white }}>
                            Particulars
                          </CustomText>
                        </DataTable.Title>
                        <DataTable.Title
                          numeric
                          style={[styles.tableCell, styles.border]}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{ color: colors.white }}>
                            Debit
                          </CustomText>
                        </DataTable.Title>
                        <DataTable.Title
                          numeric
                          style={[styles.tableCell, styles.border]}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{ color: colors.white }}>
                            Credit
                          </CustomText>
                        </DataTable.Title>
                        <DataTable.Title numeric style={styles.tableCell}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{ color: colors.white }}>
                            Balance
                          </CustomText>
                        </DataTable.Title>
                      </DataTable.Header>

                      {customerStatements.map((item, index) => (
                        <DataTable.Header numberOfLines={3} key={index}>
                          <DataTable.Title numberOfLines={3} style={styles.tableTitle}>
                            <Text
                            numberOfLines={3}
                              style={{
                                fontFamily: fontsFamily.medium,
                                color: colors.primary,
                              }}>
                              {item?.detail}
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={[styles.tableCell, styles.border]}>
                            <Text
                              style={{
                                fontFamily: fontsFamily.medium,
                                color: colors.primary,
                              }}>
                              {item?.debit}
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={[styles.tableCell, styles.border]}>
                            <Text
                              style={{
                                fontFamily: fontsFamily.medium,
                                color: colors.primary,
                              }}>
                              {item?.credit}
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title style={styles.tableCell}>
                            <Text
                              style={{
                                fontFamily: fontsFamily.medium,
                                color: colors.primary,
                              }}>
                              {item?.balance}
                            </Text>
                          </DataTable.Title>
                        </DataTable.Header>
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
                            style={{ color: colors.white }}>
                            Total
                          </CustomText>
                        </DataTable.Title>
                        <DataTable.Title
                          numeric
                          style={[styles.tableCell, styles.border]}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{ color: colors.white }}>
                            {totalDebit}
                          </CustomText>
                        </DataTable.Title>
                        <DataTable.Title
                          numeric
                          style={[styles.tableCell, styles.border]}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{ color: colors.white }}>
                            {totalCredit}
                          </CustomText>
                        </DataTable.Title>
                        <DataTable.Title numeric style={styles.tableCell}>
                          <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{ color: colors.white }}>
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
            data={myApartmentNo.length <= 0 ? [] : myApartmentNo}
            modalVisible={showModal}
            closeModal={() => setShowModal(false)}
            getvalue={e => {
              setValue('apartmentID', e);
              clearErrors('apartmentID');
            }}
          />
          <CustomModal
            data={
              soldApartmentByBuilding.length <= 0 ? [] : soldApartmentByBuilding
            }
            modalVisible={showBuildingModal}
            closeModal={() => setShowBuildingModal(false)}
            getvalue={e => {
              const allApartments = soldApartmentByBuilding.find(
                v => v.title === e,
              )?.apartments;
              setMyApartments(allApartments);
              setValue('apartment', e);
              clearErrors('apartment');
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

export default ExpenseStatement;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tableTitle: {
    flex: 3,
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
