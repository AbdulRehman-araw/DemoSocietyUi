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

const { width, height } = Dimensions.get('window');

const EmployeeCard = ({ data }) => {

  const navigation = useNavigation()
  // console.log('data   ',   data);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('updateEmployee', { data })}
      style={styles.viewCard}>

      <View style={styles.greenCard}>
        <Image
          source={Images.visitors}
          resizeMode="contain"
          style={{ width: '65%' }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "space-evenly", paddingHorizontal: 10 }}>

        <View style={styles.viewText}>
          <CustomText fontWeight={fontsFamily.medium} style={styles.detailText}>
            {data?.name}
          </CustomText>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{ width: '55%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Designation
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
              {data?.designation}
            </CustomText>
          </View>

          <View style={{ width: '44%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Contact No
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
              {data?.contactNo}
            </CustomText>
          </View>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{ width: '55%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              National ID
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
              {data?.nationalID}
            </CustomText>
          </View>

          <View style={{ width: '44%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Salary
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
              {data?.basicSalary}
            </CustomText>
          </View>

        </View>

      </View>
    </TouchableOpacity>
  );
};

export default EmployeeCard;

const styles = StyleSheet.create({
  greenCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    width: width * 0.25,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12
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
    // overflow: 'hidden',
    backgroundColor: colors.white,
    minHeight: width * 0.30,
    elevation: 4,
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    width: "95%",
    alignSelf: 'center'
  }
});
