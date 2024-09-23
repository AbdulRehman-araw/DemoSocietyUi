import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import moment from 'moment';
import {styles} from './styles/styles';
import {colors} from '../../styles/colors';
import Header from '../../components/Header/Header';
import {fontsFamily} from '../../assets/Fonts';
import CustomText from '../../components/CustomText';
import {Images} from '../../assets/Images';
import {apiCall} from '../../Services/apiCall';
import AlertModal from '../../components/Modal/AlertModal';
import {useSelector} from 'react-redux';
import WarningModal from '../../components/Modal/WarningModal';

const {width, height} = Dimensions.get('window');

const AnnouncementDetail = ({navigation, route}) => {
  const DetailData = route?.params?.data?.detail;
  const Permission = route?.params?.data?.permission;
  console.log(
    'file: AnnouncementDetail.js:33 => AnnouncementDetail => Permission:',
    Permission,
  );
  const role = useSelector(state => state.userDataReducer.userRole);

  const goBack = () => {
    navigation.goBack();
  };

  const [loading, setLoading] = useState(false);

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const [errorModal1, setErrorModal1] = useState(false);
  const [alertWarning, setAlertWarning] = useState('w');

  const deleteAnnouncement = async id => {
    setLoading(true);
    try {
      const {message} = await apiCall.deleteAnnouncement(id);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    } finally {
      setLoading(false);
    }
  };

  const AlertFunction = () => {
    setAlertWarning('w');
    setErrorModalText('Are you sure you want to delete this announcement?');
    setErrorModal1(true);
  };

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
        <Header onBack={goBack} title={'Detail'} showRightBtn={false} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={styles.viewall}>
            <View style={styles.viewname}>
              <View>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{
                    ...styles.username,
                    fontSize: 20,
                    color: colors.black,
                    marginVertical: 10,
                  }}>
                  Announcement Details
                </CustomText>

                <View style={{marginVertical: 10}}>
                  <CustomText
                    fontWeight={fontsFamily.regular}
                    style={styles.username}>
                    Subject
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    {DetailData?.subject}
                  </CustomText>
                </View>
              </View>
            </View>

            <View style={styles.viewname}>
              <View>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.username}>
                  Description
                </CustomText>

                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={[styles.username, {color: colors.lightdarkgray}]}>
                  {DetailData?.description}
                </CustomText>
              </View>
            </View>

            <View
              style={{
                marginVertical: width * 0.07,
                flexDirection: 'row',
                gap: 8,
                justifyContent: 'center',
              }}>
              {Permission?.canDelete && role !== 'User' && (
                <TouchableOpacity
                  disabled={loading}
                  onPress={() => AlertFunction()}
                  activeOpacity={1}
                  style={{
                    flex: 1,
                    // width: width * 0.13,
                    // height: width * 0.13,
                    marginRight: width * 0.02,
                    backgroundColor: colors.danger,
                    borderRadius: 26,
                    padding: width * 0.03,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <Image
                    resizeMode="contain"
                    style={{
                      tintColor: colors.white,
                      width: width * 0.06,
                      height: width * 0.06,
                    }}
                    source={Images.icondelete}
                  /> */}
                  <CustomText
                    children={'Delete'}
                    fontWeight={fontsFamily.bold}
                    style={{color: colors.white}}
                  />
                </TouchableOpacity>
              )}

              {/* {Permission?.canEdit && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('updateAnnouncement', {DetailData})
                  }
                  activeOpacity={1}
                  style={{
                    // width: width * 0.13,
                    // height: width * 0.13,
                    flex: 1,
                    marginRight: width * 0.02,
                    backgroundColor: colors.success,
                    borderRadius: 26,
                    padding: width * 0.03,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    resizeMode='contain'
                    style={{ tintColor: colors.white, width: width * 0.06, height: width * 0.06 }}
                    source={Images.editIcon}
                  />
                  <CustomText
                    children={'Resend'}
                    fontWeight={fontsFamily.bold}
                    style={{color: colors.white}}
                  />
                </TouchableOpacity>
              )} */}
            </View>

            <WarningModal
              visible={errorModal1}
              close={setErrorModal}
              text={errorModalText}
              type={alertWarning}
              button={true}
              warning={() => [
                deleteAnnouncement(DetailData?.announcementID),
                setErrorModal1(false),
              ]}
              cancel={() => setErrorModal1(false)}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AnnouncementDetail;
