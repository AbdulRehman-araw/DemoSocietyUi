import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import {Images} from '../../assets/Images';
import {text} from '../../res/strings';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {styles} from './styles/styles';
import CustomText from '../../components/CustomText';
import {fontsFamily} from '../../assets/Fonts';
import Header from '../../components/Header/Header';
import PaymentCards from '../../components/DetailCard/PaymentsCard';
import YourDues from './components/YourDues';
import RecentPaymentItem from './components/RecentPaymentItem';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {apiCall} from '../../Services/apiCall';
import {ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native';

const {width, height} = Dimensions.get('window');
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 48;

const EBilling = ({navigation}) => {
  const isFocused = useIsFocused();

  const [change, setChange] = useState(0);
  const [selectedCard, setSelectedCard] = useState('MasterCard');

  const cardData = [
    {
      id: 0,
      cardName: 'MasterCard',
      cardNumber: '**** **** *** 3245',
      cardImg: Images.mastercardlogo,
    },
    {
      id: 1,
      cardName: 'Visa',
      cardNumber: '**** **** *** 3245',
      cardImg: Images.visalogo,
    },
    {
      id: 2,
      cardName: 'Bank',
      cardNumber: '',
      cardImg: Images.bankpayment,
    },
  ];

  const recentPaymentData = [
    {
      id: 1,
      name: 'Gym',
      date: '02/12/2023',
      amount: '1200',
    },
  ];

  const paymentData = [
    {
      id: 1,
      day: 'Today',
      subItem: [
        {
          name: 'Gym',
          date: '12 March 2023, 12:06 PM',
          amount: 1200,
        },
      ],
    },
    {
      id: 2,
      day: 'Yestarday',
      subItem: [
        {
          name: 'Pool',
          date: '12 March 2023, 12:06 PM',
          amount: 200,
        },
        {
          name: 'Maintainance',
          date: '12 March 2023, 12:06 PM',
          amount: 900,
        },
      ],
    },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const [loader, setLoader] = useState(false);
  const [recentPayment, setRecentPayment] = useState([]);
  const [statements, setStatements] = useState([]);
  const [dues, setDues] = useState(0);

  // *For Get Recent Payment
  const getRecentPayment = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getRecentPayment(false, 1000, 1);
      setRecentPayment(data);
    } catch (error) {
      console.log('file: index.js:103 => getRecentPayment => error:', error);
    } finally {
      setLoader(false);
    }
  };

  // *For Get Statements
  const getStatements = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getStatementsDues(true, 1000, 1);
      setDues(data?.dues);
      setStatements(data?.statement);
      
    } catch (error) {
      console.log('file: index.js:103 => getRecentPayment => error:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getRecentPayment();
    getStatements();
  }, [isFocused]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={Platform.OS === 'ios' ? colors.white : colors.primary}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />

      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <View
          style={{
            paddingTop: Platform.OS === 'ios' ? 0 : APPBAR_HEIGHT,
            ...styles.topContainer,
          }}>
          <Header
            onBack={goBack}
            title={'E-Billing'}
            showRightBtn={true}
            textStyle={{color: colors.white}}
            iconStyle={{tintColor: colors.white}}
          />
          <TouchableOpacity
            activeOpacity={1}
            style={styles.amountcard}
            onPress={() => setChange(change == 0 ? 1 : 0)}>
            <View style={{marginTop: 10, alignSelf: 'center'}}>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={{
                  color: colors.black,
                  fontSize: width * 0.04,
                  marginTop: 4,
                  alignSelf: 'center',
                }}>
                Your Dues
              </CustomText>
              <CustomText
                fontWeight={fontsFamily.bold}
                style={{
                  color: colors.primary,
                  fontSize: width * 0.075,
                  marginTop: 4,
                  alignSelf: 'center',
                }}>
                Rs {dues}
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>

        <View
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: width * 0.055,
            marginTop: width * 0.05,
            paddingBottom: Platform.OS == 'ios' ? width * 0.2 : width * 0.2,
          }}
          style={{padding: width * 0.05}}>
          {change == 0 ? (
            <View>
              {/* <View style={{ flex: 1, alignSelf: 'flex-start' }}>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={Images.ioscard}
                    resizeMode="contain"
                    style={{
                      width: width * 0.045,
                    }} />
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{
                      color: colors.black,
                      fontSize: width * 0.04,
                      paddingHorizontal: 10,
                      paddingVertical: 10
                    }}>
                    Payment Method
                  </CustomText>
                </View>
              </View> */}

              {/* {cardData.map((item, index) => (
                <PaymentCards
                  selectedCard={selectedCard}
                  setSelectedCard={(e) => setSelectedCard(e)}
                  cardName={item.cardName}
                  cardImage={item.cardImg}
                  cardNumber={item.cardNumber}
                />
              ))} */}

              <View style={styles.recentpayments}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={Images.repeat}
                    resizeMode="contain"
                    style={{width: width * 0.04}}
                  />
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{
                      color: colors.black,
                      fontSize: width * 0.044,
                      marginLeft: 10,
                      alignItems: 'center',
                    }}>
                    {text.recentpayment}
                  </CustomText>
                </View>

                {/* <TouchableOpacity
                  style={{ padding: 4, paddingRight: 0 }}
                  onPress={() => setChange(1)}>
                  <CustomText
                    style={{ fontSize: width * 0.032, color: colors.primary }}>
                    {text.viewAll}
                  </CustomText>
                </TouchableOpacity> */}
              </View>

              {loader ? (
                <ActivityIndicator size={'small'} color={colors.primary} />
              ) : recentPayment?.recievings?.length > 0 ? (
                <FlatList
                  style={{height: width * 0.9}}
                  data={recentPayment?.recievings}
                  renderItem={({item}) => (
                    <RecentPaymentItem
                      title={item.invoiceTitle}
                      date={item.paymentDate}
                      img={Images.icongym}
                      amount={item.amount}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    marginVertical: width * 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: width * 0.035,
                      fontFamily: fontsFamily.medium,
                    }}>
                    No E-billing found
                  </Text>
                </View>
              )}
              {/* <RecentPaymentItem
                title={"gym"}
                date={"(02/12/2022)"}
                img={Images.icongym}
                amount={"1200"}
              /> */}
              {/* <RecentPaymentItem
                title={"pool"}
                date={"(06/12/2022)"}
                img={Images.icongym}
                amount={"1200"}
              />
              <RecentPaymentItem
                title={"Maintainance"}
                date={"(22/11/2022)"}
                img={Images.icongym}
                amount={"1200"}
              /> */}

              {!recentPayment?.isPaid&& (
                <View style={{marginVertical: width * 0.07}}>
                  <PrimaryButton
                    customStyle={{
                      padding: width * 0.03,
                    }}
                    title={text.PayNow}
                    paytitle={{fontSize: width * 0.043}}
                    onPress={() =>
                      navigation.navigate('enterAmount', {
                        data: {currentBalance: dues},
                      })
                    }
                  />
                </View>
              )}
            </View>
          ) : (
            <View style={{marginTop: 20}}>
              {loader ? (
                <ActivityIndicator size={'small'} color={colors.primary} />
              ) : statements?.length > 0 ? (
                <FlatList
                  style={{marginBottom: width * 0.6}}
                  data={statements}
                  renderItem={({item}) => <YourDues data={item} />}
                  keyExtractor={item => item.id}
                  ListFooterComponent={
                    <CustomText
                      style={{
                        color: colors.gray,
                        alignSelf: 'center',
                        marginVertical: width * 0.04,
                      }}>
                      No more data
                    </CustomText>
                  }
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    marginVertical: width * 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: width * 0.035,
                      fontFamily: fontsFamily.medium,
                    }}>
                    No E-billing found
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default EBilling;
