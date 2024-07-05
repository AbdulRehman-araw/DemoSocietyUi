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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import Header from '../../components/Header/Header';
import {Images} from '../../assets/Images';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/apiCall';
import {fontsFamily} from '../../assets/Fonts';
import AlertModal from '../../components/Modal/AlertModal';
import CustomText from '../../components/CustomText';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {baseUrl} from '../../../axios';
import ImagePopup from '../../components/Modal/ImagePopup';

const {width, height} = Dimensions.get('screen');

const ReceivingDetail = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const data = route?.params?.data;
  console.log(
    '🚀 ~ file: ReceivingDetail.js:35 ~ ReceivingDetail ~ data:',
    data,
  );

  const [loading, setLoading] = useState(false);

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const [imagePopupModal, setImagePopupModal] = useState(false);
  const [popupImage, setPopupImage] = useState('');

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

  const verifyReceiving = async id => {
    setLoading(true);
    try {
      const {message} = await apiCall.verifyReceiving(id);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log('file: index.js:54 => getEForms => error:', error);
    } finally {
      setLoading(false);
    }
  };

  // console.log('Waqas',);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <ImagePopup
        open={imagePopupModal}
        close={() => setImagePopupModal(false)}
        image={popupImage}
      />

      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Receiving Details'} />
        <ScrollView
          style={{
            paddingHorizontal: width * 0.01,
            flex: 1,
            marginTop: 10,
            paddingBottom: height * 0.15,
          }}>
          {/* <View style={styles.topCon}>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.topConHeading}>Invoice ID</CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.topConText}>{data?.invoiceID}</CustomText>
          </View> */}
          <View
            style={{
              ...styles.topCon,
              paddingVertical: 1,
              marginVertical: width * 0.02,
            }}>
            <CustomText fontWeight={fontsFamily.regular} style={styles.text1}>
              Invoice ID
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.text2}>
              {data?.invoiceID}
            </CustomText>
          </View>
          <View
            style={{
              ...styles.topCon,
              paddingVertical: 1,
              marginVertical: width * 0.02,
            }}>
            <CustomText fontWeight={fontsFamily.regular} style={styles.text1}>
              Building Name
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.text2}>
              {data?.building}
            </CustomText>
          </View>
          <View
            style={{
              ...styles.topCon,
              paddingVertical: 1,
              marginVertical: width * 0.02,
            }}>
            <CustomText fontWeight={fontsFamily.regular} style={styles.text1}>
              Appartment No
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.text2}>
              {data?.unitNumber}
            </CustomText>
          </View>

          <View
            style={{
              ...styles.topCon,
              paddingVertical: 1,
              marginVertical: width * 0.02,
            }}>
            <CustomText fontWeight={fontsFamily.regular} style={styles.text1}>
              Resident Name
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.text2}>
              {data?.residentName}
            </CustomText>
          </View>
          <View
            style={{
              ...styles.topCon,
              paddingVertical: 1,
              marginVertical: width * 0.02,
            }}>
            <CustomText fontWeight={fontsFamily.regular} style={styles.text1}>
              Invoice Title
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.text2}>
              {data?.invoiceTitle}
            </CustomText>
          </View>

          <View
            style={{
              ...styles.topCon,
              paddingVertical: 1,
              marginVertical: width * 0.02,
            }}>
            <CustomText fontWeight={fontsFamily.regular} style={styles.text1}>
              Description
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.text2}>
              {data?.description}
            </CustomText>
          </View>
          <View
            style={{
              ...styles.topCon,
              paddingVertical: 1,
              marginVertical: width * 0.02,
            }}>
            <CustomText fontWeight={fontsFamily.regular} style={styles.text1}>
              Date
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.text2}>
              {moment(data?.paymentDate).format('DD MMM YYYY')}
            </CustomText>
          </View>

          <View
            style={{
              ...styles.topCon,
              paddingVertical: 1,
              marginVertical: width * 0.02,
            }}>
            <CustomText fontWeight={fontsFamily.regular} style={styles.text1}>
              Amount
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.text2}>
              {data?.amount}
            </CustomText>
          </View>
          <View
            style={{
              ...styles.topCon,
              paddingVertical: 1,
              marginVertical: width * 0.02,
            }}>
            <CustomText fontWeight={fontsFamily.regular} style={styles.text1}>
              Submitted Date and Time
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.text2}>
              {data?.submitDate &&
                moment(data?.submitDate).format('DD MMM YYYY') +
                  ', ' +
                  moment(data?.submitDate).format('hh mm a')}
            </CustomText>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setImagePopupModal(true);
              setPopupImage(baseUrl + data?.voucherImage);
            }}
            style={{
              ...styles.topCon,
              paddingVertical: 1,
            }}>
            <Image
              source={{uri: baseUrl + data?.voucherImage}}
              resizeMode="contain"
              style={{width: 'auto', height: width * 0.5}}
            />
          </TouchableOpacity>
          {/* <View style={{ ...styles.topCon, paddingVertical: 1 }}>
            <Image source={{ uri: baseUrl + data?.voucherImage }} resizeMode="contain" style={{ width: 'auto', height: width * 0.5 }} />
          </View> */}
          <View style={styles.BtnMainCon}>
            <PrimaryButton
              loader={loading}
              customStyle={styles.btn}
              title={data?.isVerify ? 'Verified' : 'Verify'}
              onPress={() =>
                data?.isVerify ? '' : verifyReceiving(data?.receivingID)
              }
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ReceivingDetail;

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
    paddingVertical: 8,
    // backgroundColor:'red',
    marginVertical: width * 0.03,
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
  text1: {
    color: colors.darkGray,
    fontSize: width * 0.035,
  },
  text2: {
    color: colors.primary,
    fontSize: width * 0.04,
  },
  photoCon: {
    width: '100%',
    height: width * 0.5,
    backgroundColor: colors.gray,
    borderRadius: width * 0.03,
    marginTop: width * 0.02,
  },
  BtnMainCon: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: width * 0.02,
  },
  btn: {
    width: width * 0.3,
    marginHorizontal: width * 0.02,
    paddingVertical: width * 0.02,
    marginBottom: 100,
  },
});
