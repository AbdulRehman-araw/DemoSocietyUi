import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  BackHandler,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import {styles} from './styles/styles';
import Header from '../../components/Header/Header';
import FilledTextField from '../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {getFormattedDate, getFormattedTime} from '../../utils/helperFunction';
import {apiCall} from '../../Services/apiCall';
import {useSelector} from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import {useIsFocused} from '@react-navigation/native';
import {Images} from '../../assets/Images';
import ImageCropPicker from 'react-native-image-crop-picker';
import {baseUrl} from '../../../axios';
import {useLocalTime} from '../../utils/LocalTime';
import moment from 'moment';

const {width} = Dimensions.get('window');

const UpdateAmenity = ({navigation, route}) => {
  const updateData = route?.params?.data;
  const isFocused = useIsFocused();
  const {control, handleSubmit, setValue} = useForm();
  const Details = useSelector(
    state => state.userDataReducer.userAccountDetails,
  );

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('startTime');
  const [startTime, setStartTime] = useState(startTime);
  const [endTime, setEndTime] = useState(new Date());

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [update, setUpdate] = useState(true);
  const [update1, setUpdate1] = useState(true);

  const [image, setImage] = useState();

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

  const updateAmenity = async formData => {
    if (!image) {
      setAlertType('e');
      setErrorModalText('Please upload an image.');
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
      return;
    }

    setLoading(true);
    try {
      let obj = {
        amenityID: updateData?.id,
        societyID: Details?.societyID,
        title: formData?.title,
        details: formData?.description,
        location: formData?.location,
        longitude: 67.07294253549411,
        latitude: 24.931026196045025,
        managerName: formData?.managerName,
        contactNo: formData?.contactNo,
        startTime: addedTimeStart,
        endTime: addedTimeEnd,
        image: image,
        minPersons: formData.minPersons,
        maxPersons: formData.maxPersons,
      };

      const {message} = await apiCall.updateAmenity(obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        navigation.navigate('amenities');
      }, 3000);
    } catch (error) {
      console.log(
        '🚀 ~ file: UpdateAmenity.js:114 ~ updateAmenity ~ error:',
        error,
      );
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

  const setDefaultData = () => {
    try {
      setValue('title', updateData?.title);
      setValue('description', updateData?.details);
      setValue('location', updateData?.location);
      setValue('managerName', updateData?.managerName);
      setValue('contactNo', updateData?.contactNo);
      setValue('minPersons', updateData?.minPersons.toString());
      setValue('maxPersons', updateData?.maxPersons.toString());
      setStartTime(new Date(updateData.startTime));
      setEndTime(new Date(updateData.endTime));
    } catch (error) {
      console.log('file: index.js:148 => setDefaultData => error:', error);
    }
  };

  useEffect(() => {
    setDefaultData();
  }, [isFocused]);

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
        const {data} = await apiCall.uploadAmenityImage(formData);
        setImage(data);
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const dateStrStart = startTime;
  const localTimeStart = useLocalTime(dateStrStart);

  const dateStrEnd = endTime;
  const localTimeEnd = useLocalTime(dateStrEnd);

  // const aaa = updateData?.startTime;
  // const bbb = updateData?.endTime;

  const addedTimeStart = moment(localTimeStart)
    .add(7, 'hours')
    .format('YYYY-MM-DDTHH:mm:ss');
  const addedTimeEnd = moment(localTimeEnd)
    .add(7, 'hours')
    .format('YYYY-MM-DDTHH:mm:ss');

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
        <Header onBack={goBack} title={'Update Amenity'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={{paddingHorizontal: width * 0.02}}>
            <FilledTextField
              name={'title'}
              variant={'outlined'}
              placeholder="Title"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter title.',
              }}
              onSubmitEditing={handleSubmit(updateAmenity)}
            />
            <FilledTextField
              name={'description'}
              variant={'outlined'}
              placeholder="Description"
              type={'default'}
              multiline={true}
              numberOfLines={4}
              customInputStyle={{height: width * 0.3}}
              control={control}
              rules={{
                required: 'Please enter description.',
              }}
              onSubmitEditing={handleSubmit(updateAmenity)}
            />
            <FilledTextField
              name={'location'}
              variant={'outlined'}
              placeholder="Location"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter location.',
              }}
              onSubmitEditing={handleSubmit(updateAmenity)}
            />
            <FilledTextField
              name={'managerName'}
              variant={'outlined'}
              placeholder="Manager Name"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter manager name.',
              }}
              onSubmitEditing={handleSubmit(updateAmenity)}
            />
            <FilledTextField
              name={'contactNo'}
              variant={'outlined'}
              placeholder="Contact No."
              type={'number-pad'}
              maxLength={11}
              control={control}
              rules={{
                required: 'Please enter contact no.',
              }}
              onSubmitEditing={handleSubmit(updateAmenity)}
            />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: width * 0.43}}>
                <FilledTextField
                  name={'minPersons'}
                  variant={'outlined'}
                  placeholder="Min no of people"
                  type={'number-pad'}
                  maxLength={5}
                  control={control}
                  rules={{
                    required: 'Please enter minimum no of people',
                  }}
                  onSubmitEditing={handleSubmit(updateAmenity)}
                />
              </View>

              <View style={{width: width * 0.43}}>
                <FilledTextField
                  name={'maxPersons'}
                  variant={'outlined'}
                  placeholder="Max no of people"
                  type={'number-pad'}
                  maxLength={11}
                  control={control}
                  rules={{
                    required: 'Please enter maximum number of people',
                  }}
                  onSubmitEditing={handleSubmit(updateAmenity)}
                />
              </View>
            </View>

            <TimeDateBtn
              variant={'primary'}
              title={'Upload Image'}
              prefixIcon={true}
              showRightIcon={true}
              rightIconImg={Images.camera}
              setOpen={() => uploadImage()}
            />
            {image && (
              <View>
                <Image
                  source={{uri: baseUrl + image}}
                  resizeMode="contain"
                  style={{width: 'auto', height: width * 0.6}}
                />
              </View>
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <View style={{width: '47%'}}>
                <Text style={{color: colors.black, marginLeft: width * 0.02}}>
                  Start Time
                </Text>
                <TimeDateBtn
                  variant={'light'}
                  icon={Images.time3x}
                  title={
                    update === true
                      ? getFormattedTime(startTime)
                      : getFormattedTime(startTime)
                  }
                  prefixIcon={true}
                  setOpen={() => [
                    setOpen(true),
                    setMode('startTime'),
                    setUpdate(false),
                  ]}
                />
              </View>
              <View style={{width: '47%'}}>
                <Text style={{color: colors.black, marginLeft: width * 0.02}}>
                  End Time
                </Text>

                <TimeDateBtn
                  variant={'light'}
                  icon={Images.time3x}
                  title={
                    update1 === true
                      ? getFormattedTime(endTime)
                      : getFormattedTime(endTime)
                  }
                  prefixIcon={true}
                  setOpen={() => [
                    setOpen(true),
                    setMode('endTime'),
                    setUpdate1(false),
                  ]}
                />
              </View>
            </View>

            <View style={{marginVertical: width * 0.07}}>
              <PrimaryButton
                customStyle={{padding: width * 0.032}}
                title={'Submit'}
                loader={loading}
                onPress={handleSubmit(updateAmenity)}
              />
            </View>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UpdateAmenity;
