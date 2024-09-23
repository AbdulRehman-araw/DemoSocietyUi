import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../../styles/colors';
import Header from '../../../components/Header/Header';
import {useState} from 'react';
import CustomText from '../../../components/CustomText';
import {fontsFamily} from '../../../assets/Fonts';
import QuestionCon from './QuestionCon';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import {apiCall} from '../../../Services/apiCall';
import TimeDateBtn from '../../../components/Button/TimeDateBtn';
import {Images} from '../../../assets/Images';
import {getFormattedDate} from '../../../utils/helperFunction';
import DateTimePicker from '../../../components/Modal/DateTimePicker';
import PostDatesPicker from '../../../components/Modal/PostDatesPicker';
import AlertModal from '../../../components/Modal/AlertModal';
import LinearGradientPrimaryButton from '../../../components/Button/LinearGradientPrimaryButton';

const {width, height} = Dimensions.get('window');
const AdminModal = ({visible, close, getData, navigation}) => {
  const [postData, setPostData] = useState([
    {
      question: '',
      options: [
        {
          option: '',
        },
        {
          option: '',
        },
      ],
    },
  ]);

  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setdesc] = useState('');
  const [endTime, setEndTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('date');
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('s');
  const [modaltype, setModalType] = useState('s');

  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const addQuestion = () => {
    let temp = [...postData];
    temp.push({
      question: '',
      options: [
        {
          option: '',
        },
        {
          option: '',
        },
      ],
    });
    setPostData(temp);
  };
  const addOption = () => {
    let temp = [...postData];
    let option = temp[postData.length - 1].options;
    option.push({
      option: '',
    });
    setPostData(temp);
    // console.log(temp)
  };
  const checkQuestion = () => {
    let res = postData.find(x => x.question == '');
    if (res) {
      return true;
    }
  };

  const checkOptions = () => {
    for (let i = 0; i < postData.length; i++) {
      for (let index = 0; index < postData[i].options.length; index++) {
        if (postData[i].options[index].option == '') {
          return true;
        }
      }
    }
  };
  const handlePublish = async () => {
    if (title == '') {
      alert('Please fill the fields');
    } else if (endTime <= new Date()) {
      setErrorMessage('Invalid End Time');
    } else if (checkQuestion() || checkOptions()) {
      alert('Please fill all fields');
    } else {
      setLoader(true);

      try {
        let obj = {
          title: title,
          description: desc,
          questions: postData,
          endDate: endTime,
        };
        const {message} = await apiCall.addPolling(obj);

        setModalType('s');
        setAlertType('s');
        setErrorModalText(message);
        setErrorModal(true);
        setTimeout(() => {
          setErrorModal(false);
          close(false);
          getData();
        }, 3000);
      } catch (error) {
        alert(error);
        setAlertType('e');
      } finally {
        setLoader(false);
      }
    }
  };
  return (
    <View>
      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={modaltype}
      />

      <Modal
        visible={visible}
        animationType="fade"
        onRequestClose={() => close(false)}>
        <SafeAreaView
          style={[
            styles.mainContainer,
            {marginLeft: Platform.OS == 'ios' ? 10 : 0},
          ]}>
          <Header
            onBack={() => close(false)}
            title={'Create New'}
            showRightBtn={false}
          />
          <ScrollView
            contentContainerStyle={styles.cont}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: '100%',
              }}>
              {/* <CustomText fontWeight={fontsFamily.bold} style={styles.topText}>
                E-Polling
              </CustomText> */}
              <TextInput
                placeholder="E-Polling Title"
                placeholderTextColor={colors.gray}
                style={styles.Text}
                onChangeText={e => setTitle(e)}
              />
              <View style={{width: '100%'}}>
                <TimeDateBtn
                  variant={'light'}
                  icon={Images.newClock}
                  title={
                    endTime == new Date()
                      ? 'End Time'
                      : getFormattedDate(endTime)
                  }
                  prefixIcon={true}
                  mainContainer={{
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomColor: colors.gray,
                  }}
                  setOpen={() => [setOpen(true), setMode('endTime')]}
                />
              </View>
              {errorMessage ? (
                <CustomText
                  style={{color: colors.danger, marginBottom: width * 0.02}}>
                  {errorMessage}
                </CustomText>
              ) : null}

              <PostDatesPicker
                setDate={
                  mode == 'startTime'
                    ? e => {
                        setStartTime(e);
                      }
                    : e => {
                        setEndTime(e);
                      }
                }
                closeModal={() => setOpen(false)}
                date={mode == 'startTime' ? startTime : endTime}
                modalVisible={open}
                mode={'date'}
              />

              <TextInput
                placeholder="Description"
                placeholderTextColor={colors.gray}
                style={[styles.Text, {textAlignVertical: 'top'}]}
                multiline={true}
                numberOfLines={4}
                onChangeText={e => setdesc(e)}
              />
              {postData?.map((val, i) => (
                <QuestionCon
                  key={i}
                  state={postData}
                  setState={setPostData}
                  index={i}
                  data={val}
                />
              ))}
              <View style={styles.BtnMainCon}>
                {/* <PrimaryButton
                                onPress={() => addQuestion()}
                                title={'Add Question'}
                                customStyle={{
                                    width: '45%',
                                    paddingVertical: width * 0.02
                                }}
                                textStyle={{
                                    color: colors.white
                                }}
                            /> */}
                {/* <LinearGradientPrimaryButton
                  onPress={() => addOption()}
                  title={'Add Option'}
                  customStyle={{
                    width: '45%',
                    paddingVertical: width * 0.02,
                  }}
                  textStyle={{
                    color: colors.white,
                  }}
                /> */}
                <TouchableOpacity
                  onPress={() => addOption()}
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    marginVertical: 10,
                  }}>
                  <CustomText
                    children={'Add New Option +'}
                    fontWeight={fontsFamily.semiBold}
                    style={{fontSize: 16, color: colors.primary}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <LinearGradientPrimaryButton
              loader={loader}
              onPress={() => {
                let CQresult = checkQuestion();
                let COresult = checkOptions();
                if (CQresult || COresult) {
                  alert('fill all fields');
                } else {
                  // alert("form filled")
                  handlePublish();
                }
              }}
              title={'Publish'}
              customStyle={{
                width: '100%',
                alignSelf: 'center',
                paddingVertical: width * 0.02,
                paddingHorizontal: width * 0.05,
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default AdminModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: width * 0.03,
  },
  cont: {
    flexGrow: 1,
    paddingVertical: width * 0.06,
    paddingHorizontal: width * 0.02,
    justifyContent: 'space-between',
  },
  topText: {
    color: colors.black,
    fontSize: width * 0.04,
    marginBottom: width * 0.03,
  },
  Text: {
    width: '100%',
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.05,
    borderColor: colors.gray,
    borderBottomWidth: 1,
    // borderRadius: width * 0.03,
    fontFamily: fontsFamily.regular,
    color: colors.black,
    marginBottom: width * 0.02,
  },
  BtnMainCon: {
    width: width * 0.8,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
