import {
  TouchableOpacity,
  Image,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import {styles} from './styles/styles';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import SlideButton from '../../components/Button/SlideButton';
import {text} from '../../res/strings';
import {Images} from '../../assets/Images';
import {fontsFamily} from '../../assets/Fonts';
import ListCon from './ListCon';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/apiCall';
import {ActivityIndicator} from 'react-native';
import FilledTextField from '../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import {useIsFocused} from '@react-navigation/native';
import DropDown from '../../components/TextField/DropDown';
import CustomModal from '../../components/Modal/CustomModal';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import {getFormattedDate, getFormattedTime} from '../../utils/helperFunction';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import PrimaryButton from '../../components/Button/PrimaryButton';
import ImageCropPicker from 'react-native-image-crop-picker';
import {baseUrl} from '../../../axios';
import moment from 'moment';
import AlertModal from '../../components/Modal/AlertModal';

const {width} = Dimensions.get('window');

const EditEventAdmin = ({navigation}) => {
  const foucsed = useIsFocused();
  const {control, handleSubmit, setValue, clearErrors} = useForm();

  const [loader, setLoader] = useState(false);
  const [venue, setVenue] = useState([]);
  const [image, setImage] = useState();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

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

  const uploadImage = async () => {
    try {
      ImageCropPicker.openPicker({
        compressImageQuality: 0.7,
        cropping: true,
      }).then(async file => {
        let filePath = file.path.split('/');
        const formData = new FormData();
        formData.append('file', {
          uri: file.path,
          type: file.mime,
          name: filePath[filePath.length - 1],
        });
        const {data} = await apiCall.uploadEventImage(formData);
        setImage(data);
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const getVenue = async () => {
    try {
      const {data} = await apiCall.getVenue();
      setVenue(data);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  console.log(venue);

  const createEvent = async formData => {
    setLoader(true);
    try {
      if (image) {
        const venueId = venue.find(e => e.title === formData.venue)?.venueID;
        let obj = {
          venueID: venueId,
          eventType: formData.eventType,
          eventName: formData.eventName,
          image: image,
          eventDate: moment(date).format('YYYY-MM-DDTHH:mm'),
          eventTime: moment(time).format('YYYY-MM-DDTHH:mm'),
          eventDescription: formData.eventDescription,
        };
        const {message} = await apiCall.createEvent(obj);
        setAlertType('s');
        setErrorModalText(message);
        setErrorModal(true);
        setTimeout(() => {
          setErrorModal(false);
          goBack();
        }, 3000);
      } else {
        setAlertType('e');
        setErrorModalText('Please upload image.');
        setErrorModal(true);
        setTimeout(() => {
          setErrorModal(false);
        }, 3000);
      }
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
  };

  useEffect(() => {
    getVenue();
  }, [foucsed]);

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

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Create Event'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={{paddingHorizontal: width * 0.038}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.uploadCircle}
              onPress={() => uploadImage()}>
              <Image
                source={image ? {uri: image} : Images.camera}
                resizeMode="contain"
                style={{width: width * 0.12, height: width * 0.12}}
              />
            </TouchableOpacity>

            <FilledTextField
              name={'eventName'}
              placeholder="Event Name"
              type={'default'}
              maxLength={25}
              control={control}
              rules={{
                required: 'Please enter event name.',
              }}
              onSubmitEditing={handleSubmit(createEvent)}
            />
            <FilledTextField
              name={'eventDescription'}
              placeholder="Description"
              type={'default'}
              multiline={true}
              numberOfLines={4}
              customInputStyle={{height: width * 0.3}}
              control={control}
              rules={{
                required: 'Please enter description.',
              }}
              onSubmitEditing={handleSubmit(createEvent)}
            />
            <FilledTextField
              name={'eventType'}
              placeholder="Event Type"
              type={'default'}
              maxLength={25}
              control={control}
              rules={{
                required: 'Please enter event type.',
              }}
              onSubmitEditing={handleSubmit(createEvent)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <View style={{width: '47%'}}>
                <TimeDateBtn
                  variant={'primary'}
                  title={date == new Date() ? 'Date' : getFormattedDate(date)}
                  prefixIcon={true}
                  setOpen={() => [setOpen(true), setMode('date')]}
                />
              </View>
              <View style={{width: '47%'}}>
                <TimeDateBtn
                  variant={'primary'}
                  icon={Images.time3x}
                  title={time == new Date() ? 'Time' : getFormattedTime(time)}
                  prefixIcon={true}
                  setOpen={() => [setOpen(true), setMode('time')]}
                />
              </View>
            </View>
            <DropDown
              name={'venue'}
              title="Select Venue"
              type={'default'}
              control={control}
              rules={{
                required: 'Please select venue',
              }}
              img={false}
              onPress={() => {
                setShowModal(true);
              }}
            />

            <View
              style={{
                marginTop: width * 0.26,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <View style={{width: '47%'}}>
                <PrimaryButton
                  outlined
                  customStyle={{
                    padding: width * 0.032,
                    marginTop: 15,
                    borderColor: colors.primary,
                  }}
                  textStyle={{color: colors.primary}}
                  title={'Cancel'}
                  onPress={() => goBack()}
                />
              </View>

              <View style={{width: '47%'}}>
                <PrimaryButton
                  customStyle={{padding: width * 0.032}}
                  title={'Create'}
                  loader={loader}
                  onPress={handleSubmit(createEvent)}
                />
              </View>
            </View>
          </View>

          <CustomModal
            data={venue.length <= 0 ? [] : venue}
            modalVisible={showModal}
            closeModal={() => setShowModal(false)}
            getvalue={e => {
              setValue('venue', e);
              clearErrors('venue');
            }}
          />

          <DateTimePicker
            setDate={
              mode == 'date'
                ? e => {
                    setDate(e);
                  }
                : e => {
                    setTime(e);
                  }
            }
            closeModal={() => setOpen(false)}
            date={mode == 'date' ? date : time}
            modalVisible={open}
            mode={mode}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditEventAdmin;