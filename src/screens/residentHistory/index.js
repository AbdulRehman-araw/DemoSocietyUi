import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  Dimensions,
  Platform,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {colors} from '../../styles/colors';
import {styles} from './styles/styles';
import Header from '../../components/Header/Header';
import SlideButton from '../../components/Button/SlideButton';
import DetailCard from '../../components/DetailCard';
import {apiCall} from '../../Services/apiCall';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/core';

import {useForm} from 'react-hook-form';
import HistoryCard from './components/HistoryCard';
const {width} = Dimensions.get('window');

const Registrations = ({navigation, route}) => {
  const {data} = route?.params;

  console.log('data', data);
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
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Appartment History'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          {data?.length > 0 ? (
            data?.map((val, i) => (
              <HistoryCard
                isWalkin={true}
                invites={true}
                key={i}
                // getData={getResidentData}
                completeData={val}
              />
            ))
          ) : (
            <View style={styles.noData}>
              <Text style={styles.noDataText}>No History found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Registrations;
