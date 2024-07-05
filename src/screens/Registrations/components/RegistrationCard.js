import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { colors } from '../../../styles/colors';
import WarningModal from '../../../components/Modal/WarningModal';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import CustomText from '../../../components/CustomText';
import { fontsFamily } from '../../../assets/Fonts';
import { Images } from '../../../assets/Images';
import Header from '../../../components/Header/Header';
import ListCon from '../../Documents/ListCon';
import DocumentList from './DocumentList';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { apiCall } from '../../../Services/apiCall';
import AlertModal from '../../../components/Modal/AlertModal';
import RejectionModal from './RejectionModal';

const { width, height } = Dimensions.get('window');

const RegistrationCard = ({
  getData,
  completeData,
  invites,
  inviteStyle,
  isWalkin,
}) => {
  const [loader, setLoader] = useState(false);
  const role = useSelector(state => state.userDataReducer.userRole);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [alertType, setAlertType] = useState('s');
  const [errorModalText, setErrorModalText] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModal1, setErrorModal1] = useState(false);
  const [rejectionModal, setRejectionModal] = useState(false);
  const navigation = useNavigation();

  const handleStatus = async status => {
    setErrorModal(false);
    setErrorModal1(false);
    if (status === true) {
      try {
        let result = await apiCall.residentApproveRegistrationStatus(
          completeData?.registrationID,
          status,
        );
        setAlertType('s');
        setErrorModalText('Registration accepted successfully..');
        setErrorModal1(true);
        setTimeout(() => {
          setErrorModal1(false);
          setShowDetailModal(false);
        }, 2000);
      } catch (error) {
        setErrorModal1(true);
        setAlertType('w');
        setErrorModalText(error);
        setTimeout(() => {
          setErrorModal1(false);
          setShowDetailModal(false);
        }, 2000);
      } finally {
      }
    }
  };

  const goBack = () => {
    setShowDetailModal(false);
    navigation.goBack();
  };
  const AlertFunction = status => {
    setAlertType('c');
    setErrorModalText(
      `You won't be able to reject registration after approval`,
    );
    setErrorModal(true);
  };

  return (
    <>
      <TouchableOpacity
        // activeOpacity={1}
        onPress={
          // role == 'User'
          //   ? null
          // :
          () => {
            console.log("pressed !");
            console.log("complete data approved =====>", completeData?.isApproved);
            setShowDetailModal(true);
          }
        }
        style={[
          styles.container,
          {
            borderWidth: inviteStyle === true ? 0 : 1,
            borderBottomWidth: inviteStyle === true ? 1 : 1,
            borderRadius: inviteStyle === true ? 0 : width * 0.06,
          },
        ]}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.title}>
              {completeData?.name}
            </CustomText>
            <View style={{}}>
              <CustomText
                fontWeight={fontsFamily.regular}
                style={styles.subText}>
                Reg No: {completeData?.registrationID}
              </CustomText>
              <CustomText
                fontWeight={fontsFamily.regular}
                style={styles.subText}>
                Reg Date: {moment(completeData?.addOn).format('DD-MM-YY')}
              </CustomText>
            </View>
          </View>

          <View style={{ top: width * 0.02 }}>
            <CustomText fontWeight={fontsFamily.regular} style={styles.subText}>
              Building: {completeData?.building}
            </CustomText>
            <CustomText fontWeight={fontsFamily.regular} style={styles.subText}>
              Appartment No: {completeData?.houseNo}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>



      <Modal
        visible={showDetailModal}
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: width,
              height: width * 0.7,
              paddingHorizontal: width * 0.03,
              backgroundColor: "#0d2e51",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20
            }}>
            <Header
              onBack={goBack}
              title={'Registration Detail'}
              iconStyle={{ tintColor: colors.white }}
              textStyle={{ color: colors.white }}
              headerContainer={{ paddingTop: width * 0.1 }}
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
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              padding: width * 0.03,
              paddingBottom:
                Platform.OS === 'ios' ? width * 0.08 : width * 0.02,
            }}>
            {loader ? (
              <ActivityIndicator size={'small'} color={colors.primary} />
            ) : (
              <Fragment>
                <View style={styles.viewall}>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={styles.userheading}>
                    Resident Details
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
                        Name
                      </CustomText>

                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={styles.username}>
                        {completeData?.name}
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
                        {completeData?.building
                          ? completeData?.building +
                          ', ' +
                          completeData?.houseNo
                          : completeData?.houseNo}
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
                        {completeData?.nationalID}
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
                        Contact No
                      </CustomText>

                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={styles.username}>
                        {completeData?.contactNo}
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
                        {completeData?.email}
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
                        Address
                      </CustomText>

                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={styles.username}>
                        {completeData?.addressLine1}
                      </CustomText>
                    </View>
                  </View>

                  {completeData?.vehicles?.map((item, index) => (
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


                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={styles.userheading}>
                    Resident Attachments
                  </CustomText>

                  <DocumentList data={completeData?.frc} name={'FRC'} />

                  <DocumentList
                    data={completeData?.workingLetter}
                    name={'Working letter'}
                  />

                  <DocumentList
                    data={completeData?.possessionLetter}
                    name={'Possession letter'}
                  />

                  <DocumentList
                    data={completeData?.checkingList}
                    name={'Checking list'}
                  />

                  <DocumentList
                    data={completeData?.vehicleRunningpage}
                    name={'Car running page for parking lot'}
                  />

                  <DocumentList
                    data={completeData?.ackPossession}
                    name={' Acknowledgement of possession'}
                  />

                  {
                    completeData?.isApproved == null ? (
                      <View style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        alignItems: 'center'
                      }}>
                        <View style={{
                          marginTop: 15
                        }}>
                          <PrimaryButton
                            onPress={() => {
                              setRejectionModal(true);
                            }} ƒ
                            loader={loader}
                            customStyle={styles.btnStyle}
                            outlined
                            title={'Reject'}
                          />
                        </View>
                        <View style={{
                          marginLeft: 10
                        }}>
                          <PrimaryButton
                            onPress={() => {
                              // handleStatus(true);
                              AlertFunction(true);
                            }}
                            customStyle={styles.btnStyle}
                            title={'Approve'}
                            loader={loader}
                          />
                        </View>
                      </View>
                    ) :
                      (
                        <View></View>
                      )
                  }
                </View>
              </Fragment>
            )}
          </ScrollView>
          <AlertModal
            visible={errorModal1}
            close={setErrorModal1}
            text={errorModalText}
            type={alertType}
          />
          <WarningModal
            visible={errorModal}
            close={setErrorModal}
            text={errorModalText}
            type={alertType}
            buttonTxt={'Approve'}
            button={true}
            warning={() => handleStatus(true)}
            cancel={() => setErrorModal(false)}
          />
          <RejectionModal
            setErrorModal1={setErrorModal1}
            setAlertType={setAlertType}
            setErrorModalText={setErrorModalText}
            setRejectionModal={setRejectionModal}
            rejectionModal={rejectionModal}
            completeData={completeData}
          />
        </View>
        {/* <View style={{
          height: 100,
          width: 200,
          backgroundColor: "red"
        }}></View> */}
      </Modal>
    </>
  );
};

export default RegistrationCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 1,
    borderRadius: width * 0.06,
    borderColor: colors.gray,
    marginVertical: 7,
  },
  btnStyle: {
    width: width * 0.25,
    borderRadius: width * 0.02,
    height: width * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.primary,
    fontSize: width * 0.045,
  },
  subText: {
    color: colors.darkGray,
    fontSize: width * 0.03,
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
    paddingHorizontal: width * 0.05,
  },
  modalTopImage: {
    width: width * 0.4,
    height: width * 0.4,
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
  viewname: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: width * 0.016,
  },
  name: {
    color: colors.lightdarkgray,
    fontSize: width * 0.024,
  },
  userheading: {
    color: colors.black,
    fontSize: width * 0.04,
    marginVertical: width * 0.02,
  },
  username: {
    color: colors.primary,
    fontSize: width * 0.04,
  },
});
