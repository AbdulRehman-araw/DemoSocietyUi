import {
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../../../styles/colors';
import Header from '../../../components/Header/Header';
import CustomText from '../../../components/CustomText';
import { fontsFamily } from '../../../assets/Fonts';
import { useSelector } from 'react-redux';
import { apiCall } from '../../../Services/apiCall';
import { successToaster } from '../../../utils/toastConfig';
import AlertModal from '../../../components/Modal/AlertModal';
import { useState } from 'react';
import VotingModal from '../../../components/Modal/VotingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import WarningModal from '../../../components/Modal/WarningModal';
import { Images } from '../../../assets/Images';

const { height, width } = Dimensions.get('window');
const VotingScreen = ({
  visible,
  close,
  data,
  getData,
  mainState,
  setMainState,
  mainIndex,
  navigation,
  canDelete,
}) => {
  const role = useSelector(state => state.userDataReducer.userRole);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const [modaltype, setModalType] = useState('s');
  const [alertWarning, setAlertWarning] = useState('w');
  const [errorModal1, setErrorModal1] = useState(false);
  const [errorModal2, setErrorModal2] = useState(false);

  const [removalIndex, setRemovalIndex] = useState(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState('s');

  const saveVoteSubmittedState = async value => {
    try {
      await AsyncStorage.setItem('voteSubmitted', JSON.stringify(value));
    } catch (error) {
      console.error('Error saving voteSubmitted state:', error);
    }
  };

  //   const goBack = () => {
  //     navigation.goBack()
  //   }

  const getVoteSubmittedState = async () => {
    try {
      const value = await AsyncStorage.getItem('voteSubmitted');
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.error('Error retrieving voteSubmitted state:', error);
    }
    return false;
  };

  const checking = ansIndex => {
    let tempMain = [...mainState];
    let tempQuestion = tempMain[mainIndex].questions;
    tempQuestion[ansIndex];
    // mainState[mainIndex]
  };
  const postVote = async optionId => {
    try {
      let { message } = await apiCall.SubmitVote(optionId);
      // successToaster('Status', message)
      setModalType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setVoteSubmitted(true);
      saveVoteSubmittedState(true);
      // console.log("🚀 ~ file: VotingScreen.js:22 ~ postVote ~ result:", result)
      getData();
      setTimeout(() => {
        setErrorModal(false);
        close(false);
      }, 1000);
    } catch (error) {
      setModalType('e');
      setErrorModalText(error);
      setErrorModal(true);
      // alert(error)
    }
  };

  const DeletePoll = async pollingID => {
    setLoading(true);
    console.log(pollingID);
    try {
      const { message } = await apiCall.DeletePoll(pollingID);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        close(false);
        getData();
      }, 3000);
    } catch (error) {
      console.log('file: createEvent.js:53 => Voting => error:', error);
    } finally {
      setLoading(false);
    }
  };

  const AlertFunction = index => {
    if (!voteSubmitted) {
      setAlertWarning('w');
      setErrorModalText(
        "Are you sure? You won't be able to change your vote later.",
      );
      setErrorModal2(true);
      setRemovalIndex(index);
    }
  };

  const AlertFunction2 = () => {
    if (!voteSubmitted) {
      setAlertWarning('w');
      setErrorModalText('Are you sure? You want to delete this poll?');
      setErrorModal1(true);
      setRemovalIndex();
    }
  };

  useEffect(() => {
    getVoteSubmittedState().then(value => {
      setVoteSubmitted(value || false);
    });
  }, []);

  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        close(false);
        // getData()
      }}
      animationType="none">
      <SafeAreaView style={[styles.container, { width: "90%", alignSelf: 'center' }]}>
        <Header
          onBack={() => {
            close(false);
            // successToaster('','')
            // getData()
          }}
          title={data?.title}
          showRightBtn={false}
        />
        <ScrollView contentContainerStyle={styles.cont}>
          {role == 'User' ? null : (
            <View
              style={{
                flexDirection: 'row',
                // justifyContent:'center',
                alignItems: 'center',
                width: '100%',
                marginBottom: width * 0.05,
              }}>
              <CustomText
                fontWeight={fontsFamily.regular}
                style={styles.UpperText}>
                Total Votes:{' '}
              </CustomText>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.UpperText}>
                {role == 'User' ? '' : data?.totalParticipants}
              </CustomText>
            </View>
          )}
          <View style={styles.viewname}>
            <View style={{ marginBottom: width * 0.05 }}>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                Title
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={[styles.username, { color: colors.lightdarkgray }]}>
                {data.title}
              </CustomText>
            </View>
            <View>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                Description
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={[styles.username, { color: colors.lightdarkgray }]}>
                {data.description}
              </CustomText>
            </View>
          </View>

          {/* <Text>VotingScreen</Text> */}
          {data?.questions.map((val, i) => (
            <View key={i} style={styles.questionCon}>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.questionText}>
                {val?.question}
              </CustomText>
              {val?.options.map((opt, index) => (
                <TouchableOpacity
                  onPress={
                    role === 'User' ? () => AlertFunction(opt?.optionId) : null
                  }
                  key={index}
                  activeOpacity={1}
                  style={[
                    styles.OptionsCon,
                    opt?.selected || (role !== 'User' && opt?.percentage)
                      ? { backgroundColor: colors.primary }
                      : { backgroundColor: colors.white },
                  ]}>
                  <View
                    style={{
                      width: '85%',
                      // justifyContent:'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={
                        opt?.selected || (role !== 'User' && opt?.percentage)
                          ? styles.optionRadioBtnSelected
                          : styles.optionRadioBtn
                      }>
                      {opt?.selected || (role !== 'User' && opt?.percentage) ? (
                        <View style={styles.optionRadioBtnSelectedBall} />
                      ) : (
                        ''
                      )}
                    </View>
                    <View style={{ width: '85%', marginLeft: width * 0.02 }}>
                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={{
                          fontSize: width * 0.04,
                          // paddingVertical:width*0.02,
                          // width:'85%',
                          color:
                            opt?.selected ||
                              (role !== 'User' && opt?.percentage)
                              ? colors.white
                              : colors.primary,
                        }}>
                        {opt?.option}
                      </CustomText>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '15%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {(role !== 'User' || val.isVoted) && (
                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={{
                          color:
                            opt?.selected ||
                              (role !== 'User' && opt?.percentage)
                              ? colors.white
                              : colors.black,
                          fontSize: width * 0.03,
                        }}>{`${opt?.percentage}%`}</CustomText>
                    )}
                  </View>

                  <VotingModal
                    visible={errorModal2}
                    close={setErrorModal2}
                    text={errorModalText}
                    type={alertWarning}
                    button={true}
                    warning={
                      val?.isVoted || role !== 'User'
                        ? () => {
                          console.log('first');
                          // successToaster('Status','message')
                        }
                        : () => {
                          // successToaster('Status','message')
                          [postVote(removalIndex), setErrorModal2(false)];
                        }
                    }
                    cancel={() => setErrorModal2(false)}
                  />

                  {/* {role !== 'User' && (
                                        <View style={{
                                            width: `${opt?.percentage}%`,
                                            height: '100%',
                                            backgroundColor: '#E5F2F2',
                                            position: 'absolute',
                                            zIndex: -999,
                                            borderRadius: width * 0.03
                                        }}
                                        />
                                    )} */}
                </TouchableOpacity>
              ))}
            </View>
          ))}
          {role == 'User'
            ? null
            : canDelete && (
              <TouchableOpacity
                disabled={loading}
                onPress={() => AlertFunction2()}
                activeOpacity={1}
                style={{
                  width: width * 0.13,
                  height: width * 0.13,
                  marginRight: width * 0.02,
                  backgroundColor: colors.danger,
                  borderRadius: 10,
                  padding: width * 0.02,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    tintColor: colors.white,
                    width: width * 0.06,
                    height: width * 0.06,
                  }}
                  source={Images.icondelete}
                />
              </TouchableOpacity>
            )}
        </ScrollView>
      </SafeAreaView>
      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={modaltype}
      />

      <WarningModal
        visible={errorModal1}
        close={setErrorModal1}
        text={errorModalText}
        type={alertWarning}
        button={true}
        warning={() => [DeletePoll(data.pollingID), setErrorModal1(false)]}
        cancel={() => setErrorModal1(false)}
      />
    </Modal>
  );
};

export default VotingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: width * 0.04,
  },
  cont: {
    flexGrow: 1,
    paddingTop: width * 0.07,
    paddingBottom: width * 0.04,
    // backgroundColor: 'red'
  },
  UpperText: {
    color: colors.black,
    fontSize: width * 0.05,
  },
  username: {
    color: colors.primary,
    fontSize: width * 0.05,
  },
  UpperText1: {
    color: colors.black,
    fontSize: width * 0.05,
    top: width * 0.01,
  },
  username: {
    color: colors.primary,
    fontSize: width * 0.05,
  },
  questionCon: {
    width: '100%',
    marginBottom: width * 0.03,
    marginTop: width * 0.03,
  },
  questionText: {
    color: colors.black,
    fontSize: width * 0.045,
    marginBottom: width * 0.04,
  },
  OptionsCon: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: width * 0.04,
    // paddingHorizontal:width*0.03,
    marginBottom: width * 0.04,
  },
  optionRadioBtn: {
    width: width * 0.06,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: width / 2,
    padding: width * 0.03,
    marginVertical: width * 0.02,
    marginLeft: width * 0.02,
  },
  optionRadioBtnSelected: {
    width: width * 0.063,
    height: width * 0.063,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: width / 2,
    marginLeft: width * 0.02,
    marginVertical: width * 0.02,
    // padding:width*0.01
  },
  optionRadioBtnSelectedBall: {
    width: width * 0.04,
    height: width * 0.04,
    backgroundColor: colors.white,
    borderRadius: width / 2,
  },
  // optionText:{
  //     fontSize:
  // }
});
