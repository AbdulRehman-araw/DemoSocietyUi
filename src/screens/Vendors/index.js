import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Text,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import Header from '../../components/Header/Header';
import {Images} from '../../assets/Images';
import {Platform} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/apiCall';
import {fontsFamily} from '../../assets/Fonts';
import ListCard from './ListCard';

const {width, height} = Dimensions.get('screen');

const Vendors = ({navigation}) => {
  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

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

  const [vendors, setVendors] = useState([]);
  const [loader, setLoader] = useState(false);

  const getVendors = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getVendors();
      setVendors(data);
    } catch (error) {
      console.log('file: index.js:54 => getVendors => error:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getVendors();
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header
          onBack={goBack}
          title={'Vendors'}
          showRightBtn={true}
          icon={Images.Addcircle}
          handleRightBtn={() => navigation.navigate('createVendor')}
        />
        <View
          style={{
            paddingHorizontal: width * 0.01,
            flex: 1,
            marginTop: 10,
            paddingBottom: height * 0.1,
          }}>
          {loader ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : vendors?.length > 0 ? (
            <FlatList
              data={vendors}
              renderItem={({item}) => <ListCard data={item} />}
              keyExtractor={item => item.id}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: width * 0.035,
                  fontFamily: fontsFamily.medium,
                }}>
                No vendors found
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Vendors;
