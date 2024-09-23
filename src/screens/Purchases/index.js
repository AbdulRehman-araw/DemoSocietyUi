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
import PurchaseCard from './purchaseCard';
import SlideButton from '../../components/Button/SlideButton';
import DropDown from '../../components/TextField/DropDown';
import {useForm} from 'react-hook-form';
import CustomModal from '../../components/Modal/CustomModal';

const {width, height} = Dimensions.get('screen');

const buttonData = [
  {
    name: 'Unpaid',
  },
  {
    name: 'Paid',
  },
];

const Purchases = ({navigation}) => {
  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);
  const {control, handleSubmit, setValue, clearErrors, resetField} = useForm();

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

  const [purchases, setPurchases] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getPurchases = async formData => {
    setLoader(true);
    try {
      const vendorId = vendors.find(e => e.title === formData)?.vendorID;
      const status = isPaid ? 'Paid' : 'UnPaid';
      console.log('🚀 ~ file: index.js:72 ~ getPurchases ~ status:', status);
      const {data} = await apiCall.getPurchases(vendorId, status);
      setPurchases(data);
    } catch (error) {
      console.log('file: index.js:54 => getPurchases => error:', error);
    } finally {
      setLoader(false);
    }
  };

  const getVendors = async () => {
    try {
      const {data} = await apiCall.getVendors();
      const vendorData = [];
      data?.forEach(element => {
        let obj = {
          ...element,
          title: element?.name,
        };
        vendorData.push(obj);
      });
      setVendors(vendorData);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  useEffect(() => {
    getVendors();
  }, [isFocused]);

  useEffect(() => {
    getPurchases();
  }, [isFocused, isPaid]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header
          onBack={goBack}
          title={'Purchases'}
          showRightBtn={true}
          icon={Images.newAdd}
          handleRightBtn={() => navigation.navigate('createPurchase')}
        />

        <SlideButton
          data={buttonData}
          selectedItem={isPaid ? 'Paid' : 'Unpaid'}
          handleBtn={e => (e == 'Paid' ? setIsPaid(true) : setIsPaid(false))}
        />

        <DropDown
          name={'vendor'}
          title="Select Vendor"
          type={'default'}
          variant={'outlined'}
          control={control}
          img={false}
          onPress={() => {
            setShowModal(true);
          }}
        />

        <View
          style={{
            paddingHorizontal: width * 0.01,
            flex: 1,
            marginTop: 10,
            paddingBottom: height * 0.15,
          }}>
          {loader ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : purchases?.length > 0 ? (
            <FlatList
              data={purchases}
              renderItem={({item}) => <PurchaseCard data={item} />}
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
                No purchases found
              </Text>
            </View>
          )}
        </View>

        <CustomModal
          data={vendors.length <= 0 ? [] : vendors}
          modalVisible={showModal}
          closeModal={() => setShowModal(false)}
          getvalue={e => {
            setValue('vendor', e);
            getPurchases(e);
            clearErrors('vendor');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Purchases;
