import {
  TextInput,
  BackHandler,
  Button,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Alert,
  ScrollView,
  Platform,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import Header from '../../components/Header/Header';
import {styles} from './styles/styles';
import {apiCall} from '../../Services/apiCall';
import {baseUrl} from '../../../axios';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import CustomText from '../../components/CustomText';
import {fontsFamily} from '../../assets/Fonts';
import {Images} from '../../assets/Images';

const {width, height} = Dimensions.get('window');

const Accounts = ({navigation}) => {
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

  const accountManage = [
    {
      name: 'Expenses',
      icon: Images.Expenses,
      path: 'expenses',
    },
    {
      name: 'Invoices',
      icon: Images.Invoices,
      path: 'invoices',
    },
    {
      name: 'Purchases',
      icon: Images.Purchase,
      path: 'purchases',
    },
    {
      name: 'Reports',
      icon: Images.report2,
      path: 'reports',
    },
    {
      name: 'Vouchers',
      icon: Images.termscondition,
      path: 'vouchers',
    },
    {
      name: 'Vendors',
      icon: Images.Vendor,
      path: 'vendors',
    },
    {
      name: 'Banks',
      icon: Images.bank,
      path: 'banks',
    },
    {
      name: 'Expense Accounts',
      icon: Images.ExpenseAccount,
      path: 'expenseAccounts',
    },
    {
      name: 'Receiving',
      icon: Images.Receiving,
      path: 'receiving',
    },
    {
      name: 'Service Contracts',
      icon: Images.ServiceContract,
      path: 'serviceContracts',
    },
    {
      name: 'Owners',
      icon: Images.Owner2,
      path: 'owners',
    },
  ];

  const [loader, setLoader] = useState(false);
  const [accountsDetail, setAccountsDetail] = useState([]);
  const [bookedApartments, setBookedApartments] = useState(0);

  const getAccountsDetail = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getAccountsDetail();
      setAccountsDetail(data);
      const percent =
        ((data?.totalOwners + data?.totalRentals) / data?.totalApartments) *
        100;
      setBookedApartments(percent);
    } catch (error) {
      console.log('file: index.js:215 => getContacts => error:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getAccountsDetail();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Accounts'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          {loader ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : (
            <Fragment>
              <View
                style={{
                  backgroundColor: colors.primaryLight,
                  borderWidth: 1.5,
                  borderColor: colors.lightoffwhite,
                  borderRadius: 6,
                  paddingVertical: width * 0.03,
                  paddingHorizontal: width * 0.03,
                  marginVertical: width * 0.04,
                }}>
                <Image
                  source={Images.homeWithoutName}
                  resizeMode="contain"
                  style={{width: width * 0.08, height: height * 0.08}}
                />
                <View style={{width: '70%', marginBottom: height * 0.02}}>
                  <CustomText
                    style={{fontSize: width * 0.04, color: colors.primary}}>
                    Total Units
                  </CustomText>
                  <View style={{position: 'relative'}}>
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: colors.gray,
                        borderRadius: 6,
                        height: width * 0.03,
                        marginVertical: height * 0.01,
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        width: `${bookedApartments}%`,
                        backgroundColor: colors.primary,
                        borderRadius: 6,
                        height: width * 0.03,
                        marginVertical: height * 0.01,
                      }}
                    />
                  </View>
                  <CustomText
                    style={{
                      fontSize: width * 0.025,
                      color: colors.primary,
                      textAlign: 'center',
                    }}>
                    {accountsDetail?.totalOwners} Owners |{' '}
                    {accountsDetail?.totalRentals} Rentals
                  </CustomText>
                </View>
                <CustomText
                  style={{
                    fontSize: width * 0.05,
                    color: colors.primary,
                    fontWeight: 700,
                  }}>
                  {accountsDetail?.totalApartments} Flats
                </CustomText>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: width * 0.01,
                  marginBottom: width * 0.01,
                }}>
                <View style={{width: '49%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: width * 0.02,
                      backgroundColor: colors.primary,
                      borderWidth: 1.5,
                      borderColor: colors.lightoffwhite,
                      borderRadius: 6,
                      padding: width * 0.03,
                    }}>
                    <View style={{width: '75%'}}>
                      <CustomText
                        style={{fontSize: width * 0.025, color: colors.white}}>
                        Total Receivables
                      </CustomText>
                      <CustomText
                        style={{
                          fontSize: width * 0.04,
                          color: colors.white,
                          fontWeight: 700,
                        }}>
                        {accountsDetail?.receiveables} PKR
                      </CustomText>
                    </View>
                    <View style={{width: '25%'}}>
                      <Image
                        source={Images.termscondition}
                        resizeMode="contain"
                        style={{width: '70%', tintColor: colors.white}}
                      />
                    </View>
                  </View>
                </View>
                <View style={{width: '49%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: width * 0.02,
                      backgroundColor: colors.primary,
                      borderWidth: 1.5,
                      borderColor: colors.lightoffwhite,
                      borderRadius: 6,
                      padding: width * 0.03,
                    }}>
                    <View style={{width: '75%'}}>
                      <CustomText
                        style={{fontSize: width * 0.025, color: colors.white}}>
                        Total Payable
                      </CustomText>
                      <CustomText
                        style={{
                          fontSize: width * 0.04,
                          color: colors.white,
                          fontWeight: 700,
                        }}>
                        {accountsDetail?.payables} PKR
                      </CustomText>
                    </View>
                    <View style={{width: '25%'}}>
                      <Image
                        source={Images.termscondition}
                        resizeMode="contain"
                        style={{width: '70%', tintColor: colors.white}}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: width * 0.01,
                }}>
                <View style={{width: '49%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: width * 0.02,
                      backgroundColor: colors.primary,
                      borderWidth: 1.5,
                      borderColor: colors.lightoffwhite,
                      borderRadius: 6,
                      padding: width * 0.03,
                    }}>
                    <View style={{width: '75%'}}>
                      <CustomText
                        style={{fontSize: width * 0.025, color: colors.white}}>
                        Total Purchase
                      </CustomText>
                      <CustomText
                        style={{
                          fontSize: width * 0.04,
                          color: colors.white,
                          fontWeight: 700,
                        }}>
                        0 PKR
                      </CustomText>
                    </View>
                    <View style={{width: '25%'}}>
                      <Image
                        source={Images.termscondition}
                        resizeMode="contain"
                        style={{width: '70%', tintColor: colors.white}}
                      />
                    </View>
                  </View>
                </View>
                <View style={{width: '49%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: width * 0.02,
                      backgroundColor: colors.primary,
                      borderWidth: 1.5,
                      borderColor: colors.lightoffwhite,
                      borderRadius: 6,
                      padding: width * 0.03,
                    }}>
                    <View style={{width: '75%'}}>
                      <CustomText
                        style={{fontSize: width * 0.025, color: colors.white}}>
                        Total Sales
                      </CustomText>
                      <CustomText
                        style={{
                          fontSize: width * 0.04,
                          color: colors.white,
                          fontWeight: 700,
                        }}>
                        0 PKR
                      </CustomText>
                    </View>
                    <View style={{width: '25%'}}>
                      <Image
                        source={Images.termscondition}
                        resizeMode="contain"
                        style={{width: '70%', tintColor: colors.white}}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: width * 0.04,
                }}>
                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={{fontSize: width * 0.055}}>
                  Manage
                </CustomText>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  gap: width * 0.05,
                }}>
                {accountManage?.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => navigation.navigate(item.path)}
                    style={{
                      width: width * 0.25,
                      height: width * 0.22,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      borderWidth: 1.5,
                      borderColor: colors.lightoffwhite,
                      borderRadius: 10,
                    }}>
                    <Image
                      source={item.icon}
                      resizeMode="contain"
                      style={{
                        width: '40%',
                        height: '40%',
                        tintColor: colors.primary,
                      }}
                    />
                    <CustomText
                      style={{fontSize: width * 0.03, color: colors.primary}}>
                      {item.name}
                    </CustomText>
                  </TouchableOpacity>
                ))}
              </View>
            </Fragment>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Accounts;
