import {
  TextInput,
  BackHandler,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import { useForm } from 'react-hook-form';

import { colors } from '../../styles/colors';
import { text } from '../../res/strings';
import { Images } from '../../assets/Images';
import { fontsFamily } from '../../assets/Fonts';
import { styles } from './styles/styles';

import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import PrimaryButton from '../../components/Button/PrimaryButton';
import FilledTextField from '../../components/TextField/FilledTextField';
import LocationBtn from './components/LocationBtn';
import { apiCall } from '../../Services/apiCall';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { baseUrl } from '../../../axios';
import AlertModal from '../../components/Modal/AlertModal';
import TimeDateBtn from '../../components/Button/TimeDateBtn';

import ImageCropPicker from 'react-native-image-crop-picker';

const { width, height } = Dimensions.get('window');

const AddComplain = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const [onswitch, setOnswitch] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [locations, setLocations] = useState([]);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [errorModalText2, setErrorModalText2] = useState('');
  const [selectedItem, setSelectedItem] = useState('My Building');
  const [alertType, setAlertType] = useState('s');
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const [image, setImage] = useState();
  const [aaa, setAaa] = useState();

  const Details = useSelector(
    state => state.userDataReducer.userAccountDetails,
  );

  const goBack = () => {
    navigation.goBack();
  };

  const handleBack = () => {
    goBack();
    return true;
  };
  useEffect(() => {
    getLocations();
    BackHandler.addEventListener('hardwareBackPress', handleBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, []);

  const addComplain = async data => {
    const { Title, Description } = data;
    setLoading(true);
    let obj = {
      locationID: selectedItem?.id,
      locationType: selectedItem?.type,
      societyID: Details?.societyID,
      title: Title,
      description: Description,
      image: image,
      isEmergency: onswitch,
    };
    try {
      let { message } = await apiCall.addComplains(obj);
      console.warn(message, errorModal, loading);
      const messageParts = message.split('. ');

      const firstPart = messageParts[0];
      const secondPart = messageParts[1];

      setAaa(secondPart);

      setLoader(true);
      setErrorModal(true);
      setAlertType('s');
      setErrorModalText(firstPart);
      setErrorModalText2(secondPart);
      setTimeout(() => {
        setErrorModal(false);
        navigation.navigate('complain');
      }, 3000);
    } catch (error) {
      // Handle the error here.
      setErrorModal(true);
      setErrorModalText(error);
    }
  };
  const uploadPic = async data => {
    try {
      let result = await apiCall.addComplainsPicture(data);
      setImageUrl(result.data);
    } catch (error) {
      console.log('🚀 ~ file: index.js:105 ~ handlePic ~ error:', error);
    }
  };
  // const handlePic = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: "Cool Photo App Camera Permission",
  //         message:
  //           "Cool Photo App needs access to your camera " +
  //           "so you can take awesome pictures.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK"
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {

  //       ImagePicker.openCamera({
  //         compressImageQuality: 0.7,
  //         cropping: true,
  //       }).then(image => {
  //         console.log(image);
  //         let filePath = image.path.split('/')
  //         const formdata = new FormData()
  //         formdata.append('file', {
  //           uri: image.path,
  //           type: image.mime,
  //           name: filePath[filePath.length - 1]
  //         })
  //         if (filePath !== undefined) {
  //           uploadPic(formdata)
  //         }

  //       });
  //     } else {
  //       console.log("Camera permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }

  const uploadImage = async () => {
    setImageLoader(true)
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
        const { data } = await apiCall.uploadEventImage(formData);
        setImage(data);
      });
    } catch (err) {
      console.warn(err);
      setImageLoader(false);
    }
  };

  const getLocations = async () => {
    try {
      let result = await apiCall.getLocations();
      setLocations(result?.data);
    } catch (error) {
      console.log('🚀 ~ file: index.js:52 ~ getComplains ~ error:', error);
    }
  };

  const submit = data => {
    const { Title, Description } = data;
    // console.log("🚀 ~ file: index.js:82 ~ submit ~ description:", Description)
    // console.log("🚀 ~ file: index.js:82 ~ submit ~ title:", Title)
    if (data) {
      addComplain(data);
    }
  };

  //   setImageLoading(true); // Start the loader

  //   try {
  //     // Call your image upload logic
  //     await handlePic();

  //     // When the image is uploaded successfully:
  //     setImageLoading(false); // Stop the loader
  //   } catch (error) {
  //     console.log("🚀 ~ file: index.js:105 ~ handlePic ~ error:", error);
  //     setImageLoading(false); // Stop the loader on error
  //   }
  // }

  // const setImageLoading = () => {
  //   setTimeout(() => {
  //     setImageLoader(true);
  //   }, 1000);
  // };

  const handlePicWithLoading = async () => {
    setImageLoader(true); // Start the loader
    try {
      // Call your image upload logic
      await uploadImage();
    } catch (error) {
      console.log('🚀 ~ file: index.js:105 ~ handlePic ~ error:', error);
    } finally {
      setImageLoader(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: width * 0.032,
      }}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{
        width: "90%",
        alignSelf: 'center'
      }}>
        <Header onBack={goBack} title={'Add New'} showRightBtn={true} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: height * 0.08 }}>
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={styles.headingStyle}>
            {text.buildingMaintenance}
          </CustomText>

          <View style={styles.Togglecard}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText
                fontWeight={fontsFamily.bold}
                style={{
                  color: colors.primary,
                  fontSize: width * 0.039,
                  marginTop: 4,
                }}>
                {text.emergency}
              </CustomText>
              <Text
                style={{ fontSize: width * 0.034, color: colors.lightoffwhite }}>
                will be taken care of within 4 hours
              </Text>
            </View>

            <AlertModal
              visible={errorModal}
              close={setErrorModal}
              text={errorModalText}
              text2={errorModalText2}
              type={alertType}
            />

            <ToggleSwitch
              isOn={onswitch}
              onColor={colors.black}
              offColor={colors.gray}
              size="medium"
              animationSpeed={40}
              onToggle={isOn => setOnswitch(isOn)}
            />
          </View>

          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={styles.headingStyle}>
            {text.btnLocation}
          </CustomText>

          <View style={styles.cardContainer}>
            {locations.map((item, index) => {
              return (
                <LocationBtn
                  title={item?.name}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  Location={item}
                />
              );
            })}
          </View>

          {/* <FilledTextField
          showRightIcon={true}
          rightIconImg={Images.search}
          variant="outlined"
          name={'Search'}
          placeholder=" Search"
          control={control}
        /> */}

          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={styles.headingStyle}>
            {text.problem}
          </CustomText>

          <FilledTextField
            variant="outlined"
            name={'Title'}
            placeholder=" Title"
            control={control}
            rules={{
              required: 'Title is required',
            }}
          />

          <View style={styles.viewAttach}>
            <FilledTextField
              variant="outlined"
              name={'Description'}
              placeholder="Description"
              control={control}
              multiline={true}
              lines={4}
              rules={{
                required: 'Please describe the complain',
              }}
            />


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
                  style={{ width: 'auto', height: width * 0.6 }}
                />
              </View>
            )}
          </View>
          {/* {imageUrl !== '' && (
          <TouchableOpacity activeOpacity={1} onPress={handlePic} style={{
            borderColor: colors.gray,
            width: '100%',
            borderWidth: 1,
            padding: width * 0.02,
            color: colors.black,
            borderRadius: width * 0.02,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              height: width * 0.3,
              width: width * 0.3,
            }}>
              <Image
                source={{ uri: `${baseUrl}${imageUrl}` }}
                resizeMode='contain'
                onLoad={() => setImageLoader(false)}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />

            </View>
          </TouchableOpacity>
        )} */}
          {/* {imageUrl !== '' && <CustomText numberOfLines={1} ellipsizeMode={'tail'} fontWeight={fontsFamily.regular} style={{
          borderColor: colors.gray,
          width: '100%',
          borderWidth: 1,
          padding: width * 0.03,
          color: colors.black,
          borderRadius: width * 0.02
        }}>{imageUrl}</CustomText>} */}

          <View style={{ marginVertical: width * 0.055 }}>
            <PrimaryButton
              customStyle={{ padding: width * 0.03 }}
              title={text.submit}
              onPress={handleSubmit(submit)}
            />
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  );
};

export default AddComplain;
