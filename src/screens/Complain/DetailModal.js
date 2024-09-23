import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import {Modal} from 'react-native';
import {colors} from '../../styles/colors';
import Header from '../../components/Header/Header';
import {ScrollView} from 'react-native';
import CustomText from '../../components/CustomText';
import {fontsFamily} from '../../assets/Fonts';
import {Image} from 'react-native';
import {Images} from '../../assets/Images';
import {TouchableOpacity} from 'react-native';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {useState} from 'react';
import {apiCall} from '../../Services/apiCall';
import {baseUrl} from '../../../axios';
import {useSelector} from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';
import ImagePopup from '../../components/Modal/ImagePopup';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import ImageCropPicker from 'react-native-image-crop-picker';
import LinearGradientPrimaryButton from '../../components/Button/LinearGradientPrimaryButton';
const {height, width} = Dimensions.get('window');

const DetailModal = ({visible, close, getData, data}) => {
  const servicePermission = useSelector(
    state => state?.userDataReducer?.servicePermission,
  );

  const role = useSelector(state => state.userDataReducer.userRole);
  const [inProgressLoader, setinProgressLoader] = useState(false);
  const [inResolvesLoader, setResolvedLoader] = useState(false);
  const [permission, setPermission] = useState({});

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const [imagePopupModal, setImagePopupModal] = useState(false);
  const [popupImage, setPopupImage] = useState('');
  const [imageLoader, setImageLoader] = useState(false);
  const [image, setImage] = useState();
  const uploadImage = async () => {
    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
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
            const {data} = await apiCall.uploadEventImage(formData);

            setImage(data);
          });
        } else {
          alert('camera permission denied');
        }
      } catch (err) {
        console.warn(err);
        setImageLoader(false);
      }
    } else {
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
      setImageLoader(false); // Stop the loader on error
    }
  };
  const changeStatus = async status => {
    if (inProgressLoader || inResolvesLoader) {
    } else {
      if (status) {
        setResolvedLoader(true);
      } else {
        setinProgressLoader(true);
      }
      try {
        let {message} = await apiCall.changeComplainStatus(
          data?.id,
          status,
          image,
        );
        console.log(message);
        setErrorModal(true);
        setAlertType('s');
        setErrorModalText(message);
        setErrorModal(true);
        setTimeout(() => {
          setErrorModal(false);
          close(false);
          setImage(null);
          getData();
        }, 3000);
      } catch (error) {
        setErrorModal(true);
        setErrorModalText(error);
      } finally {
        setResolvedLoader(false);
        setinProgressLoader(false);
      }
    }
  };

  useEffect(() => {
    const find = servicePermission?.find(e => e.id == 4);
    setPermission(find);
  }, [servicePermission]);
  return (
    <View>
      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <Modal visible={visible} onRequestClose={() => close(false)}>
        <ImageBackground source={Images.lightBG} style={{flex: 1}}>
          <SafeAreaView
            style={[styles.root, {width: '90%', alignSelf: 'center'}]}>
            <Header
              onBack={() => close(false)}
              title={'Detail'}
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
                  children={'Complain Detail'}
                  fontWeight={fontsFamily.semiBold}
                  style={{...styles.topConHeading, color: colors.black}}
                />
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{
                    ...styles.topConHeading,
                    color: colors.black,
                    marginTop: 8,
                    fontSize: 16,
                  }}>
                  {data?.title}
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={{...styles.topConText, fontSize: 14}}>
                  Complaint ID: {data?.id}
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
                <View style={{justifyContent: 'space-between'}}>
                  <CustomText
                    fontWeight={fontsFamily.regular}
                    style={styles.text1}>
                    Reported by
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={styles.text2}>
                    {data?.reportedBy}
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
                      {width: width * 0.08, height: width * 0.08},
                    ]}
                  />
                </View>
                <View style={{justifyContent: 'space-between'}}>
                  <CustomText
                    fontWeight={fontsFamily.regular}
                    style={styles.text1}>
                    Date
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={styles.text2}>
                    {data?.date}
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
                <View style={{justifyContent: 'space-between'}}>
                  <CustomText
                    fontWeight={fontsFamily.regular}
                    style={styles.text1}>
                    Status
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={styles.text2}>
                    {data?.status}
                  </CustomText>
                </View>
              </View>
              <View style={styles.listCon}>
                <View style={styles.listConImg}>
                  <Image
                    source={Images.communityWithoutName}
                    resizeMode={'contain'}
                    style={[styles.img, {tintColor: colors.primary}]}
                  />
                </View>
                <View style={{justifyContent: 'space-between'}}>
                  <CustomText
                    fontWeight={fontsFamily.regular}
                    style={styles.text1}>
                    Block
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.text2}>
                    {data?.location}
                  </CustomText>
                </View>
              </View>
              <View style={styles.listCon}>
                {/* <View style={styles.listConImg}>
                  <Image
                    source={Images.checkedIcon}
                    resizeMode={'contain'}
                    style={[styles.img, {tintColor: colors.primary}]}
                  />
                </View> */}
                <View style={{justifyContent: 'space-between'}}>
                  <CustomText
                    fontWeight={fontsFamily.regular}
                    style={styles.text1}>
                    Description
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.regular}
                    style={styles.text2}>
                    {data?.description}
                  </CustomText>
                </View>
              </View>
              {data?.image && (
                <View style={styles.listCon}>
                  {/* <View style={[styles.listConImg, {alignSelf: 'flex-start'}]}>
                    <Image
                      source={Images.photo}
                      resizeMode={'contain'}
                      style={[styles.img, {tintColor: colors.primary}]}
                    />
                  </View> */}
                  <View style={{justifyContent: 'space-between', width: '80%'}}>
                    <CustomText
                      fontWeight={fontsFamily.regular}
                      style={styles.text1}>
                      Evidence
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
                        backgroundColor: 'transparent',
                        borderRadius: width * 0.03,
                        // marginTop: width * 0.02,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: `${baseUrl}${data?.image}`}}
                        resizeMode="contain"
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {!image && data?.verifyImage && (
                <View style={styles.listCon}>
                  <View style={[styles.listConImg, {alignSelf: 'flex-start'}]}>
                    <Image
                      source={Images.photo}
                      resizeMode={'contain'}
                      style={[styles.img, {tintColor: colors.primary}]}
                    />
                  </View>
                  <View style={{justifyContent: 'space-between', width: '80%'}}>
                    <CustomText
                      fontWeight={fontsFamily.regular}
                      style={styles.text1}>
                      Evidence
                    </CustomText>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setImagePopupModal(true);
                        setPopupImage(baseUrl + data?.verifyImage);
                      }}
                      style={{
                        width: '100%',
                        height: width * 0.5,
                        backgroundColor: colors.gray,
                        borderRadius: width * 0.03,
                        marginTop: width * 0.02,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: `${baseUrl}${data?.verifyImage}`}}
                        resizeMode="cover"
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View style={{  alignSelf: 'flex-start',flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity
                  style={{
                    borderWidth:1, borderColor:colors.danger,
                    padding: 8,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                  }}>
                  <CustomText
                    children={'Urgent'}
                    fontWeight={fontsFamily.bold}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth:1, borderColor:colors.aprove,
                    padding: 8,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    marginHorizontal:8
                  }}>
                  <CustomText
                    children={'In Progress'}
                    fontWeight={fontsFamily.bold}
                  />
                </TouchableOpacity>
              </View>
              {permission?.canEdit && role !== 'User' && (
                <>
                  {/* <TimeDateBtn
                  variant={'primary'}
                  title={'Upload resolve image'}
                  prefixIcon={true}
                  showRightIcon={true}
                  rightIconImg={Images.camera}
                  setOpen={handlePicWithLoading}
                /> */}

                  <TouchableOpacity
                    onPress={handlePicWithLoading}
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
                      marginTop:10,
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
                      style={{marginTop: 20}}
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
                        source={{uri: baseUrl + image}}
                        resizeMode="contain"
                        style={styles.image}
                      />
                    </View>
                  )}
                  {/* <View style={styles.BtnMainCon}> */}
                    <LinearGradientPrimaryButton
                      loader={inProgressLoader}
                      customStyle={styles.btn}
                      title={'In Progress'}
                      onPress={() => {
                        changeStatus(false);
                      }}
                    />
                    <LinearGradientPrimaryButton
                      loader={inResolvesLoader}
                      customStyle={styles.btn}
                      title={'Resolved'}
                      onPress={() => {
                        changeStatus(true);
                      }}
                      
                    />
                  {/* </View> */}
                </>
              )}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </Modal>
    </View>
  );
};

export default DetailModal;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: colors.white,
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
    color: colors.black,
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
    // width: width * 0.4,
    marginHorizontal: width * 0.02,
    paddingVertical: width * 0.02,
  },
});
