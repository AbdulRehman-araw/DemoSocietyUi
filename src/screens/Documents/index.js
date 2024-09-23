import {
  TouchableOpacity,
  TextInput,
  BackHandler,
  Button,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Alert,
  ScrollView,
  Modal,
  ActivityIndicator,
  Platform,
  RefreshControl
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';

import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import { styles } from './styles/styles';
import { fontsFamily } from '../../assets/Fonts';
import { Images } from '../../assets/Images';
import { text } from '../../res/strings';
import { apiCall } from '../../Services/apiCall';
import ListCon from './ListCon';
import { useSelector } from 'react-redux';
import PrimaryButton from '../../components/Button/PrimaryButton';
import DocumentPicker from 'react-native-document-picker';
import AlertModal from '../../components/Modal/AlertModal';
import WarningModal from '../../components/Modal/WarningModal';

const { width } = Dimensions.get('window');

const EDocuments = ({ navigation, route }) => {
  const { id } = route?.params?.data || {};
  const { role } = useSelector(state => state.userDataReducer.userData);
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [loaderSubmit, setloaderSubmit] = useState(false);
  const [permission, setPermission] = useState({});
  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorModal1, setErrorModal1] = useState(false);
  const [alertWarning, setAlertWarning] = useState('w');
  const [value, setValue] = useState();
  const [imageLoader, setImageLoader] = useState(false);

  const getDoc = async () => {
    setLoader(true);
    try {
      let result = await apiCall.getDocument();
      // console.log(result?.data)
      setData(result?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getDoc();
  }, []);

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
  const docFilePdf = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      const filename = res[0].uri.replace('file://', '');
      console.log(`fileName======> ${filename}`);
      const formdata = new FormData();
      formdata.append('file', {
        uri: filename,
        type: res[0].type,
        name: res[0].name,
      });
      try {
        let { data } = await apiCall.addDocPicture(formdata);
        console.log('🚀 ~ file: index.js:78 ~ docFilePdf ~ data:', data);
        setimgUrl(data);
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
        setImageLoader(false);
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const publishData = async () => {
    if (title == '' || imgUrl == '') {
      alert('Please fill the fields');
    } else {
      setloaderSubmit(true);
      let obj = {
        title: title,
        attachment: imgUrl,
      };
      try {
        let result = await apiCall.addDocument(obj);
        setShowModal(false);
        getDoc();
      } catch (error) {
        alert(error);
      } finally {
        setloaderSubmit(false);
      }
    }
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getDoc();
      setRefreshing(false);
    }, 1000);
  }, []);

  const AlertFunction = () => {
    setAlertWarning('w');
    setErrorModalText('Are you sure you want to delete this document?');
    setErrorModal1(true);
  };

  const deleteDocument = async documentID => {
    setErrorModal(false);
    setLoading(true);
    try {
      const { message } = await apiCall.deleteDocument(documentID);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      getDoc();
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    } finally {
      setLoading(false);
    }
  };

  const setImageLoading = () => {
    setTimeout(() => {
      setImageLoader(true);
    }, 1000);
  };

  useEffect(() => {
    const find = servicePermission?.find(e => e.id == id);
    setPermission(find);
  }, [servicePermission]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
        <Header
          onBack={goBack}
          title={'E-Documents'}
          textdocument={{ fontSize: width * 0.046, fontWeight: '700' }}
          showRightBtn={
            permission?.canAdd ? (role == 'User' ? false : true) : false
          }
          icon={Images.newAdd}
          handleRightBtn={() => setShowModal(true)}
        />

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
            paddingTop: width * 0.03,
          }}>
          <AlertModal
            visible={errorModal}
            close={setErrorModal}
            text={errorModalText}
            type={alertType}
          />

          {loader ? (
            <ActivityIndicator size={'large'} color={colors.primary} />
          ) : data?.length > 0 ? (
            data?.map((val, i) => {
              return (
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' ,borderBottomWidth:1, borderBottomColor:colors.primary}}>
                    <ListCon key={i} data={val} />
                    {role != 'User' && permission?.canDelete === true && (
                      <TouchableOpacity onPress={() => AlertFunction()}>
                        <Image
                          resizeMode="contain"
                          style={{
                            tintColor: colors.danger,
                            width: width * 0.05,
                            height: width * 0.05,
                          }}
                          source={Images.icondelete}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <WarningModal
                    visible={errorModal1}
                    close={setErrorModal}
                    text={errorModalText}
                    type={alertWarning}
                    button={true}
                    warning={() => [
                      deleteDocument(val?.documentID),
                      setErrorModal1(false),
                    ]}
                    cancel={() => setErrorModal1(false)}
                  />
                </View>
              );
            })
          ) : (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={{ color: colors.black, fontSize: width * 0.035 }}>
                No document found
              </CustomText>
            </View>
          )}
        </ScrollView>
      </View>
      <Modal
        animationType="fade"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={[styles.root, { marginTop: Platform.OS == "ios" ? 50 : 0 }]}>
          <Header
            onBack={() => setShowModal(false)}
            title={'Add New'}
            showRightBtn={false}
            icon={Images.Addcircle}
          />
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              // backgroundColor:'red',
              justifyContent: 'space-between',
            }}>
            <View style={styles.upperCon}>
              <View style={styles.textMainCon}>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.textTitle}>
                  Title
                </CustomText>
                <TextInput
                  style={styles.textInput}
                  maxLength={50}
                  placeholder={'Enter Subject'}
                  placeholderTextColor={colors.gray}
                  onChangeText={e => {
                    setTitle(e);
                  }}
                />
              </View>
              <View style={styles.textMainCon}>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.textTitle}>
                  Attachment
                </CustomText>
                <TouchableOpacity
                  onPress={() => [docFilePdf(), setImageLoading()]}
                  activeOpacity={1}
                  style={styles.addAttach}>
                  <CustomText
                    ellipsizeMode={'tail'}
                    numberOfLines={2}
                    fontWeight={fontsFamily.semiBold}
                    style={styles.browse}>
                    {imgUrl == '' ? 'Browse' : imgUrl.split('/').pop()}
                  </CustomText>
                  <View style={styles.browseImgCon}>
                    <Image
                      source={Images.upload_big_arrow}
                      resizeMode="contain"
                      style={{
                        width: '40%',
                        height: '40%',
                        tintColor: colors.white,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {imageLoader == true ? (
                <ActivityIndicator
                  size={'large'}
                  color={colors.primary}
                  style={{ marginTop: 20 }}
                />
              ) : null}
              {imgUrl !== '' && (
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    height: width * 0.5,
                    width: '100%',
                    // alignItems:'center',,

                    marginTop: width * 0.03,
                  }}>
                  <Image
                    source={{
                      uri: `https://societyhood.mangotech-apps.com/${imgUrl}`,
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    resizeMode="contain"
                    onLoad={() => setImageLoader(false)}
                  />
                </TouchableOpacity>
              )}
            </View>
            <PrimaryButton
              onPress={() => {
                publishData();
              }}
              loader={loaderSubmit}
              title={'Publish'}
              customStyle={{
                width: '40%',
                alignSelf: 'center',
                paddingVertical: width * 0.03,
                marginBottom: width * 0.1,
              }}
            />
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EDocuments;
