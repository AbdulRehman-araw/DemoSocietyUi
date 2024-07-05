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
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Images } from '../../assets/Images';
import CustomText from '../../components/CustomText';
import { fontsFamily } from '../../assets/Fonts';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const InvoiceCard = ({ data }) => {
  // console.log("Anas Data",data);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('invoiceDetail', { data })}
      style={[styles.viewCard, {
        shadowOpacity: 0.2,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "black",
        // overflow: false,
        width: "95%",
        alignSelf: "center"
      }]}>

      <View style={[styles.greenCard, { borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }]}>
        <Image
          source={Images.Invoices2}
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
            {data?.title}
          </CustomText>
          
          {/* comment start <CustomText fontWeight={fontsFamily.medium} style={styles.subHeading}>
            {data?.residentName}
          </CustomText> comment end*/}
        </View>

        {data?.isPaid != true && (
          <View style={styles.viewText}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Machine ID
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={{ ...styles.subHeading, color: 'red' }}>
              {data?.machineID}
            </CustomText>
          </View>
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '55%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              House No.
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={styles.detailText}>
              {`${data?.building}, ${data?.unitNumber}`}
            </CustomText>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '55%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Invoice No.
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={styles.detailText}>
              {data?.invoiceID}
            </CustomText>
          </View>

          <View style={{ width: '44%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Due Date
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={styles.detailText}>
              {moment(data?.dueDate).format('DD MMM YYYY')}
            </CustomText>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '55%' }}>
            <CustomText
              fontWeight={fontsFamily.medium}
              style={styles.subHeading}>
              Amount
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={styles.detailText}>
              {data?.amount}
            </CustomText>
          </View>
          {data.isPaid == true && (
            <View style={{ width: '44%' }}>
              <CustomText
                fontWeight={fontsFamily.medium}
                style={styles.subHeading}>
                Status
              </CustomText>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={{
                  color: data.isVerify == true ? colors.primary : colors.danger,
                  fontSize: width * 0.031,
                }}>
                {data?.isVerify == true ? 'Verified' : 'Unverified'}
              </CustomText>
            </View>
          )}

          {data.isPaid == false && (
            <View style={{ width: '44%' }}>
              <CustomText
                fontWeight={fontsFamily.medium}
                style={styles.subHeading}>
                Date
              </CustomText>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.detailText}>
                {moment(data?.invoiceDate).format('DD MMM YYYY')}
              </CustomText>
            </View>
          )}
        </View>
        
      </View>
      
    </TouchableOpacity>
  );
};

export default InvoiceCard;

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
