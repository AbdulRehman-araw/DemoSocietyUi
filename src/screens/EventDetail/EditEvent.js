import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import Header from '../../components/Header/Header';
import {Images} from '../../assets/Images';
import {Platform} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/apiCall';
import {fontsFamily} from '../../assets/Fonts';
import DropDown from '../../components/TextField/DropDown';
import {useForm} from 'react-hook-form';
import CustomModal from '../../components/Modal/CustomModal';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import {getFormattedDate, getFormattedTime} from '../../utils/helperFunction';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import PrimaryButton from '../../components/Button/PrimaryButton';
import CustomText from '../../components/CustomText';
import CustomSearchModal from '../../components/Modal/CustomSearchModal';
import PostDatesPicker from '../../components/Modal/PostDatesPicker';
import AlertModal from '../../components/Modal/AlertModal';
import moment from 'moment';

const {width, height} = Dimensions.get('screen');

const EditEvent = ({navigation, route}) => {
  const {control, handleSubmit, setValue, clearErrors, resetField} = useForm();
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [getID, setGetID] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const [mode, setMode] = useState('date');
  const [mode1, setMode1] = useState('date');

  const [loader, setLoader] = useState(false);
  const [alertType, setAlertType] = useState('s');
  const [errorModalText, setErrorModalText] = useState('');
  const [errorModal, setErrorModal] = useState(false);

  const [update, setUpdate] = useState(true);
  const [update1, setUpdate1] = useState(true);
  const [amenities, setAmenities] = useState([]);

  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const data = route?.params?.data;

  const minPersons = data?.totalPersons;

  const [inputValue, setInputValue] = useState(minPersons?.toString());
  console.log(
    '🚀 ~ file: EditEvent.js:71 ~ EditEvent ~ inputValue:',
    inputValue,
  );

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

  useEffect(() => {
    getAmenities();
  }, [isFocused]);

  const handleIncrement = () => {
    const newValue = parseInt(inputValue) + 1;
    // if (newValue <= result?.maxPersons) {
    setInputValue(newValue.toString());
    // }
  };

  const handleDecrement = () => {
    const newValue = parseInt(inputValue) - 1;
    console.log(
      '🚀 ~ file: EditEvent.js:102 ~ handleDecrement ~ newValue:',
      newValue,
    );
    // if (newValue >= result?.minPersons && newValue >= 0) {
    setInputValue(newValue.toString());
    // }
  };

  const handleEditBooking = async () => {
    setLoader(true);
    try {
      let obj = {
        bookingID: data.bookingID,
        amenityID: data.venueID,
        eventDate: startDate,
        eventStartTime: addedTimeStart,
        eventEndTime: addedTimeEnd,
        eventDescription: data.venueName,
        totalPersons: inputValue,
      };

      console.log(obj);

      let {message} = await apiCall.EditBooking(obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
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
      setLoader(false);
    }
    // let result=apiCall.addBooking
  };

  const getAmenities = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getAmenities(13);
      setAmenities(data);
    } catch (error) {
      console.log('file: index.js:54 => getAmenities => error:', error);
    } finally {
      setLoader(false);
    }
  };

  //   console.log('?????????',amenities);

  function getMinAndMaxPersonsById(arr, id) {
    const foundItem = arr?.find(item => item?.id === id);

    if (foundItem) {
      return {
        minPersons: foundItem?.minPersons,
        maxPersons: foundItem?.maxPersons,
      };
    }

    return null; // Return null if no data is found for the given id
  }

  const result = getMinAndMaxPersonsById(amenities, data.venueID);

  if (result) {
    console.log(`minPersons: ${result?.minPersons}`);
    console.log(`maxPersons: ${result?.maxPersons}`);
  } else {
    console.log('Object not found for the given id.');
  }

  const addedTimeStart = moment(startTime)
    .add(0, 'hours')
    .format('YYYY-MM-DDTHH:mm:ss');
  const addedTimeEnd = moment(endTime)
    .add(0, 'hours')
    .format('YYYY-MM-DDTHH:mm:ss');

  console.log(addedTimeEnd, addedTimeStart);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Edit Event'} />
        <View
          style={{
            paddingHorizontal: width * 0.01,
            flex: 1,
            marginTop: 10,
            paddingBottom: height * 0.1,
          }}>
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{
              color: colors.black,
              fontSize: width * 0.034,
              paddingVertical: width * 0.04,
            }}>
            When do you want to book this place?
          </CustomText>

          <View style={{width: '100%', height: width * 0.2}}>
            <TimeDateBtn
              variant={'light'}
              icon={Images.calendar}
              title={
                startDate == new Date()
                  ? 'start Date'
                  : getFormattedDate(startDate)
              }
              prefixIcon={true}
              setOpen={() => [setOpen1(true), setMode1('startDate')]}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <View style={{width: '47%', height: width * 0.2}}>
              <CustomText style={{paddingLeft: 5}}>Start Time</CustomText>
              <TimeDateBtn
                variant={'light'}
                icon={Images.time3x}
                title={
                  update === true
                    ? getFormattedTime(startTime)
                    : getFormattedTime(startTime)
                }
                prefixIcon={true}
                setOpen={() => [setOpen(true), setMode('startTime')]}
              />
            </View>
            <View style={{width: '47%'}}>
              <CustomText style={{paddingLeft: 5}}>End Time</CustomText>
              <TimeDateBtn
                variant={'light'}
                icon={Images.time3x}
                title={
                  endTime == new Date() ? 'End Time' : getFormattedTime(endTime)
                }
                prefixIcon={true}
                setOpen={() => [setOpen(true), setMode('endTime')]}
              />
            </View>
          </View>

          <CustomText
            fontWeight={fontsFamily.bold}
            style={{
              color: colors.black,
              fontSize: width * 0.035,
              marginVertical: width * 0.02,
            }}>
            How many people?
          </CustomText>

          <View style={{flexDirection: 'row'}}>
            {/* 
                        <TouchableOpacity onPress={handleDecrement}>
                            <Image source={Images.minusarrow} resizeMode="contain" style={{ width: width * 0.07 }} />
                        </TouchableOpacity>
                      
                        <TextInput

                            style={{
                                borderWidth: 1,
                                borderColor: colors.gray,
                                padding: 5,
                                marginTop: 8,
                                marginHorizontal: 10,
                                fontSize: width * 0.04,
                                textAlign: 'center',
                                color: colors.black,
                                borderRadius: 10,
                                width: width * 0.15,
                                height: width * 0.08
                            }}

                            keyboardType="numeric"
                            value={inputValue}
                            onChangeText={(text) => setInputValue(text)}
                        />
                        <TouchableOpacity onPress={handleIncrement}>
                            <Image source={Images.plusarrow} resizeMode="contain" style={{ width: width * 0.07 }} />
                        </TouchableOpacity> */}

            <TouchableOpacity
              onPress={handleDecrement}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: width * 0.07,
                backgroundColor: colors.primary,
                height: width * 0.07,
                borderRadius: 10,
                marginRight: 5,
                alignSelf: 'center',
                marginTop: width * 0.02,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.white,
                  marginTop: width * -0.01,
                }}>
                {'-'}
              </Text>
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
              value={inputValue} // Bind value to inputValue
              onChangeText={text => setInputValue(text)} // Update inputValue when the text changes
            />

            <TouchableOpacity
              onPress={handleIncrement}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: width * 0.07,
                backgroundColor: colors.primary,
                height: width * 0.07,
                borderRadius: 10,
                marginLeft: 5,
                alignSelf: 'center',
                marginTop: width * 0.02,
              }}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: colors.white}}>
                {'+'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginVertical: width * 0.07}}>
            <PrimaryButton
              customStyle={{padding: width * 0.032}}
              title={'Update booking'}
              onPress={() => handleEditBooking()}
            />
          </View>

          <DateTimePicker
            setDate={
              mode == 'startTime'
                ? e => {
                    setStartTime(e);
                  }
                : e => {
                    setEndTime(e);
                  }
            }
            closeModal={() => setOpen(false)}
            date={mode == 'startTime' ? startTime : endTime}
            modalVisible={open}
            mode={'time'}
          />

          <PostDatesPicker
            setDate={e => {
              setStartDate(e);
            }}
            closeModal={() => setOpen1(false)}
            date={startDate}
            modalVisible={open1}
            mode={'date'}
          />

          <AlertModal
            visible={errorModal}
            close={setErrorModal}
            text={errorModalText}
            type={alertType}
          />

          {/* <FlatList
              data={resultArray}
              renderItem={({ item }) => <ListCard data={item} />}
              keyExtractor={item => item.id}
            /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditEvent;
