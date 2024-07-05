import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  BackHandler,
  Image,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';
import { styles } from './styles/styles';
import Header from '../../components/Header/Header';
import FilledTextField from '../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { getFormattedDate, getFormattedTime } from '../../utils/helperFunction';
import { apiCall } from '../../Services/apiCall';
import { useSelector } from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import { Images } from '../../assets/Images';
import ImageCropPicker from 'react-native-image-crop-picker';
import { baseUrl } from '../../../axios';
import CustomText from '../../components/CustomText';
import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';
import LinearGradientPrimaryButton from '../../components/Button/LinearGradientPrimaryButton';
import WarningModal from '../../components/Modal/WarningModal';
import { fontsFamily } from '../../assets/Fonts';

const { width } = Dimensions.get('window');

const CreateAmenity = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const Details = useSelector(
    state => state.userDataReducer.userAccountDetails,
  );

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('startTime');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(true);
  const [errorModalText, setErrorModalText] = useState('');
  const [imageLoader, setImageLoader] = useState(false);

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

  const createAmenity = async formData => {
    setLoading(true);
    try {
      let obj = {
        societyID: Details?.societyID,
        title: formData?.title,
        details: formData?.description,
        location: formData?.location,
        longitude: 67.07294253549411,
        latitude: 24.931026196045025,
        managerName: formData?.managerName,
        contactNo: formData?.contactNo,
        startTime: newTime,
        endTime: newTimeE,
        image: image,
        minPersons: formData.minPersons,
        maxPersons: formData.maxPersons,
      };

      console.log(obj);

      const { message } = await apiCall.createAmenity(obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      setAlertType('e');
      setErrorModalText(error);
      setErrorModal(true);
      console.log(error);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const originalTime = startTime; // The original time
  const originalDate = new Date(originalTime);
  originalDate.setHours(originalDate.getHours() + 5); // Add 5 hours to the original time

  const newTime = originalDate.toISOString(); // Convert the updated date back to ISO 8601 format

  console.log(newTime); // The new time with 5 hours added

  const originalTimeE = endTime; // The original time
  const originalDateE = new Date(originalTimeE);
  originalDateE.setHours(originalDateE.getHours() + 5); // Add 5 hours to the original time

  const newTimeE = originalDateE.toISOString(); // Convert the updated date back to ISO 8601 format

  console.log(newTimeE); // The new time with 5 hours added

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
        const { data } = await apiCall.uploadAmenityImage(formData);
        setImage(data);
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const setImageLoading = () => {
    setTimeout(() => {
      setImageLoader(true);
    }, 1000);
  };

  const handlePicWithLoading = async () => {
    setImageLoading(true); // Start the loader

    try {
      // Call your image upload logic
      await uploadImage();

      // When the image is uploaded successfully:
      setImageLoading(false); // Stop the loader
    } catch (error) {
      console.log('🚀 ~ file: index.js:105 ~ handlePic ~ error:', error);
      setImageLoading(false); // Stop the loader on error
    }
  };

  const [approveModal, setApproveModal] = useState(false);
  const [approvedLoader, setApprovedLoader] = useState(false);
  const [rejectLoader, setRejectLoader] = useState(false);

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

      <ImageBackground style={styles.root}
        source={Images.darkBG}>
        <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
          <Header onBack={goBack} title={'Add Amenity'} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
            }}>
            <View style={{ paddingHorizontal: width * 0.02 }}>
              <FilledTextField
                name={'title'}
                variant={'outlined'}
                placeholder="Title"
                type={'default'}
                control={control}
                rules={{
                  required: 'Please enter title.',
                }}
                onSubmitEditing={handleSubmit(createAmenity)}
                img={Images.house_building_amenty}

              />
              <FilledTextField
                name={'description'}
                variant={'outlined'}
                placeholder="Description"
                type={'default'}
                multiline={true}
                numberOfLines={4}
                customInputStyle={{ height: width * 0.3 }}
                control={control}
                rules={{
                  required: 'Please enter description.',
                }}
                onSubmitEditing={handleSubmit(createAmenity)}
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
                onSubmitEditing={handleSubmit(createAmenity)}
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
                onSubmitEditing={handleSubmit(createAmenity)}
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
                onSubmitEditing={handleSubmit(createAmenity)}
              />

              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: width * 0.43 }}>
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
                    onSubmitEditing={handleSubmit(createAmenity)}
                  />
                </View>

                <View style={{ width: width * 0.43 }}>
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
                    onSubmitEditing={handleSubmit(createAmenity)}
                  />
                </View>
              </View>

              {/* <TimeDateBtn
              variant={'primary'}
              title={'Upload picture'}
              prefixIcon={true}
              showRightIcon={true}
              rightIconImg={Images.camera}
              setOpen={() => uploadImage()}
            />
            {image &&
              <View>
                <Image source={{ uri: baseUrl + image }} resizeMode="contain" style={{ width: 'auto', height: width * 0.6 }} />
              </View>
            } */}

              <TimeDateBtn
                variant={'primary'}
                title={'Upload image'}
                prefixIcon={true}
                showRightIcon={true}
                rightIconImg={Images.camera}
                setOpen={handlePicWithLoading}
              />

              {imageLoader && (
                <ActivityIndicator
                  size={'large'}
                  color={colors.primary}
                  style={{ marginTop: 20 }}
                />
              )}
              {image && (
                <View>
                  <Image
                    onLoad={() => setImageLoader(false)}
                    source={{ uri: baseUrl + image }}
                    resizeMode="contain"
                    style={{
                      width: 'auto',
                      height: width * 0.6,
                      marginBottom: width * 0.05,
                    }}
                  />
                </View>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                <View style={{ width: '47%' }}>
                  <CustomText
                    style={{ color: colors.black, marginLeft: width * 0.02 }}>
                    Start Time
                  </CustomText>
                  <TimeDateBtn
                    variant={'light'}
                    icon={Images.time3x}
                    title={
                      startTime == new Date()
                        ? 'Start Time'
                        : getFormattedTime(startTime)
                    }
                    prefixIcon={true}
                    setOpen={() => [setOpen(true), setMode('startTime')]}
                  />
                </View>
                <View style={{ width: '47%' }}>
                  <CustomText
                    style={{ color: colors.black, marginLeft: width * 0.02 }}>
                    End Time
                  </CustomText>
                  <TimeDateBtn
                    variant={'light'}
                    icon={Images.time3x}
                    title={
                      endTime == new Date()
                        ? 'End Time'
                        : getFormattedTime(endTime)
                    }
                    prefixIcon={true}
                    setOpen={() => [setOpen(true), setMode('endTime')]}
                  />
                </View>
              </View>

              <View style={{ marginVertical: width * 0.07 }}>
                <LinearGradientPrimaryButton
                  customStyle={{ padding: width * 0.032 }}
                  title={'Submit'}
                  loader={loading}
                  // onPress={handleSubmit(createAmenity)}
                  onPress={() => setApproveModal(true)}
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
      </ImageBackground>

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
    </SafeAreaView>
  );
};

export default CreateAmenity;
