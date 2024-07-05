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
  Text

} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header'

import { colors } from '../../styles/colors';
import { Images } from '../../assets/Images';
import { fontsFamily } from '../../assets/Fonts';
import { text } from '../../res/strings';
import { styles } from './styles/styles'
import PrimaryButton from '../../components/Button/PrimaryButton'
import CommunityModal from '../../components/Modal/Community';
import ActionSheet from 'react-native-actions-sheet';
import CanlerderModal from '../../components/Modal/Calendar';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import DatePicker from 'react-native-date-picker';
import BookingSuccessful from '../FacilityBookingSuccessful';
import { apiCall } from '../../Services/apiCall';
import { getTimezoneOffset } from '../../utils/helperFunction';
import { useLocalTime } from '../../utils/LocalTime';
import { getFormattedTime } from '../../utils/helperFunction';
import { baseUrl } from '../../../axios'
import AlertModal from '../../components/Modal/AlertModal';

const { width, height } = Dimensions.get("window")


const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;


const CommunityHall = ({ navigation, route }) => {

  const { addBy, addOn, contactNo, deleteBy, deleteOn, details, endTime, minPersons, maxPersons, events, facilityBookings, id, isActive, isDelete, latitude, location, longitude, managerName, society, societyID, startTime, title, updateBy, updateOn } = route?.params?.data
  const [open, setOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [inputValue, setInputValue] = useState(minPersons);
  const actionSheetRef = useRef(null)
  const actionSheetTimeRef = useRef(null)
  const actionSheetTimeRef1 = useRef(null)
  const actionSheetTimeRef2 = useRef(null)
  const [selected, setSelected] = useState(new Date());
  const [time, setTime] = useState(startTime);
  console.log("🚀 ~ file: index.js:59 ~ CommunityHall ~ time:", time)
  const [time1, setTime1] = useState(endTime);
  console.log("🚀 ~ file: index.js:61 ~ CommunityHall ~ time1:", time1)
  const [isVisible, setIsVisible] = useState(true);
  const [isVisible1, setIsVisible1] = useState(true);
  const [alertType, setAlertType] = useState('s');
  const [errorModalText, setErrorModalText] = useState('')
  const [errorModal, setErrorModal] = useState(false)

  const goBack = () => {
    navigation.goBack()
  }

  const backgroundImage = route?.params?.data.image

  // console.log(baseUrl + backgroundImage)

  const handlePost = async () => {
    setLoader(true)
    try {
      console.log('call api')
      let obj = {
        amenityID: id,
        eventDate: selected,
        eventStartTime: newTime,
        eventEndTime: newTimeE,
        eventDescription: '',
        totalPersons: inputValue
      }
      console.log('>>>>>>>>>>>>>>>>>>>>', obj)
      let { message } = await apiCall.addBooking(obj)
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        navigation.navigate('events');
      }, 3000);
    } catch (error) {
      alert(error)

    } finally {
      setLoader(false)
    }
    // let result=apiCall.addBooking
  }


  const handleIncrement = () => {
    const newValue = parseInt(inputValue) + 1;
    if (newValue <= maxPersons) {
      setInputValue(newValue.toString());
    }
  };

  const handleDecrement = () => {
    const newValue = parseInt(inputValue) - 1;
    if (newValue >= minPersons && newValue >= 0) {
      setInputValue(newValue.toString());
    }
  };


  const currentDate = new Date();


  const originalTime = time; // The original time
  const originalDate = new Date(originalTime);
  originalDate.setHours(originalDate.getHours() + 5); // Add 5 hours to the original time

  const newTime = originalDate.toISOString(); // Convert the updated date back to ISO 8601 format

  console.log(newTime); // The new time with 5 hours added


  const originalTimeE = time1; // The original time
  const originalDateE = new Date(originalTimeE);
  originalDateE.setHours(originalDateE.getHours() + 5); // Add 5 hours to the original time

  const newTimeE = originalDateE.toISOString(); // Convert the updated date back to ISO 8601 format

  console.log(newTimeE); // The new time with 5 hours added





  // const dateStrStart = startTime;
  // const localTimeStart = useLocalTime(dateStrStart);

  // const dateStrEnd = endTime;
  // const localTimeEnd = useLocalTime(dateStrEnd);


  // const newTime = moment(time).add(5, 'hours');

  // const toggleVisibility = () => {

  //   setTimeout(() => {
  //     setIsVisible(!isVisible);
  //   }, 1000);
  // };


  // const toggleVisibility1 = () => {

  //   setTimeout(() => {
  //     setIsVisible1(!isVisible1);
  //   }, 1000);
  // };


  // console.log(getFormattedTime(localTimeEnd), moment(time1))
  // useEffect(() => {
  //   setTime(useLocalTime(startTime))
  //   setTime1(useLocalTime(endTime))
  // }, [startTime, endTime])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }} >

        <View style={{ flex: 0.5 }}>

          <ImageBackground
            source={{ uri: baseUrl + backgroundImage }}
            resizeMode="cover"
            style={{
              width: width,
              height: width * 0.82,
              paddingVertical: width * 0.09,
              paddingHorizontal: 8
            }}>

            <Header
              onBack={goBack}
              title={title}
              showRightBtn={true}
              textStyle={{ color: colors.white }}
              iconStyle={{ tintColor: colors.white }}
            />
          </ImageBackground>
        </View>

        <View style={styles.viewcard}>

          <CustomText
            fontWeight={fontsFamily.bold}
            style={{ color: colors.primary, fontSize: width * 0.045, marginVertical: width * 0.06 }}>
            {title}
          </CustomText>


          <View style={styles.viewall}>

            <View style={styles.viewnumber}>
              <View style={styles.imgBG_Color}>
                <Image source={Images.userphone} resizeMode="contain"
                  style={{ width: width * 0.033, height: width * 0.033, margin: 8 }} />
              </View>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.number}>
                {contactNo}
              </CustomText>
            </View>

            <View style={styles.viewnumber}>
              <View style={styles.imgBG_Color}>
                <Image source={Images.location} resizeMode="contain" style={{ width: width * 0.033, height: width * 0.033, margin: 8 }} />
              </View>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.address}>
                {location}
              </CustomText>
            </View>

            <View style={styles.viewnumber}>
              <View style={styles.imgBG_Color}>
                <Image source={Images.time3x} resizeMode="contain" style={{ width: width * 0.033, height: width * 0.033, margin: 8 }} />
              </View>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.time}>
                {getFormattedTime(startTime)} to {getFormattedTime(endTime)}
              </CustomText>
            </View>

            <View style={styles.viewnumber}>
              <View style={styles.imgBG_Color}>
                <Image source={Images.meetingroom} resizeMode="contain"
                  style={{ width: width * 0.033, height: width * 0.033, margin: 8 }} />
              </View>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.number}>
                {minPersons} to {maxPersons}
              </CustomText>
            </View>
          </View>

          <ScrollView style={{ flexGrow: 0.7, marginVertical: width * 0.04 }} showsVerticalScrollIndicator={false}>

            <CustomText
              fontWeight={fontsFamily.semiBold}
            // style={styles.viewdetail}
            >
              {details}
            </CustomText>
          </ScrollView>

          <CommunityModal
            modalVisible={open}
            closeModal={() => setOpen(false)}
          />

          <View style={{}}>
            <PrimaryButton customStyle={{ padding: width * 0.030 }}
              title={text.booknow}
              onPress={() => actionSheetRef.current.show()} />
          </View>

          <ActionSheet
            defaultOverlayOpacity={0.9}
            ref={actionSheetRef}
            containerStyle={{
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
              padding: 6,
              // height: 300,
              width: '100%'
            }}
            indicatorStyle={{
              width: 0,

            }}
            gestureEnabled={true}>
            <View style={{}}>

              <View style={{}}>
                <View style={{ paddingHorizontal: width * 0.08 }}>
                  <View style={styles.viewall}>

                    {/* <CanlerderModal
                      modalVisible={open}
                      closeModal={() => setOpen(false)}

                    /> */}
                    <CustomText
                      fontWeight={fontsFamily.bold}
                      style={{ color: colors.primary, fontSize: width * 0.045, paddingVertical: width * 0.03 }}>
                      Book a community hall?
                    </CustomText>
                  </View>

                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{ color: colors.black, fontSize: width * 0.034, paddingVertical: width * 0.04 }}>
                    When do you want to book this place?
                  </CustomText>

                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={() => {
                    actionSheetTimeRef.current.show()
                  }}>
                    <CustomText
                      fontWeight={fontsFamily.bold}
                      style={{ color: colors.black, fontSize: width * 0.037 }}>
                      Reservation
                    </CustomText>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <CustomText
                        fontWeight={fontsFamily.medium}
                        style={styles.number}>
                        {/* 26 Feb 2023 */}
                        {moment(selected).format('DD MMM YYYY')}
                      </CustomText>
                      <Image source={Images.ionicarrowforward} resizeMode="contain" style={{ width: width * 0.022, marginLeft: 15 }} />
                    </View>
                  </TouchableOpacity>

                  <View style={{ backgroundColor: colors.gray, marginVertical: 8 }} />

                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={() => actionSheetTimeRef1.current.show()}>
                    <CustomText
                      fontWeight={fontsFamily.bold}
                      style={{ color: colors.black, fontSize: width * 0.038 }}>
                      Starting Time
                    </CustomText>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <CustomText
                        fontWeight={fontsFamily.medium}
                        style={{ color: colors.darkGray }}>

                        <Text>{moment(time).format('hh:mm A')}</Text>
                      </CustomText>


                      <Image source={Images.ionicarrowforward} resizeMode="contain" style={{ width: width * 0.022, marginLeft: 15 }} />
                    </View>
                  </TouchableOpacity>


                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={() => actionSheetTimeRef2.current.show()}>
                    <CustomText
                      fontWeight={fontsFamily.bold}
                      style={{ color: colors.black, fontSize: width * 0.038 }}>
                      Ending Time
                    </CustomText>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <CustomText
                        fontWeight={fontsFamily.medium}
                        style={{ color: colors.darkGray }}>

                        <Text>{moment(time1).format('hh:mm A')}</Text>
                      </CustomText>
                      <Image source={Images.ionicarrowforward} resizeMode="contain" style={{ width: width * 0.022, marginLeft: 15 }} />
                    </View>
                  </TouchableOpacity>

                  <AlertModal
                    visible={errorModal}
                    close={setErrorModal}
                    text={errorModalText}
                    type={alertType}

                  />
                  <View style={{ height: 1, backgroundColor: colors.gray, marginVertical: 8 }} />

                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{ color: colors.black, fontSize: width * 0.035, marginVertical: width * 0.02 }}>
                    How many people?
                  </CustomText>

                  <View style={{ flexDirection: 'row', }}>

                    {/* <CustomText
                      fontWeight={fontsFamily.bold}
                      style={{ color: colors.black, fontSize: width * 0.04, marginTop: 12, marginHorizontal: 12 }}>
                      22
                    </CustomText> */}

                    <TouchableOpacity onPress={handleDecrement} style={{ alignItems: 'center', justifyContent: 'center', width: width * 0.07, backgroundColor: colors.primary, height: width * 0.07, borderRadius: 10, marginRight: 5, alignSelf: 'center', marginTop: width * 0.02 }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.white, marginTop: width * -0.01 }}>{'-'}</Text>
                    </TouchableOpacity>
                    <TextInput

                      style={{
                        borderWidth: 2,
                        borderColor: colors.primary,
                        padding: 5,
                        marginTop: 8,
                        marginHorizontal: 10,
                        fontSize: width * 0.04,
                        textAlign: 'center',
                        color: colors.black,
                        borderRadius: 50,
                        width: width * 0.15,
                        height: width * 0.15,
                      }}

                      keyboardType="numeric"
                      value={inputValue.toString()}
                      onChangeText={(text) => setInputValue(text)}
                    />
                    <TouchableOpacity onPress={handleIncrement} style={{ alignItems: 'center', justifyContent: 'center', width: width * 0.07, backgroundColor: colors.primary, height: width * 0.07, borderRadius: 10, marginLeft: 5, alignSelf: 'center', marginTop: width * 0.02 }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.white, }}>{'+'}</Text>
                    </TouchableOpacity>




                  </View>

                  <View style={{ marginVertical: width * 0.05 }}>
                    <PrimaryButton loader={loader} customStyle={{ padding: width * 0.035 }}
                      title={text.booknow}
                      onPress={() => handlePost()} />
                  </View>

                </View>
              </View>
              {/* SHEET 1  */}
              <ActionSheet
                defaultOverlayOpacity={0.9}
                ref={actionSheetTimeRef}
                containerStyle={{
                  borderTopLeftRadius: 35,
                  borderTopRightRadius: 35,
                  padding: 6,
                  width: '100%'
                }}
                indicatorStyle={{
                  width: 0,

                }}
                gestureEnabled={true}>
                <View style={{}}>

                  <View style={{ paddingHorizontal: width * 0.08 }}>

                    <CustomText
                      fontWeight={fontsFamily.bold}
                      style={{ color: colors.black, fontSize: width * 0.045, paddingVertical: width * 0.03 }}>
                      When do you want to book this place?
                    </CustomText>


                    <View style={{ marginVertical: width * 0.03 }}>
                      <Calendar
                        minDate={currentDate}
                        onDayPress={day => {
                          setSelected(day.dateString);
                          actionSheetTimeRef.current.hide()

                        }}
                        markedDates={{
                          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                        }}
                      />
                    </View>
                  </View>
                </View>
              </ActionSheet>

              {/* SHEET 2 */}
              <ActionSheet
                defaultOverlayOpacity={0.9}
                ref={actionSheetTimeRef1}
                containerStyle={{
                  borderTopLeftRadius: 35,
                  borderTopRightRadius: 35,
                  padding: 6,
                  width: '100%'
                }}
                indicatorStyle={{
                  width: 0,

                }}
                gestureEnabled={true}>
                <View style={{}}>

                  <View style={{ paddingHorizontal: width * 0.08 }}>

                    <CustomText
                      fontWeight={fontsFamily.bold}
                      style={{ color: colors.black, fontSize: width * 0.045, paddingVertical: width * 0.03 }}>
                      When do you want to book this place?
                    </CustomText>


                    <View style={{ marginVertical: width * 0.03 }}>
                      <DatePicker
                        onDateChange={(e) => {
                          // console.log(e)
                          setTime(e)
                          // actionSheetTimeRef1.current.hide()
                        }}
                        textColor="black"
                        title={"Set Time"}
                        mode={'time'}
                        // open={modalVisible}
                        date={new Date(time)}
                        dividerHeight={0}
                        style={{ alignSelf: 'center' }}
                      />
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          actionSheetTimeRef1.current.hide()
                        }}
                        style={{
                          width: '100%',
                          paddingVertical: 10,
                          backgroundColor: colors.primary,
                          borderRadius: width * 0.02,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginVertical: width * 0.02
                        }}>
                        <CustomText fontWeight={fontsFamily.medium} style={{ fontSize: width * 0.04, color: colors.white }}>Done</CustomText>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ActionSheet>

              {/* SHEET 3 */}
              <ActionSheet
                defaultOverlayOpacity={0.9}
                ref={actionSheetTimeRef2}
                containerStyle={{
                  borderTopLeftRadius: 35,
                  borderTopRightRadius: 35,
                  padding: 6,
                  width: '100%'
                }}
                indicatorStyle={{
                  width: 0,

                }}
                gestureEnabled={true}>
                <View style={{}}>

                  <View style={{ paddingHorizontal: width * 0.08 }}>

                    <CustomText
                      fontWeight={fontsFamily.bold}
                      style={{ color: colors.black, fontSize: width * 0.045, paddingVertical: width * 0.03 }}>
                      When do you want to book this place?
                    </CustomText>


                    <View style={{ marginVertical: width * 0.03 }}>
                      <DatePicker
                        onDateChange={(e) => {
                          // console.log()
                          setTime1(e)
                          // actionSheetTimeRef2.current.hide()
                        }}
                        textColor="black"
                        title={"Set Time"}
                        mode={'time'}
                        // open={modalVisible}
                        date={new Date(time1)}
                        dividerHeight={0}
                        style={{ alignSelf: 'center' }}
                      />
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          actionSheetTimeRef2.current.hide()
                        }}
                        style={{
                          width: '100%',
                          paddingVertical: 10,
                          backgroundColor: colors.primary,
                          borderRadius: width * 0.02,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginVertical: width * 0.02
                        }}>
                        <CustomText fontWeight={fontsFamily.medium} style={{ fontSize: width * 0.04, color: colors.white }}>Done</CustomText>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ActionSheet>
            </View>
          </ActionSheet>
          <BookingSuccessful
            visible={showSuccess}
            handleClose={() => {
              setShowSuccess(false)
              navigation.goBack()
            }}
          />


        </View>

      </View>
    </>
  )
};

export default CommunityHall;












