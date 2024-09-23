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
  RefreshControl,
  Platform,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';

import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import {styles} from './styles/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fontsFamily} from '../../assets/Fonts';
import CustomHeaderColor from '../../components/Header/HeaderColor';

import {Images} from '../../assets/Images';
import moment from 'moment';
import {apiCall} from '../../Services/apiCall';
import {baseUrl} from '../../../axios';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getTimezoneOffset} from '../../utils/helperFunction';
import ImagePopup from '../../components/Modal/ImagePopup';
import AlertModal from '../../components/Modal/AlertModal';
import WarningModal from '../../components/Modal/WarningModal';

const {width, height} = Dimensions.get('window');

// Enable layout animation for Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Cafeteria = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const {id} = route?.params?.data;
  const role = useSelector(state => state.userDataReducer.userRole);
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );
  console.log(
    '🚀 ~ file: index.js:53 ~ Cafeteria ~ servicePermission:',
    servicePermission,
  );

  const [permission, setPermission] = useState({});

  const [imagePopupModal, setImagePopupModal] = useState(false);
  const [popupImage, setPopupImage] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const [errorModal1, setErrorModal1] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [alertWarning, setAlertWarning] = useState('w');

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

  const [loader, setLoader] = useState(false);
  const [cafeteria, setCafeteria] = useState([]);
  const [openAccordion, setOpenAccordion] = useState();
  const Permission = route?.params?.data?.permission;

  const [loading, setLoading] = useState(false);

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);

  // *For Handle Open Accordion
  const handleOpenAccordion = id => {
    try {
      setOpenAccordion(openAccordion === id ? '' : id);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } catch (error) {
      console.log('file: index.js:50 => handleOpenAccordion => error:', error);
    }
  };

  const getCafeteriaContacts = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getCafeteriaContacts();
      setCafeteria(data);
    } catch (error) {
      console.log('file: index.js:215 => getContacts => error:', error);
    } finally {
      setLoader(false);
    }
  };

  const AlertFunction = () => {
    setAlertWarning('w');
    setErrorModalText('Are you sure you want to delete this item?');
    setErrorModal1(true);
  };

  const deleteCafeteria = async cafeteriaId => {
    setLoading(true);
    try {
      const {message} = await apiCall.deleteCafeteria(cafeteriaId);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      getCafeteriaContacts();
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCafeteriaContacts();
  }, [isFocused]);

  useEffect(() => {
    const find = servicePermission?.find(e => e.id == id);
    setPermission(find);
  }, [servicePermission]);

  const onRefresh = () => {
    setRefreshing(true);

    // Put your refresh logic here, for example:
    getCafeteriaContacts();

    // After refreshing is done, set refreshing to false
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <WarningModal
        visible={errorModal1}
        close={setErrorModal1}
        text={errorModalText}
        type={alertWarning}
        button={true}
        warning={() => [deleteCafeteria(openAccordion), setErrorModal1(false)]}
        cancel={() => setErrorModal1(false)}
      />

      <ImagePopup
        open={imagePopupModal}
        close={() => setImagePopupModal(false)}
        image={popupImage}
      />

      <View style={{flex: 1}}>
        <Header
          onBack={goBack}
          title={'Cafeteria'}
          showRightBtn={
            permission?.canAdd ? (role == 'User' ? false : true) : false
          }
          icon={Images.newAdd}
          headerContainer={{
            paddingHorizontal: width * 0.032,
            marginBottom: height * 0.02,
          }}
          handleRightBtn={() => navigation.navigate('addCafeteriaContact')}
        />

        {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
        }} > */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {loader ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : cafeteria == null ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: width * 0.035,
                  fontFamily: fontsFamily.medium,
                }}>
                No cafeteria found
              </Text>
            </View>
          ) : (
            <>
              {cafeteria?.length > 0 && (
                <>
                  <CustomHeaderColor
                    children={'Cafeteria Contacts'}
                    style={{fontSize: width * 0.04}}
                    fontWeight={fontsFamily.bold}
                    headerContainer={{
                      paddingHorizontal: width * 0.035,
                      marginBottom: height * 0.02,
                    }}
                  />

                  {cafeteria?.map((item, index) => (
                    <View key={index}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.card]}
                        onPress={() => handleOpenAccordion(item.cafeteriaID)}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            source={Images.restaurant}
                            resizeMode="contain"
                            style={{
                              width: width * 0.08,
                              height: width * 0.08,
                              marginHorizontal: width * 0.03,
                            }}
                          />
                          <View>
                            <CustomText
                              fontWeight={fontsFamily.bold}
                              style={{
                                color: colors.black,
                                fontSize: width * 0.03,
                              }}>
                              {item.cafeteriaName}
                            </CustomText>
                            <CustomText
                              fontWeight={fontsFamily.medium}
                              style={{
                                color: colors.black,
                                fontSize: width * 0.03,
                              }}>
                              {item.contactNo} | {item.altContactNo}
                            </CustomText>
                          </View>
                        </View>
                        <Image
                          source={Images.dropDown}
                          resizeMode="contain"
                          style={{width: width * 0.03, height: width * 0.03}}
                        />
                      </TouchableOpacity>

                      {openAccordion === item.cafeteriaID && (
                        <>
                          <View style={{marginHorizontal: width * 0.16}}>
                            <CustomText
                              fontWeight={fontsFamily.bold}
                              style={{
                                color: colors.black,
                                fontSize: width * 0.03,
                              }}>
                              Operation Hours
                            </CustomText>
                            <View
                              style={{
                                marginTop: width * 0.009,
                                marginBottom: width * 0.04,
                                maxWidth: '75%',
                              }}>
                              {item?.timings.map((time, i) => (
                                <View
                                  key={i}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                  }}>
                                  <CustomText
                                    fontWeight={fontsFamily.semiBold}
                                    style={styles.hoursstyle}>
                                    {time.day}
                                  </CustomText>
                                  <CustomText
                                    fontWeight={fontsFamily.semiBold}
                                    style={styles.hoursstyle}>
                                    {moment(time?.startTime)
                                      .add(getTimezoneOffset(), 'minutes')
                                      .format('h:mm A')}{' '}
                                    -{' '}
                                    {moment(time?.endTime)
                                      .add(getTimezoneOffset(), 'minutes')
                                      .format('h:mm A')}
                                  </CustomText>
                                </View>
                              ))}
                            </View>
                          </View>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                              setImagePopupModal(true);
                              setPopupImage(baseUrl + item?.menuLink);
                            }}
                            style={{
                              height: width / 1.5,
                              width: width,
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginHorizontal: 4,
                              marginTop: 16,
                            }}>
                            <Image
                              source={{uri: baseUrl + item?.menuLink}}
                              resizeMode="center"
                              style={{width: '100%', height: '100%'}}
                            />
                          </TouchableOpacity>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}>
                            {permission?.canDelete && role !== 'User' && (
                              <TouchableOpacity
                                disabled={loading}
                                onPress={() => AlertFunction()}
                                activeOpacity={1}
                                style={{
                                  width: width * 0.1,
                                  height: width * 0.1,
                                  backgroundColor: colors.danger,
                                  marginVertical: width * 0.02,
                                  borderRadius: 10,
                                  padding: width * 0.02,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                  marginRight: width * 0.02,
                                }}>
                                <Image
                                  resizeMode="contain"
                                  style={{
                                    tintColor: colors.white,
                                    width: width * 0.03,
                                    height: width * 0.03,
                                  }}
                                  source={Images.icondelete}
                                />
                              </TouchableOpacity>
                            )}
                            {permission?.canEdit && role !== 'User' && (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('updateCafeteria', {
                                    data: item,
                                  })
                                }
                                activeOpacity={1}
                                style={{
                                  width: width * 0.1,
                                  height: width * 0.1,
                                  backgroundColor: colors.primary,
                                  marginVertical: width * 0.02,
                                  borderRadius: 10,
                                  padding: width * 0.02,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                  marginLeft: width * 0.02,
                                }}>
                                <Image
                                  resizeMode="contain"
                                  style={{
                                    tintColor: colors.white,
                                    width: width * 0.06,
                                    height: width * 0.03,
                                  }}
                                  source={Images.editIcon}
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
                </>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Cafeteria;
