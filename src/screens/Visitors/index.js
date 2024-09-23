import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  Dimensions,
  Platform,
  BackHandler,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { colors } from '../../styles/colors';
import { styles } from './styles/styles';
import Header from '../../components/Header/Header';
import SlideButton from '../../components/Button/SlideButton';
import { text } from '../../res/strings';
import DetailCard from '../../components/DetailCard';
import DetailBar from './components/DetailBar';
import { apiCall } from '../../Services/apiCall';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/core';
import ActionSheet from 'react-native-actions-sheet';
import FilledTextField from '../../components/TextField/FilledTextField';
import CustomText from '../../components/CustomText';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import { getFormattedDate, getFormattedTime } from '../../utils/helperFunction';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { useForm } from 'react-hook-form';
import { Images } from '../../assets/Images';
import IconButton from '../../components/Button/IconButton';

const buttonData = [
  {
    name: text.upcoming,
  },
  {
    name: 'Walk In',
  },
  {
    name: text.invities,
  },
];

const adminButtonData = [
  {
    name: text.upcoming,
  },
  {
    name: 'Walk In',
  },
  {
    name: 'History',
  },
];

const { width } = Dimensions.get('window');

const Visitors = ({ navigation, route }) => {
  const { id } = route?.params?.data;
  const [selectedItem, setSelectedItem] = useState('Upcoming');
  const Details = useSelector(
    state => state.userDataReducer.userAccountDetails,
  );
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );

  // *For Set Roles
  const role = useSelector(state => state.userDataReducer.userRole);
  const [Data, setData] = useState([]);
  const [InvitesData, setInvitesData] = useState([]);
  const [walkingData, setWalkingData] = useState([]);
  const foucsed = useIsFocused();
  const [permission, setPermission] = useState({});
  const actionSheetRef = useRef(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [mode, setMode] = useState('date');
  const { control } = useForm();
  const [search, setSearch] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const [isSelected, setIsSelected] = useState(true)
  const changeButtonSeletionHandler = () => {
    setIsSelected(!isSelected)
  }

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

  const SearchText = text => {
    setSearch(text);
  };

  const getData = async (searchKey, startTimeKey, endTimeKey) => {
    const search = searchKey ? searchKey : '';
    setData([]);
    try {
      if (role === 'User') {
        const { data } = await apiCall.getVisitor(
          Details?.accountID,
          selectedItem == 'Upcoming' ? true : false,
        );
        console.log("🚀 ~ getData ~ data:", data)
        setData(data?.visitorsList);
      } else {
        const formattedStartTime = startTimeKey ? startTime.toISOString() : '';
        const formattedEndTime = endTimeKey ? endTime.toISOString() : '';

        const { data } = await apiCall.getAllVisitor(
          selectedItem == 'Upcoming' ? true : false,
          search,
          formattedStartTime,
          formattedEndTime,
        );
        console.log("🚀 ~ getData ~ data:", data)
        setData(data?.visitorsList);
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  const getInvitesData = async () => {
    try {
      if (role === 'User') {
        const { data } = await apiCall?.getInvitesVisitor();
        setInvitesData(data);
      }
    } catch (error) {
      setData([]);
      console.log('err', error);
    }
  };

  const getWalkingData = async () => {
    try {
      if (role === 'User') {
        const { data } = await apiCall.getWalkingdata(Details?.accountID);
        setWalkingData(data);
      } else {
        const { data } = await apiCall.getAllWalkingdata();
        setWalkingData(data);
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    if (selectedItem == 'Invities') {
      getInvitesData();
    } else if (selectedItem === 'Walk In') {
      getWalkingData();
    } else {
      getData();
    }
  }, [selectedItem, foucsed]);

  useEffect(() => {
    const find = servicePermission?.find(e => e.id == id);
    setPermission(find);
  }, [servicePermission]);

  const onRefresh = () => {
    setRefreshing(true);
    if (selectedItem == 'Invities') {
      getInvitesData();
    } else if (selectedItem === 'Walk In') {
      getWalkingData();
    } else {
      getData();
    }

    // After refreshing is done, set refreshing to false
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      <ImageBackground source={Images.darkBG} style={styles.root}>
        <StatusBar
          translucent={false}
          backgroundColor={colors.white}
          barStyle="dark-content"
        />

        <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
          <Header
            onBack={goBack}
            title={'Visitors'}
            showRightBtn={true}
            // iconText={
            //   role == 'User'
            //     ? 'Invite'
            //     : role != 'User' && selectedItem === 'Walk In'
            //       ? 'Add'
            //       : 'Filter'
            // }
            handleRightBtn={
              role === 'User'
                ? () => navigation.navigate('addVisitors')
                : role != 'User' && selectedItem === 'Walk In'
                  ? () => navigation.navigate('AddWalkinVisitor')
                  : () => actionSheetRef.current.show()
            }
          />

          {/* <SlideButton
          data={role === 'User' ? buttonData : adminButtonData}
          selectedItem={selectedItem}
          handleBtn={setSelectedItem}
        /> */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 20 }}>

            <IconButton bgColor={colors.lightBackground} btnText={'Upcoming'} onPress={changeButtonSeletionHandler} isSelected={isSelected} img={Images.userInActive} />
            <IconButton bgColor={colors.lightBackground} btnText={'History'} onPress={changeButtonSeletionHandler} isSelected={!isSelected} img={Images.timeIcon} />
          </View>

          {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
        }} > */}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {selectedItem === 'Walk In' &&
              walkingData?.map((val, i) => (
                <DetailCard
                  isWalkin={true}
                  invites={true}
                  key={i}
                  getData={getWalkingData}
                  completeData={val}
                />
              ))}
            {selectedItem === 'Invities' &&
              InvitesData?.map(item => (
                <DetailBar
                  accepted={item?.totalAccepted ? item?.totalAccepted : '-'}
                  totalVisitors={item?.totalVisitors ? item?.totalVisitors : '-'}
                  pendingApproval={item?.totalPending ? item?.totalPending : '-'}
                  inviteData={item}
                  getInvitesData={getInvitesData}
                />
              ))}
            {Data?.length > 0 || InvitesData ? (
              selectedItem !== 'Invities' && selectedItem !== 'Walk In' ? (
                Data?.map((val, i) => (
                  <DetailCard
                    invites={false}
                    key={i}
                    getData={getData}
                    completeData={val}
                  />
                ))
              ) : (
                InvitesData?.invites &&
                InvitesData?.invites.map((val, i) => (
                  <DetailCard
                    invites={true}
                    key={i}
                    getData={getInvitesData}
                    completeData={val}
                  />
                ))
              )
            ) : (
              <View style={styles.noData}>
                <Text style={styles.noDataText}>No Visitors</Text>
              </View>
            )}
          </ScrollView>
        </View>
        <ActionSheet
          defaultOverlayOpacity={0.9}
          ref={actionSheetRef}
          containerStyle={{
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            padding: 6,
            // height: 300,
            width: '100%',
          }}
          indicatorStyle={{
            width: 0,
          }}
          gestureEnabled={true}>
          <View style={{}}>
            <FilledTextField
              name={'Search'}
              placeholder=" Search"
              type={'default'}
              control={control}
              justChange={SearchText}
              variant="outlined"
              showRightIcon={true}
              rightIconImg={Images.search}
              rightIconStyle={{ flex: 0.4 }}
              containerStyle={{
                borderRadius: 12,
                marginTop: width * 0.1,
                backgroundColor: colors.white,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <View style={{ width: '47%', height: width * 0.2 }}>
                <TimeDateBtn
                  variant={'light'}
                  icon={Images.calendar}
                  title={
                    startTime == new Date() ? '' : getFormattedDate(startTime)
                  }
                  prefixIcon={true}
                  setOpen={() => [setOpen(true), setMode('startTime')]}
                />
              </View>
              <View style={{ width: '47%' }}>
                <TimeDateBtn
                  variant={'light'}
                  icon={Images.calendar}
                  title={endTime == new Date() ? '' : getFormattedDate(endTime)}
                  prefixIcon={true}
                  setOpen={() => [setOpen1(true), setMode('endTime')]}
                />
              </View>
            </View>
            <PrimaryButton
              onPress={() => {
                getData(search, startTime, endTime);
                actionSheetRef.current.hide();
              }}
              customStyle={styles.btnStyle}
              title={'Find'}
            />

            <View style={{ height: 50 }} />

            <DateTimePicker
              setDate={e => {
                setStartTime(e);
              }}
              closeModal={() => setOpen(false)}
              date={startTime}
              modalVisible={open}
              mode={'date'}
            />

            <DateTimePicker
              setDate={e => {
                setEndTime(e);
              }}
              closeModal={() => setOpen1(false)}
              date={endTime}
              modalVisible={open1}
              mode={'date'}
            />
          </View>
        </ActionSheet>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Visitors;
