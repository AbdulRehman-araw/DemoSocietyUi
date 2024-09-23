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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import { styles } from './styles/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fontsFamily } from '../../assets/Fonts';
import { Images } from '../../assets/Images';
import { apiCall } from '../../Services/apiCall';
import { useIsFocused } from '@react-navigation/native';
import { Platform } from 'react-native';
import { ImageBackground } from 'react-native';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';
import { Fragment } from 'react';
import SecondaryButton from '../../components/Button/SecondaryButton';
import FilledTextField from '../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import PrimaryButton from '../../components/Button/PrimaryButton';
import FacilityBookingCard from '../../components/DetailCard/FacilityBookingCard';
import LinearGradientPrimaryButton from '../../components/Button/LinearGradientPrimaryButton';

const { width, height } = Dimensions.get('window');

const AdminFacilityBooking = ({ navigation, route }) => {
  const { id } = route?.params?.data || {};
  let isFocused = useIsFocused();
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );
  const { control } = useForm();

  const [loader, setLoader] = useState(false);
  const [facilityBookings, setFacilityBookings] = useState([]);
  const [permission, setPermission] = useState({});
  const [numToShow, setNumToShow] = useState(5);
  const [refreshing, setRefreshing] = useState(false);

  const loadMoreNotifications = () => {
    setNumToShow(numToShow + 5);
    console.log(numToShow);
  };

  const handleBackButton = () => {
    // Perform the navigation action here
    navigation.navigate('AdminHome');
    return true; // This prevents the default action (e.g., exiting the app)
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const getFacilityBooking = async searchKey => {
    setLoader(true);
    try {
      const search = searchKey ? searchKey : '';
      const { data } = await apiCall.getFacilityBooking(search, true, 1000, 1);
      console.log('file: index.js:36 => getFacilityBooking => data:', data);
      setFacilityBookings(data.bookings);
    } catch (error) {
      console.log('file: index.js:45 => getFacilityBooking => error:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', goBack);
    };
  }, []);

  useEffect(() => {
    getFacilityBooking();
  }, [isFocused]);

  useEffect(() => {
    const find = servicePermission?.find(e => e.id == id);
    setPermission(find);
  }, [servicePermission]);

  const onRefresh = () => {
    setRefreshing(true);

    // Put your refresh logic here, for example:
    getFacilityBooking();

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

      <ImageBackground
        source={Images.darkBG}
        resizeMode="cover"
        blurRadius={2}
        style={{
          flex: 1,
          width: width,
          paddingHorizontal: width * 0.038,
        }}>
        <Header
          onBack={goBack}
          leftarrow={{ marginLeft: 10 }}
          headerContainer={{ paddingHorizontal: width * 0.03 }}
          title={'Facility Booking'}
          showRightBtn={true}
          textStyle={{ color: colors.black, fontSize: 18 }}
        />
        <FilledTextField
          name={'Search'}
          placeholder=" Search facility Booking Request"
          type={'default'}
          control={control}
          justChange={e => getFacilityBooking(e)}
          variant="outlined"
          showRightIcon={true}
          rightIconImg={Images.search}
          rightIconStyle={{ flex: 0.4 }}
          containerStyle={{
            borderRadius: 12,
            marginTop: width * 0.05,
            backgroundColor: colors.white,
            borderWidth: 1,
          }}
          isLeftSearch={true}
          isCalender={true}
        />


        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              // padding: width * 0.038,
              paddingBottom: Platform.OS === 'ios' ? width * 0.08 : width * 0.18,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {loader ? (
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color={colors.primary} />
              </View>
            ) : facilityBookings?.length === 0 ? (
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CustomText
                  fontWeight={fontsFamily.medium}
                  style={{ fontSize: width * 0.035, color: colors.black }}>
                  No facility booking found
                </CustomText>
              </View>
            ) : (
              facilityBookings.slice(0, numToShow)?.map((item, index) => (
                <View key={index}>
                  <FacilityBookingCard data={item} onPress={() =>
                    navigation.navigate('facilityBookingDetail', {
                      data: { serviceId: id, ...item },
                    })
                  } />
                  {/* <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{
                      fontSize: width * 0.03,
                      marginVertical: width * 0.03,
                    }}>
                    {moment(item.eventDate).format('DD MMMM YYYY')}
                  </CustomText>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.cardWrapper}
                    onPress={() =>
                      navigation.navigate('facilityBookingDetail', {
                        data: { serviceId: id, ...item },
                      })
                    }>
                    <View style={{ ...styles.card, paddingVertical: width * 0.01 }}>
                      <Image
                        source={Images.communityhall}
                        resizeMode="contain"
                        style={{
                          width: width * 0.09,
                          height: width * 0.09,
                        }}
                      />
                      <View style={{ marginHorizontal: width * 0.02, flex: 1 }}>
                        <CustomText
                          fontWeight={fontsFamily.bold}
                          style={{ color: colors.primary, fontSize: width * 0.03 }}>
                          {item.venueName}
                        </CustomText>
                        <CustomText
                          fontWeight={fontsFamily.light}
                          style={{ color: colors.black, fontSize: width * 0.03 }}>
                          {item.organizer}
                        </CustomText>
                      </View>
                      <View>
                        <CustomText
                          fontWeight={fontsFamily.semiBold}
                          style={{
                            color: colors.black,
                            fontSize: width * 0.025,
                            marginBottom: width * 0.01,
                          }}>
                          {moment(item.startTime, 'hh:mm A').format('hh:mm A')}
                        </CustomText>
                        <CustomText
                          fontWeight={fontsFamily.semiBold}
                          style={{ color: colors.black, fontSize: width * 0.025 }}>
                          {moment(item.endTime, 'hh:mm A').format('hh:mm A')}
                        </CustomText>
                      </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.card}>
                      <Image
                        source={Images.iconawesome}
                        resizeMode="contain"
                        style={{
                          width: width * 0.06,
                          height: width * 0.06,
                        }}
                      />
                      <View style={{ marginHorizontal: width * 0.02, flex: 1 }}>
                        <CustomText
                          fontWeight={fontsFamily.bold}
                          style={{
                            color: colors.docHeader,
                            fontSize: width * 0.03,
                          }}>
                          {item.totalPersons} Persons
                        </CustomText>
                      </View>

                      <View>
                        {item.status === 'Approved' && (
                          <SecondaryButton
                            buttonColor={colors.success}
                            title={'Approved'}
                          />
                        )}
                        {item.status === 'Rejected' && (
                          <SecondaryButton
                            buttonColor={colors.lightRed}
                            title={'Rejected'}
                          />
                        )}
                        {item.status === 'Pending' && (
                          <Fragment>
                            <SecondaryButton
                              buttonColor={colors.success}
                              title={'Approve'}
                            />
                            <SecondaryButton
                              buttonColor={colors.lightRed}
                              title={'Reject'}
                            />
                          </Fragment>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity> */}
                </View>
              ))
            )}

            <LinearGradientPrimaryButton
              onPress={loadMoreNotifications}
              customStyle={{
                marginBottom: width * 0.12,
                paddingVertical: width * 0.025,
                paddingHorizontal: width * 0.015,
                borderRadius: 10,
              }}
              title={'See previous bookings'}
            />
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AdminFacilityBooking;
