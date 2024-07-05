import {
  TextInput,
  BackHandler,
  Button,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import {styles} from './styles/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fontsFamily} from '../../assets/Fonts';
import CustomHeaderColor from '../../components/Header/HeaderColor';
import {Images} from '../../assets/Images';
import {apiCall} from '../../Services/apiCall';
import {ActivityIndicator} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Platform} from 'react-native';

const {width} = Dimensions.get('window');

const FacilityBooking = ({navigation}) => {
  const Details = useSelector(
    state => state.userDataReducer.userAccountDetails,
  );
  const [loader, setLoader] = useState(false);
  const [amenities, setAmenities] = useState([]);

  const foucsed = useIsFocused();

  const getAmenities = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getAmenities(Details?.societyID);
      setAmenities(data);
    } catch (error) {
      console.log('🚀 ~ file: index.js:33 ~ getAmenities ~ error:', error);
    } finally {
      setLoader(false);
    }
  };

  console.log(amenities);

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
    getAmenities();
  }, [foucsed]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{flex: 1}}>
        <Header
          onBack={goBack}
          leftarrow={{marginLeft: 10}}
          headerContainer={{paddingHorizontal: width * 0.03}}
          title={'Facility Booking'}
          showRightBtn={true}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <CustomHeaderColor
            children={'Facilities'}
            style={{fontSize: width * 0.04}}
            fontWeight={fontsFamily.bold}
          />
          {loader ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          ) : amenities?.length > 0 ? (
            amenities?.reverse()?.map((val, i) => (
              <TouchableOpacity
                activeOpacity={1}
                key={i}
                style={styles.card1}
                onPress={() =>
                  navigation.navigate('communityHall', {
                    data: val,
                  })
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  {/* <Image source={Images.communityhall} resizeMode="contain" style={{ width: width * 0.11, }} /> */}
                  <View style={{marginLeft: 20}}>
                    <CustomText
                      fontWeight={fontsFamily.bold}
                      style={{color: colors.primary, fontSize: width * 0.039}}>
                      {val?.title}
                    </CustomText>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <CustomText
                fontWeight={fontsFamily.medium}
                style={{fontSize: width * 0.035, color: colors.black}}>
                No facility booking found
              </CustomText>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FacilityBooking;
