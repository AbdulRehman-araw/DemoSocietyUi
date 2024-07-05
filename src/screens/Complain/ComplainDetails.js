import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  PermissionsAndroid,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, { useEffect } from 'react';
import { Modal } from 'react-native';
import { colors } from '../../styles/colors';
import Header from '../../components/Header/Header';
import { ScrollView } from 'react-native';
import CustomText from '../../components/CustomText';
import { fontsFamily } from '../../assets/Fonts';
import { Image } from 'react-native';
import { Images } from '../../assets/Images';
import { TouchableOpacity } from 'react-native';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { useState } from 'react';
import { apiCall } from '../../Services/apiCall';
import { baseUrl } from '../../../axios';
import { useSelector } from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';
import ImagePopup from '../../components/Modal/ImagePopup';
import ImageCropPicker from 'react-native-image-crop-picker';

const { height, width } = Dimensions.get('window');
const ComplainDetails = ({
  visible,
  close,
  getData,
  data,
  route,
  navigation,
}) => {
  const id = route?.params?.id;
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );
  const role = useSelector(state => state.userDataReducer.userRole);
  const [inProgressLoader, setinProgressLoader] = useState(false);
  const [inResolvesLoader, setResolvedLoader] = useState(false);
  const [permission, setPermission] = useState({});
  const [dataGetByNotification, setDataGetByNotification] = useState(null);
  const [imageLoader, setImageLoader] = useState(false);
  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [image, setImage] = useState();
  const [imagePopupModal, setImagePopupModal] = useState(false);
  const [popupImage, setPopupImage] = useState('');

  const changeStatus = async status => {
    if (inProgressLoader || inResolvesLoader) {
    } else {
      if (status) {
        setResolvedLoader(true);
      } else {
        setinProgressLoader(true);
      }
      try {
        let { message } = await apiCall.changeComplainStatus(
          dataGetByNotification?.id,
          status,
          image,
        );
        setErrorModal(true);
        setAlertType('s');
        setErrorModalText(message);
        setErrorModal(true);
        setTimeout(() => {
          setErrorModal(false);
          navigation?.goBack();
        }, 3000);
      } catch (error) {
        alert(error);
      } finally {
        setResolvedLoader(false);
        setinProgressLoader(false);
      }
    }
  };
  const uploadImage = async () => {
    if (Platform.OS == "android") {
      setImageLoader(true)
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,

          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log("haha", granted)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
        } else {
          alert('Allow Permission');
        }
      } catch (err) {
        console.warn(err);

      }
      finally {
        setImageLoader(false);
      }
    }
    else {
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
    }

  };
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
  useEffect(() => {
    const find = servicePermission?.find(e => e.id == 4);
    setPermission(find);
  }, [servicePermission]);
  useEffect(() => {
    getComplsinById();
  }, []);
  const getComplsinById = async () => {
    try {
      let result = await apiCall.getComplainById(id);
      setDataGetByNotification(result?.data);
    } catch (error) {
    } finally {
      // setResolvedLoader(false);
      // setinProgressLoader(false);
    }
  };
  return (
    <View>
      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <Modal visible={visible} onRequestClose={() => close(false)}>
        <SafeAreaView style={styles.root}>
          <Header
            onBack={() => navigation.navigate('notifications')}
            title={'Complain Detail'}
            showRightBtn={false}
          //   handleRightBtn={() => navigation.navigate('addComplain')}
          //   icon={Images.Addcircle}
          />

          <ImagePopup
            open={imagePopupModal}
            close={() => setImagePopupModal(false)}
            image={popupImage}
          />

          <ScrollView
            contentContainerStyle={styles.cont}
            showsVerticalScrollIndicator={false}>
            <View style={styles.topCon}>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.topConHeading}>
                {dataGetByNotification
                  ? dataGetByNotification?.title
                  : data?.title}
              </CustomText>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.topConText}>
                ID{' '}
                {dataGetByNotification ? dataGetByNotification?.id : data?.id}
              </CustomText>
            </View>
            <View style={styles.listCon}>
              <View style={styles.listConImg}>
                <Image
                  source={Images.userIcon}
                  resizeMode={'contain'}
                  style={styles.img}
                />
              </View>
              <View style={{ justifyContent: 'space-between' }}>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.text1}>
                  Reported by
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.text2}>
                  {dataGetByNotification
                    ? dataGetByNotification?.reportedBy
                    : data?.reportedBy}
                  {/* {data?.reportedBy} */}
                </CustomText>
              </View>
            </View>
            <View style={styles.listCon}>
              <View style={styles.listConImg}>
                <Image
                  source={Images.calendar}
                  resizeMode={'contain'}
                  style={[
                    styles.img,
                    { width: width * 0.08, height: width * 0.08 },
                  ]}
                />
              </View>
              <View style={{ justifyContent: 'space-between' }}>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.text1}>
                  Date
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.text2}>
                  {dataGetByNotification
                    ? dataGetByNotification?.date
                    : data?.date}
                  {/* {data?.date} */}
                </CustomText>
              </View>
            </View>
            <View style={styles.listCon}>
              <View style={styles.listConImg}>
                <Image
                  source={Images.dotgreen}
                  resizeMode={'contain'}
                  style={styles.img}
                />
              </View>
              <View style={{ justifyContent: 'space-between' }}>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.text1}>
                  Status
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.text2}>
                  {dataGetByNotification
                    ? dataGetByNotification?.status
                    : data?.status}
                  {/* {data?.status} */}
                </CustomText>
              </View>
            </View>
            <View style={styles.listCon}>
              <View style={styles.listConImg}>
                <Image
                  source={Images.communityWithoutName}
                  resizeMode={'contain'}
                  style={[styles.img, { tintColor: colors.primary }]}
                />
              </View>
              <View style={{ justifyContent: 'space-between' }}>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.text1}>
                  Block
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.text2}>
                  {dataGetByNotification
                    ? dataGetByNotification?.location
                    : data?.location}
                  {/* {data?.location} */}
                </CustomText>
              </View>
            </View>
            <View style={styles.listCon}>
              <View style={styles.listConImg}>
                <Image
                  source={Images.checkedIcon}
                  resizeMode={'contain'}
                  style={[styles.img, { tintColor: colors.primary }]}
                />
              </View>
              <View style={{ justifyContent: 'space-between' }}>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.text1}>
                  Description
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.text2}>
                  {dataGetByNotification
                    ? dataGetByNotification?.description
                    : data?.description}
                  {/* {data?.description} */}
                </CustomText>
              </View>
            </View>
            {!image &&
              dataGetByNotification?.verifyImage && (
                <View style={styles.listCon}>
                  <View style={[styles.listConImg, { alignSelf: 'flex-start' }]}>
                    <Image
                      source={Images.photo}
                      resizeMode={'contain'}
                      style={[styles.img, { tintColor: colors.primary }]}
                    />
                  </View>
                  <View style={{ justifyContent: 'space-between', width: '80%' }}>
                    <CustomText
                      fontWeight={fontsFamily.regular}
                      style={styles.text1}>
                      Evidence
                    </CustomText>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setImagePopupModal(true);
                        setPopupImage(
                          baseUrl + dataGetByNotification
                            ? dataGetByNotification?.verifyImage
                            : data?.verifyImage,
                        );
                      }}
                      style={{
                        width: '100%',
                        height: width * 0.5,
                        backgroundColor: "transparent",
                        borderRadius: width * 0.03,
                        marginTop: width * 0.02,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{
                          uri: `${baseUrl}${dataGetByNotification
                            ? dataGetByNotification?.verifyImage
                            : data?.verifyImage
                            }`,
                        }}
                        resizeMode="cover"
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            {data?.image ||
              (dataGetByNotification?.image && (
                <View style={styles.listCon}>
                  <View style={[styles.listConImg, { alignSelf: 'flex-start' }]}>
                    <Image
                      source={Images.photo}
                      resizeMode={'contain'}
                      style={[styles.img, { tintColor: colors.primary }]}
                    />
                  </View>

                  <View style={{ justifyContent: 'space-between', width: '80%' }}>
                    <CustomText
                      fontWeight={fontsFamily.regular}
                      style={styles.text1}>
                      Photo
                    </CustomText>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setImagePopupModal(true);
                        setPopupImage(baseUrl + data?.image);
                      }}
                      style={{
                        width: '100%',
                        height: width * 0.5,
                        backgroundColor: "transparent",
                        borderRadius: width * 0.03,
                        marginTop: width * 0.02,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{
                          uri: `${baseUrl}${dataGetByNotification
                            ? dataGetByNotification?.image
                            : data?.image
                            }`,
                        }}
                        resizeMode="contain"
                        style={styles.image}
                      />
                    </TouchableOpacity>

                    {/* <View style={styles.photoCon}>
                                        <Image
                                            source={{ uri: `${baseUrl}${data?.image}` }}
                                            resizeMode='contain'
                                            style={styles.image}
                                        />
                                    </View> */}
                  </View>
                </View>
              ))}

            {permission?.canEdit && role !== 'User' && (
              <>
                <TouchableOpacity
                  onPress={uploadImage}
                  activeOpacity={1}
                  style={{
                    width: '40%',
                    // height: width * 0.1,
                    // marginRight: width * 0.02,
                    backgroundColor: colors.primaryLight,
                    borderRadius: 10,
                    padding: width * 0.02,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignSelf: 'center',
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.text2}>
                    {'Upload Image'}
                  </CustomText>
                  <Image
                    resizeMode="contain"
                    style={{
                      left: width * 0.01,
                      width: width * 0.05,
                      height: width * 0.05,
                    }}
                    source={Images.camera}
                  />
                </TouchableOpacity>

                {imageLoader && (
                  <ActivityIndicator
                    size={'large'}
                    color={colors.primary}
                    style={{ marginTop: 20 }}
                  />
                )}
                {image && (
                  <View
                    style={{
                      width: '80%',
                      height: width * 0.5,
                      backgroundColor: 'transparent',
                      borderRadius: width * 0.03,
                      marginTop: width * 0.02,
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <Image
                      onLoad={() => setImageLoader(false)}
                      source={{ uri: baseUrl + image }}
                      resizeMode="contain"
                      style={styles.image}
                    />
                  </View>
                )}
                <View style={styles.BtnMainCon}>
                  <PrimaryButton
                    loader={inProgressLoader}
                    customStyle={styles.btn}
                    title={'In Progress'}
                    onPress={() => {
                      changeStatus(false);
                    }}
                  />
                  <PrimaryButton
                    loader={inResolvesLoader}
                    customStyle={styles.btn}
                    title={'Resolved'}
                    onPress={() => {
                      changeStatus(true);
                    }}
                  />
                </View>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default ComplainDetails;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: width * 0.03,
  },
  cont: {
    flexGrow: 1,
    paddingBottom: width * 0.06,
    // backgroundColor:'red'
  },
  topCon: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    // backgroundColor:'red',
    marginVertical: width * 0.05,
  },
  topConHeading: {
    color: colors.primary,
    fontSize: width * 0.045,
    marginBottom: width * 0.01,
  },
  topConText: {
    color: colors.black,
    fontSize: width * 0.035,
  },
  listCon: {
    width: '90%',
    flexDirection: 'row',
    marginBottom: width * 0.04,
  },
  listConImg: {
    width: width * 0.08,
    height: width * 0.08,
    marginRight: width * 0.04,
  },
  img: {
    width: width * 0.06,
    height: width * 0.06,
  },

  image: {
    width: '100%',
    height: '100%',
  },
  text1: {
    color: colors.darkGray,
    fontSize: width * 0.03,
  },
  text2: {
    color: colors.primary,
    fontSize: width * 0.035,
  },
  photoCon: {
    width: '100%',
    height: width * 0.5,
    backgroundColor: colors.gray,
    borderRadius: width * 0.03,
    marginTop: width * 0.02,
    alignItems: 'center',
  },
  BtnMainCon: {
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btn: {
    width: width * 0.3,
    marginHorizontal: width * 0.02,
    paddingVertical: width * 0.02,
  },
});
