import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../../components/CustomText';
import styles from './styles/styles';
import { colors } from '../../styles/colors';
import { Images } from '../../assets/Images';
import { fontsFamily } from '../../assets/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/slices/userDataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiCall } from '../../Services/apiCall';

const { width } = Dimensions.get('window');

const UserProfile = ({ props, navigation }) => {
  const detail = useSelector(state => state.userDataReducer.userAccountDetails);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const [profileDetails, setProfileDetails] = useState([]);

  const getProfileDetails = () => {
    setLoader(true);
    try {
      setProfileDetails([
        {
          img: Images.mailgreen,
          title: 'Email',
          subTitle: detail?.email,
        },
        {
          img: Images.mailgreen,
          title: 'Phone number',
          subTitle: detail?.contactNo,
        },
        {
          img: Images.mailgreen,
          title: 'Terms & Conditions',
          subTitle: '',
        },
        {
          img: Images.mailgreen,
          title: 'Privacy Policy',
          subTitle: '',
        },
        {
          img: Images.lockprofile,
          title: 'Change Password',
          subTitle: '',
        },
        {
          img: Images.mailgreen,
          title: 'Delete Account',
          subTitle: '',
        },
        {
          img: Images.mailgreen,
          title: 'Logout',
          subTitle: '',
        },

      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const logoutApi = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      console.log("token before api === >", token);
      const result = await apiCall.logout({ device_token: token });
      dispatch(setUserData([]));
      AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    } catch (error) {
      console.log(
        '🚀 ~ file: App.js:33 ~ sendNotificationToken ~ error:',
        error, token

      );
    }
  };
  const logout = async () => {
    console.log("logout pressed inside function!");

    logoutApi();
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.cont}>
        <View style={styles.topView}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={Images.menuIcon}
              resizeMode="contain"
              style={[styles.iconStyle, ]}
            />
          </TouchableOpacity>
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{ color: colors.black, fontSize: width * 0.04 }}>
            Profile
          </CustomText>
          <TouchableOpacity
            onPress={() => navigation.navigate('notifications')}>
            <Image
              source={Images.bellIcon}
              resizeMode="contain"
              style={[styles.iconStyle, { tintColor: colors.primary }]}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: width * 0.02,
          }}>
          <Image
            source={Images.maleuser}
            resizeMode="contain"
            style={styles.iconimg}
          />
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{
              color: colors.black,
              fontSize: width * 0.045,
              marginTop: width * 0.025,
            }}>
            {detail?.name}
          </CustomText>
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{ color: colors.lightgray, fontSize: width * 0.032 }}>
            {detail?.contactNo}
          </CustomText>
        </View>

        <View style={styles.viewcard}>
          {loader ? (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={'large'} color={colors.primary} />
            </View>
          ) : (
            profileDetails.map((item, index) => {
              return (
                <TouchableOpacity key={index}
                  activeOpacity={1}
                  onPress={() => {
                    console.log(item)
                    item.title == 'Logout'
                      ? (
                        logout()
                      )
                      : item.title == 'Change Password' ? (navigation?.navigate('NewPwd')) : item.title == "Delete Account" ? (
                        Alert.alert('Warning', 'Are you sure you want to delete your account?', [
                          {
                            text: 'Yes',
                            onPress: () => {
                              Alert.alert('Account deletion', 'Your account deletion request has been submitted successfully. Account will be deleted upon review, you can reactivate your account via logging in again before deletion.', [
                                {
                                  text: 'ok',
                                  onPress: () => {
                                    logout()
                                  }
                                }
                              ])
                            }
                          },
                          {
                            text: "No",
                            onPress: () => { }
                          }
                        ])
                      ) : {}
                  }
                  }
                  style={styles.viewemail}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: width * 0.02,
                    }}>
                    <Image
                      source={Images.mailgreen}
                      resizeMode="contain"
                      style={{
                        width: width * 0.09,
                        height: width * 0.09,
                        paddingLeft: width * 0.04,
                        paddingRight: width * 0.08,
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <CustomText
                        fontWeight={fontsFamily.medium}
                        style={styles.email}>
                        {item.title}
                      </CustomText>
                      {item?.subTitle == '' ? null : (
                        <CustomText
                          numberOfLines={1}
                          fontWeight={fontsFamily.bold}
                          style={styles.emailaddress}>
                          {item.subTitle}
                        </CustomText>
                      )}
                    </View>
                  </View>
                  <Image
                    source={Images.forward}
                    resizeMode="contain"
                    style={{ width: width * 0.03, height: width * 0.03 }}
                  />
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

export default UserProfile;
