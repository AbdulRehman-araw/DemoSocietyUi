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
} from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';

import { colors } from '../../styles/colors';
import { Images } from '../../assets/Images';
import { fontsFamily } from '../../assets/Fonts';
import { text } from '../../res/strings';
import { styles } from './styles/styles';
import { useIsFocused } from '@react-navigation/native';
import { apiCall } from '../../Services/apiCall';
import PrimaryButton from '../../components/Button/PrimaryButton';
import AlertModal from '../../components/Modal/AlertModal';
import WarningModal from '../../components/Modal/WarningModal';
import { useSelector } from 'react-redux';
import DocumentList from '../Registrations/components/DocumentList';
import FilledTextField from '../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';

const { width, height } = Dimensions.get('window');

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const Residents = ({ navigation, route }) => {
  const { apartmentId } = route?.params?.data;
  const { rentalId } = route?.params?.data ? route?.params?.data : null;
  const isFocused = useIsFocused();
  const [loader, setLoader] = useState(false);
  const [detail, setDetail] = useState();
  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModal1, setErrorModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [alertWarning, setAlertWarning] = useState('w');
  const [errorModalText, setErrorModalText] = useState('');
  const { role } = useSelector(state => state.userDataReducer.userData);
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );
  const communityPermission = servicePermission?.filter(
    item => item?.name === 'Community',
  );
  const { control, handleSubmit, setValue, resetField } = useForm();
  const goBack = () => {
    navigation.goBack();
  };

  const getOwnerDetail = async () => {
    setLoader(true);
    try {
      const { data } = await apiCall.getOwnerDetail(apartmentId);

      setDetail(data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };
  const allotMachineId = async formData => {
    try {
      setLoader(true);
      let obj = {
        rentalOwnerId: detail?.rentalOwnerId,
        machineID: formData?.machineId,
      };
      const { message } = await apiCall.allotMachineId(obj);
      console.log('========>', obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log(error);
      setAlertType('e');
      setErrorModalText(error);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoader(false);
    }
  };
  const resentOTP = async () => {
    try {
      // setLoader(true);
      let obj = {
        apartmentID: detail?.apartmentID,
        rentalOwnerId: detail?.rentalOwnerId,
      };
      const { message } = await apiCall.tenentResentOtp(obj);
      console.log(message);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log('🚀 ~ resentOTP ~ error:', error);
      setAlertType('e');
      setErrorModalText(error);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoader(false);
    }
  };
  const AlertFunction = () => {
    setAlertWarning('w');
    setErrorModalText('Are you sure you want to delete Resident?');
    setErrorModal1(true);
  };
  const getRentalData = async () => {
    setLoader(true);
    try {
      const { data } = await apiCall.getRentalDetail(rentalId);
      console.log('🚀 ~ getRentalData ~ data:', data);
      setDetail(data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };
  const deleteOwner = async id => {
    setLoader(true);
    try {
      const { message } = await apiCall.deleteOwner(id);
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
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoader(false);
    }
  };
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  useEffect(() => {
    if (apartmentId) {
      getOwnerDetail();
    }
    if (rentalId) {
      getRentalData(rentalId);
    }
  }, [isFocused, apartmentId, rentalId]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar
        translucent
        backgroundColor={colors.primary}
        barStyle="light-content"
      />

      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <WarningModal
        visible={errorModal1}
        close={setErrorModal}
        text={errorModalText}
        type={alertWarning}
        button={true}
        warning={() => deleteOwner(detail?.ownerId)}
        cancel={() => setErrorModal1(false)}
      />

      <ImageBackground
        source={Images.residentbanner}
        resizeMode="contain"
        style={{
          width: width,
          height: width * 0.8,
          paddingHorizontal: width * 0.03,
          marginTop:20
        }}>
        <Header
          onBack={goBack}
          title={'Detail'}
          showRightBtn={true}
          iconStyle={{ tintColor: colors.white }}
          eightIconStyle={{ tintColor: colors.white }}
          icon={communityPermission[0]?.canEdit && !rentalId && Images.editIcon}
          textStyle={{ color: colors.white }}
          headerContainer={{ paddingTop: Platform.OS == "android" ? width * 0.1 : 30 }}
          handleRightBtn={() =>
            navigation.replace('updateOwner', { data: detail })
          }
        />

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={Images.userresident}
            resizeMode="contain"
            style={{
              width: width * 0.35,
              height: width * 0.35,
              margin: width * 0.04,
            }}
          />
          {/* <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
            <TouchableOpacity style={{ marginHorizontal: width * 0.02 }}>
              <Image source={Images.iconcircle} resizeMode="contain" style={{ width: width * 0.04, height: width * 0.04 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: width * 0.02 }}>
              <Image source={Images.iconcalls} resizeMode="contain" style={{ width: width * 0.04, height: width * 0.04 }} />
            </TouchableOpacity>
          </View> */}
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
                {rentalId ? 'Rental' : 'Owner'} Details
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
                <View style={{ flex: 1 }}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    E-Mail
                  </CustomText>

                  <CustomText
                    numberOfLines={2}
                    // ellipsizeMode={true}
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {detail?.email}
                  </CustomText>
                </View>
              </View>
              {detail?.rentalOwnerId && (
                <TouchableOpacity onPress={() => resentOTP()}>
                  <CustomText
                    fontWeight={fontsFamily.regular}
                    style={{
                      fontSize: width * 0.03,
                      left: 10,
                      textDecorationLine: 'underline',
                      marginVertical: 5,
                    }}>
                    Resend OTP
                  </CustomText>
                </TouchableOpacity>
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

              {detail?.ownerVehicles?.map((item, index) => (
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

              {detail?.rentalOwnerId && (
                <>
                  <FilledTextField
                    name={'machineId'}
                    placeholder="Assign Machine ID"
                    type={'number-pad'}
                    control={control}
                    rules={{
                      required: 'Please enter owner machine id.',
                    }}
                    onSubmitEditing={handleSubmit(allotMachineId)}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginVertical: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 100,
                        height: 40,
                        backgroundColor: colors?.primary,
                        borderRadius: 10,
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={handleSubmit(allotMachineId)}>
                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={{ fontSize: width * 0.025, color: colors?.white }}>
                        Assign
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {detail?.frc && (
                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={styles.userheading}>
                  {rentalId ? 'Rental' : 'Owner'} Attachments
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
              {communityPermission[0]?.canDelete && !detail?.rentalOwnerId && (
                <View style={{ ...styles.viewname, justifyContent: 'center' }}>
                  <PrimaryButton
                    onPress={() => AlertFunction()}
                    loader={loader}
                    title={'Delete'}
                    customStyle={styles.btnStyle}
                    outlined
                  />
                </View>
              )}
            </View>

            {detail?.resident?.length > 0 && (
              <View style={styles.viewall}>
                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={styles.userheading}>
                  Residents
                </CustomText>
                {detail?.resident?.map(item => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('myUnitDetail', {
                        data: { unitId: item?.id },
                      })
                    }
                    activeOpacity={0.7}
                    style={[styles.residence]}>
                    <Image
                      source={Images.maleuser}
                      resizeMode="contain"
                      style={{ width: width * 0.09, height: width * 0.09 }}
                    />

                    <View style={{ marginHorizontal: width * 0.02, flex: 1 }}>
                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={{ color: colors.primary, fontSize: width * 0.04 }}>
                        {item?.name}
                      </CustomText>
                    </View>
                    <Image
                      source={Images.rightarrow}
                      resizeMode="contain"
                      style={{
                        width: width * 0.05,
                        height: width * 0.05,
                        marginHorizontal: width * 0.01,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {detail?.maid?.length > 0 && (
              <View style={styles.viewall}>
                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={styles.userheading}>
                  Maid
                </CustomText>
                {detail?.maid?.map(item => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.residence]}
                    onPress={() =>
                      navigation.navigate('myUnitDetail', {
                        data: { unitId: item?.id },
                      })
                    }>
                    <Image
                      source={Images.maleuser}
                      resizeMode="contain"
                      style={{ width: width * 0.09, height: width * 0.09 }}
                    />

                    <View style={{ marginHorizontal: width * 0.02, flex: 1 }}>
                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={{ color: colors.primary, fontSize: width * 0.04 }}>
                        {item?.name}
                      </CustomText>
                    </View>
                    <Image
                      source={Images.rightarrow}
                      resizeMode="contain"
                      style={{
                        width: width * 0.05,
                        height: width * 0.05,
                        marginHorizontal: width * 0.01,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {detail?.driver?.length > 0 && (
              <View style={styles.viewall}>
                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={styles.userheading}>
                  Driver
                </CustomText>
                {detail?.driver?.map(item => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('myUnitDetail', {
                        data: { unitId: item?.id },
                      })
                    }
                    activeOpacity={0.7}
                    style={[styles.residence]}>
                    <Image
                      source={Images.maleuser}
                      resizeMode="contain"
                      style={{ width: width * 0.09, height: width * 0.09 }}
                    />

                    <View style={{ marginHorizontal: width * 0.02, flex: 1 }}>
                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={{ color: colors.primary, fontSize: width * 0.04 }}>
                        {item?.name}
                      </CustomText>
                    </View>
                    <Image
                      source={Images.rightarrow}
                      resizeMode="contain"
                      style={{
                        width: width * 0.05,
                        height: width * 0.05,
                        marginHorizontal: width * 0.01,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {detail?.rental && (
              <View style={styles.viewall}>
                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={styles.userheading}>
                  Rental
                </CustomText>
                {/* {detail?.rental?.map(item => ( */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.residence]}
                  onPress={() =>
                    navigation.navigate('resident', {
                      data: { rentalId: detail?.rental.id },
                    })
                  }>
                  <Image
                    source={Images.maleuser}
                    resizeMode="contain"
                    style={{ width: width * 0.09, height: width * 0.09 }}
                  />

                  <View style={{ marginHorizontal: width * 0.02, flex: 1 }}>
                    <CustomText
                      fontWeight={fontsFamily.semiBold}
                      style={{ color: colors.primary, fontSize: width * 0.04 }}>
                      {detail?.rental?.name}
                    </CustomText>
                  </View>
                  <Image
                    source={Images.rightarrow}
                    resizeMode="contain"
                    style={{
                      width: width * 0.05,
                      height: width * 0.05,
                      marginHorizontal: width * 0.01,
                    }}
                  />
                </TouchableOpacity>
                {/* ))} */}
              </View>
            )}
          </Fragment>
        )}
        <View style={{
          height:100
        }}></View>
      </ScrollView>
    </View>
  );
};

export default Residents;
