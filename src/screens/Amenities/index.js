import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Text,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';
import Header from '../../components/Header/Header';
import { Images } from '../../assets/Images';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { apiCall } from '../../Services/apiCall';
import { fontsFamily } from '../../assets/Fonts';
import AmenityCard from '../Amenities/AmenityCard';
import FilledTextField from '../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';

const { width, height } = Dimensions.get('screen');

const Amenities = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { id } = route?.params?.data ?? { id: null };
  const { control } = useForm();

  const role = useSelector(state => state.userDataReducer.userRole);
  const Details = useSelector(
    state => state.userDataReducer.userAccountDetails,
  );
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );

  const [permission, setPermission] = useState({});
  const [refreshing, setRefreshing] = useState(false);

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

  const [amenities, setAmenities] = useState([]);
  const [loader, setLoader] = useState(false);

  const getAmenities = async () => {
    setLoader(true);
    try {
      const { data } = await apiCall.getAmenities(Details?.societyID);
      setAmenities(data);
    } catch (error) {
      console.log('file: index.js:54 => getAmenities => error:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getAmenities();
  }, [isFocused]);

  useEffect(() => {
    const find = servicePermission?.find(e => e.id == id);
    setPermission(find);
  }, [servicePermission]);

  const onRefresh = () => {
    setRefreshing(true);

    // Put your refresh logic here, for example:
    getAmenities();

    // After refreshing is done, set refreshing to false
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <ImageBackground source={Images.darkBG} style={{ flex: 1, }}>

        <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
          <Header
            onBack={goBack}
            title={'Amenities'}
            showRightBtn={
              permission?.canAdd ? (role == 'User' ? false : true) : false
            }
            icon={Images.newAdd}
            handleRightBtn={() => navigation.navigate('createAmenity')}
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
            rightIconStyle={{ flex: 0.4 }}
            containerStyle={{
              borderRadius: 12,
              marginTop: width * 0.05,
              backgroundColor: colors.white,
              borderWidth: 1,
            }}
            isLeftSearch={true}
          />
          {/* <ScrollView style={{ paddingHorizontal: width * 0.01, marginTop: 10, paddingBottom: height * 0.15 }}> */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingHorizontal: width * 0.01,
              marginTop: 10,
              paddingBottom: height * 0.15,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {loader ? (
              <ActivityIndicator size={'small'} color={colors.primary} />
            ) : amenities?.length > 0 ? (
              <FlatList
                scrollEnabled={false}
                data={amenities.reverse()}
                contentContainerStyle={{paddingBottom:100,flexGrow:1}}
                renderItem={({ item }) => (
                  <AmenityCard data={item} permission={permission} />
                )}
                keyExtractor={item => item.id}
              />
            ) : (
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: width * 0.035,
                    fontFamily: fontsFamily.medium,
                  }}>
                  No Aminities data
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Amenities;
