import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import CustomText from '../CustomText';
import DatePicker from 'react-native-date-picker';
import {fontsFamily} from '../../assets/Fonts';
import {SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import FilledTextField from '../TextField/FilledTextField';
import DropDown from '../TextField/DropDown';
import TimeDateBtn from '../Button/TimeDateBtn';
import DateTimePicker from './DateTimePicker';
import {Images} from '../../assets/Images';
import {
  cnicRegex,
  getFormattedDate,
  getFormattedTime,
} from '../../utils/helperFunction';
import PrimaryButton from '../Button/PrimaryButton';
import {text} from '../../res/strings';
import moment from 'moment';
import CustomModal from './CustomModal';
import {apiCall} from '../../Services/apiCall';
import {Alert} from 'react-native';
import AlertModal from './AlertModal';
import PostDatesPicker from './PostDatesPicker';

const {width} = Dimensions.get('window');

const EditModal = ({modalVisible, closeModal, data}) => {
  const {control, handleSubmit, setValue, clearErrors} = useForm();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date(data?.visitDate));
  const [time, setTime] = useState(new Date());
  const [purposeList, setPurposeList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorModal, seterrorModal] = useState(false);
  const [errorModalText, seterrorModalText] = useState('');

  const submit = async formData => {
    try {
      const {
        CarNumber,
        Identity_Number,
        Mobile_Number,
        Name,
        Persons,
        Purpose_of_Visit,
      } = formData;
      let sortedPorpose = purposeList.find(
        val => val.purpose == Purpose_of_Visit,
      );

      let param = {
        visitId: data?.visitID,
        name: Name,
        visitPurposeID: sortedPorpose.id,
        nationalID: Identity_Number,
        contactNo: Mobile_Number,
        persons: parseInt(Persons),
        vehicleNo: CarNumber,
        visitDate: moment(date).format('YYYY-MM-DDTHH:mm'),
        visitTime: moment(time).format('YYYY-MM-DDTHH:mm'),
        // visitTime: moment(time).format(),
      };
      const res = await apiCall.editVisitor(param);

      closeModal();
    } catch (error) {
      console.log('file: EditModal.js:60 => submit => error:', error);
      seterrorModalText(error);
      seterrorModal(true);
      Alert.alert('error', error);
      console.log('error', error);
    }
    // console.log(data)
  };

  useEffect(() => {
    setValue('Name', data?.visitorName);
    setValue('Purpose_of_Visit', data?.purpose);
    setValue('Identity_Number', data?.nationalID);
    setValue('Mobile_Number', data?.contactNo);
    setValue('Persons', `${data?.persons}`);
    setValue('CarNumber', data?.vehicleNo);
    setDate(new Date(data?.visitDate));
    setTime(new Date(data?.visitDate));
    getPur();
  }, [data]);
  const getPur = async () => {
    try {
      let result = await apiCall.getPurposeList();
      // console.log('purposeList====>',result)
      setPurposeList(result?.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <StatusBar backgroundColor={colors.white} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.modalText}>
                Edit{' '}
              </CustomText>
              <TouchableOpacity style={styles.cancelCross} onPress={closeModal}>
                <Image
                  source={Images.cancelFilled}
                  resizeMode={'contain'}
                  style={{height: width * 0.05, width: width * 0.05}}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, marginTop: width * 0.09}}>
              <FilledTextField
                name={'Name'}
                placeholder="Name"
                type={'default'}
                control={control}
                onSubmitEditing={handleSubmit(submit)}
                rules={{
                  required: 'Name is required',
                }}
                img={Images.userIcon}
              />
              <DropDown
                name={'Purpose_of_Visit'}
                title="Purpose of Visit"
                type={'default'}
                control={control}
                rules={{
                  required: 'Field is required',
                }}
                img={Images.featherusers}
                onPress={() => {
                  // console.log('first',e)
                  // setCallBack()
                  setShowModal(true);
                }}
              />
              <FilledTextField
                name={'Identity_Number'}
                placeholder="Identity Number"
                type={'number-pad'}
                maxLength={13}
                control={control}
                rules={{
                  required: 'Identity Number is required',
                  pattern: {
                    value: cnicRegex,
                    message: 'Please enter a valid Cnic Number',
                  },
                }}
                onSubmitEditing={handleSubmit(submit)}
                img={Images.usercard}
              />

              <FilledTextField
                name={'Mobile_Number'}
                placeholder="Mobile Number"
                type={'number-pad'}
                maxLength={11}
                control={control}
                rules={{
                  required: 'Mobile Number is required',
                }}
                onSubmitEditing={handleSubmit(submit)}
                img={Images.userphone}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                <View style={{width: '46%'}}>
                  <FilledTextField
                    name={'Persons'}
                    placeholder="Persons"
                    type={'number-pad'}
                    control={control}
                    onSubmitEditing={handleSubmit(submit)}
                    // containerStyle={{ width: width / 2.3, }}
                    leftIconStyle={{
                      flex: 0.25,
                    }}
                    rules={{
                      required: 'Persons is required',
                    }}
                    img={Images.iconawesome}
                  />
                </View>
                <View style={{width: '46%'}}>
                  <FilledTextField
                    name={'CarNumber'}
                    placeholder="Car Number"
                    type={'default'}
                    control={control}
                    onSubmitEditing={handleSubmit(submit)}
                    // containerStyle={{ width: width / 2.3, }}
                    leftIconStyle={{
                      flex: 0.25,
                    }}
                    // rules={{
                    //     required:"Car number is required"
                    // }}
                    img={Images.iconcar}
                  />
                </View>
                <View style={{width: '46%'}}>
                  <TimeDateBtn
                    variant={'primary'}
                    title={date ? getFormattedDate(date) : 'Date'}
                    prefixIcon={true}
                    setOpen={() => [setOpen1(true), setMode('date')]}
                  />
                </View>
                <View style={{width: '47%'}}>
                  <TimeDateBtn
                    variant={'primary'}
                    title={time == new Date() ? 'Time' : getFormattedTime(time)}
                    prefixIcon={true}
                    setOpen={() => [setOpen(true), setMode('time')]}
                  />
                </View>
              </View>

              <PrimaryButton
                customStyle={{
                  padding: width * 0.03,
                }}
                title={'Submit'}
                onPress={handleSubmit(submit)}
                // navigation.navigate('inviteVisitorSuccessfully')
              />
            </View>
            <CustomModal
              data={purposeList.length <= 0 ? [] : purposeList}
              modalVisible={showModal}
              closeModal={() => setShowModal(false)}
              getvalue={e => {
                console.log('Purpose_of_Visit', e);
                setValue('Purpose_of_Visit', e);
                clearErrors('Purpose_of_Visit');
              }}
            />
            <DateTimePicker
              // setDate={e => setDate(e)}
              setDate={
                mode == 'date'
                  ? e => {
                      setDate(e);
                    }
                  : e => {
                      setTime(e);
                      console.log(
                        '🚀 ~ file: EditModal.js:274 ~ EditModal ~ e:',
                        e,
                      );
                    }
              }
              closeModal={() => setOpen(false)}
              date={mode == 'date' ? date : time}
              modalVisible={open}
              mode={mode}
            />

            <PostDatesPicker
              // setDate={e => setDate(e)}
              setDate={e => {
                setDate(e);
              }}
              closeModal={() => setOpen1(false)}
              date={date}
              modalVisible={open1}
              mode={mode}
            />
          </ScrollView>
        </View>
      </View>
      <AlertModal
        visible={errorModal}
        close={seterrorModal}
        text={errorModalText}
        type={'e'}
      />
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  modalView: {
    padding: width * 0.034,
    width: '80%',
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: width * 0.044,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: width * 0.04,
    color: colors.primary,
    padding: width * 0.025,
  },
  doneBtn: {
    textAlign: 'center',
    width: '100%',
    alignSelf: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: width * 0.02,
    marginBottom: width * 0.02,
  },
  btnText: {
    textAlign: 'center',
    fontSize: width * 0.04,
    color: colors.black,
    marginVertical: 13,
  },
  cancelCross: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 25,
    height: 25,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
