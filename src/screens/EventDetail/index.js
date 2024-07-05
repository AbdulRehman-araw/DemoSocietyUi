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

import React, {useState, useEffect} from 'react';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';

import {colors} from '../../styles/colors';
import {Images} from '../../assets/Images';
import {fontsFamily} from '../../assets/Fonts';
import {text} from '../../res/strings';
import {styles} from './styles/styles';
import PrimaryButton from '../../components/Button/PrimaryButton';
import moment from 'moment';
import {apiCall} from '../../Services/apiCall';
import {useSelector} from 'react-redux';
import {baseUrl} from '../../../axios';
import {useIsFocused} from '@react-navigation/native';
import WarningModal from '../../components/Modal/WarningModal';
import AlertModal from '../../components/Modal/AlertModal';
import CancelModal from '../../components/Modal/CancelModal';

const {width, height} = Dimensions.get('window');

const EventDetail = ({navigation, route}) => {
  const {
    eventDate,
    eventDescription,
    eventID,
    eventName,
    eventType,
    image,
    interested,
    totalInterested,
    venueID,
    venueName,
    eventStatus,
    endTime,
    bookingID,
    organizer,
    totalPersons,
    startTime,
    request,
  } = route?.params?.data;
  console.log('🚀 ~ file: index.js:57 ~ EventDetail ~ bookingID:', bookingID);

  const data = route?.params?.data;

  const id = data?.bookingID;

  const role = useSelector(state => state.userDataReducer.userRole);

  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );

  const ePollingPermission = servicePermission?.filter(
    item => item?.name === 'Events',
  );
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(interested);
  const isFocused = useIsFocused();

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const [errorModal1, setErrorModal1] = useState(false);
  const [alertWarning, setAlertWarning] = useState('w');
  const [removalIndex, setRemovalIndex] = useState(null);

  const [errorModal2, setErrorModal2] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  // const changeStatusHandler = async (statusType) => {
  //   try {
  //     if (status === statusType) return
  //     await apiCall.changeEventStatus(eventID, statusType)
  //     setStatus(statusType)
  //   } catch (error) {
  //     console.log("🚀 ~ file: index.js:52 ~ changeStatusHandler ~ error:", error)
  //   }
  // }

  const CancelBookingRequest = async bookingID => {
    console.log('>>>>>>>>>>>>>>>>', bookingID);
    setLoading(true);
    try {
      const {message} = await apiCall.CancelBookingRequest(bookingID);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        navigation.navigate('events');
      }, 1000);
    } catch (error) {
      setAlertType('e');
      setErrorModalText(error);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const DeleteEvent = async eventID => {
    setLoading(true);
    try {
      const {message} = await apiCall.DeleteEvent(eventID);
      setErrorModal(true);
      setAlertType('s');
      setErrorModalText(message);

      setTimeout(() => {
        setErrorModal(false);
        navigation.navigate('events');
      }, 3000);
    } catch (error) {
      setAlertType('e');
      setErrorModalText(error);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  console.log(eventID);

  const AlertFunction = () => {
    setAlertWarning('w');
    setErrorModalText('Are you sure you want to cancel this Event?');
    setErrorModal1(true);
    setRemovalIndex();
  };

  const AlertFunction2 = () => {
    setAlertWarning('w');
    setErrorModalText('Are you sure you want to delete this Event?');
    setErrorModal2(true);
    setRemovalIndex();
  };

  const parsedTime = moment(data.startTime, 'hh:mm A');
  const newTime = parsedTime.add(5, 'hours');
  const formattedTime = newTime.format('hh:mm A');

  const parsedTime1 = moment(data.endTime, 'hh:mm A');
  const newTime1 = parsedTime1.add(5, 'hours');
  const formattedTime1 = newTime1.format('hh:mm A');

  CommunityData = {
    eventName,
    eventType,
    venueName,
    eventDescription,
    eventDate,
    eventID,
    totalPersons,
  };

  console.log(bookingID);

  return (
    <ScrollView style={{}}>
      <StatusBar
        translucent
        backgroundColor={colors.primary}
        barStyle="light-content"
      />

      <ImageBackground
        source={{uri: baseUrl + data?.image}}
        resizeMode="cover"
        style={{
          width: width,
          height: width * 0.82,
          paddingVertical: width * 0.09,
          paddingHorizontal: 8,
          position: 'relative',
        }}>
        <View style={styles.imageOverlay} />
        <Header
          onBack={goBack}
          title={eventType}
          showRightBtn={true}
          textStyle={{color: colors.white}}
          textwhite={{
            fontSize: width * 0.05,
            color: colors.white,
            marginTop: 15,
          }}
          iconStyle={{tintColor: colors.white}}
        />
      </ImageBackground>

      <View style={styles.card}>
        <View style={{}}>
          {eventName ? (
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{color: colors.white, fontSize: width * 0.042}}>
              {eventName}
            </CustomText>
          ) : (
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={{color: colors.white, fontSize: width * 0.056}}>
              {data?.organizer}
            </CustomText>
          )}
        </View>
      </View>
      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={'s'}
      />

      <View
        style={{
          paddingHorizontal: width * 0.09,
          flex: 0.8,
          paddingVertical: width * 0.04,
          marginTop: width * 0.05,
        }}>
        <CustomText
          fontWeight={fontsFamily.bold}
          style={{
            color: colors.black,
            fontSize: width * 0.035,
            marginTop: 8,
          }}>
          Location
        </CustomText>

        <CustomText
          fontWeight={fontsFamily.semiBold}
          style={{
            color: colors.primary,
            fontSize: width * 0.04,
          }}>
          {venueName}
        </CustomText>

        {bookingID !== undefined && (
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{
              color: colors.black,
              fontSize: width * 0.035,
              marginTop: 8,
            }}>
            Status
          </CustomText>
        )}
        {bookingID !== undefined && (
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{
              color:
                data.status === 'Rejected'
                  ? colors.red
                  : data.status === 'Approved'
                  ? colors.primary
                  : colors.pending,
              fontSize: width * 0.04,
            }}>
            {data.status} ({request})
          </CustomText>
        )}
        {bookingID == undefined && (
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{
              color: colors.black,
              fontSize: width * 0.035,
              marginTop: 8,
            }}>
            Description
          </CustomText>
        )}
        {bookingID == undefined && (
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{
              color: colors.primary,
              fontSize: width * 0.04,
            }}>
            {eventDescription}
          </CustomText>
        )}

        {bookingID !== undefined && (
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{
              color: colors.black,
              fontSize: width * 0.035,
              marginTop: 8,
            }}>
            Remarks
          </CustomText>
        )}
        {bookingID !== undefined && (
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{
              color: colors.primary,
              fontSize: width * 0.04,
            }}>
            {data.remarks}
          </CustomText>
        )}

        <CustomText
          fontWeight={fontsFamily.bold}
          style={{
            color: colors.black,
            fontSize: width * 0.035,
            marginTop: 8,
          }}>
          Date
        </CustomText>

        <CustomText
          fontWeight={fontsFamily.semiBold}
          style={{
            color: colors.primary,
            fontSize: width * 0.04,
          }}>
          {moment(eventDate)?.format('DD MMMM YYYY')}
        </CustomText>

        <CustomText
          fontWeight={fontsFamily.bold}
          style={{
            color: colors.black,
            fontSize: width * 0.035,
            marginTop: 8,
          }}>
          Start Time
        </CustomText>

        <CustomText
          fontWeight={fontsFamily.semiBold}
          style={{
            color: colors.primary,
            fontSize: width * 0.04,
          }}>
          {bookingID == null ? moment(eventDate).format('hh:mm a') : startTime}
        </CustomText>

        {bookingID !== undefined && (
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{
              color: colors.black,
              fontSize: width * 0.035,
              marginTop: 8,
            }}>
            End Time
          </CustomText>
        )}
        {bookingID !== undefined && (
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{
              color: colors.primary,
              fontSize: width * 0.04,
            }}>
            {endTime}
          </CustomText>
        )}

        {bookingID !== undefined && (
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{
              color: colors.black,
              fontSize: width * 0.035,
              marginTop: 8,
            }}>
            Organizer
          </CustomText>
        )}
        {bookingID !== undefined && (
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{
              color: colors.primary,
              fontSize: width * 0.04,
            }}>
            {organizer}
          </CustomText>
        )}

        {bookingID !== undefined && (
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{
              color: colors.black,
              fontSize: width * 0.035,
              marginTop: 8,
            }}>
            Number of guest
          </CustomText>
        )}
        {bookingID !== undefined && (
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{
              color: colors.primary,
              fontSize: width * 0.04,
            }}>
            {totalPersons}
          </CustomText>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {ePollingPermission[0]?.canDelete && role !== 'User' && (
          <>
            <TouchableOpacity
              onPress={() => AlertFunction2()}
              style={[
                styles.viewbtn,
                {
                  backgroundColor: colors.white,
                  borderColor: colors.primary,
                  borderWidth: 1,
                },
              ]}>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={{
                  color: colors.primary,
                  fontSize: width * 0.03,
                  paddingHorizontal: width * 0.02,
                }}>
                Delete
              </CustomText>
            </TouchableOpacity>

            <WarningModal
              visible={errorModal2}
              close={setErrorModal2}
              text={errorModalText}
              type={alertWarning}
              button={true}
              warning={() => {
                if (removalIndex !== null) {
                  [DeleteEvent(eventID), setErrorModal2(false)];
                }
              }}
              cancel={() => setErrorModal2(false)}
            />
          </>
        )}

        {ePollingPermission[0]?.canEdit && role !== 'User' && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              navigation.navigate('EditCommunityEvent', {data: CommunityData})
            }
            style={[
              styles.viewbtn,
              {backgroundColor: colors.primary, marginHorizontal: 10},
            ]}>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={{
                color: colors.white,
                fontSize: width * 0.03,
                paddingHorizontal: width * 0.02,
              }}>
              Edit
            </CustomText>
          </TouchableOpacity>
        )}
      </View>

      {role === 'User' && bookingID !== undefined && request !== 'Cancel' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: width * 0.2,
          }}>
          <TouchableOpacity
            onPress={() => AlertFunction()}
            style={[
              styles.viewbtn,
              {
                backgroundColor: colors.white,
                borderColor: colors.primary,
                borderWidth: 1,
              },
            ]}>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={{
                color: colors.primary,
                fontSize: width * 0.03,
                paddingHorizontal: width * 0.02,
              }}>
              Cancel Booking
            </CustomText>
          </TouchableOpacity>

          <CancelModal
            visible={errorModal1}
            close={setErrorModal}
            text={errorModalText}
            type={alertWarning}
            button={true}
            warning={() => {
              if (removalIndex !== null) {
                [CancelBookingRequest(bookingID), setErrorModal1(false)];
              }
            }}
            cancel={() => setErrorModal1(false)}
          />

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('EditEvent', {data})}
            style={[
              styles.viewbtn,
              {backgroundColor: colors.primary, marginHorizontal: 10},
            ]}>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={{
                color: colors.white,
                fontSize: width * 0.03,
                paddingHorizontal: width * 0.02,
              }}>
              Edit
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default EventDetail;
