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
import React, {useEffect, useState, useRef} from 'react';
import {colors} from '../../styles/colors';
import {styles} from './styles/styles';
import Header from '../../components/Header/Header';
import SlideButton from '../../components/Button/SlideButton';
import DetailCard from '../../components/DetailCard';
import {apiCall} from '../../Services/apiCall';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/core';
import TenantRegistrationCard from './components/TenantRegistrationCard';
const {width} = Dimensions.get('window');
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

const TenantRegistration = ({navigation, route}) => {
  const [selectedItem, setSelectedItem] = useState('Pending');
  const [tenantData, setTenantData] = useState([]);
  const foucsed = useIsFocused();
  const userData = useSelector(state => state.userDataReducer.userData);
  console.log("🚀 ~ TenantRegistration ~ userData:", userData)
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

  const getTenantData = async status => {
    try {
      const {data} = await apiCall?.getAllTenantRegistration(status,userData?.apartmentID);
      setTenantData(data);
    } catch (error) {
    console.log("🚀 ~ getTenantData ~ error:", error)
    }
  };

  useEffect(() => {
    if (selectedItem === 'Pending') {
      getTenantData('Pending');
    } else if (selectedItem === 'Approved') {
      getTenantData('Approved');
    } else {
      getTenantData('Rejected');
    }
  }, [selectedItem, foucsed]);

  // useEffect(() => {
  //   const find = servicePermission?.find(e => e.id == id);
  //   setPermission(find);
  // }, [servicePermission]);

  const onRefresh = () => {
    setRefreshing(true);

    getTenantData(selectedItem);

    // After refreshing is done, set refreshing to false
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Tenant Registration'} />

        <SlideButton
          data={
            // role === 'User' ? buttonData :
            adminButtonData
          }
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
          {tenantData?.length > 0 ? (
            tenantData?.map((val, i) => (
              <TenantRegistrationCard
                isWalkin={true}
                invites={true}
                key={i}
                getData={getTenantData}
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

export default TenantRegistration;
