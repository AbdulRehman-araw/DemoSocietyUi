import {
  TextInput,
  BackHandler,
  StyleSheet,
  Button,
  Text,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';

import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fontsFamily } from '../../assets/Fonts';
import { styles } from './styles/styles';
import { Images } from '../../assets/Images';
import { useIsFocused } from '@react-navigation/native';
import { apiCall } from '../../Services/apiCall';
import { getFormattedDate, getFormattedTime } from '../../utils/helperFunction';
import PrimaryButton from '../../components/Button/PrimaryButton';

const { width } = Dimensions.get('window');

const Notifications = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [notifications, setNotifications] = useState([]);
  const [loader, setLoader] = useState(false);

  const [numToShow, setNumToShow] = useState(5);

  const loadMoreNotifications = () => {
    setNumToShow(numToShow + 5);
    console.log(numToShow);
  };

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

  const GetNotifications = async () => {
    setLoader(true);
    try {
      const { data } = await apiCall.GetNotifications(true, 2000, 1);
      console.log('🚀 ~ file: index.js:65 ~ GetNotifications ~ data:', data);

      setNotifications(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const ViewNotification = async () => {
    try {
      await apiCall.ViewNotification();

      // close(false);
    } catch (error) {
      console.log(error);
    }
  };

  const ReadNotification = async status => {
    console.log(status);
    try {
      await apiCall.ReadNotification(status);

      // close(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetNotifications();
    ReadNotification();
    ViewNotification();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <ImageBackground source={Images.darkBG} style={styles.root}>
        <View
          style={{ flex: 1, paddingHorizontal: width * 0.032, marginBottom: 20 }}>

          <Header
            onBack={goBack}
            leftarrow={{ marginLeft: 20 }}
            title={'Notifications'}
            showRightBtn={true}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.05,
            }}>
            <CustomText children={'Most Recent'} fontWeight={fontsFamily.bold} style={styles.leftHeading} />
            {notifications?.notifications
              ?.slice(0, numToShow)
              ?.map((item, index) =>
                item ? ( // Check if item is defined
                  <TouchableOpacity
                    key={index}
                    onPress={() => [
                      navigation.navigate(item.pageName, { id: item?.dataID }),
                      ReadNotification(item.notificationId),
                    ]}>
                    <View style={styles.viewdiscussion}>
                      <Image
                        source={Images.userNoti}
                        resizeMode="contain"
                        style={{ width: width * 0.12, }}
                      />
                      <View>
                        {/* <CustomText fontWeight={fontsFamily.bold} style={styles.discussiontext}>
              {item.title}
            </CustomText> */}
                        <CustomText
                          fontWeight={fontsFamily.bold}
                          style={
                            item.isRead === true
                              ? styles.discussiontext
                              : styles.discussiontext2
                          }>
                          {item.body}
                        </CustomText>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}>
                          <CustomText
                            fontWeight={fontsFamily.bold}
                            style={styles.datetext}>
                            {getFormattedDate(item.addOn)}
                          </CustomText>
                          <CustomText
                            fontWeight={fontsFamily.bold}
                            style={styles.timetext}>
                            {getFormattedTime(item.addOn)}
                          </CustomText>
                        </View>
                      </View>
                    </View>
                    <View style={styles.line} />
                  </TouchableOpacity>
                ) : null,
              )}

            {/* {notifications?.notifications?.length > numToShow && (
              <PrimaryButton
                onPress={loadMoreNotifications}
                customStyle={{
                  marginBottom: width * 0.12,
                  paddingVertical: width * 0.025,
                  paddingHorizontal: width * 0.015,
                  borderRadius: 10,
                }}
                title={'See previous notifications'}
              />
            )} */}
          </ScrollView>
        </View>
      </ImageBackground>

    </SafeAreaView>
  );
};

export default Notifications;
