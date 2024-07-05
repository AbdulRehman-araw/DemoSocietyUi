import {
  TextInput,
  BackHandler,
  StyleSheet,
  Button,
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Alert,
  ScrollView,
  Platform,
  UIManager,
  LayoutAnimation,
  Text,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../../styles/colors';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fontsFamily } from '../../assets/Fonts';
import CustomHeaderColor from '../../components/Header/HeaderColor';
import { styles } from './styles/styles';
import { Images } from '../../assets/Images';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { useIsFocused } from '@react-navigation/native';
import { apiCall } from '../../Services/apiCall';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RefreshControl } from 'react-native';

const { width } = Dimensions.get('window');

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

// Enable layout animation for Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Community = ({ navigation, route }) => {
  const { id } = route?.params?.data;
  const Details = useSelector(
    state => state.userDataReducer.userAccountDetails,
  );
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );
  const isFocused = useIsFocused();

  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [openAccordion, setOpenAccordion] = useState();
  const [building, setBuilding] = useState([]);

  const [permission, setPermission] = useState({});

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
  }, [])

  // *For Handle Open Accordion
  const handleOpenAccordion = id => {
    try {
      // setOpenAccordion(openAccordion === id ? '' : id);
      setOpenAccordion(id);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } catch (error) {
      console.log('file: index.js:50 => handleOpenAccordion => error:', error);
    }
  };
  const getBuildings = async () => {
    setLoader(true);
    console.log('aaaa',
      Details?.societyID,
      true,
      10,
      1,)
    try {
      const { data } = await apiCall.getBuildings(
        Details?.societyID,
        true,
        10,
        1,
      );
      console.log(
        '🚀 ~ file: index.js:96 ~ getBuildings ~ data:',
        data?.buildings[2]?.buildingTitle,
      );
      setBuilding(data?.buildings);
    } catch (error) {
      console.log('file: index.js:63 => getBuildings => error:', error);
    } finally {
      setLoader(false);
    }
  };
  const handleNavigate = flat => {
    try {
      if (flat?.isOccupied) {
        navigation.navigate('resident', {
          data: { apartmentId: flat?.apartmentID },
        });
      } else {
        navigation.navigate('addOwner', { data: flat });
      }
    } catch (error) {
      console.log('file: index.js:71 => handleNavigate => error:', error);
    }
  };
  const getAppartmentHistory = async (flat) => {
    // setLoader(true);
    try {
      const { data } = await apiCall.getAppartmentHistory(
        flat?.apartmentID
      );
      navigation.navigate('ResidentHistory', { data: data })
      console.log(
        '🚀 ~ file: index.js:96 ~ getAppartment ~ data:',
        data
      );

    } catch (error) {
      console.log('file: index.js:63 => getAppartment => error:', error);
    } finally {
      // setLoader(false);
    }
  };
  useEffect(() => {
    getBuildings();
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getBuildings();
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const find = servicePermission?.find(e => e.id == id);
    setPermission(find);
  }, [servicePermission]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      {/* <View style={[styles.topView, { marginTop: APPBAR_HEIGHT + width * 0.01, marginBottom: APPBAR_HEIGHT * 0.2 }]}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={Images.menuIcon}
            resizeMode="contain"
            style={[styles.iconStyle, { tintColor: colors.primary }]}
          />
        </TouchableOpacity>
        <CustomText
          fontWeight={fontsFamily.bold}
          style={{ color: colors.black, fontSize: width * 0.04 }}>
          Community
        </CustomText>
        <View />
      </View> */}
      <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
        <Header
          onBack={goBack}
          title={' Community'}
        // showRightBtn={true}
        // icon={Images.eForms}
        // rightIconStyle={{ width: width * 0.1, height: width * 0.1 }}
        // handleRightBtn={() => role === 'User' ? setModalVisible(true) : navigation.navigate('formList', { data: { serviceId: id } })}
        />

        <View style={[styles.heading]}>
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{ color: colors.black, fontSize: width * 0.04 }}>
            Manage Community
          </CustomText>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            // padding: width * 0.038,
            paddingBottom: Platform.OS === 'ios' ? width * 0.08 : width * 0.18,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {loader ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : building?.length > 0 ? (
            building?.map((item, index) => {
              { console.log('accordion', openAccordion === item.buildingID, openAccordion, item.buildingID) }
              return <View key={index}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.accordion]}
                  onPress={() => handleOpenAccordion(item.buildingID)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={Images.communityWithoutName}
                      resizeMode="contain"
                      style={[
                        styles.communityIconStyle,
                        { tintColor: colors.primary },
                      ]}
                    />
                    <CustomText
                      fontWeight={fontsFamily.bold}
                      style={{ color: colors.primary, fontSize: width * 0.04 }}>
                      {item?.buildingTitle}
                    </CustomText>
                  </View>
                  {item?.apartments.length > 0 && (
                    <Image
                      source={Images.dropDown}
                      resizeMode="contain"
                      style={[
                        styles.dropdownIconStyle,
                        { tintColor: colors.primary },
                      ]}
                    />
                  )}
                </TouchableOpacity>
                {console.log('object', openAccordion === item.buildingID)}
                {
                  openAccordion === item.buildingID &&
                  item?.apartments?.map((flat, i) => (
                    <View
                      disabled={permission?.canAdd ? false : true}
                      key={i}
                      activeOpacity={0.7}
                      style={[styles.residence]}
                      onPress={() => handleNavigate(flat)}>
                      <Image
                        source={Images.homeWithoutName}
                        resizeMode="contain"
                        style={styles.profileAvatar}
                      />
                      <View style={{ marginHorizontal: width * 0.02, flex: 1 }}>
                        <CustomText
                          fontWeight={fontsFamily.bold}
                          style={{
                            color: colors.black,
                            fontSize: width * 0.035,
                          }}>
                          {flat?.unitTitle}
                        </CustomText>
                        {/* <CustomText
                        fontWeight={fontsFamily.light}
                        style={{ color: colors.black, fontSize: width * 0.03 }}>
                        {flat.flatno}
                      </CustomText> */}
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <PrimaryButton
                          customStyle={{
                            padding: width * 0.02,
                            backgroundColor: colors.primary,
                            right: 5,
                            paddingHorizontal: 14
                          }}
                          onPress={() => getAppartmentHistory(flat)}
                          textStyle={{ fontSize: width * 0.03 }}
                          title={'History'}
                        />
                      </View>
                      {flat?.isOccupied ? (
                        <View style={{ flexDirection: 'row' }}>
                          <PrimaryButton
                            customStyle={{
                              padding: width * 0.02,
                              backgroundColor: colors.darkGray,
                            }}
                            onPress={() => handleNavigate(flat)}
                            textStyle={{ fontSize: width * 0.03 }}
                            title={'Resident'}
                          />
                        </View>
                      ) : (
                        <View style={{ flexDirection: 'row' }}>
                          {permission?.canAdd && (
                            <PrimaryButton
                              customStyle={{ padding: width * 0.02 }}
                              textStyle={{ fontSize: width * 0.03 }}
                              title={'Add Resident'}
                              onPress={() => handleNavigate(flat)}
                            />
                          )}
                        </View>
                      )}

                    </View>
                  ))
                }
              </View>
            })
          ) : (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: width * 0.035,
                  fontFamily: fontsFamily.medium,
                }}>
                No community found
              </Text>
            </View>
          )}
        </ScrollView>
      </View >
    </SafeAreaView >
  );
};

export default Community;
