import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';

import Header from '../../components/Header/Header';
import {styles} from './styles/styles';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import ComplainTextField from '../../components/TextField/complainTextField';
import ComplainCard from '../../components/DetailCard/complaincard';

import {Images} from '../../assets/Images';
import {useForm} from 'react-hook-form';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import FilledTextField from '../../components/TextField/FilledTextField';
import {apiCall} from '../../Services/apiCall';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import DetailModal from './DetailModal';
import {RefreshControl} from 'react-native';
import CustomText from '../../components/CustomText';
import {fontsFamily} from '../../assets/Fonts';
import {ActivityIndicator} from 'react-native';
import PrimaryButton from '../../components/Button/PrimaryButton';

const {width} = Dimensions.get('window');

const Complain = () => {
  const Details = useSelector(
    state => state.userDataReducer.userAccountDetails,
  );
  const navigation = useNavigation();
  let isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [complains, setComplains] = useState([]);
  const {control, handleSubmit} = useForm();
  const [loader, setLoader] = useState(false);

  const [numToShow, setNumToShow] = useState(10);

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

  useEffect(() => {
    if (role == 'User') {
      getComplains();
    } else {
      getAllComplains();
    }
    // alert('called')
  }, [isFocused]);

  const loadMoreNotifications = () => {
    setNumToShow(numToShow + 10);
    console.log(numToShow);
  };

  const getComplains = async searchKey => {
    try {
      const search = searchKey ? searchKey : '';
      let result = await apiCall.getMyComplains(
        Details?.societyID,
        true,
        10,
        1,
        search,
      );
      setComplains(result?.data?.complains);
    } catch (error) {
      console.log('🚀 ~ file: index.js:52 ~ getComplains ~ error:', error);
    }
  };
  const getAllComplains = async searchKey => {
    try {
      const search = searchKey ? searchKey : '';
      let result = await apiCall.getAllComplains(
        Details?.societyID,
        true,
        1000,
        1,
        search,
      );
      setComplains(result?.data?.complains);
    } catch (error) {
      console.log('🚀 ~ file: index.js:52 ~ getComplains ~ error:', error);
    }
  };
  const {role} = useSelector(state => state.userDataReducer.userData);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      if (role == 'User') {
        getComplains();
      } else {
        getAllComplains();
      }
      setRefreshing(false);
    }, 1000);
  }, []);

  console.log(Details?.societyID);
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <DateTimePicker
        setDate={e => setDate(e)}
        closeModal={() => setOpen(false)}
        date={date}
        modalVisible={open}
      />

      <ImageBackground source={Images.darkBG} style={{flex: 1}}>
        <View style={{paddingHorizontal: width * 0.03, flex: 1}}>
          <Header
            onBack={goBack}
            title={'Complain'}
            showRightBtn={role == 'User' ? true : false}
            handleRightBtn={() => navigation.navigate('addComplain')}
            icon={Images.Addcircle}
          />

          <FilledTextField
            name={'Search'}
            placeholder=" Search"
            type={'default'}
            justChange={e => getAllComplains(e)}
            control={control}
            variant="outlined"
            showRightIcon={true}
            rightIconImg={Images.search}
            containerStyle={{
              borderRadius: 12,
              marginTop: width * 0.05,
              backgroundColor: colors.white,
              borderWidth: 1,
            }}
          />

          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TimeDateBtn setOpen={() => setOpen(true)} title={'Date'} />
          <TimeDateBtn setOpen={() => setOpen(true)} title={'Date'} />
        </View> */}

          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
            }}>
            {complains?.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size={'large'} color={colors.primary} />
              </View>
            ) : (
              complains
                ?.slice(0, numToShow)
                ?.map((item, index) => (
                  <ComplainCard
                    key={index}
                    data={item}
                    getData={getAllComplains}
                  />
                ))
            )}

            {complains?.length > numToShow && (
              <PrimaryButton
                onPress={loadMoreNotifications}
                customStyle={{
                  marginBottom: width * 0.12,
                  paddingVertical: width * 0.025,
                  paddingHorizontal: width * 0.015,
                  borderRadius: 10,
                }}
                title={'See previous Complains'}
              />
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Complain;
