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
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';

import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import {text} from '../../res/strings';

import {Images} from '../../assets/Images';
import PrimaryButton from '../../components/Button/PrimaryButton';
import EFormsModal from './components/EForms';
import {Platform} from 'react-native';
import SlideButton from '../../components/Button/SlideButton';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/apiCall';
import FormCard from './components/formCard';
import FilledTextField from '../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import AmenityCard from '../Amenities/AmenityCard';

const {width} = Dimensions.get('window');

const EFormsSubmit = ({navigation, route}) => {
  const {id} = route?.params?.data || {};
  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const [modalVisible, setModalVisible] = useState(false);

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

  const [eForms, setEForms] = useState([]);
  const [submittedEForms, setSubmittedEForms] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {control} = useForm();

  const getEForms = async () => {
    try {
      const {data} = await apiCall.getEForm();
      setEForms(data);
    } catch (error) {
      console.log('file: index.js:54 => getEForms => error:', error);
    }
  };

  const getSubmittedEForm = async searchKey => {
    setLoader(true);
    try {
      const search = searchKey ? searchKey : '';
      const {data} = await apiCall.getSubmittedEForm(search);
      setSubmittedEForms(data);
    } catch (error) {
      console.log('file: index.js:54 => getEForms => error:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getEForms();
    getSubmittedEForm();
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);

    // Put your refresh logic here, for example:
    getEForms();
    getSubmittedEForm();

    // After refreshing is done, set refreshing to false
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <ImageBackground source={Images.lightBG} style={{flex: 1}}>
        <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
          <Header
            onBack={goBack}
            title={'E-Forms'}
            showRightBtn={true}
            icon={Images.newEForm}
            rightIconStyle={{width: width * 0.1, height: width * 0.1}}
            handleRightBtn={() =>
              role === 'User'
                ? setModalVisible(true)
                : navigation.navigate('formList', {data: {serviceId: id}})
            }
          />

          {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
        }} > */}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <FilledTextField
              name={'Search'}
              placeholder=" Search E-Forms"
              type={'number-pad'}
              control={control}
              justChange={e => getSubmittedEForm(e)}
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
            />
            <View
              style={{paddingHorizontal: width * 0.01, flex: 1, marginTop: 10}}>
              {loader ? (
                <ActivityIndicator size={'small'} color={colors.primary} />
              ) : submittedEForms?.length > 0 ? (
                submittedEForms
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <FormCard
                      data={item}
                      navigate={() =>
                        navigation.navigate('formDetail', {data: item})
                      }
                      key={index}
                    />
                  ))
              ) : (
                <View>
                  <View
                    style={{
                      width: width / 3,
                      alignSelf: 'center',
                      flex: 0.45,
                    }}>
                    <Image
                      source={Images.iconquestion}
                      style={{width: '90%', height: '150%'}}
                      resizeMode="contain"
                    />
                  </View>

                  <View>
                    <View style={{marginTop: 5}}>
                      <CustomText
                        style={{
                          marginTop: 5,
                          alignSelf: 'center',
                          fontSize: width * 0.038,
                        }}>
                        No E-Forms have been{' '}
                        {role === 'User' ? 'applied' : 'submitted'} yet.
                      </CustomText>
                      {role === 'User' && (
                        <CustomText
                          style={{
                            marginTop: 5,
                            alignSelf: 'center',
                            fontSize: width * 0.038,
                          }}>
                          Click to apply now
                        </CustomText>
                      )}
                    </View>
                  </View>

                  {role === 'User' && (
                    <View style={{marginVertical: width * 0.02}}>
                      <PrimaryButton
                        customStyle={{
                          padding: width * 0.03,
                          width: width * 0.48,
                          alignSelf: 'center',
                        }}
                        title={text.applynow}
                        onPress={() => setModalVisible(true)}
                      />
                    </View>
                  )}
                </View>
              )}

              <EFormsModal
                formsData={eForms}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default EFormsSubmit;
