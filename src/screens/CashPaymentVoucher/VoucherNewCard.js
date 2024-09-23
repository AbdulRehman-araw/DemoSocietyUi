import {
    BackHandler,
    Text,
    Dimensions,
    SafeAreaView,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import { useSelector } from 'react-redux';
  import moment from 'moment';
  import { Images } from '../../assets/Images';
  import CustomText from '../../components/CustomText';
  import { fontsFamily } from '../../assets/Fonts';
  import { colors } from '../../styles/colors';
  import { useNavigation } from '@react-navigation/native';
  import { getFormattedDate, getFormattedTime } from '../../utils/helperFunction';
  
  const { width, height } = Dimensions.get('window');
  
  const VisitorDetailView = ({ img, label, text }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
        {/* <Image source={img} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 18, }} /> */}
        <View>
          <CustomText
            fontWeight={fontsFamily.regular}
            style={{ fontSize: 10, color: colors.darkGray, }}>
            {label}
          </CustomText>
          <View style={{ marginVertical: 4 }} />
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{ fontSize: 14, color: colors.dark }}>
            {text}
          </CustomText>
        </View>
      </View>
    )
  }
  
  const VoucherNewCard = ({ data, permission }) => {
  
    const navigation = useNavigation()
  
  
  
  
  
  
  
  
    return (
      <>
        <TouchableOpacity 
        activeOpacity={1}
        // onPress={() => navigation.navigate('amenityDetailScreen', { data: { detail: data, permission: permission } })}
         style={styles.main}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, justifyContent: 'center', padding: 8 }}>
            {/* <Image source={Images.house_building_amenty} style={{ width: 30, height: 30, resizeMode: 'contain', marginHorizontal: 18 }} /> */}
            <CustomText children={'Banquet'} fontWeight={fontsFamily.bold} style={{ fontSize: 18, color: colors.white, }} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: colors.white, paddingVertical: 18 }}>
            <View>
              <VisitorDetailView label={'Date'} text={moment(data?.addOn).format('DD MMM YYYY')} img={Images.newMarker} />
              <VisitorDetailView label={'Amount Settled'} text={data?.description} img={Images.newUser} />
            </View>
            <View>
              <VisitorDetailView label={'Amount'} text={`${data?.amount} PKR`} img={Images.newUsers} />
              <VisitorDetailView label={'Vendor Name'} text={data?.vendorName} img={Images.newClock} />
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  
  export default VoucherNewCard
  
  const styles = StyleSheet.create({
    greenCard: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
      width: width * 0.25,
      justifyContent: 'space-around',
      paddingHorizontal: 10,
      alignItems: 'center',
    },
    texthead: {
      fontSize: width * 0.035,
      color: colors.lightBackground,
    },
    subHeading: {
      fontSize: width * 0.026,
      color: colors.lightdarkgray,
    },
    dateTimeStyle: {
      fontSize: width * 0.029,
      color: colors.white,
    },
    detailText: {
      color: colors.primary,
      fontSize: width * 0.025,
    },
    viewText: {
      marginTop: 7,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    viewCard: {
      flexDirection: 'row',
      marginTop: 10,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: colors.white,
      minHeight: width * 0.30,
      elevation: 4,
    },
  
    //new style
    main: {
      // flex: 1, 
      borderRadius: 18,
      overflow: 'hidden',
      marginBottom: 32,
      elevation:6,
    }
  });
  