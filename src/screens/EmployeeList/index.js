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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';
import Header from '../../components/Header/Header';
import { Images } from '../../assets/Images';
import { Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { apiCall } from '../../Services/apiCall';
import { fontsFamily } from '../../assets/Fonts';
import ListCard from './ListCard';

const { width, height } = Dimensions.get('screen');

const EmployeeList = ({ navigation }) => {

  const isFocused = useIsFocused()
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

  const vouchers = [
    {
      title: 'Add Employee',
      path: 'addEmployee'
    },
    {
      title: 'Employee List',
      path: 'employeeList'
    },
    {
      title: 'Generate Salary',
      path: 'generateSalary'
    },
    {
      title: 'Employee Ledger',
      path: 'employeeLedger'
    },
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />


      <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
        <Header
          onBack={goBack}
          title={"Employee List"}
        />
        <View style={{ paddingHorizontal: width * 0.01, flex: 1, marginTop: 10, paddingBottom: height * 0.1 }}>

          <FlatList
            data={vouchers}
            renderItem={({ item }) => <ListCard data={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmployeeList;
