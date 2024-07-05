import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useRef, useState } from 'react';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import { colors } from '../../styles/colors';
import { Images } from '../../assets/Images';
import { fontsFamily } from '../../assets/Fonts';
import { text } from '../../res/strings';
import { styles } from './styles/styles';
import PrimaryButton from '../../components/Button/PrimaryButton';
import CommunityModal from '../../components/Modal/Community';
import ActionSheet from 'react-native-actions-sheet';
import CanlerderModal from '../../components/Modal/Calendar';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import DatePicker from 'react-native-date-picker';
import BookingSuccessful from '../FacilityBookingSuccessful';
import { apiCall } from '../../Services/apiCall';
import SecondaryButton from '../../components/Button/SecondaryButton';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useSelector } from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';
import { baseUrl } from '../../../axios';
import RoundButton from '../../components/Button/RoundButton';

const { width, height } = Dimensions.get('window');

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const VisitorDetailView = ({ img, label, text }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
      <Image source={img} style={{ width: 26, height: 26, resizeMode: 'contain', marginRight: 12, tintColor: colors.black }} />
      <View>
        <CustomText
          fontWeight={fontsFamily.regular}
          style={{ fontSize: 12, color: colors.dark, }}>
          {label}
        </CustomText>
        <View style={{ marginVertical: 4 }} />
        <CustomText
          fontWeight={fontsFamily.bold}
          style={{ fontSize: 16, color: colors.dark }}>
          {text}
        </CustomText>
      </View>
    </View>
  )
}

const FacilityBookingDetail = ({ navigation, route }) => {
  const {
    serviceId,
    bookingID,
    endTime,
    eventDate,
    organizer,
    startTime,
    status,
    totalPersons,
    venueID,
    venueName,
    image,
    request,
    managerName,
  } = route?.params?.data;
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );
  const facilityPermission = servicePermission?.filter(
    item => item?.name === 'Facility Booking',
  );
  const [approvedLoader, setApprovedLoader] = useState(false);
  const [rejectLoader, setRejectLoader] = useState(false);
  const [permission, setPermission] = useState({});
  const [remarks, setRemarks] = useState('');

  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  const [remarksError, setRemarksError] = useState('');

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');


  const [approveModal, setApproveModal] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const approvedBookingStatus = async () => {
    if (remarks.trim() === '') {
      setRemarksError('Remarks are required'); // Set the error message
      return; // Prevent further action
    }

    setApprovedLoader(true);
    try {
      let { message } = await apiCall.changeBookingStatus(
        bookingID,
        true,
        remarks,
      );
      setApproved(true);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setApprovedLoader(false);
      setApproveModal(false)
    }
  };

  const rejectBookingStatus = async () => {
    if (remarks.trim() === '') {
      setRemarksError('Remarks are required'); // Set the error message
      return; // Prevent further action
    }

    setRejectLoader(true);
    try {
      let { message } = await apiCall.changeBookingStatus(
        bookingID,
        false,
        remarks,
      );
      setRejected(true); // Update the state to indicate rejection
      // Additional actions or navigation if needed
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setRejectLoader(true);
    }
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

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", goBack)

  //   return () => {
  //     BackHandler.removeEventListener("hardwareBackPress", goBack)
  //   }
  // }, [])

  useEffect(() => {
    const find = servicePermission?.find(e => e.id == serviceId);
    setPermission(find);
  }, [servicePermission]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>

        <View style={{ flex: 0.5, marginTop: Platform.OS == "ios" ? 40 : 0 }}>
          <ImageBackground
            source={{ uri: baseUrl + image }}
            resizeMode="cover"
            style={{
              width: width,
              height: width * 0.97,
              paddingHorizontal: width * 0.038,
            }}>
            <Header
              onBack={goBack}
              title={venueName}
              showRightBtn={true}
              textStyle={{ color: colors.white }}
            />
          </ImageBackground>
        </View>

        <View style={styles.viewCard}>
          <ImageBackground source={Images.darkBG} style={{ flex: 1, paddingHorizontal: width * 0.07, paddingTop: width * 0.07, }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}>
              <View>

                <View style={{ marginBottom: 20 }}>
                  <CustomText children={'Booking Details'} fontWeight={fontsFamily.bold} style={{ fontSize: 18, color: colors.black }} />
                </View>
                <VisitorDetailView label={'Stating Time'} text={startTime} img={Images.clock_outlined} />
                <VisitorDetailView label={'Ending Time'} text={endTime} img={Images.clock_outlined} />
                <VisitorDetailView label={'Resident Name'} text={'abc'} img={Images.userIcon} />
                <VisitorDetailView label={'Unit Number'} text={'abc'} img={Images.unitNumber} />
                <VisitorDetailView label={'Purpose of Booking'} text={'abc'} img={Images.purposeOfVisit} />
                <VisitorDetailView label={'Number of visitors'} text={totalPersons} img={Images.noOfVisitors} />
                <VisitorDetailView label={'Event Date'} text={moment(eventDate).format('DD-MMMM-YYYY')} img={Images.calender_outlined} />
                {/* <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: width * 0.03,
                  }}>
                  <Image
                    source={Images.communityhall}
                    resizeMode="contain"
                    style={{ width: width * 0.12, height: width * 0.12 }}
                  />
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{
                      marginLeft: width * 0.02,
                      color: colors.primary,
                      fontSize: width * 0.042,
                    }}>
                    {venueName}
                  </CustomText>
                </View> */}

                <AlertModal
                  visible={errorModal}
                  close={setErrorModal}
                  text={errorModalText}
                  type={alertType}
                />
                {/* <View
                  style={{ marginBottom: width * 0.04, paddingLeft: width * 0.02 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: width * 0.01,
                    }}>
                    <Image
                      source={Images.dotnotegreen}
                      resizeMode="contain"
                      style={{ width: width * 0.02, height: width * 0.02 }}
                    />
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={{
                        marginLeft: width * 0.02,
                        color: colors.black,
                        fontSize: width * 0.038,
                      }}>
                      {moment(eventDate).format('DD-MMMM-YYYY')}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: width * 0.01,
                    }}>
                    <Image
                      source={Images.dotnotegreen}
                      resizeMode="contain"
                      style={{ width: width * 0.02, height: width * 0.02 }}
                    />
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={{
                        marginLeft: width * 0.02,
                        color: colors.black,
                        fontSize: width * 0.038,
                      }}>
                      {moment(startTime, 'hh:mm A').format('hh:mm A')}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: width * 0.01,
                    }}>
                    <Image
                      source={Images.dotnotegreen}
                      resizeMode="contain"
                      style={{ width: width * 0.02, height: width * 0.02 }}
                    />
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={{
                        marginLeft: width * 0.02,
                        color: colors.black,
                        fontSize: width * 0.038,
                      }}>
                      {moment(endTime, 'hh:mm A').format('hh:mm A')}
                    </CustomText>
                  </View>
                </View>
                <View style={{ marginVertical: width * 0.02 }}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{
                      marginLeft: width * 0.02,
                      color: colors.gray,
                      fontSize: width * 0.03,
                      marginBottom: width * 0.01,
                    }}>
                    Booked By:
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{
                      marginLeft: width * 0.02,
                      color: colors.primary,
                      fontSize: width * 0.038,
                    }}>
                    {organizer}
                  </CustomText>
                </View> */}

                {/* <View style={{ marginVertical: width * 0.02 }}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{
                      marginLeft: width * 0.02,
                      color: colors.gray,
                      fontSize: width * 0.03,
                      marginBottom: width * 0.01,
                    }}>
                    Manager Name:
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{
                      marginLeft: width * 0.02,
                      color: colors.primary,
                      fontSize: width * 0.038,
                    }}>
                    {managerName}
                  </CustomText>
                </View> */}

                {/* <View style={{ marginVertical: width * 0.02 }}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{
                      marginLeft: width * 0.02,
                      color: colors.gray,
                      fontSize: width * 0.03,
                      marginBottom: width * 0.01,
                    }}>
                    Total Persons:
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{
                      marginLeft: width * 0.02,
                      color: colors.primary,
                      fontSize: width * 0.038,
                    }}>
                    {totalPersons}
                  </CustomText>
                </View> */}

                {/* <View style={{ marginVertical: width * 0.02 }}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{
                      marginLeft: width * 0.02,
                      color: colors.gray,
                      fontSize: width * 0.03,
                      marginBottom: width * 0.01,
                    }}>
                    Request For
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{
                      marginLeft: width * 0.02,
                      color: colors.primary,
                      fontSize: width * 0.038,
                    }}>
                    {request}
                  </CustomText>
                </View> */}

                {/* <TextInput
                  style={{
                    textAlignVertical: 'top',
                    borderWidth: 1,
                    borderColor: remarksError ? 'red' : colors.gray, // Apply red border if there's an error
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    color: colors.black,
                    marginBottom: width * 0.04,
                    height: 40
                  }}
                  placeholder={'Enter Remarks'}
                  placeholderTextColor={colors.gray}
                  multiline
                  numberOfLines={3}
                  maxLength={100}
                  onChangeText={e => {
                    setRemarks(e);
                    setRemarksError(''); // Clear the error message
                  }}
                />

                {remarksError && (
                  <CustomText
                    style={{
                      color: 'red',
                      fontSize: width * 0.035,
                      marginLeft: width * 0.02,
                    }}>
                    {remarksError}
                  </CustomText>
                )} */}
              </View>

              {facilityPermission[0]?.canEdit && !approved && !rejected && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingBottom: width * 0.2,
                    marginTop: 40
                  }}>
                  <RoundButton text={'Approve'} onPress={() => setApproveModal(true)} color={colors.success} />
                  <RoundButton text={'Reject'} onPress={() => rejectBookingStatus()} color={colors.danger} />
                  {/* <SecondaryButton
                    loader={rejectLoader}
                    buttonColor={colors.lightRed}
                    customStyle={{
                      width: width * 0.3,
                      paddingVertical: width * 0.02,
                    }}
                    textStyle={{ fontSize: width * 0.035 }}
                    title={'Reject'}
                    value={permission?.canEdit}
                    onPress={() => rejectBookingStatus()}
                  />
                  <SecondaryButton
                    loader={approvedLoader}
                    buttonColor={colors.success}
                    customStyle={{
                      width: width * 0.3,
                      paddingVertical: width * 0.02,
                    }}
                    textStyle={{ fontSize: width * 0.035 }}
                    title={'Approve'}
                    value={permission?.canEdit}
                    onPress={() => approvedBookingStatus()}
                  /> */}
                </View>
              )}
            </ScrollView>
          </ImageBackground>
        </View>
        <Modal animationType="slide" transparent={true} visible={approveModal}>
          <View style={{ flex: 1, backgroundColor: colors.grayShade, justifyContent: 'center', }}>
            <View style={{ backgroundColor: colors.white, elevation: 6, marginHorizontal: 20, padding: 10, paddingVertical: 18, borderRadius: 18 }}>
              <CustomText children={'Are you sure?'} fontWeight={fontsFamily.bold} style={{ textAlign: 'center', fontSize: 18, color: colors.black, marginTop: 18 }} />
              <TouchableOpacity onPress={() => setApproveModal(false)} style={{ position: 'absolute', top: 8, right: 8 }}>
                <Image source={Images.cancelFilled} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
              </TouchableOpacity>
              <CustomText children={'Lorem ipsum dolorem non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'} fontWeight={fontsFamily.medium}
                style={{ textAlign: 'center', fontSize: 12, color: colors.darkGray, paddingVertical: 10 }} />
              <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => approvedBookingStatus()} style={{ marginVertical: 14, backgroundColor: colors.primary, paddingHorizontal: 8, paddingVertical: 16, width: '90%', borderRadius: 12 }}>
                  {approvedLoader ?
                    <View><ActivityIndicator size={'small'} color={colors.white} /></View>
                    :
                    <CustomText children={'Confirm'} fontWeight={fontsFamily.medium} style={{ textAlign: 'center', fontSize: 18, color: colors.white }} />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => rejectBookingStatus()} style={{ marginVertical: 14, paddingHorizontal: 8, width: '90%', borderRadius: 12 }}>
                  {rejectLoader ?
                    <View><ActivityIndicator size={'small'} color={colors.primary} /></View>
                    :
                    <CustomText children={'Cancel'} fontWeight={fontsFamily.medium} style={{ textAlign: 'center', fontSize: 18, color: colors.black }} />}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </>
  );
};

export default FacilityBookingDetail;
