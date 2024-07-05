import {
  TextInput,
  BackHandler,
  Button,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Image,
  Alert,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { colors } from '../../styles/colors';

import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import ComplainTextField from '../../components/TextField/complainTextField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { text } from '../../res/strings';
import { fontsFamily } from '../../assets/Fonts';
import { styles } from './styles/styles';
import { Images } from '../../assets/Images';
import FilledTextField from '../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {
  AnnouncementBox,
  AnnouncementBoxLight,
} from '../../components/AnnouncementBox';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { apiCall } from '../../Services/apiCall';
import { ActivityIndicator } from 'react-native';
import { Modal } from 'react-native';
import { RefreshControl } from 'react-native';
import AlertModal from '../../components/Modal/AlertModal';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Announcement = ({ navigation, route }) => {
  const { id } = route?.params?.data ? route?.params?.data : route?.params;
  const { control, handleSubmit } = useForm();
  const Details = useSelector(
    state => state.userDataReducer.userAccountDetails,
  );
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );
  const { role } = useSelector(state => state.userDataReducer.userData);
  const [announcementData, setAnnouncementData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loaderSubmit, setloaderSubmit] = useState(false);
  const [title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [errorModal, seterrorModal] = useState(false);
  const [errorModalText, seterrorModalText] = useState('');
  const [permission, setPermission] = useState({});
  const [getID, setGetID] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  const getAnnouncement = async searchKey => {
    setLoader(true);
    try {
      const search = searchKey ? searchKey : '';
      const { data } = await apiCall.getAnnouncement(Details?.accountID, search);
      console.log('🚀 ~ file: index.js:76 ~ getAnnouncement ~ data:', data);
      setAnnouncementData(data);
    } catch (error) {
      console.log('🚀 ~ file: index.js:61 ~ getAnnouncement ~ error:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getAnnouncement();
  }, [isFocused]);

  const submitAnnouncement = async () => {
    if (!title) {
      setErrorMessage('Please enter the subject first.');
    } else if (!Description) {
      setErrorMessage1('Please enter the description first.');
    } else {
      setloaderSubmit(true);
      try {
        let obj = {
          subject: title,
          description: Description,
        };
        await apiCall.addAnnoucement(obj);
        getAnnouncement();
        setShowModal(false);
      } catch (error) {
        console.log(
          '🚀 ~ file: index.js:69 ~ submitAnnouncement ~ error:',
          error,
        );
        seterrorModalText(error);
        seterrorModal(true);
      } finally {
        setloaderSubmit(false);
      }
    }
  };

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getAnnouncement();
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const find = servicePermission?.find(e => e.id == id);
    setPermission(find);
  }, [servicePermission]);
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
        marginLeft: Platform.OS == "ios" ? 20 : 0
      }}>
        <Header
          onBack={goBack}
          title={'Announcement'}
          showRightBtn={
            permission?.canAdd ? (role == 'User' ? false : true) : false
          }
          icon={Images.Addcircle}
          handleRightBtn={() => setShowModal(true)}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ flexGrow: 1, paddingBottom: height * 0.15 }}
        showsVerticalScrollIndicator={false}>
        <ComplainTextField
          name={'Search'}
          placeholder=" Search"
          type={'default'}
          control={control}
          justChange={e => {
            setTimeout(() => {
              getAnnouncement(e);
            }, 1000);
          }}
          // rules={{
          //     required:"User name is required"
          // }}
          img={Images.search}
        />
        {/* <Announcement card /> */}
        {loader ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'small'} color={colors.primary} />
          </View>
        ) : announcementData?.length > 0 ? (
          announcementData?.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate('announcementDetail', {
                  data: { detail: item, permission: permission },
                })
              }>
              <AnnouncementBoxLight data={item} key={index} />
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={{
                color: colors.black,
                fontSize: width * 0.04,
              }}>
              No Announcement
            </CustomText>
          </View>
        )}
      </ScrollView>
      <Modal
        animationType="fade"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={[styles.root, { marginTop: Platform.OS == "ios" ? 50 : 0 }]}>
          <Header
            onBack={() => setShowModal(false)}
            title={'New Announcement'}
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
                  Subject
                </CustomText>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Enter Subject'}
                  placeholderTextColor={colors.gray}
                  onChangeText={e => {
                    setTitle(e);
                  }}
                />
              </View>

              {errorMessage ? (
                <CustomText
                  style={{
                    color: colors.danger,
                    marginLeft: width * 0.05,
                    marginTop: width * 0.02,
                  }}>
                  {errorMessage}
                </CustomText>
              ) : null}

              <View style={styles.textMainCon}>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.textTitle}>
                  Description
                </CustomText>
                <TextInput
                  style={[styles.textInput, { textAlignVertical: 'top', height: 40 }]}
                  placeholder={'Enter Description'}
                  placeholderTextColor={colors.gray}
                  multiline
                  numberOfLines={5}
                  maxLength={100}
                  onChangeText={e => {
                    setDescription(e);
                  }}
                />

                {errorMessage1 ? (
                  <CustomText
                    style={{
                      color: colors.danger,
                      marginLeft: width * 0.02,
                      marginTop: width * 0.02,
                    }}>
                    {errorMessage}
                  </CustomText>
                ) : null}

                <CustomText
                  fontWeight={fontsFamily.light}
                  style={styles.textLimit}>
                  {Description.length}/100
                </CustomText>
              </View>
            </View>
            <PrimaryButton
              onPress={submitAnnouncement}
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

      <AlertModal
        visible={errorModal}
        close={seterrorModal}
        text={errorModalText}
        type={'e'}
      />
    </SafeAreaView>
  );
};

export default Announcement;
