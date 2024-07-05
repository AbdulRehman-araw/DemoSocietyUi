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
import EmployeeCard from './EmployeeCard';
import FilledTextField from '../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';

const {width, height} = Dimensions.get('screen');

const Employee = ({navigation}) => {
  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const [modalVisible, setModalVisible] = useState(false);

  const [allAdmins, setAllAdmins] = useState([]);

  const {control} = useForm();

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

  const [allEmployee, setAllEmployee] = useState([]);
  const [loader, setLoader] = useState(false);

  const getAllEmployee = async searchKey => {
    setLoader(true);
    try {
      const search = searchKey ? searchKey : '';
      const {data} = await apiCall.getAllEmployee(search);
      setAllEmployee(data);
    } catch (error) {
      console.log('file: index.js:54 => getEForms => error:', error);
    } finally {
      setLoader(false);
    }
  };

  // const GetAllAdmins = async (searchKey) => {
  //   setLoader(true)
  //   try {
  //     const search = searchKey ? searchKey : ''
  //     const { data } = await apiCall.GetAllAdmins(search)
  //     console.log('file: index.js:36 => EmployeeData => data:', data)
  //     setAllAdmins(allEmployee)
  //   } catch (error) {
  //     console.log('file: index.js:45 => getFacilityBooking => error:', error)
  //   } finally {
  //     setLoader(false)
  //   }
  // }

  useEffect(() => {
    getAllEmployee();
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Employees'} showRightBtn={true} />

        <FilledTextField
          name={'Search'}
          placeholder=" Search"
          type={'default'}
          control={control}
          justChange={e => getAllEmployee(e)}
          variant="outlined"
          showRightIcon={true}
          rightIconImg={Images.search}
          rightIconStyle={{flex: 0.4}}
          containerStyle={{borderRadius: 12, backgroundColor: colors.white}}
        />

        <View
          style={{
            paddingHorizontal: width * 0.01,
            flex: 1,
            marginTop: 10,
            paddingBottom: height * 0.07,
          }}>
          {loader ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : allEmployee?.length > 0 ? (
            <FlatList
              data={allEmployee}
              renderItem={({item}) => <EmployeeCard data={item} />}
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
                No employees found
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Employee;
