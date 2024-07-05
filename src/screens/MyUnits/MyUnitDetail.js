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
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';

import {colors} from '../../styles/colors';
import {Images} from '../../assets/Images';
import {fontsFamily} from '../../assets/Fonts';
import {text} from '../../res/strings';
import {styles} from './styles/styles';
import {useIsFocused} from '@react-navigation/native';
import {apiCall} from '../../Services/apiCall';

import UserCard from './UserCard';
import {useSelector} from 'react-redux';
import PrimaryButton from '../../components/Button/PrimaryButton';
import WarningModal from '../../components/Modal/WarningModal';
import DocumentList from '../Registrations/components/DocumentList';

const {width, height} = Dimensions.get('window');

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const MyUnitDetail = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const {unitId} = route?.params?.data;
  const userData = useSelector(state => state.userDataReducer.userData);
  const {isRental} = route?.params?.data?.isRental
    ? route?.params?.data
    : false;
  const [loader, setLoader] = useState(false);
  const [detail, setDetail] = useState();
  const [errorModal1, setErrorModal1] = useState(false);
  const [alertWarning, setAlertWarning] = useState('w');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const role = useSelector(state => state.userDataReducer.userRole);
  const [aaa, setAaa] = useState();

  const goBack = () => {
    navigation.goBack();
  };

  const getUnitDetail = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getUnitDetail(
        unitId,
        isRental ? true : false,
      );
      setDetail(data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const getRentalUnitDetail = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getRentalUnitDetail(
        unitId,
        isRental ? true : false,
      );
      setDetail(data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const AlertFunction = () => {
    setAlertWarning('w');
    setErrorModalText('Are you sure you want to delete Resident?');
    setErrorModal1(true);
  };
  useEffect(() => {
    if (userData?.isRental) {
      getRentalUnitDetail();
    } else {
      getUnitDetail();
    }
  }, []);
  const deleteResident = async id => {
    try {
      const {message} = await apiCall.deleteResident(
        isRental ? unitId : id,
        isRental ? true : false,
      );
      setAlertWarning('w');
      setErrorModalText(message);
      setErrorModal1(true);
      setTimeout(() => {
        setErrorModal1(false);
        goBack();
      }, 3000);
    } catch (error) {
      setAlertWarning('e');
      setErrorModalText(error);
      setErrorModal1(true);
      setTimeout(() => {
        setErrorModal1(false);
      }, 3000);
    } finally {
    }
  };

  const deleteRentalResident = async id => {
    try {
      const {message} = await apiCall.deleteRentalResident(id);
      setAlertWarning('s');
      setErrorModalText(message);
      setErrorModal1(true);
      setTimeout(() => {
        setErrorModal1(false);
        goBack();
      }, 3000);
    } catch (error) {
      setAlertWarning('e');
      setErrorModalText(error);
      setErrorModal1(true);
      setTimeout(() => {
        setErrorModal1(false);
      }, 3000);
    } finally {
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent
        backgroundColor={colors.primary}
        barStyle="light-content"
      />

      <ImageBackground
        source={Images.residentbanner}
        resizeMode="contain"
        style={{
          width: width,
          height: width * 0.8,
          paddingHorizontal: width * 0.03,
        }}>
        <Header
          onBack={goBack}
          title={'Detail'}
          showRightBtn={true}
          iconStyle={{tintColor: colors.white}}
          rightIconStyle={{tintColor: colors.white}}
          icon={role === 'User' && userData?.isOwner && Images.editIcon}
          textStyle={{color: colors.white}}
          headerContainer={{paddingTop: width * 0.1}}
          handleRightBtn={() =>
            navigation.navigate('myUnitsUpdate', {detail, unitId})
          }
        />

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={Images.userresident}
            resizeMode="contain"
            style={{
              width: width * 0.35,
              height: width * 0.35,
              margin: width * 0.04,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
        </View>
      </ImageBackground>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          padding: width * 0.03,
          paddingBottom: Platform.OS === 'ios' ? width * 0.08 : width * 0.18,
        }}>
        {loader ? (
          <ActivityIndicator size={'small'} color={colors.primary} />
        ) : (
          <Fragment>
            <View style={styles.viewall}>
              <CustomText
                fontWeight={fontsFamily.bold}
                style={styles.userheading}>
                {isRental
                  ? 'Rental '
                  : detail?.unitType === 'RentalOwner'
                  ? 'Rental '
                  : detail?.unitType}
                Details
              </CustomText>

              <View style={styles.viewname}>
                <Image
                  source={Images.userIcon}
                  resizeMode="contain"
                  style={{
                    width: width * 0.06,
                    height: width * 0.06,
                    marginHorizontal: width * 0.035,
                  }}
                />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    User Name
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {detail?.userName}
                  </CustomText>
                </View>
              </View>

              <View style={styles.viewname}>
                <Image
                  source={Images.userIcon}
                  resizeMode="contain"
                  style={{
                    width: width * 0.06,
                    height: width * 0.06,
                    marginHorizontal: width * 0.035,
                  }}
                />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Name
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {detail?.name}
                  </CustomText>
                </View>
              </View>

              <View style={styles.viewname}>
                <Image
                  source={Images.communityWithoutName}
                  resizeMode="contain"
                  style={{
                    tintColor: colors.primary,
                    width: width * 0.06,
                    height: width * 0.06,
                    marginHorizontal: width * 0.035,
                  }}
                />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    House Number
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {detail?.building
                      ? detail?.building + ', ' + detail?.houseNo
                      : detail?.houseNo}
                  </CustomText>
                </View>
              </View>

              <View style={styles.viewname}>
                <Image
                  source={Images.Reports}
                  resizeMode="contain"
                  style={{
                    tintColor: colors.primary,
                    width: width * 0.06,
                    height: width * 0.06,
                    marginHorizontal: width * 0.035,
                  }}
                />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Machine ID
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {detail?.machineID}
                  </CustomText>
                </View>
              </View>

              <View style={styles.viewname}>
                <Image
                  source={Images.usercard}
                  resizeMode="contain"
                  style={{
                    width: width * 0.06,
                    height: width * 0.06,
                    marginHorizontal: width * 0.035,
                  }}
                />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    CNIC Number
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {detail?.nationalID}
                  </CustomText>
                </View>
              </View>
              <View style={styles.viewname}>
                <Image
                  source={Images.userphone}
                  resizeMode="contain"
                  style={{
                    width: width * 0.06,
                    height: width * 0.06,
                    marginHorizontal: width * 0.035,
                  }}
                />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Number
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {detail?.contactNo}
                  </CustomText>
                </View>
              </View>
              {detail?.unitType !== 'Maid' && detail?.unitType !== 'Driver' && (
                <View style={styles.viewname}>
                  <Image
                    source={Images.notice}
                    resizeMode="contain"
                    style={{
                      width: width * 0.06,
                      height: width * 0.06,
                      marginHorizontal: width * 0.035,
                    }}
                  />
                  <View style={{}}>
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={styles.name}>
                      E-Mail
                    </CustomText>

                    <CustomText
                      numberOfLines={2}
                      fontWeight={fontsFamily.semiBold}
                      style={styles.useremail}>
                      {detail?.email}
                    </CustomText>
                  </View>
                </View>
              )}

              <View style={styles.viewname}>
                <Image
                  source={Images.usercard}
                  resizeMode="contain"
                  style={{
                    width: width * 0.06,
                    height: width * 0.06,
                    marginHorizontal: width * 0.035,
                  }}
                />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Address
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {detail?.addressLine1}
                  </CustomText>
                </View>
              </View>
              {detail?.unitVehicles?.map((item, index) => (
                <View style={styles.viewname}>
                  <Image
                    source={Images.iconcar}
                    resizeMode="contain"
                    style={{
                      width: width * 0.06,
                      height: width * 0.06,
                      marginHorizontal: width * 0.035,
                    }}
                  />
                  <View style={{}}>
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={styles.name}>
                      Vehicle {index + 1}
                    </CustomText>

                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={styles.username}>
                      {item.vehicleNo}
                    </CustomText>
                  </View>
                </View>
              ))}

              {detail?.frc && (
                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={styles.userheading}>
                  {isRental
                    ? 'Rental '
                    : detail?.unitType === 'RentalOwner'
                    ? 'Rental '
                    : detail?.unitType}{' '}
                  Attachments
                </CustomText>
              )}
              {detail?.frc && <DocumentList data={detail?.frc} name={'FRC'} />}

              {detail?.workingLetter && (
                <DocumentList
                  data={detail?.workingLetter}
                  name={'Working letter'}
                />
              )}

              {detail?.possessionLetter && (
                <DocumentList
                  data={detail?.possessionLetter}
                  name={'Possession letter'}
                />
              )}

              {detail?.checkingList && (
                <DocumentList
                  data={detail?.checkingList}
                  name={'Checking list'}
                />
              )}

              {detail?.vehicleRunningpage && (
                <DocumentList
                  data={detail?.vehicleRunningpage}
                  name={'Car running page for parking lot'}
                />
              )}

              {detail?.ackPossession && (
                <DocumentList
                  data={detail?.ackPossession}
                  name={' Acknowledgement of possession'}
                />
              )}

              {detail?.agreement && (
                <DocumentList data={detail?.agreement} name={'Agreement'} />
              )}

              {detail?.noc && <DocumentList data={detail?.noc} name={'NOC'} />}
              {detail?.undertakingLetter && (
                <DocumentList
                  data={detail?.undertakingLetter}
                  name={'Undertaking Letter'}
                />
              )}
              {detail?.policeVerification && (
                <DocumentList
                  data={detail?.policeVerification}
                  name={'Police Verification'}
                />
              )}

              {role === 'User' &&
                detail?.unitType !== 'Owner' &&
                !userData?.isRental &&
                userData?.isOwner && (
                  <View
                    style={{
                      alignSelf: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: width * 0.016,
                    }}>
                    <View
                      style={{...styles.viewname, justifyContent: 'center'}}>
                      <PrimaryButton
                        onPress={() => AlertFunction()}
                        loader={loader}
                        title={'Delete'}
                        customStyle={{
                          marginVertical: width * 0.012,
                          padding: width * 0.015,
                          paddingHorizontal: width * 0.06,
                          borderRadius: 1,
                        }}
                        outlined
                      />
                    </View>
                  </View>
                )}
              {/* <CustomText
                fontWeight={fontsFamily.semiBold}
                style={{
                  color: colors.black,
                  fontSize: width * 0.04,
                  marginTop: width * 0.06,
                }}>
                Residents
              </CustomText>

              {aaa?.resident?.length > 0 && (
                <FlatList
                  data={aaa?.resident}
                  renderItem={({item}) => (
                    <UserCard
                      id={item?.id}
                      name={item?.name}
                      relation={item?.unitType}
                      prefixImage={Images.maleuser}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              )} */}
              {/* 
              {aaa?.driver?.length > 0 && (
                <Fragment>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{
                      color: colors.black,
                      fontSize: width * 0.04,
                      marginTop: width * 0.06,
                    }}>
                    Driver
                  </CustomText>

                  <FlatList
                    data={aaa?.driver}
                    renderItem={({item}) => (
                      <UserCard
                        id={item?.id}
                        name={item?.name}
                        relation={item?.unitType}
                        prefixImage={Images.maleuser}
                      />
                    )}
                    keyExtractor={item => item.id}
                  />
                </Fragment>
              )} */}

              {/* {aaa?.rental?.length > 0 && (
                <Fragment>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{
                      color: colors.black,
                      fontSize: width * 0.04,
                      marginTop: width * 0.06,
                    }}>
                    Rental
                  </CustomText>

                  <FlatList
                    data={aaa?.rental}
                    renderItem={({item}) => (
                      <UserCard
                        id={item?.id}
                        name={item?.name}
                        relation={item?.unitType}
                        prefixImage={Images.maleuser}
                      />
                    )}
                    keyExtractor={item => item.id}
                  />
                </Fragment>
              )} */}

              {/* {aaa?.maid?.length > 0 && (
                <Fragment>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{
                      color: colors.black,
                      fontSize: width * 0.04,
                      marginTop: width * 0.06,
                    }}>
                    Maid
                  </CustomText>

                  <FlatList
                    data={aaa?.maid}
                    renderItem={({item}) => (
                      <UserCard
                        id={item?.id}
                        name={item?.name}
                        relation={item?.unitType}
                        prefixImage={Images.maleuser}
                      />
                    )}
                    keyExtractor={item => item.id}
                  />
                </Fragment>
              )} */}
              <WarningModal
                visible={errorModal1}
                close={setErrorModal}
                text={errorModalText}
                type={alertWarning}
                button={true}
                warning={() =>
                  userData?.isRental
                    ? deleteRentalResident(detail?.id)
                    : deleteResident(detail?.id)
                }
                cancel={() => setErrorModal1(false)}
              />
            </View>
          </Fragment>
        )}
      </ScrollView>
    </View>
  );
};

export default MyUnitDetail;
