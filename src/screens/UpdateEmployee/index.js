import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  BackHandler,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import {styles} from './styles/styles';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import {fontsFamily} from '../../assets/Fonts';
import FilledTextField from '../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {emailRegex} from '../../utils/helperFunction';
import {apiCall} from '../../Services/apiCall';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {Images} from '../../assets/Images';
import {baseUrl} from '../../../axios';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import PermissionModal from './permissionModal';
import AlertModal from '../../components/Modal/AlertModal';
import WarningModal from '../../components/Modal/WarningModal';

const {width} = Dimensions.get('window');

const employeeDetails = ({navigation, route}) => {
  const updateData = route?.params?.data;
  console.log('>>>>>>>>>>>>>>>', updateData.address);
  const {control, handleSubmit, setValue} = useForm();

  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const [loader, setLoader] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serviceId, setServiceId] = useState();

  const [openPermission, setOpenPermission] = useState(false);
  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const [errorModal1, setErrorModal1] = useState(false);
  const [alertWarning, setAlertWarning] = useState('w');

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

  const deleteAdmin = async id => {
    setLoader(true);
    try {
      const {message} = await apiCall.DeleteAdmin(id);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      setAlertType('e');
      setErrorModalText(error);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoader(false);
    }
  };

  const getServices = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getServices(role);
      setServices(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleSelectService = data => {
    try {
      const v = Object.values(data);
      let count = 0;
      for (let index = 0; index < v.length; index++) {
        const e = v[index];
        if (e === true) {
          count += 1;
        }
      }
      const newServices = [...selectedServices];
      const index = newServices.findIndex(e => e.moduleID === data.moduleID);
      if (count > 0) {
        if (index !== -1) {
          newServices.splice(index, 1);
          newServices.push(data);
        } else {
          newServices.push(data);
        }
      } else {
        newServices.splice(index, 1);
      }
      setSelectedServices(newServices);
    } catch (error) {
      console.log('file: index.js:110 => handleSelectService => error:', error);
    }
  };

  const AlertFunction = () => {
    setAlertWarning('w');
    setErrorModalText('Are you sure you want to delete this Employee?');
    setErrorModal1(true);
  };

  const DeleteAdmin = async id => {
    setErrorModal1(false);
    setLoading(true);
    try {
      const {message} = await apiCall.DeleteAdmin(id);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    } finally {
      setLoading(false);
    }
  };

  const setDefaultData = () => {
    try {
      const moduleArray = updateData?.accessModule?.map(element => {
        const newObj = {...element};
        delete newObj.moduleName;
        return newObj;
      });

      setSelectedServices(moduleArray);
    } catch (error) {
      console.log('file: index.js:148 => setDefaultData => error:', error);
    }
  };

  useEffect(() => {
    getServices();
    setDefaultData();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <PermissionModal
        open={openPermission}
        close={() => setOpenPermission(false)}
        serviceId={serviceId}
        selectedServices={selectedServices}
        savePermission={data => handleSelectService(data)}
      />
      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <WarningModal
        visible={errorModal1}
        close={setErrorModal}
        text={errorModalText}
        type={alertWarning}
        button={true}
        warning={() => DeleteAdmin(updateData?.id)}
        cancel={() => setErrorModal1(false)}
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Employee Details'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={{paddingHorizontal: width * 0.02}}>
            <View style={{}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Name
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData?.name}
              </CustomText>
            </View>
            <View style={{marginTop: width * 0.02}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                nationalID
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData?.nationalID}
              </CustomText>
            </View>

            <View style={{marginTop: width * 0.02}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Contact no
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData?.contactNo}
              </CustomText>
            </View>

            <View style={{marginTop: width * 0.02}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Address
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData?.address}
              </CustomText>
            </View>

            <View style={{marginTop: width * 0.02}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Email
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData?.email}
              </CustomText>
            </View>

            <View style={{marginTop: width * 0.02}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Designation
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData?.designation}
              </CustomText>
            </View>

            <View style={{marginTop: width * 0.02}}>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.name}>
                Salary
              </CustomText>

              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.username}>
                {updateData?.basicSalary}
              </CustomText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: width * 0.03,
              }}>
              <CustomText
                fontWeight={fontsFamily.bold}
                style={{fontSize: width * 0.055}}>
                Services
              </CustomText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                gap: width * 0.005,
              }}>
              {loader ? (
                <View style={{width: width * 1, padding: width * 0.1}}>
                  <ActivityIndicator size={'large'} color={colors.primary} />
                </View>
              ) : services?.length > 0 ? (
                <>
                  {services?.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => {
                        setServiceId(item.id);
                      }}
                      style={{
                        width: width * 0.22,
                        height: width * 0.26,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}>
                      {selectedServices.findIndex(
                        e => e.moduleID === item.id,
                      ) !== -1 && (
                        <Image
                          source={Images.checkMarkIcon}
                          resizeMode="contain"
                          style={styles.selectedIcon}
                        />
                      )}
                      <Image
                        source={{uri: baseUrl + item.icon}}
                        resizeMode="contain"
                        style={{width: '70%', height: '70%'}}
                      />
                      <CustomText style={{fontSize: width * 0.023}}>
                        {item.name}
                      </CustomText>
                    </TouchableOpacity>
                  ))}
                </>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: width * 0.035,
                      fontFamily: fontsFamily.medium,
                    }}>
                    No employee found
                  </Text>
                </View>
              )}
            </View>

            <View
              style={{
                marginTop: width * 0.1,
                marginBottom: width * 0.02,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <View style={{width: '47%'}}>
                <PrimaryButton
                  outlined
                  customStyle={{
                    padding: width * 0.032,
                    marginTop: 15,
                    borderColor: colors.primary,
                  }}
                  textStyle={{color: colors.primary}}
                  title={'Delete'}
                  onPress={() => AlertFunction()}
                />
              </View>
              <View style={{width: '47%'}}>
                <PrimaryButton
                  customStyle={{padding: width * 0.032}}
                  title={'Edit Now'}
                  loader={loading}
                  onPress={() =>
                    navigation.navigate('UpdateEmployeeDetails', {
                      data: updateData,
                    })
                  }
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default employeeDetails;
