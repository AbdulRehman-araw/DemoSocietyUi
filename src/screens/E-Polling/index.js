import {
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';

import Header from '../../components/Header/Header';
import {styles} from './styles/styles';
import ComplainTextField from '../../components/TextField/complainTextField';
import LinesDraw from '../../components/Lines/Lines';
import EPollingCard from '../../components/DetailCard/EPollingCard';
import {Images} from '../../assets/Images';
import {useForm} from 'react-hook-form';
import CustomText from '../../components/CustomText';
import FilledTextField from '../../components/TextField/FilledTextField';
import DetailPollingCard from './component/DetailPollingCard';
import {apiCall} from '../../Services/apiCall';
import {fontsFamily} from '../../assets/Fonts';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import AdminModal from './component/AdminModal';
import {RefreshControl} from 'react-native';
import PrimaryButton from '../../components/Button/PrimaryButton';

const {width} = Dimensions.get('window');

const EPolling = ({navigation, route}) => {
  const {id, serviceId} = route?.params?.data || {};
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );
  const {control, handleSubmit} = useForm();
  const role = useSelector(state => state.userDataReducer.userRole);
  const [polling, setPolling] = useState([]);
  const [showAddModal, setshowAddModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [permission, setPermission] = useState({});
  const [numToShow, setNumToShow] = useState(5);

  const loadMoreNotifications = () => {
    setNumToShow(numToShow + 5);
    console.log(numToShow);
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getPollingHandler();
  }, []);

  const getPollingHandler = async e => {
    // setLoader(true)
    setRefreshing(true);
    try {
      if (role === 'User') {
        let result = await apiCall.getPolling(e);
        setPolling(result?.data);
      } else {
        let result = await apiCall.getAdminPolling(e);
        setPolling(result?.data);
      }
    } catch (error) {
      setPolling([]);
    } finally {
      // setLoader(false)
      setRefreshing(false);
    }
  };

  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const showValue = e => {
    getPollingHandler(e);
  };

  const handleChange = debounce(e => showValue(e));
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getPollingHandler();
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const find = servicePermission?.find(e => e.id == id);
    setPermission(find);
  }, [servicePermission]);

  return (
    <>
      <SafeAreaView style={styles.root}>
        <StatusBar
          translucent={false}
          backgroundColor={colors.white}
          barStyle="dark-content"
        />
        <View style={{flex: 1}}>
          <View
            style={{
              paddingHorizontal: width * 0.05,
              backgroundColor: colors.white,
              elevation: width * 0.03,
            }}>
            <Header
              onBack={goBack}
              title={'E-Polling'}
              showRightBtn={
                permission?.canAdd ? (role == 'User' ? false : true) : false
              }
              icon={Images.newAdd}
              handleRightBtn={() => setshowAddModal(true)}
            />

            <FilledTextField
              name={'Search'}
              placeholder=" Search"
              type={'default'}
              control={control}
              justChange={e => handleChange(e)}
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
              // rules={{
              //     required:"User name is required"
              // }}
            />
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: width * 0.03,
              paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
              backgroundColor: colors.white,
            }}>
            {polling?.length > 0
              ? polling?.slice(0, numToShow)?.map((item, index) => {
                  return (
                    <View style={{marginHorizontal: 10}}>
                      <DetailPollingCard
                        mainstate={polling}
                        setmainstate={setPolling}
                        data={item}
                        key={index}
                        getData={getPollingHandler}
                        index={index}
                        serviceId={serviceId}
                      />
                    </View>
                  );
                })
              : !refreshing && (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CustomText
                      children={'Data not found!'}
                      fontWeight={fontsFamily.bold}
                    />
                  </View>
                )}
            {polling?.length > numToShow && (
              <View
                style={{
                  width: width * 0.8,
                  alignSelf: 'center',
                  marginLeft: width * 0.06,
                }}>
                <PrimaryButton
                  onPress={loadMoreNotifications}
                  customStyle={{
                    marginBottom: width * 0.12,
                    paddingVertical: width * 0.025,
                    paddingHorizontal: width * 0.015,
                    borderRadius: 10,
                  }}
                  title={'See previous pollings'}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
      <AdminModal
        visible={showAddModal}
        close={setshowAddModal}
        getData={getPollingHandler}
      />
    </>
  );
};

export default EPolling;
