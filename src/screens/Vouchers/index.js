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

const Vouchers = ({ navigation }) => {

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
      title: 'Cash Payment Voucher',
      path: 'cashPaymentVouchers'
    },
    {
      title: 'Bank Payment Voucher',
      path: 'bankPaymentVouchers'
    },
    {
      title: 'Cash Receiving Voucher',
      path: 'cashReceivingVouchers'
    },
    {
      title: 'Bank Receiving Voucher',
      path: 'bankReceivingVouchers'
    },
    {
      title: 'Journal Voucher',
      path: 'journalVouchers'
    },
    {
      title: 'Service Payment Voucher',
      path: 'servicePaymentVouchers'
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
          title={"Vouchers"}
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

export default Vouchers;
