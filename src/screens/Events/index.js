import {
  TouchableOpacity,
  Image,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  Dimensions,
  Platform,
  BackHandler,
  Alert,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import {styles} from './styles/styles';

import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import SlideButton from '../../components/Button/SlideButton';
import {text} from '../../res/strings';
import {Images} from '../../assets/Images';
import {fontsFamily} from '../../assets/Fonts';
import ListCon from './ListCon';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/apiCall';
import {ActivityIndicator} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import FilledTextField from '../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';

const buttonData = [
  {
    name: text.myevents,
  },
  {
    name: text.community,
  },
];

const {width} = Dimensions.get('window');

const Events = ({navigation, route}) => {
  const {id} = route?.params?.data || {};

  const data = route.params;

  const isFocused = useIsFocused();
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );
  const role = useSelector(state => state.userDataReducer.userRole);
  const {control} = useForm();

  const [selectedItem, setSelectedItem] = useState('My Events');
  const [events, setEvents] = useState([]);
  const [loader, setLoader] = useState(false);
  const [permission, setPermission] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  // const [myEvent, setMyEvent] = useState(data)
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

  const getEvents = async type => {
    setLoader(true);
    try {
      setSelectedItem(type);
      if (type == 'My Events') {
        let result = await apiCall.getFacilityBookingByUser('', true, 100, 1);
        setEvents(result?.data?.bookings);
      } else {
        let result = await apiCall.getEvents();
        setEvents(result?.data);

        console.log('🚀 ~ file: index.js:89 ~ getEvents ~ e:', e);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  // useEffect(() => {
  //   if ('#008080' !== '#008080') {
  //     getEvents('Community');
  //   } else {
  //     getEvents('My Events');
  //   }

  // }, [isFocused]);

  useEffect(() => {
    if (
      (role === 'SuperAdmin' || role === 'Admin') &&
      data?.color !== '#008080'
    ) {
      getEvents('Community');
      // getEvents('My Events');
    } else {
      getEvents('My Events');
    }
  }, [isFocused, role]);

  const onRefresh = () => {
    setRefreshing(true);

    if (role === 'SuperAdmin' || role === 'Admin') {
      getEvents('Community');
    } else {
      getEvents('My Events');
    }
    setRefreshing(false);
  };

  useEffect(() => {
    const find = servicePermission?.find(e => e.id == id);
    setPermission(find);
  }, [servicePermission]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors?.white}
        barStyle="dark-content"
      />

      <ImageBackground source={Images.darkBG} style={{flex: 1}}>
        <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
          <Header
            onBack={goBack}
            title={'Events'}
            showRightBtn={
              permission?.canAdd ? (role === 'User' ? false : true) : false
            }
            icon={Images.newAdd}
            handleRightBtn={() => navigation.navigate('createEvent')}
          />

          <FilledTextField
            name={'Search'}
            placeholder=" Search Amenities"
            type={'default'}
            control={control}
            // justChange={e => getFacilityBooking(e)}
            variant="outlined"
            showRightIcon={true}
            rightIconImg={Images.search}
            rightIconStyle={{flex: 0.4}}
            containerStyle={{
              borderRadius: 12,
              marginTop: width * 0.05,
              backgroundColor: colors.white,
              borderWidth: 1,
            }}
            isLeftSearch={true}
          />

          {role === 'User' && (
            <SlideButton
              data={buttonData}
              selectedItem={selectedItem}
              handleBtn={type => getEvents(type)}
            />
          )}

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
            <View
              style={{paddingHorizontal: width * 0.01, flex: 1, marginTop: 10}}>
              {loader ? (
                <ActivityIndicator size={'small'} color={colors?.primary} />
              ) : events?.length > 0 ? (
                <FlatList
                  data={events}
                  numColumns={2} // Number of columns in the grid
                  contentContainerStyle={{flexGrow: 1}}
                  renderItem={({item, index}) => {
                    return (
                      <ListCon
                        navigation={navigation}
                        data={item}
                        key={index}
                      />
                    );
                  }}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors?.black,
                      fontSize: width * 0.035,
                      fontFamily: fontsFamily.medium,
                    }}>
                    No Event Found
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Events;
