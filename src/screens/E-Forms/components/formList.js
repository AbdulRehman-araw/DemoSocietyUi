import React, {useState, useEffect} from 'react';
import {
  TextInput,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import CustomText from '../../../components/CustomText';
import {fontsFamily} from '../../../assets/Fonts';
import {colors} from '../../../styles/colors';
import {Images} from '../../../assets/Images';
import moment from 'moment';
import Header from '../../../components/Header/Header';
import {apiCall} from '../../../Services/apiCall';
import {Platform} from 'react-native';
import {BackHandler} from 'react-native';

const {width, height} = Dimensions.get('window');

const FormList = ({navigation, route}) => {
  const {serviceId} = route?.params?.data;
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

  const [eForms, setEForms] = useState([]);
  const [loader, setLoader] = useState(false);
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );
  const [permission, setPermission] = useState({});
  const [searchText, setSearchText] = useState('');

  const getEForms = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getEForm();
      setEForms(data);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getEForms();
  }, [isFocused]);

  useEffect(() => {
    const find = servicePermission?.find(e => e.id == serviceId);
    setPermission(find);
  }, [servicePermission]);

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
            title={'All Forms'}
            showRightBtn={permission?.canAdd}
            icon={Images.newAdd}
            handleRightBtn={() => navigation.navigate('createForm')}
          />
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.primary,
              borderRadius: width * 0.05,
              marginVertical: width * 0.02,

              borderColor: colors.gray,
            }}>
            <TextInput
              style={styles.searchInput}
              placeholderTextColor={colors.gray}
              placeholder="Search Forms"
              value={searchText}
              onChangeText={text => setSearchText(text)}
            />
            <Image
              source={Images.search}
              style={{
                width: width * 0.05,
                height: width * 0.05,
                marginRight: width * 0.05,
              }}
            />
          </View> */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
            }}>
            <View
              style={{paddingHorizontal: width * 0.01, flex: 1, marginTop: 10}}>
              {/* <CustomText
                fontWeight={fontsFamily.bold}
                style={{
                  fontSize: width * 0.04,
                  marginVertical: width * 0.04,
                  color: colors.primary,
                }}>
                Created Forms
              </CustomText> */}
              {loader ? (
                <ActivityIndicator size={'small'} color={colors.primary} />
              ) : (
                eForms
                  ?.filter(item =>
                    item.formName
                      .toLowerCase()
                      .includes(searchText.toLowerCase()),
                  )
                  ?.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={1}
                      onPress={() =>
                        navigation.navigate('EFormForAdmin', {data: item})
                      }
                      style={styles.viewCard}>
                      <CustomText
                        fontWeight={fontsFamily.bold}
                        style={styles.detailText}>
                        {item?.formName}
                      </CustomText>
                      <Image
                        source={Images.card_arrow}
                        style={{width: 60, height: 60}}
                        resizeMode="center"
                      />
                    </TouchableOpacity>
                  ))
              )}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderRadius: width * 0.02,
    marginVertical: width * 0.01,
    padding: width * 0.02,
    color: colors.black,
    flex: 1,
  },
  detailText: {
    color: colors.black,
    fontSize: width * 0.035,
  },
  viewCard: {
    marginVertical: height * 0.01,
    paddingLeft: width * 0.04,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
});

export default FormList;
