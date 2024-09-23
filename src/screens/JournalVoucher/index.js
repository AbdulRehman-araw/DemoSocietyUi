import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';
import Header from '../../components/Header/Header';
import { Images } from '../../assets/Images';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { apiCall } from '../../Services/apiCall';
import { fontsFamily } from '../../assets/Fonts';
import JournalVoucherList from './JournalVoucherList';

const { width, height } = Dimensions.get('screen');

const JournalVoucher = ({ navigation }) => {

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

  const [journalVouchers, setJournalVouchers] = useState([]);
  const [loader, setLoader] = useState(false);

  const getJournalVouchers = async () => {
    setLoader(true)
    try {
      const { data } = await apiCall.getJournalVouchers()
      setJournalVouchers(data)
    } catch (error) {
      console.log('file: index.js:54 => getEForms => error:', error)
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    getJournalVouchers()
  }, [isFocused]);

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
          title={"Journal Vouchers"}
          showRightBtn={true}
          icon={Images.newAdd}
          handleRightBtn={() => navigation.navigate('createJournalVoucher')}
        />
        <View style={{ paddingHorizontal: width * 0.01, flex: 1, marginTop: 10, paddingBottom: height * 0.15 }}>

          {loader ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : (
            journalVouchers?.length > 0 ? (
              <FlatList
                data={journalVouchers}
                renderItem={({ item }) => <JournalVoucherList data={item} />}
                keyExtractor={item => item.id}
              />
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                  color: colors.black,
                  fontSize: width * 0.035,
                  fontFamily: fontsFamily.medium
                }}>No data</Text>
              </View>
            )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JournalVoucher;
