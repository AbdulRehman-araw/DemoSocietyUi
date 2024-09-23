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
      <Image source={img} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 18, }} />
      <View>
        <CustomText
          fontWeight={fontsFamily.regular}
          style={{ fontSize: 12, color: colors.darkGray, }}>
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

const AmenityCard = ({ data, permission }) => {
console.log("🚀 ~ AmenityCard ~ data:", data)

  const navigation = useNavigation()



  const dateStr = data.startTime;
  const offsetMinutes = new Date().getTimezoneOffset();
  const offsetMilliseconds = offsetMinutes * 60 * 1000;


  const originalDate = new Date(dateStr);

  const accurateDate = new Date(originalDate.getTime() - offsetMilliseconds);


  const dateStre = data.endTime;
  const offsetMinutese = new Date().getTimezoneOffset();
  const offsetMillisecondse = offsetMinutes * 60 * 1000;


  const originalDatee = new Date(dateStre);

  const accurateDatee = new Date(originalDatee.getTime() - offsetMilliseconds);





  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('amenityDetailScreen', { data: { detail: data, permission: permission } })} style={styles.main}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, justifyContent: 'center', padding: 8 }}>
          <Image source={Images.house_building_amenty} style={{ width: 30, height: 30, resizeMode: 'contain', marginHorizontal: 18 }} />
          <CustomText children={'Banquet'} fontWeight={fontsFamily.bold} style={{ fontSize: 18, color: colors.white, }} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: colors.white, paddingVertical: 18 }}>
          <View>
            <VisitorDetailView label={'Location'} text={data?.location} img={Images.newMarker} />
            <VisitorDetailView label={'Manager'} text={data?.managerName} img={Images.newUser} />
            <VisitorDetailView label={'Contact Number'} text={data?.contactNo} img={Images.newPhone} />
          </View>
          <View>
            <VisitorDetailView label={'Capacity'} text={'abc'} img={Images.newUsers} />
            <VisitorDetailView label={'Timing'} text={`${getFormattedTime(data.startTime)} - ${getFormattedTime(data.endTime)}`} img={Images.newClock} />
            <VisitorDetailView label={'Air Conditioning'} text={'abc'} img={Images.newAir} />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default AmenityCard;

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
    marginBottom: 32
  }
});
