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
import {colors} from '../../styles/colors';
import {styles} from './styles/styles';

import Header from '../../components/Header/Header';
import SlideButton from '../../components/Button/SlideButton';
import {text} from '../../res/strings';
import FilledTextField from '../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import {Images} from '../../assets/Images';
import PrimaryButton from '../../components/Button/PrimaryButton';
import InviteVisitor from './components/InviteVisitor';
import {fontsFamily} from '../../assets/Fonts';
import DropDown from '../../components/TextField/DropDown';
import CustomModal from '../../components/Modal/CustomModal';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/apiCall';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import moment from 'moment';
import {
  cnicRegex,
  getFormattedDate,
  getFormattedTime,
} from '../../utils/helperFunction';
import {Alert} from 'react-native';
import InviteVistorSuccessfully from '../InviteVisitorSuccessfull';
import AlertModal from '../../components/Modal/AlertModal';

const Data = [
  {
    name: text.addvisitors,
  },
  {
    name: text.invitevisitor,
  },
];

const {width, height} = Dimensions.get('window');

const AddVisitors = ({navigation}) => {
  // console.log(navigation)
  const {control, handleSubmit, setValue, clearErrors} = useForm();

  const [selectedItem, setSelectedItem] = useState('Visitor Form');
  const [showModal, setShowModal] = useState(false);
  // const Details = useSelector(state => state.userDataReducer.userAccountDetails);
  const [purposeList, setPurposeList] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorModal, seterrorModal] = useState(false);
  const [errorModalText, seterrorModalText] = useState('');
  const goBack = () => {
    navigation.goBack();
  };
  const getPur = async () => {
    try {
      let result = await apiCall.getPurposeList();
      // console.log('purposeList====>',result)
      setPurposeList(result?.data);
    } catch (error) {
      console.log(error);
    }
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
  useEffect(() => {
    getPur();
  }, []);

  const submit = async data => {
    setLoading(true);
    try {
      const {
        CarNumber,
        Identity_Number,
        Mobile_Number,
        Name,
        Persons,
        Purpose_of_Visit,
      } = data;
      let sortedPorpose = purposeList.find(
        val => val.purpose == Purpose_of_Visit,
      );

      let param = {
        name: Name,
        visitPurposeID: sortedPorpose.id,
        nationalID: Identity_Number,
        contactNo: Mobile_Number,
        persons: parseInt(Persons),
        vehicleNo: CarNumber,
        visitDate: moment(date).format('YYYY-MM-DDTHH:mm'),
        // visitTime: time,
        visitTime: moment(time).format('YYYY-MM-DDTHH:mm'),
      };
      setNumber(Mobile_Number);
      console.log(param);
      let result = await apiCall.postSingleForm(param);
      console.log('🚀 ~ file: index.js:122 ~ submit ~ result:', result);
      setShowSuccess(true);
      // navigation.navigate('inviteVisitorSuccessfully');
    } catch (error) {
      seterrorModalText(error);
      seterrorModal(true);
      // Alert.alert('', error)
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Add Visitor'} />

        <SlideButton
          data={Data}
          selectedItem={selectedItem}
          handleBtn={setSelectedItem}
        />

        {selectedItem === 'Invite Visitors' ? (
          <InviteVisitor navigation={navigation} purposeList={purposeList} />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
            }}>
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
                <FilledTextField
                  name={'Persons'}
                  placeholder="Persons"
                  type={'number-pad'}
                  control={control}
                  containerStyle={{width: width / 2.3}}
                  leftIconStyle={{
                    flex: 0.25,
                  }}
                  onSubmitEditing={handleSubmit(submit)}
                  rules={{
                    required: 'Persons is required',
                  }}
                  img={Images.iconawesome}
                />

                <FilledTextField
                  name={'CarNumber'}
                  placeholder="Car Number"
                  type={'default'}
                  control={control}
                  onSubmitEditing={handleSubmit(submit)}
                  containerStyle={{width: width / 2.3}}
                  leftIconStyle={{
                    flex: 0.25,
                  }}
                  // rules={{
                  //     required:"Car number is required"
                  // }}
                  img={Images.iconcar}
                />
                <View style={{width: '46%'}}>
                  <TimeDateBtn
                    variant={'primary'}
                    title={date == new Date() ? 'Date' : getFormattedDate(date)}
                    prefixIcon={true}
                    setOpen={() => [setOpen(true), setMode('date')]}
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
                title={text.invite}
                onPress={handleSubmit(submit)}
                loader={loading}
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
                    }
              }
              closeModal={() => setOpen(false)}
              date={mode == 'date' ? date : time}
              modalVisible={open}
              mode={mode}
            />
            <InviteVistorSuccessfully
              // link={}
              modalVisible={showSuccess}
              closeModal={() => {
                setShowSuccess(false);
                goBack();
              }}
              mode={'s'}
              number={number}
            />

       
          </ScrollView>
        )}
      </View>
      <AlertModal
        visible={errorModal}
        close={seterrorModal}
        text={errorModalText}
        type={'e'}
      />
    </SafeAreaView>
  );
};

export default AddVisitors;
