import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../../components/CustomText';
import styles from './styles/styles';
import { colors } from '../../styles/colors';
import { Images } from '../../assets/Images';
import { fontsFamily } from '../../assets/Fonts';
import { text } from '../../res/strings';
import { AnnouncementBoxLight } from '../../components/AnnouncementBox';
import { useDispatch, useSelector } from 'react-redux';
import { apiCall } from '../../Services/apiCall';
import { ActivityIndicator } from 'react-native';
import { Linking } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Fragment } from 'react';
import { baseUrl } from '../../../axios';
import messaging from '@react-native-firebase/messaging';
import AlertModal from '../../components/Modal/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserData } from '../../redux/slices/userDataSlice';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const { width } = Dimensions.get('window');

const UserHome = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(8);
  const [loader, setLoader] = useState(false);
  const role = useSelector(state => state.userDataReducer.userRole);
  const { name } = useSelector(state => state.userDataReducer.userAccountDetails);
  const { accountID } = useSelector(state => state.userDataReducer.userAccountDetails);
  const [serviceLoader, setServiceLoader] = useState(false);
  const [services, setServices] = useState([]);
  const [announcementData, setAnnouncementData] = useState([]);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [initialCount, setInitialCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const checkTime = () => {
    var myDate = new Date();
    var hrs = myDate.getHours();

    var greet;

    if (hrs < 12) {
      greet = 'Good Morning';
      return greet;
    } else if (hrs >= 12 && hrs <= 17) {
      greet = 'Good Afternoon';
      return greet;
    } else if (hrs >= 17 && hrs <= 24) {
      greet = 'Good Evening';
      return greet;
    }
  };

  const GetNotifications = async () => {
    setLoader(true);
    try {
      const { data } = await apiCall?.GetNotifications(true, 200, 1);
      setNotificationCount(data?.unSeen);
      setNotifications(data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const BellFunction = () => {
    // Reset the notification badge count
    ViewNotification();

    // Handle the action when the bell icon is pressed (e.g., navigate to notifications screen)
    navigation.navigate('notifications');
  };

  const getAnnouncement = async (e = '') => {
    setLoader(true);
    try {
      const { data } = await apiCall.getAnnouncement(accountID, e);
      setAnnouncementData(data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const onNotificationReceived = remoteMessage => {
    GetNotificationsBadge();
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(onNotificationReceived);

    console.warn('object')
    return unsubscribe;
  }, []);

  useEffect(() => {
    GetNotificationsBadge();
  }, [isFocused]);

  const getServices = async () => {
    setServiceLoader(true);
    try {
      const { data } = await apiCall.getServices(role);
      setServices(data);
    } catch (error) {
      // logout();
    } finally {
      setServiceLoader(false);
    }
  };
  const logout = async () => {
    dispatch(setUserData([]));
    AsyncStorage.clear();
    navigation.replace('splash');
  };
  const sendNotificationToken = async fcmToken => {
    try {
      let obj = {
        device_token: fcmToken,
      };
      await apiCall.notification(obj);
    } catch (error) { }
  };

  const getToken = async () => {
    let fcmToken = null;
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      AsyncStorage.setItem('fcmToken', JSON.stringify(fcmToken));
      if (fcmToken) {
        // user has a device token
        sendNotificationToken(fcmToken);
      }
    }
  };

  const GetNotificationsBadge = async () => {
    setLoader(true);
    try {
      const { data } = await apiCall.GetNotificationsBadge(true, 10, 1);

      setNotifications(data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const ViewNotification = async () => {
    try {
      await apiCall.ViewNotification();
      close(false);
    } catch (error) { }
  };

  const requestPermission = async () => {
    try {
      // await messaging().requestPermission();
      // User has authorised
      const authorizationStatus = await messaging().requestPermission();
      console.warn(authorizationStatus);
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      } else if (
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
      } else {
      }
      getToken();
    } catch (error) {
      console.error(error);
      // User has rejected permissions
    }
  };

  useEffect(() => {
    GetNotifications();
    getServices();
    getAnnouncement();
    GetNotificationsBadge();
  }, [isFocused]);
  const onRefresh = () => {
    setRefreshing(true);

    // Put your refresh logic here, for example:
    GetNotifications();
    getServices();
    getAnnouncement();
    GetNotificationsBadge();

    // After refreshing is done, set refreshing to false
    setRefreshing(false);
  };
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor={colors.primary}
        barStyle="light-content"
      />

      {!STATUSBAR_HEIGHT && (
        <View
          style={{ backgroundColor: colors.primary, height: APPBAR_HEIGHT }}
        />
      )}

      <ImageBackground
        source={Images?.homeBanner}
        resizeMode="contain"
        style={{
          width: width,
          height: width,
          paddingHorizontal: width * 0.038,
          top: Platform.OS === 'ios' ? -80 : -40,
        }}>
        <View
          style={[styles.topView, { marginTop: Platform.OS == "ios" ? 120 : APPBAR_HEIGHT + width * 0.1 }]}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={Images.menuIcon}
              resizeMode="contain"
              style={[styles.iconStyle, { tintColor: colors.white }]}
            />
          </TouchableOpacity>
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{ color: colors.white, fontSize: width * 0.04 }}>
            Home
          </CustomText>

          {notificationCount !== 0 && (
            <View
              style={{
                backgroundColor: colors.white,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 50,
                position: 'absolute',
                right: -4,
                top: -18,
              }}>
              <CustomText style={{ color: colors.primary }}>
                {notificationCount}
              </CustomText>
            </View>
          )}
          <TouchableOpacity onPress={BellFunction}>
            <Image
              source={Images.bellIcon}
              resizeMode="contain"
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.6, justifyContent: 'center' }}>
          <CustomText
            fontWeight={fontsFamily.medium}
            style={{
              fontSize: width * 0.037,
              color: colors.white,
              marginBottom: 10,
            }}>
            Welcome, {name}
          </CustomText>
          <CustomText
            fontWeight={fontsFamily.medium}
            style={{ fontSize: width * 0.047, color: colors.white }}>
            {checkTime()}!
          </CustomText>
        </View>
      </ImageBackground>

      <ImageBackground source={Images.darkBG} style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: width * 0.08 }}
          style={{
            marginHorizontal: width * 0.038,
            marginTop: Platform.OS === 'ios' ? -100 : -70,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{ fontSize: width * 0.055 }}>
              {text.services}
            </CustomText>

            <TouchableOpacity onPress={() => setShowAll(showAll == 20 ? 8 : 20)}>
              <CustomText
                style={{ fontSize: width * 0.032, color: colors.primary }}>
                {showAll == 20 ? text.viewLess : text.viewAll}
              </CustomText>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              gap: width * 0.013,
            }}>
            {serviceLoader ? (
              <View style={{ width: width * 1, padding: width * 0.1 }}>
                <ActivityIndicator size={'small'} color={colors.primary} />
              </View>
            ) : services?.length > 0 ? (
              <>
                {services?.map(
                  (item, index) =>
                    index < showAll && (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() =>
                          item.id == '15'
                            ? Linking.openURL('http://societyhood.com/')
                            : navigation.navigate(item.route, {
                              data: { id: item?.id },
                            })
                        }
                        style={{
                          width: width * 0.22,
                          height: width * 0.26,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={{ uri: baseUrl + item.icon }}
                          resizeMode="contain"
                          style={{ width: '70%', height: '70%' }}
                        />
                        <CustomText style={{ fontSize: width * 0.023 }}>
                          {item.name}
                        </CustomText>
                      </TouchableOpacity>
                    ),
                )}
              </>
            ) : (
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: width * 0.035,
                    fontFamily: fontsFamily.medium,
                  }}>
                  No Services data
                </Text>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{ fontSize: width * 0.055, marginVertical: width * 0.05 }}>
              {text.announcement}
            </CustomText>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('announcement', { data: { id: 'none' } })
              }>
              <CustomText
                style={{ fontSize: width * 0.032, color: colors.primary }}>
                View All
              </CustomText>
            </TouchableOpacity>
          </View>

          {loader ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : announcementData?.length > 0 ? (
            announcementData
              ?.slice(0, 2)
              .map((item, index) => (
                <AnnouncementBoxLight data={item} key={index} />
              ))
          ) : (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: width * 0.035,
                  fontFamily: fontsFamily.medium,
                }}>
                No Announcement
              </Text>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default UserHome;
