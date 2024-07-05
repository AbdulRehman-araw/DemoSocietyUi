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
import CustomText from '../../../components/CustomText';
import { fontsFamily } from '../../../assets/Fonts';
import { colors } from '../../../styles/colors';
import { Images } from '../../../assets/Images';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

const FormCard = ({ data, navigate }) => {

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigate()}
      style={[styles.viewCard, {
        shadowOpacity: 0.2,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "black",
        overflow: 'hidden'
      }]}>

      <View style={[styles.greenCard, {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
      }]}>
        <Image
          source={Images.eForms}
          resizeMode="contain"
          style={{ width: '65%' }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "space-evenly", paddingHorizontal: 10 }}>

        <View style={styles.viewText}>
          <View style={styles.viewcentertext}>
            <CustomText fontWeight={fontsFamily.medium} style={styles.detailText}>
              {data?.formName}
            </CustomText>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{ width: '55%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Filled by
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
              {data?.addBy}
            </CustomText>
          </View>

          <View style={{ width: '44%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Flat Number
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
              {data?.appartment}
            </CustomText>
          </View>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{ width: '55%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Date
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
              {moment(data?.date).format('DD MMM YYYY')}
            </CustomText>
          </View>

          <View style={{ width: '44%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Time
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
              {moment(data?.date).format('h:mm A')}
            </CustomText>
          </View>

        </View>

      </View>
    </TouchableOpacity>
  );
};

export default FormCard;

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
    fontSize: width * 0.035,
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
  }
});
