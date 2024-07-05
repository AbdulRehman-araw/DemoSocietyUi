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
import InvoiceCard from '../Invoices/InvoiceCard';
import SlideButton from '../../components/Button/SlideButton';

const {width, height} = Dimensions.get('screen');

const Invoices = ({navigation}) => {
  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const goBack = () => {
    navigation.goBack();
  };

  const handleBack = () => {
    goBack();
    return true;
  };

  const buttonData = [
    {
      name: 'Unpaid',
    },
    {
      name: 'Paid',
    },
  ];

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, []);

  const [invoices, setInvoices] = useState([]);
  const [loader, setLoader] = useState(false);

  const [isPaid, setIsPaid] = useState(false);
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );

  const Account = servicePermission?.filter(item => item?.name === 'Accounts');
  console.log('🚀 ~ file: index.js:65 ~ Invoices ~ Account:', Account);

  const getInvoices = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getInvoices(role, isPaid);
      setInvoices(data);
    } catch (error) {
      console.log('file: index.js:54 => getInvoices => error:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getInvoices();
  }, [isFocused, isPaid]);

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
          title={'Invoices'}
          showRightBtn={
            role === 'User' ? false : !Account[0]?.canAdd ? false : true
          }
          icon={Images.Addcircle}
          handleRightBtn={() => navigation.navigate('createInvoice')}
        />

        <SlideButton
          data={buttonData}
          selectedItem={isPaid ? 'Paid' : 'Unpaid'}
          handleBtn={e => (e == 'Paid' ? setIsPaid(true) : setIsPaid(false))}
        />

        <View
          style={{
            paddingHorizontal: width * 0.01,
            marginTop: 10,
            paddingBottom: height * 0.15,
            marginBottom: 70,
          }}>
          {loader ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : invoices?.length > 0 ? (
            <FlatList
               data={invoices}
              renderItem={({item}) =><InvoiceCard data={item} />}
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
                No invoices found
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Invoices;
