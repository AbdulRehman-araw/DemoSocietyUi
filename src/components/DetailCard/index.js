import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import { colors } from '../../styles/colors';
import CustomText from '../CustomText';

import PrimaryButton from '../../components/Button/PrimaryButton';
import { fontsFamily } from '../../assets/Fonts';
import { getFormattedDate, getFormattedTime } from '../../utils/helperFunction';
import moment from 'moment';
import { apiCall } from '../../Services/apiCall';
import { Alert } from 'react-native';
import { useState } from 'react';
import EditModal from '../Modal/EditModal';
import { useSelector } from 'react-redux';
import { Image } from 'react-native';
import { Images } from '../../assets/Images';
import Header from '../Header/Header';
import { useLocalTime } from '../../utils/LocalTime';
import WarningModal from '../../components/Modal/WarningModal';
import { ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const VisitorDetailView = ({ img, label, text }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
      <Image source={img} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 8, tintColor: colors.black }} />
      <View>
        <CustomText
          fontWeight={fontsFamily.regular}
          style={{ fontSize: 10, color: colors.dark, }}>
          {label}
        </CustomText>
        <View style={{ marginVertical: 4 }} />
        <CustomText
          fontWeight={fontsFamily.bold}
          style={{ fontSize: 14, color: colors.dark }}>
          {text}
        </CustomText>
      </View>
    </View>
  )
}

const DetailCard = ({
  getData,
  completeData,
  invites,
  inviteStyle,
  isWalkin,
}) => {
  const [loader, setLoader] = useState(false);
  const { accountID } = useSelector(state => state.userDataReducer.userData);
  const role = useSelector(state => state.userDataReducer.userRole);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [errorModal1, setErrorModal1] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [alertWarning, setAlertWarning] = useState('w');
  const [errorModal, setErrorModal] = useState(false);
  const [invitationLoader, setInvitationLoader] = useState(false);

  const deleteVisitor = async () => {
    setLoader(true);
    try {
      let result = await apiCall.deleteVisitor(completeData?.visitID);
      getData();
    } catch (error) {
      // alert('',error)
      console.log('err', error);
    } finally {
      setLoader(false);
    }
  };
  const handleStatus = async status => {
    setInvitationLoader(true);
    try {
      let result = await apiCall.changeStatusVisitor(
        completeData?.visitID,
        status,
      );
      getData();
    } catch (error) {
      console.log(error);
    } finally {
      setInvitationLoader(false);
    }
  };

  const dateStrStart = completeData?.visitDate;
  const localTimeStart = useLocalTime(dateStrStart);

  const AlertFunction = () => {
    setAlertWarning('w');
    setErrorModalText('Are you sure you want to delete this invite?');
    setErrorModal1(true);
  };
  const handleWalkinStatus = async status => {
    setInvitationLoader(true);
    try {
      let result = await apiCall.changeWalkinStatus(
        completeData?.visitID,
        status,
      );
      console.log(
        '🚀 ~ file: index.js:90 ~ handleWalkinStatus ~ result:',
        result,
      );
      getData();
    } catch (error) {
      console.log(error);
    } finally {
      setInvitationLoader(false);
    }
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={
          // role == 'User'
          //   ? null
          // :
          () => {
            setShowDetailModal(true);
          }
        }
        style={[
          styles.container,
          {
            // borderWidth: inviteStyle === true ? 0 : 1,
            // borderBottomWidth: inviteStyle === true ? 1 : 1,
            borderRadius: inviteStyle === true ? 0 : width * 0.06,
          },
        ]}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={Images.Hall4}
              style={styles.avatar}
              resizeMode="contain"
            />
            <View style={{ marginHorizontal: 8, flex: 1, }}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.title}>
                {completeData?.visitorName}
              </CustomText>
              <CustomText fontWeight={fontsFamily.regular} style={styles.subText}>
                {completeData?.visitID}
              </CustomText>
              <CustomText fontWeight={fontsFamily.regular} style={styles.subText}>
                {completeData?.visitID}
              </CustomText>
            </View>

            <View style={{ margin: 8 }}>
              <Image
                source={Images.card_arrow}
                style={styles.arrow}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <Image
            source={Images.calender_outlined}
            style={{ width: 14, height: 14, marginHorizontal: 10 }}
            resizeMode="contain"
          />
          <CustomText fontWeight={fontsFamily.bold} style={styles.subText}>
            {/* {moment(completeData?.visitDate).format('dddd, DD MMMM')} old*/}
            {moment(completeData?.visitDate).format('DD MMMM YYYY')}
          </CustomText>
          <Image
            source={Images.clock_outlined}
            style={{ width: 14, height: 14, marginHorizontal: 10 }} resizeMode="contain"
          />
          <CustomText fontWeight={fontsFamily.bold} style={styles.subText}>
            {/* {completeData?.visitDate} */}
            {moment(completeData?.visitDate).format('hh:mm A')}
          </CustomText>
        </View>

        {/* {(role == 'SuperAdmin' || role == 'Admin') && (
          <View
            style={{
              flex: 0.5,
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <CustomText
              fontWeight={fontsFamily?.regular}
              style={{
                color: colors?.black,
                fontSize: width * 0.03,
              }}>
              {completeData?.residentName}
            </CustomText>
            <TouchableOpacity activeOpacity={1} style={styles.forwardBtn}>
              <Image
                source={Images.forward}
                style={styles.img}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )} */}
        {role === 'User' && (
          <View style={{ flex: 0.5 }}>
            {/* {isAdmin?.} */}
            {!invites ? (
              <>
                <PrimaryButton
                  onPress={() => setShowEditModal(true)}
                  customStyle={styles.btnStyle}
                  title={'Edit'}
                />
                <PrimaryButton
                  onPress={() => AlertFunction()}
                  loader={loader}
                  customStyle={styles.btnStyle}
                  outlined
                  title={'Delete'}
                />

                <WarningModal
                  visible={errorModal1}
                  close={setErrorModal}
                  text={errorModalText}
                  type={alertWarning}
                  button={true}
                  warning={deleteVisitor}
                  cancel={() => setErrorModal1(false)}
                />
              </>
            ) : isWalkin ? (
              <>
                {!completeData?.approval ? (
                  <PrimaryButton
                    onPress={() => {
                      handleWalkinStatus(true);
                    }}
                    customStyle={styles.btnStyle}
                    title={'Accept'}
                    loader={invitationLoader}
                  />
                ) : (
                  <PrimaryButton
                    onPress={() => {
                      handleWalkinStatus(false);
                    }}
                    loader={invitationLoader}
                    customStyle={styles.btnStyle}
                    outlined
                    title={'Decline'}
                  />
                )}
              </>
            ) : (
              <>
                {!completeData?.approval && (
                  <PrimaryButton
                    onPress={() => {
                      handleStatus(true);
                    }}
                    customStyle={styles.btnStyle}
                    title={'Accept'}
                    loader={invitationLoader}
                  />
                )}
                {completeData?.approval == null && (
                  <PrimaryButton
                    onPress={() => {
                      handleStatus(false);
                    }}
                    loader={invitationLoader}
                    customStyle={styles.btnStyle}
                    outlined
                    title={'Decline'}
                  />
                )}
              </>
            )}
          </View>
        )}
        <EditModal
          modalVisible={showEditModal}
          closeModal={() => {
            setShowEditModal(false);
            getData();
          }}
          data={completeData}
        />
      </TouchableOpacity>
      <View style={{ height: 1, width: '100%', backgroundColor: colors.primary }} />


      <Modal
        visible={showDetailModal}
        onRequestClose={() => setShowDetailModal(false)}>
        <SafeAreaView style={[styles.modalMain, { width: "100%", alignSelf: 'center' }]}>
          <ImageBackground source={Images.darkBG} style={{ ...styles.modalMain, paddingHorizontal: width * 0.05, }}>
            <Header
              onBack={() => setShowDetailModal(false)}
              title={'Visitor Detail'}
              showRightBtn={false}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: height * 0.04,
                // backgroundColor: 'red'
              }}>
              <View style={styles.modalTopImage}>
                <Image
                  resizeMode="contain"
                  style={[styles.img1, { borderRadius: width / 2 }]}
                  source={Images?.userresident}
                />
              </View>
              <View style={styles.modalTopHeading}>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{ ...styles.modalTopHeadingText, color: colors.primary }}>
                  {completeData?.visitorName}
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.modalTopHeadingText}>
                  {completeData?.contactNo}
                </CustomText>
              </View>
              <View style={{ marginTop: 20 }} />
              <CustomText
                fontWeight={fontsFamily.bold}
                style={styles.modalDetailsText}>
                {'Visitation Details'}
              </CustomText>
              <VisitorDetailView label={'Expected Arrival'} text={moment(completeData?.visitDate).format('hh:mm A')} img={Images.clock_outlined} />
              <VisitorDetailView label={'Resident Name'} text={completeData?.residentName} img={Images.userIcon} />
              <VisitorDetailView label={'Unit'} text={`${completeData?.building}, ${completeData?.apartment}`} img={Images.unitNumber} />
              <VisitorDetailView label={'Purpose of Visit'} text={completeData?.purpose} img={Images.purposeOfVisit} />
              <VisitorDetailView label={'Number of Visitors'} text={completeData?.persons} img={Images.noOfVisitors} />
              {/* <VisitorDetailView label={'Visitor CNIC'} text={completeData?.nationalID} img={Images.userIcon} />
              <VisitorDetailView label={'Vehicle No:'} text={completeData?.vehicleNo} img={Images.userIcon} /> */}

              <View style={{ marginTop: 24 }}>
                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={styles.modalDetailsText}>
                  {'Check In-Out Activities'}
                </CustomText>
              </View>
              <VisitorDetailView label={'Checked-In'} text={moment(completeData?.visitDate).format('hh:mm A')} img={Images.clock_outlined} />
              <VisitorDetailView label={'Checked-Out'} text={moment(completeData?.visitDate).format('hh:mm A')} img={Images.clock_outlined} />
              <VisitorDetailView label={'Total Duration'} text={moment(completeData?.visitDate).format('hh:mm A')} img={Images.clock_outlined} />


              {/* <View style={{ width: '100%', marginBottom: width * 0.02 }}>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.modalUpperLabel}>
                  Expected Arrival
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.modalUpperText}>
                  {moment(completeData?.visitDate).format('DD/MM/YYYY') +
                    ' ' +
                    moment(completeData?.visitDate).format('hh:mm a')}
                </CustomText>
              </View> */}
              {/* <View style={{ width: '100%', marginBottom: width * 0.02 }}>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.modalUpperLabel}>
                  Resident Name
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.modalUpperText}>
                  {completeData?.residentName}
                </CustomText>
              </View> */}

              {/* <View style={{ width: '100%', marginBottom: width * 0.02 }}>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.modalUpperLabel}>
                  Unit
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={
                    styles.modalUpperText
                  }>{`${completeData?.building}, ${completeData?.apartment}`}</CustomText>
              </View> */}
              {/* <View style={{ width: '100%', marginBottom: width * 0.02 }}>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.modalUpperLabel}>
                  Purpose of Visit
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.modalUpperText}>
                  {completeData?.purpose}
                </CustomText>
              </View> */}
              {/* <View style={{ width: '100%', marginBottom: width * 0.02 }}>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.modalUpperLabel}>
                  Number of Visitors
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.modalUpperText}>
                  {completeData?.persons}
                </CustomText>
              </View> */}
              {/* <View style={{ width: '100%', marginBottom: width * 0.02 }}>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.modalUpperLabel}>
                  Visitor CNIC
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.modalUpperText}>
                  {completeData?.nationalID}
                </CustomText>
              </View> */}
              {/* <View style={{ width: '100%', marginBottom: width * 0.02 }}>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.modalUpperLabel}>
                  Vehicle No:
                </CustomText>
                <CustomText
                  fontWeight={fontsFamily.regular}
                  style={styles.modalUpperText}>
                  {completeData?.vehicleNo}
                </CustomText>
              </View> */}
              {/* <CustomText fontWeight={fontsFamily.bold} style={styles.modalDetailsText}>{'Checked In-Out Activities'}</CustomText>
                        <View style={{ width: '100%', marginBottom: width * 0.02 }}>
                            <CustomText fontWeight={fontsFamily.regular} style={styles.modalUpperLabel}>Checked-In</CustomText>
                            <CustomText fontWeight={fontsFamily.regular} style={styles.modalUpperText}>{completeData?.checkIn ? moment(completeData?.checkIn).format('DD/MM/YYYY hh:mm A') : '-'}</CustomText>
                        </View>
                        <View style={{ width: '100%', marginBottom: width * 0.02 }}>
                            <CustomText fontWeight={fontsFamily.regular} style={styles.modalUpperLabel}>Checked-Out</CustomText>
                            <CustomText fontWeight={fontsFamily.regular} style={styles.modalUpperText}>{completeData?.checkOut ? moment(completeData?.checkOut).format('DD/MM/YYYY hh:mm A') : '-'}</CustomText>
                        </View>
                        <View style={{ width: '100%', marginBottom: width * 0.02 }}>
                            <CustomText fontWeight={fontsFamily.regular} style={styles.modalUpperLabel}>Duration</CustomText>
                            <CustomText fontWeight={fontsFamily.regular} style={styles.modalUpperText}>{completeData?.duration ? completeData?.duration : '-'}</CustomText>
                        </View> */}
            </ScrollView>
          </ImageBackground>
        </SafeAreaView>
      </Modal >
    </>
  );
};

export default DetailCard;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // padding: 20, //old
    padding: 10,
    // borderRadius: width * 0.06,
    // borderColor: colors.gray,
    marginVertical: 7,
    marginBottom: 10
  },
  btnStyle: {
    marginVertical: width * 0.012,
    padding: width * 0.015,
    borderRadius: 1,
  },
  title: {
    color: colors.black,
    fontSize: width * 0.045,
  },
  subText: {
    color: colors.black,
    fontSize: width * 0.026,
    marginHorizontal: 4,
  },
  forwardBtn: {
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width / 2,
    borderColor: colors.black,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '50%',
    height: '50%',
  },
  img1: {
    width: '100%',
    height: '100%',
  },
  modalMain: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal: width * 0.05,
  },
  modalTopImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width / 2,
    alignSelf: 'center',
    elevation: 10,
    marginTop: width * 0.05,
  },
  modalTopHeading: {
    width: width * 0.4,
    alignSelf: 'center',
    // backgroundColor:'red',
    marginVertical: width * 0.03,
  },
  modalTopHeadingText: {
    color: colors.black,
    fontSize: width * 0.045,
    textAlign: 'center',
    marginBottom: width * 0.02,
  },
  modalDetailsText: {
    color: colors.black,
    fontSize: width * 0.045,
    marginBottom: width * 0.035,
  },
  modalUpperLabel: {
    color: colors.darkGray,
    fontSize: width * 0.035,
  },
  modalUpperText: {
    color: colors.black,
    fontSize: width * 0.04,
  },

  //new styles
  avatar: {
    width: 80, height: 80, resizeMode: 'contain',
    borderRadius: 40,
    margin: 8
  },
  arrow: {
    width: 20, height: 20, resizeMode: 'contain',
  }
});
