import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../styles/colors';
import {text} from '../../../res/strings';
import FilledTextField from '../../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import {Images} from '../../../assets/Images';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import DropDown from '../../../components/TextField/DropDown';
import TimeDateBtn from '../../../components/Button/TimeDateBtn';
import DateTimePicker from '../../../components/Modal/DateTimePicker';
import CustomModal from '../../../components/Modal/CustomModal';
import {
  getFormattedDate,
  getFormattedTime,
} from '../../../utils/helperFunction';
import {apiCall} from '../../../Services/apiCall';
import InviteVistorSuccessfully from '../../InviteVisitorSuccessfull';
import AlertModal from '../../../components/Modal/AlertModal';
import moment from 'moment';
const buttonData = [
  {
    name: text.upcoming,
  },
  {
    name: text.invities,
  },
];

const {width, height} = Dimensions.get('window');

const InviteVisitor = ({navigation, purposeList}) => {
  const {control, handleSubmit, setValue, clearErrors} = useForm();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('date');
  const [link, setLink] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorModal, seterrorModal] = useState(false);
  const [errorModalText, seterrorModalText] = useState('');
  // const [purposeList, setPurposeList] = useState([])

  // const { control, handleSubmit, setValue, clearErrors } = useForm();
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
  const submit = async data => {
    // console.log('sortedPorpose')
    try {
      const {Persons, Purpose_of_Visit} = data;
      let sortedPorpose = purposeList.find(
        val => val.purpose == Purpose_of_Visit,
      );

      let param = {
        visitPurposeID: sortedPorpose.id,
        persons: parseInt(Persons),
        visitDate: moment(date).format('YYYY-MM-DDTHH:mm'),
        visitTime: moment(time).format('YYYY-MM-DDTHH:mm'),
      };
      console.log(param);
      let result = await apiCall.postMultipleForm(param);
      console.log('🚀 ~ file: InviteVisitor.js:77 ~ submit ~ result:', result);
      setLink(result?.data);
      setShowSuccess(true);
      // navigation.navigate('inviteVisitorSuccessfully');
    } catch (error) {
      seterrorModalText(error);
      seterrorModal(true);
      // alert('', error)
      console.log(error);
    }
    // console.log('data', data)
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <DateTimePicker
        setDate={
          mode == 'date'
            ? e => {
                setDate(e);
              }
            : e => {
                setTime(e);
              }
        }
        closeModal={() => setOpen(false)}
        date={date}
        modalVisible={open}
        mode={mode}
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <View style={{flex: 0.7, marginTop: 40}}>
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
              setShowModal(true);
            }}
          />
          <FilledTextField
            name={'Persons'}
            placeholder="Persons"
            type={'number-pad'}
            control={control}
            leftIconStyle={{
              width: width * 0.03,
              height: width * 0.03,
            }}
            img={Images.iconawesome}
            onSubmitEditing={handleSubmit(submit)}
            rules={{
              required: 'Persons is required',
            }}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TimeDateBtn
              variant={'primary'}
              title={date == new Date() ? 'Date' : getFormattedDate(date)}
              prefixIcon={true}
              setOpen={() => [setOpen(true), setMode('date')]}
            />
            {/* <TimeDateBtn variant={'primary'} title={'Date'} prefixIcon={true} setOpen={() => [setOpen(true), setMode('date')]} /> */}
            <TimeDateBtn
              variant={'primary'}
              title={time == new Date() ? 'Time' : getFormattedTime(time)}
              prefixIcon={true}
              setOpen={() => [setOpen(true), setMode('time')]}
            />
            {/* <TimeDateBtn variant={'primary'} title={'Time'} prefixIcon={true} setOpen={() => [setOpen(true), setMode('time')]} /> */}
          </View>
        </View>
        <View style={{top: width * 0.1}}>
          <PrimaryButton
            onPress={handleSubmit(submit)}
            customStyle={{padding: width * 0.03, width: '100%'}}
            title={text.invite}
          />
        </View>
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
      <InviteVistorSuccessfully
        modalVisible={showSuccess}
        closeModal={() => {
          setShowSuccess(false);
          goBack();
        }}
        mode={'a'}
        link={link}
      />
      <AlertModal
        visible={errorModal}
        close={seterrorModal}
        text={errorModalText}
        type={'e'}
      />
    </SafeAreaView>
  );
};

export default InviteVisitor;
