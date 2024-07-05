import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  ActivityIndicator,
  Text,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import Header from '../../components/Header/Header';
import {useIsFocused} from '@react-navigation/native';
import {apiCall} from '../../Services/apiCall';
import {fontsFamily} from '../../assets/Fonts';
import SlideButton from '../../components/Button/SlideButton';
import OwnerCard from './OwnerCard';

const {width, height} = Dimensions.get('screen');

const Owners = ({navigation}) => {
  const isFocused = useIsFocused();

  const goBack = () => {
    navigation.goBack();
  };

  const handleBack = () => {
    goBack();
    return true;
  };

  const buttonData = [
    {
      name: 'Unpaid',
    },
    {
      name: 'Paid',
    },
  ];

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, []);

  const [owners, setOwners] = useState([]);
  const [loader, setLoader] = useState(false);

  const [isPaid, setIsPaid] = useState(false);

  const getOwners = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getOwners(isPaid);
      console.log('🚀 ~ file: index.js:60 ~ getOwners ~ data:', data);
      setOwners(data);
    } catch (error) {
      console.log('file: index.js:54 => getOwners => error:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getOwners();
  }, [isFocused, isPaid]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Owners'} />

        <SlideButton
          data={buttonData}
          selectedItem={isPaid ? 'Paid' : 'Unpaid'}
          handleBtn={e => (e == 'Paid' ? setIsPaid(true) : setIsPaid(false))}
        />

        <View
          style={{
            paddingHorizontal: width * 0.01,
            marginTop: 10,
            paddingBottom: height * 0.15,
          }}>
          {loader ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : owners?.length > 0 ? (
            <FlatList
              data={owners}
              renderItem={({item}) => <OwnerCard data={item} />}
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
                No owner found
              </Text>
            </View>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Owners;
