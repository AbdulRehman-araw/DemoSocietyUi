import {
  BackHandler,
  Text,
  Dimensions,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Images } from '../../assets/Images';
import CustomText from '../../components/CustomText';
import { fontsFamily } from '../../assets/Fonts';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ServiceCard = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('serviceContractDetail', { data })}
      style={[styles.viewCard, {
        shadowOpacity: 0.2,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "black",
        overflow: 'hidden',
        width: "95%",
        alignSelf: 'center'
      }]}>

      <View style={[styles.greenCard, {
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
      }]}>
        <Image
          source={Images.visitors}
          resizeMode="contain"
          style={{ width: '65%' }}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          paddingHorizontal: 10,
        }}>
        <View style={styles.viewText}>
          <CustomText fontWeight={fontsFamily.medium} style={styles.detailText}>
            {data?.vendorName}
          </CustomText>
          <CustomText fontWeight={fontsFamily.medium} style={styles.subHeading}>
            {data?.remarks}
          </CustomText>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '55%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Balance
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={styles.detailText}>
              {data?.balance}
            </CustomText>
          </View>

          <View style={{ width: '44%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Date
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={styles.detailText}>
              {moment(data?.date).format('DD MMM YYYY')}
            </CustomText>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '55%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Amount Paid
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={styles.detailText}>
              {data?.totalPaid}
            </CustomText>
          </View>

          <View style={{ width: '44%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Total Amount
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={styles.detailText}>
              {data?.totalAmount}
            </CustomText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;

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
    fontSize: width * 0.031,
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
    minHeight: width * 0.3,
    elevation: 4,
  },
});
