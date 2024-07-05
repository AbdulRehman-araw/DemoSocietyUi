import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
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
import { AdminServices } from '../../utils/defaultData';
import { useDispatch, useSelector } from 'react-redux';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useIsFocused } from '@react-navigation/native';
import { apiCall } from '../../Services/apiCall';
import { ActivityIndicator } from 'react-native';
import { Text } from 'react-native';
import { baseUrl } from '../../../axios';
import {
  setServicePermission,
  setUserData,
} from '../../redux/slices/userDataSlice';
// import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocietyCard from '../../components/DetailCard/SocietyCard';
import DrawerScreenWrapper from '../../components/DrawerScreenWrapper';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const { width, height } = Dimensions.get('window');

const AdminHome = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const role = useSelector(state => state.userDataReducer.userRole);
  const { name } = useSelector(state => state.userDataReducer.userAccountDetails);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [services, setServices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

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

  const getServices = async () => {
    setLoader(true);
    try {
      const { data } = await apiCall.getServices(role);
      dispatch(setServicePermission(data));
      setServices(data);
    } catch (error) {
      logout();
    } finally {
      setLoader(false);
    }
  };

  const logout = async () => {
    const token = await AsyncStorage.getItem('fcmToken');

    try {
      const result = await apiCall?.logout({ device_token: token });
      dispatch(setUserData([]));
      AsyncStorage.clear();
      navigation.replace('splash');
    } catch (error) { }
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

  async function onDisplayNotification(remoteMessage) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    // {"messageId":"1691318103779163","data":{"title":"Lets Eat","orderid":"375387","pagename":"delivery","body":"Order# 375387 - Your order has been updated."},"notification":{"body":"Order# 375387 - Your order has been updated.","sound":"default","title":"Lets Eat"},"from":"379678460809"}
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'muhaish',
      name: 'muhaish',
      sound: 'default',

      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage?.data?.title,
      body: remoteMessage?.data?.body,

      ios: {
        sound: 'default',
        criticalVolume: 1.0,
        critical: true,
      },
      android: {
        channelId,
        visibility: AndroidVisibility.PUBLIC,
        importance: AndroidImportance.HIGH,
        smallIcon: 'ic_launcher_round',
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  const requestPermission = async () => {
    try {
      // await messaging().requestPermission();
      // User has authorised
      const authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      } else if (
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
      } else {
      }
      getToken();
    } catch (error) {
      // User has rejected permissions
    }
  };

  const GetNotificationsBadge = async () => {
    setLoader(true);
    try {
      const { data } = await apiCall.GetNotificationsBadge(true, 10, 1);
      setNotifications(data?.unSeen);
      setNotificationCount(data?.data?.unSeen);
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

  const onNotificationReceived = async remoteMessage => {
    await onDisplayNotification(remoteMessage);
    GetNotificationsBadge();
  };

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(onNotificationReceived);

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    GetNotificationsBadge();
  }, [isFocused]);

  useEffect(() => {
    getServices();
  }, [isFocused]);

  useEffect(() => {
    requestPermission();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);

    // Put your refresh logic here, for example:
    GetNotificationsBadge();
    getServices();
    // getAnnouncement();
    GetNotificationsBadge();

    // After refreshing is done, set refreshing to false
    setRefreshing(false);
  };

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     onDisplayNotification(remoteMessage)
  //     navigation.navigate(remoteMessage?.data?.pageName, {id: remoteMessage?.data?.dataID})
  //   });
  //   messaging().onMessage(remoteMessage => {
  //     onDisplayNotification(remoteMessage)
  //     navigation.navigate(remoteMessage?.data?.pageName, {id: remoteMessage?.data?.dataID})
  //   })

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log("🚀 ~ useEffect ~ remoteMessage:", remoteMessage)
  //         onDisplayNotification(remoteMessage)
  //         // navigation.navigate(remoteMessage?.data?.pageName, {id: {remoteMessage?.data?.dataID},})
  //         navigation?.navigate(remoteMessage?.data?.pageName, {
  //           id: remoteMessage?.data?.dataID
  //         });
  //       }
  //     });
  // }, []);

  // useEffect(() => {
  //   const foregroundNotification = messaging()?.onMessage(
  //     async remoteMessage => {
  //       await onDisplayNotification(remoteMessage);
  //       console.log('🚀 ~ useEffect ~ remoteMessage:', remoteMessage);
  //     },
  //   );

  //   const backGroundNotification = messaging()?.setBackgroundMessageHandler(
  //     async remoteMessage => {
  //       await onDisplayNotification(remoteMessage);
  //       navigation?.navigate(remoteMessage?.data?.pagename, {
  //         id: remoteMessage?.data?.id,
  //       });
  //     },
  //   );

  //   const opened = messaging()?.onNotificationOpenedApp(remoteMessage => {
  //     navigation?.navigate(remoteMessage?.data?.pagename, {
  //       id: remoteMessage?.data?.id,
  //     });
  //   });
  //   return () => {
  //     foregroundNotification();
  //     backGroundNotification();
  //     opened();
  //   };
  // }, []);

  return (
    <DrawerScreenWrapper>
    <View style={styles.root}>
      <ImageBackground source={Images.darkBG}>
        {/* <ImageBackground
        source={Images.adminBanner}
        resizeMode="cover"
        style={{
          width: width,
          height: width * 0.9,
          paddingHorizontal: width * 0.038,
          position: 'relative',
        }}> */}
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

        <View
          style={[styles.topView, { marginTop: APPBAR_HEIGHT + width * 0.01 }]}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={Images.menuIcon}
              resizeMode="contain"
              style={[styles.iconStyle, { width: width * 0.09, height: width * 0.09, marginLeft: 10 }]}
            />
          </TouchableOpacity>

          {notificationCount !== 0 && (
            <View
              style={{
                backgroundColor: colors.white,
                paddingHorizontal: 10,
                paddingVertical: notifications?.data?.unSeen > 9 ? 7 : 5,
                borderRadius: 50,
                position: 'absolute',
                right: -5,
                top: -20,
              }}>
              <CustomText
                style={{
                  color: colors.primary,
                  fontSize: notifications?.data?.unSeen > 9 ? 12 : 14,
                }}>
                {notificationCount}
              </CustomText>
            </View>
          )}
          <TouchableOpacity
            onPress={() => [
              navigation.navigate('notifications'),
              ViewNotification(),
            ]}>
            <Image
              source={Images.notificationIcon}
              resizeMode="contain"
              style={[styles.iconStyle, { width: width * 0.09, height: width * 0.09, }]}
            />
          </TouchableOpacity>
        </View>

        {/* </ImageBackground> */}

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: width * 0.8 }}
          style={{
            marginHorizontal: width * 0.038,
            marginTop: Platform.OS === 'ios' ? 20 : 10,
            marginBottom: width * 0.08,
          }}>

          <View
            style={{
              marginTop: 30,
              marginBottom: 20
            }}>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={{ fontSize: width * 0.037, color: colors.dark }}>
              {checkTime()}!
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={{
                fontSize: width * 0.057,
                color: colors.dark,
              }}>
              Mr. {name}
            </CustomText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={{ fontSize: width * 0.055 }}>
              {text.mySociety}
            </CustomText>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <CustomText
                fontWeight={fontsFamily.regular}
                style={{ fontSize: width * 0.035, marginRight: 8 }}>
                {text.viewAll}
              </CustomText>
              <Image source={Images.backArrow} style={styles.arrow} />
            </View>
          </View>


          <View style={{ height: width / 2.5, marginVertical: 18 }}>
            <FlatList horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, }}
              data={services}
              renderItem={({ _, i }) => {
                return (
                  <SocietyCard />
                )
              }} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={{ fontSize: width * 0.055 }}>
              {text.manageSociety}
            </CustomText>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <CustomText
                fontWeight={fontsFamily.regular}
                style={{ fontSize: width * 0.035, marginRight: 8 }}>
                {text.viewAll}
              </CustomText>
              <Image source={Images.backArrow} style={styles.arrow} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              gap: width * 0.013,
            }}>
            {loader ? (
              <View style={{ width: width * 1, padding: width * 0.1 }}>
                <ActivityIndicator size={'large'} color={colors.primary} />
              </View>
            ) : services?.length > 0 ? (
              <>
                {services?.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      navigation.navigate(item.route, { data: { id: item?.id } })
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
                    <CustomText style={{ fontSize: width * 0.024, textAlign: 'center' }} fontWeight={fontsFamily.bold}>
                      {item.name}
                    </CustomText>
                  </TouchableOpacity>
                ))}
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
                  No services found
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

      </ImageBackground>
    </View>
    </DrawerScreenWrapper>
  );
};

export default AdminHome;

