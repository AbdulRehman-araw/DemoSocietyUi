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
  Linking,
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
import {UIManager} from 'react-native';
import {LayoutAnimation} from 'react-native';
import moment from 'moment';
import {apiCall} from '../../Services/apiCall';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getTimezoneOffset} from '../../utils/helperFunction';
import AlertModal from '../../components/Modal/AlertModal';
import WarningModal from '../../components/Modal/WarningModal';

const {width, height} = Dimensions.get('window');

// Enable layout animation for Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const EmergencyContacts = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const {id} = route?.params?.data;
  const role = useSelector(state => state.userDataReducer.userRole);
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );

  const [permission, setPermission] = useState({});

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
  const [contacts, setContacts] = useState([]);
  const [openAccordion, setOpenAccordion] = useState();

  const [loading, setLoading] = useState(false);

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [errorModal1, setErrorModal1] = useState(false);

  const [alertWarning, setAlertWarning] = useState('w');
  const [removalIndex, setRemovalIndex] = useState(null);

  // *For Handle Open Accordion
  const handleOpenAccordion = id => {
    try {
      setOpenAccordion(openAccordion === id ? '' : id);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } catch (error) {
      console.log('file: index.js:50 => handleOpenAccordion => error:', error);
    }
  };

  const getContacts = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getContacts();
      setContacts(data);
    } catch (error) {
      console.log('file: index.js:215 => getContacts => error:', error);
    } finally {
      setLoader(false);
    }
  };

  const deleteContact = async contactId => {
    setLoading(true);
    try {
      const {message} = await apiCall.deleteContact(contactId);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      getContacts();
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
    getContacts();
  }, [isFocused]);

  useEffect(() => {
    const find = servicePermission?.find(e => e.id == id);
    setPermission(find);
  }, [servicePermission]);

  const AlertFunction = index => {
    setAlertWarning('w');
    setErrorModalText('Are you sure you want to delete this contact?');
    setErrorModal1(true);
    setRemovalIndex(index);
  };

  const onRefresh = () => {
    setRefreshing(true);

    // Put your refresh logic here, for example:
    getContacts();

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
        close={setErrorModal}
        text={errorModalText}
        type={alertWarning}
        button={true}
        warning={() => {
          if (removalIndex !== null) {
            [deleteContact(removalIndex), setErrorModal1(false)];
          }
        }}
        cancel={() => setErrorModal1(false)}
      />

      <View style={{flex: 1}}>
        <Header
          onBack={goBack}
          title={'Emergency Contacts'}
          showRightBtn={
            permission?.canAdd ? (role == 'User' ? false : true) : false
          }
          icon={Images.Addcircle}
          headerContainer={{
            paddingHorizontal: width * 0.032,
            marginBottom: height * 0.02,
          }}
          handleRightBtn={() => navigation.navigate('addContact')}
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
          ) : contacts == null ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: width * 0.035,
                  fontFamily: fontsFamily.medium,
                }}>
                No emergency contact found
              </Text>
            </View>
          ) : (
            <>
              {contacts?.length > 0 && (
                <>
                  {contacts?.map((item, index) => (
                    <View>
                      <CustomHeaderColor
                        children={item.contactType}
                        style={{fontSize: width * 0.04}}
                        fontWeight={fontsFamily.bold}
                      />

                      {item.contacts?.map((item, index) => (
                        <View key={index}>
                          <View style={[styles.card]}>
                            <TouchableOpacity
                              activeOpacity={0.7}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: width * 0.8,
                              }}
                              onPress={() =>
                                handleOpenAccordion(item.contactID)
                              }>
                              <Image
                                source={Images.homeicon1}
                                resizeMode="contain"
                                style={{
                                  width: width * 0.065,
                                  height: width * 0.065,
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
                                  {item.contactName}
                                </CustomText>
                                <CustomText
                                  fontWeight={fontsFamily.medium}
                                  style={{
                                    color: colors.black,
                                    fontSize: width * 0.03,
                                  }}>
                                  {item.contactNo}
                                </CustomText>
                              </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() =>
                                Linking.openURL(`tel:${item.contactNo}`)
                              }>
                              <Image
                                source={Images.phoneicon}
                                resizeMode="contain"
                                style={{
                                  width: width * 0.065,
                                  height: width * 0.065,
                                }}
                              />
                            </TouchableOpacity>
                          </View>

                          {openAccordion === item.contactID && (
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
                                  maxWidth: '100%',
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
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  {permission?.canDelete && role !== 'User' && (
                                    <TouchableOpacity
                                      disabled={loading}
                                      onPress={() =>
                                        AlertFunction(item?.contactID)
                                      }
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

                                  {permission?.canDelete && role !== 'User' && (
                                    <TouchableOpacity
                                      disabled={loading}
                                      onPress={() =>
                                        navigation.navigate(
                                          'EditEmergencyContact',
                                          {data: item},
                                        )
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
                                          width: width * 0.03,
                                          height: width * 0.03,
                                        }}
                                        source={Images.editIcon}
                                      />
                                    </TouchableOpacity>
                                  )}
                                </View>
                              </View>
                            </View>
                          )}
                        </View>
                      ))}
                    </View>
                  ))}
                </>
              )}

              {contacts?.emergencyContacts?.length > 0 && (
                <>
                  <CustomHeaderColor
                    children={'Emergency Contacts'}
                    style={{fontSize: width * 0.04}}
                    fontWeight={fontsFamily.bold}
                  />

                  {contacts?.emergencyContacts?.map((item, index) => (
                    <View key={index}>
                      <View style={[styles.card]}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: width * 0.8,
                          }}
                          onPress={() => handleOpenAccordion(item.contactID)}>
                          <Image
                            source={Images.Iconcontacts}
                            resizeMode="contain"
                            style={{
                              width: width * 0.065,
                              height: width * 0.065,
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
                              {item.contactName}
                            </CustomText>
                            <CustomText
                              fontWeight={fontsFamily.medium}
                              style={{
                                color: colors.black,
                                fontSize: width * 0.03,
                              }}>
                              {item.contactNo}
                            </CustomText>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() =>
                            Linking.openURL(`tel:${item.contactNo}`)
                          }>
                          <Image
                            source={Images.phoneicon}
                            resizeMode="contain"
                            style={{
                              width: width * 0.065,
                              height: width * 0.065,
                            }}
                          />
                        </TouchableOpacity>
                      </View>

                      {openAccordion === item.contactID && (
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
                                  {moment(time?.startTime).format('h:mm A')} -{' '}
                                  {moment(time?.endTime).format('h:mm A')}
                                </CustomText>
                              </View>
                            ))}
                            {permission?.canDelete &&
                              permission?.canEdit &&
                              role !== 'User' && (
                                <TouchableOpacity
                                  disabled={loading}
                                  onPress={() => deleteContact(item?.contactID)}
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
                          </View>
                        </View>
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

export default EmergencyContacts;
