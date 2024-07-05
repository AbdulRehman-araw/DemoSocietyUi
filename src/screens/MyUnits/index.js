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
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../styles/colors';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import {styles} from './styles/styles';
import {fontsFamily} from '../../assets/Fonts';
import {Images} from '../../assets/Images';
import UserCard from './UserCard';
import {useState} from 'react';
import {apiCall} from '../../Services/apiCall';
import {useSelector} from 'react-redux';
import {Fragment} from 'react';
import {useIsFocused} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const MyUnits = ({navigation}) => {
  const userData = useSelector(state => state.userDataReducer.userData);

  console.log('🚀 ~ MyUnits ~ userData:', userData);
  const isFocused = useIsFocused();

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

  const [loader, setLoader] = useState(false);
  const [myUnits, setMyUnits] = useState();

  const getMyUnits = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getMyUnits(
        userData?.apartmentID,
        userData?.accountID,
      );
      console.log('🚀 ~ file: index.js:62 ~ getMyUnits ~ data:', data);
      setMyUnits(data);
    } catch (error) {
      console.log('🚀 ~ file: index.js:65 ~ getMyUnits ~ error:', error);
    } finally {
      setLoader(false);
    }
  };

  const getRentalUnits = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getRentalUnits(
        userData?.apartmentID,
        userData?.accountID,
      );
      setMyUnits(data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (userData?.isRental) {
      getRentalUnits();
    } else {
      getMyUnits();
    }
  }, [isFocused]);

  // console.log(myUnits)

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.03, flex: 1}}>
        <Header
          onBack={goBack}
          title={'My Units'}
          showRightBtn={userData?.isOwner && true}
          handleRightBtn={() => navigation.navigate('myUnitsAdd')}
          iconText="Add New"
        />

        {loader ? (
          <ActivityIndicator size={'small'} color={colors.primary} />
        ) : (
          <View>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={{
                color: colors.black,
                fontSize: width * 0.04,
                marginTop: width * 0.06,
              }}>
              Residents
            </CustomText>

            <UserCard
              id={myUnits?.owner?.id}
              name={myUnits?.owner?.name}
              relation={myUnits?.owner?.unitType}
              prefixImage={Images.maleuser}
            />

            {myUnits?.resident?.length > 0 && (
              <FlatList
                data={myUnits?.resident}
                renderItem={({item}) => (
                  <UserCard
                    id={item?.id}
                    name={item?.name}
                    relation={item?.unitType}
                    prefixImage={Images.maleuser}
                  />
                )}
                keyExtractor={item => item.id}
              />
            )}
            {myUnits?.rental && (
              <Fragment>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{
                    color: colors.black,
                    fontSize: width * 0.04,
                    marginTop: width * 0.06,
                  }}>
                  Tenant
                </CustomText>
                <UserCard
                  id={myUnits?.rental?.rentalOwnerId}
                  name={myUnits?.rental?.name}
                  relation={myUnits?.rental?.unitType}
                  prefixImage={Images.maleuser}
                  isRental={true}
                />
              </Fragment>
            )}
            {myUnits?.maid?.length > 0 && (
              <Fragment>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{
                    color: colors.black,
                    fontSize: width * 0.04,
                    marginTop: width * 0.06,
                  }}>
                  Maid
                </CustomText>

                <FlatList
                  data={myUnits?.maid}
                  renderItem={({item}) => (
                    <UserCard
                      id={item?.id}
                      name={item?.name}
                      relation={item?.unitType}
                      prefixImage={Images.maleuser}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </Fragment>
            )}

            {myUnits?.driver?.length > 0 && (
              <Fragment>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{
                    color: colors.black,
                    fontSize: width * 0.04,
                    marginTop: width * 0.06,
                  }}>
                  Driver
                </CustomText>

                <FlatList
                  data={myUnits?.driver}
                  renderItem={({item}) => (
                    <UserCard
                      id={item?.id}
                      name={item?.name}
                      relation={item?.unitType}
                      prefixImage={Images.maleuser}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </Fragment>
            )}

            {myUnits?.rental?.length > 0 && (
              <Fragment>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{
                    color: colors.black,
                    fontSize: width * 0.04,
                    marginTop: width * 0.06,
                  }}>
                  Rental
                </CustomText>

                <FlatList
                  data={myUnits?.rental}
                  renderItem={({item}) => (
                    <UserCard
                      id={item?.id}
                      name={item?.name}
                      relation={item?.unitType}
                      prefixImage={Images.maleuser}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </Fragment>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyUnits;
