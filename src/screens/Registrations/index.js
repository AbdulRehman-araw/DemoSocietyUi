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
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { colors } from '../../styles/colors';
import { styles } from './styles/styles';
import Header from '../../components/Header/Header';
import SlideButton from '../../components/Button/SlideButton';
import DetailCard from '../../components/DetailCard';
import { apiCall } from '../../Services/apiCall';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/core';

import { useForm } from 'react-hook-form';
import RegistrationCard from './components/RegistrationCard';
const { width } = Dimensions.get('window');
// const buttonData = [
//   {
//     name: text.upcoming,
//   },
//   {
//     name: 'Walk In',
//   },
//   {
//     name: text.invities,
//   },
// ];

const adminButtonData = [
  {
    name: 'Pending',
  },
  {
    name: 'Approved',
  },
  {
    name: 'Rejected',
  },
];

const Registrations = ({ navigation, route }) => {
  // const {id} = route?.params?.data;
  const [selectedItem, setSelectedItem] = useState('Pending');
  const Details = useSelector(
    state => state.userDataReducer.userAccountDetails,
  );
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );

  // *For Set Roles
  const role = useSelector(state => state.userDataReducer.userRole);

  const [residentData, setResidentData] = useState([]);
  const foucsed = useIsFocused();
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

  const getResidentData = async status => {
    try {
      const { data } = await apiCall?.getAllResidentRegistrationRequest(status);
      setResidentData(data);
    } catch (error) {
      console.log('err', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setRefreshing(true);
    if (selectedItem === 'Pending') {
      getResidentData('Pending');
      setSelectedItem('Pending')
    } else if (selectedItem === 'Approved') {
      getResidentData('Approved');
      setSelectedItem('Approved')
    } else {
      getResidentData('Rejected');
      setSelectedItem('Rejected')
    }
  }, [selectedItem, foucsed]);

  // useEffect(() => {
  //   const find = servicePermission?.find(e => e.id == id);
  //   setPermission(find);
  // }, [servicePermission]);

  const onRefresh = () => {
    setRefreshing(true);

    getResidentData(selectedItem);

    // After refreshing is done, set refreshing to false
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        backgroundColor={colors.white}
        barStyle="dark-content"
        translucent={false}
      />

      <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
        <Header onBack={goBack} title={'Resident Registration'} />

        <SlideButton
          data={role === 'User' ? buttonData : adminButtonData}
          selectedItem={selectedItem}
          handleBtn={setSelectedItem}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {residentData?.length > 0 ? (
            residentData?.map((val, i) => (
              <RegistrationCard
                isWalkin={true}
                invites={true}
                key={i}
                getData={getResidentData}
                completeData={val}
              />
            ))
          ) : (
            <View style={styles.noData}>
              <Text style={styles.noDataText}>No Registrations</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Registrations;
