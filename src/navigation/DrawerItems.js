import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import {colors} from '../styles/colors';
import {Images} from '../assets/Images';
import CustomText from '../components/CustomText';
import {fontsFamily} from '../assets/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData, setUserRole} from '../redux/slices/userDataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiCall} from '../Services/apiCall';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

export function DrawerItems(props) {
  const Details = useSelector(
    state => state.userDataReducer.userAccountDetails,
  );
  const {name, contactNo} = Details;
  const dispatch = useDispatch();
  const logoutApi = async () => {
    const token = await AsyncStorage.getItem('fcmToken');
    try {
      const result = await apiCall.logout({device_token: token});
      console.log('result from login api ====>', result);
      dispatch(setUserData());
      AsyncStorage.clear();
      props.navigation.reset({
        index: 0,
        routes: [{name: 'login'}],
      });
    } catch (error) {
      dispatch(setUserData());
      AsyncStorage.clear();
      props.navigation.reset({
        index: 0,
        routes: [{name: 'login'}],
      });
    }
  };
  const logout = async () => {
    logoutApi();
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white, }}>
      <DrawerContentScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{width: 70, paddingVertical: 8, paddingLeft: 15}}
            onPress={() => props.navigation.closeDrawer()}>
            <Image
              source={Images.metrocancel}
              resizeMode="contain"
              style={{width: width * 0.042}}
            />
          </TouchableOpacity>

          <View style={{paddingHorizontal: 30}}>
            <Image
              source={Images.maleuser}
              resizeMode="contain"
              style={{
                width: width * 0.25,
                height: width * 0.25,
                borderWidth: 3,
                borderColor: colors.primary,
                borderRadius: width * 0.25,
              }}
            />
            <CustomText
              numberOfLines={1}
              ellipsizeMode="tail"
              fontWeight={fontsFamily.semiBold}
              style={{
                color: colors.black,
                fontSize: width * 0.04,
                marginTop: 20,
              }}>
              {name}
            </CustomText>

            {/* <CustomText
              fontWeight={fontsFamily.light}
              style={{ color: colors.white, fontSize: width * 0.035 }}>
              {contactNo}
            </CustomText> */}
          </View>
          <View
            style={{
              width: '90%',
              height: 0.5,
              backgroundColor: colors.primary,
              marginVertical: 20,
              alignSelf: 'center',
            }}
          />

          <View style={{flex: 0.5, justifyContent: 'center',}}>
            <DrawerItem
              style={styles.itemStyling}
              onPress={() => props.navigation.navigate('profile')}
              icon={() => (
                <Image
                  source={Images.info}
                  resizeMode="contain"
                  style={{width: width * 0.04, tintColor: colors.primary}}
                />
              )}
              label="About SocioSphere"
              labelStyle={styles.itemText}
            />

            <DrawerItem
              style={styles.itemStyling}
              onPress={() => props.navigation.navigate('profile')}
              icon={() => (
                <Image
                  source={Images.FAQ}
                  resizeMode="contain"
                  style={{width: width * 0.04, tintColor: colors.primary}}
                />
              )}
              label="Frequently Asked Questions"
              labelStyle={styles.itemText}
            />

            <DrawerItem
              style={styles.itemStyling}
              onPress={() => props.navigation.navigate('profile')}
              icon={() => (
                <Image
                  source={Images.settings}
                  resizeMode="contain"
                  style={{width: width * 0.04, tintColor: colors.primary}}
                />
              )}
              label="App Settings"
              labelStyle={styles.itemText}
            />
            <DrawerItem
              style={styles.itemStyling}
              onPress={() => props.navigation.navigate('profile')}
              icon={() => (
                <Image
                  source={Images.feedback}
                  resizeMode="contain"
                  style={{width: width * 0.04, tintColor: colors.primary}}
                />
              )}
              label="Rate the App"
              labelStyle={styles.itemText}
            />

            <DrawerItem
              style={styles.itemStyling}
              onPress={() => props.navigation.navigate('profile')}
              icon={() => (
                <Image
                  source={Images.termsCondition}
                  resizeMode="contain"
                  style={{width: width * 0.04, tintColor: colors.primary}}
                />
              )}
              label="Terms & Condition"
              labelStyle={styles.itemText}
            />

            <DrawerItem
              style={styles.itemStyling}
              onPress={() => props.navigation.navigate('profile')}
              icon={() => (
                <Image
                  source={Images.privacyPolicy}
                  resizeMode="contain"
                  style={{width: width * 0.04, tintColor: colors.primary}}
                />
              )}
              label="Privacy Policy"
              labelStyle={styles.itemText}
            />
          </View>

          <View
            style={{
              width: '90%',
              height: 0.5,
              backgroundColor: colors.primary,
              marginVertical: 20,
              alignSelf: 'center',
            }}
          />

          <DrawerItem
            style={styles.itemStyling}
            onPress={() => logout()}
            icon={() => (
              <Image
                source={Images.logout}
                resizeMode="contain"
                style={{width: width * 0.04, tintColor: colors.primary}}
              />
            )}
            label="Logout"
            labelStyle={styles.itemText}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemText: {
    color: colors.black,
    fontSize: width * 0.03,
    fontFamily: fontsFamily.semiBold,
  },
  logout: {
    marginVertical: width * 0.5,
    paddingHorizontal: 50,
    flexDirection: 'row',
  },
  customtext: {
    color: colors.white,
    fontSize: width * 0.038,
    marginLeft: 15,
    marginTop: 15,
  },
  itemStyling: {
    height: 40,
    width:'100%',
    justifyContent: 'center',
  },
});
