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
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import Header from '../../components/Header/Header';
import {Images} from '../../assets/Images';
import {Platform} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/apiCall';
import {fontsFamily} from '../../assets/Fonts';
import VoucherCard from './VoucherCard';
import VoucherNewCard from './VoucherNewCard';

const {width, height} = Dimensions.get('screen');

const CashPaymentVoucher = ({navigation}) => {
  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const [modalVisible, setModalVisible] = useState(false);

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

  const [cashPaymentVouchers, setCashPaymentVouchers] = useState([]);
  const [loader, setLoader] = useState(false);

  const getCashPaymentVouchers = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getCashPaymentVouchers();
      setCashPaymentVouchers(data);
    } catch (error) {
      console.log('file: index.js:54 => getEForms => error:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCashPaymentVouchers();
  }, [isFocused]);

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
          title={'Cash Payment Vouchers'}
          showRightBtn={true}
          icon={Images.newAdd}
          handleRightBtn={() => navigation.navigate('createCashPaymentVoucher')}
        />
        <View
          style={{
            paddingHorizontal: width * 0.01,
            flex: 1,
            marginTop: 10,
            paddingBottom: height * 0.15,
          }}>
          {loader ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : cashPaymentVouchers?.length > 0 ? (
            <FlatList
              data={cashPaymentVouchers}
              renderItem={({item}) => <VoucherNewCard data={item} />}
              keyExtractor={item => item.id}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: width * 0.035,
                  fontFamily: fontsFamily.medium,
                }}>
                No cash payment voucher found
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CashPaymentVoucher;
