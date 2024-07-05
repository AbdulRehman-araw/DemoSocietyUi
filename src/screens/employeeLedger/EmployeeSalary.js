import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import Header from '../../components/Header/Header';
import {Images} from '../../assets/Images';
import {Platform} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/apiCall';
import {fontsFamily} from '../../assets/Fonts';
import ListCard from './ListCard';
import SalaryDateCard from './SalaryDateCard';
import {DataTable} from 'react-native-paper';
import CustomText from '../../components/CustomText';
import moment from 'moment/moment';

const {width, height} = Dimensions.get('screen');

const EmployeeSalary = ({navigation, route}) => {
  const {data} = route?.params?.data;

  const SalaryMonth = route?.params?.data;

  // console.log('==============>', SalaryMonth);

  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header
          onBack={goBack}
          title={
            SalaryMonth?.[0]?.employeeName
              ? `${SalaryMonth?.[0]?.employeeName}'s Ledger`
              : 'Employee Ledger'
          }
        />

        {SalaryMonth?.length > 0 ? (
          <ScrollView horizontal={true} style={{flex: 1}}>
            <View
              style={{
                paddingHorizontal: width * 0.01,
                flex: 1,
                marginTop: 10,
                paddingBottom: height * 0.1,
                width: 1000,
              }}>
              {/* <FlatList
            data={SalaryMonth?.details}
            renderItem={({ item }) => <SalaryDateCard data={item} />}
            keyExtractor={item => item.id}
          /> */}

              <DataTable
                style={{
                  borderColor: colors.gray,
                  borderWidth: 1,
                  borderRadius: 9,
                }}>
                <DataTable.Row
                  style={{
                    backgroundColor: colors.primary,
                    borderTopLeftRadius: 9,
                    borderTopRightRadius: 9,
                  }}>
                  <DataTable.Cell style={{flex: 0.3}}>
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={{color: colors.white}}>
                      E.ID
                    </CustomText>
                  </DataTable.Cell>
                  <DataTable.Title
                    numeric
                    style={[styles.tableCell, styles.border]}>
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={{color: colors.white}}>
                      Name
                    </CustomText>
                  </DataTable.Title>
                  <DataTable.Title
                    numeric
                    style={[styles.tableCell, styles.border]}>
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={{color: colors.white}}>
                      Description
                    </CustomText>
                  </DataTable.Title>
                  <DataTable.Title
                    numeric
                    style={[styles.tableCell, styles.border]}>
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={{color: colors.white}}>
                      Date
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
                  <DataTable.Title numeric style={[styles.tableCell]}>
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={{color: colors.white}}>
                      Payable
                    </CustomText>
                  </DataTable.Title>
                </DataTable.Row>

                {SalaryMonth?.map((item, index) =>
                  item?.settlements?.map((settlements, i) => (
                    <DataTable.Row>
                      <DataTable.Cell style={[styles.tableCellID]}>
                        <Text
                          style={{
                            fontFamily: fontsFamily.medium,
                            color: colors.primary,
                          }}>
                          {item?.employeeID}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell style={[styles.tableCell, styles.border]}>
                        <Text
                          style={{
                            fontFamily: fontsFamily.medium,
                            color: colors.primary,
                          }}>
                          {item?.employeeName}
                        </Text>
                      </DataTable.Cell>

                      <DataTable.Cell style={styles.tableCell}>
                        <Text
                          style={{
                            fontFamily: fontsFamily.medium,
                            color: colors.primary,
                          }}>
                          {settlements?.description}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell style={[styles.tableCell, styles.border]}>
                        <Text
                          style={{
                            fontFamily: fontsFamily.medium,
                            color: colors.primary,
                          }}>
                          {moment(settlements?.date).format('MMM Do YY')}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell style={[styles.tableCell, styles.border]}>
                        <Text
                          style={{
                            fontFamily: fontsFamily.medium,
                            color: colors.primary,
                          }}>
                          {settlements?.settlementType === 'Deduction'
                            ? -settlements?.amount
                            : null}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell style={[styles.tableCell, styles.border]}>
                        <Text
                          style={{
                            fontFamily: fontsFamily.medium,
                            color: colors.primary,
                          }}>
                          {settlements?.settlementType === 'Addition'
                            ? settlements?.amount
                            : null}
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell style={[styles.tableCell]}>
                        <Text
                          style={{
                            fontFamily: fontsFamily.medium,
                            color: colors.primary,
                          }}>
                          {settlements?.balance}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  )),
                )}
              </DataTable>

              {/* <CustomText>{SalaryMonth[0].payID}</CustomText> */}
            </View>
          </ScrollView>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: colors.black,
                fontSize: width * 0.035,
                fontFamily: fontsFamily.medium,
              }}>
              No salary found
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EmployeeSalary;

const styles = StyleSheet.create({
  card1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1.3,
    borderColor: colors.gray,
    borderRadius: 8,
    width: width * 0.86,
    height: width * 0.15,
    marginTop: 20,
  },
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tableTitle: {
    flex: 1,
  },
  tableCell: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  tableCellID: {
    flex: 0.3,
  },

  border: {
    borderColor: colors.gray,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  titleStyle: {
    color: colors.primary,
    fontSize: width * 0.06,
  },
  timeStampStyle: {
    color: colors.black,
    fontSize: width * 0.028,
    marginTop: 4,
  },
});
