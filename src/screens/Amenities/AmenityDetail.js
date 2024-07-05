import {
  View,
  SafeAreaView,
  Alert,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  BackHandler,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';
import { styles } from './styles/styles';
import Header from '../../components/Header/Header';
import FilledTextField from '../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';
import { getFormattedDate, getFormattedTime } from '../../utils/helperFunction';
import { apiCall } from '../../Services/apiCall';
import AlertModal from '../../components/Modal/AlertModal';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import { useIsFocused } from '@react-navigation/native';
import { Images } from '../../assets/Images';
import WarningModal from '../../components/Modal/WarningModal';
import { baseUrl } from '../../../axios';
import { useLocalTime } from '../../utils/LocalTime';

const { width } = Dimensions.get('window');

const AmenityDetail = ({ navigation, route }) => {
  const updateData = route?.params?.data?.detail;
  const Permission = route?.params?.data?.permission;
  const isFocused = useIsFocused();
  const { control, setValue } = useForm();

  const [loading, setLoading] = useState(false);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModal1, setErrorModal1] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [alertWarning, setAlertWarning] = useState('w');

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

  const AlertFunction = () => {
    setAlertWarning('w');
    setErrorModalText('Are you sure you want to delete this amenity?');
    setErrorModal1(true);
  };

  const deleteAmenity = async id => {
    setErrorModal1(false);
    setLoading(true);
    try {
      const { message } = await apiCall.deleteAmenity(id);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    } finally {
      setLoading(false);
    }
  };

  const dateStrStart = startTime;
  const localTimeStart = useLocalTime(dateStrStart);

  const dateStrEnd = endTime;
  const localTimeEnd = useLocalTime(dateStrEnd);

  console.log(localTimeStart, startTime);

  const setDefaultData = () => {
    try {
      setValue('title', updateData?.title);
      setValue('description', updateData?.details);
      setValue('location', updateData?.location);
      setValue('managerName', updateData?.managerName);
      setValue('contactNo', updateData?.contactNo);
      setValue('minPersons', updateData?.minPersons.toString());
      setValue('maxPersons', updateData?.maxPersons?.toString());
      setStartTime(new Date(updateData?.startTime));
      setEndTime(new Date(updateData?.endTime));
    } catch (error) {
      console.log('file: index.js:148 => setDefaultData => error:', error);
    }
  };

  useEffect(() => {
    setDefaultData();
  }, [isFocused]);


  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
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
        warning={() => deleteAmenity(updateData?.id)}
        cancel={() => setErrorModal1(false)}
      />

      <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
        <Header onBack={goBack} title={'Amenity Detail'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={{ paddingHorizontal: width * 0.02 }}>
            <FilledTextField
              editable={false}
              name={'title'}
              variant={'outlined'}
              placeholder="Title"
              type={'default'}
              control={control}
            />
            <FilledTextField
              editable={false}
              name={'description'}
              variant={'outlined'}
              placeholder="Description"
              type={'default'}
              multiline={true}
              numberOfLines={4}
              customInputStyle={{ height: width * 0.3 }}
              control={control}
            />
            <FilledTextField
              editable={false}
              name={'location'}
              variant={'outlined'}
              placeholder="Location"
              type={'default'}
              control={control}
            />
            <FilledTextField
              editable={false}
              name={'managerName'}
              variant={'outlined'}
              placeholder="Manager Name"
              type={'default'}
              control={control}
            />
            <FilledTextField
              editable={false}
              name={'contactNo'}
              maxLength={11}
              variant={'outlined'}
              placeholder="Contact No."
              type={'number-pad'}
              control={control}
            />

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: width * 0.43 }}>
                <FilledTextField
                  name={'minPersons'}
                  variant={'outlined'}
                  placeholder="Min no of people"
                  type={'number-pad'}
                  maxLength={5}
                  control={control}
                />
              </View>

              <View style={{ width: width * 0.43 }}>
                <FilledTextField
                  name={'maxPersons'}
                  variant={'outlined'}
                  placeholder="Max no of people"
                  type={'number-pad'}
                  maxLength={11}
                  control={control}
                />
              </View>
            </View>

            <Image
              source={{ uri: baseUrl + updateData?.image }}
              resizeMode="center"
              style={{
                width: width * 0.5,
                height: width * 0.3,
                alignSelf: 'center',
                margin: 15,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <View style={{ width: '47%' }}>
                <Text style={{ color: colors.black, marginLeft: width * 0.02 }}>
                  Start Time
                </Text>
                <TimeDateBtn
                  variant={'light'}
                  icon={Images.time3x}
                  title={
                    startTime == new Date()
                      ? 'Start Time'
                      : getFormattedTime(updateData?.startTime)
                  }
                  prefixIcon={true}
                  setOpen={() => ''}
                />
              </View>
              <View style={{ width: '47%' }}>
                <Text style={{ color: colors.black, marginLeft: width * 0.02 }}>
                  End Time
                </Text>
                <TimeDateBtn
                  variant={'light'}
                  icon={Images.time3x}
                  title={
                    endTime == new Date()
                      ? 'End Time'
                      : getFormattedTime(updateData?.endTime)
                  }
                  prefixIcon={true}
                  setOpen={() => ''}
                />
              </View>
            </View>

            <View
              style={{
                marginVertical: width * 0.07,
                flexDirection: 'row',
                gap: 8,
                justifyContent: 'center',
              }}>
              {Permission?.canDelete && (
                <TouchableOpacity
                  disabled={loading}
                  onPress={() => AlertFunction()}
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
              {Permission?.canEdit && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('updateAmenity', { data: updateData })
                  }
                  activeOpacity={1}
                  style={{
                    width: width * 0.13,
                    height: width * 0.13,
                    marginRight: width * 0.02,
                    backgroundColor: colors.primary,
                    borderRadius: 10,
                    padding: width * 0.02,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      tintColor: colors.white,
                      width: width * 0.06,
                      height: width * 0.06,
                    }}
                    source={Images.editIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AmenityDetail;
