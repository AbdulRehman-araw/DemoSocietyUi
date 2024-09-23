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

const PurchaseCard = ({ data }) => {
console.log("🚀 ~ PurchaseCard ~ data:", data)

  const navigation = useNavigation()

  return (
    // <TouchableOpacity
    //   activeOpacity={1}
    //   onPress={() => navigation.navigate('purchaseDetail', { data })}
    //   style={[styles.viewCard, {
    //     shadowOpacity: 0.2,
    //     shadowOffset: { width: 1, height: 1 },
    //     shadowColor: "black",
    //     overflow: 'hidden',
    //     width: "95%",
    //     alignSelf: 'center'
    //   }]}>

    //   <View style={[styles.greenCard, {
    //     borderTopLeftRadius: 12,
    //     borderBottomLeftRadius: 12
    //   }]}>
    //     <Image
    //       source={Images.visitors}
    //       resizeMode="contain"
    //       style={{ width: '65%' }}
    //     />
    //   </View>

    //   <View style={{ flex: 1, justifyContent: "space-evenly", paddingHorizontal: 10 }}>

    //     <View style={styles.viewText}>
    //       <CustomText fontWeight={fontsFamily.medium} style={styles.detailText}>
    //         {data?.vendorName}
    //       </CustomText>
    //       {/* <CustomText
    //         fontWeight={fontsFamily.medium}
    //         style={styles.subHeading}>
    //         JD-213
    //       </CustomText> */}
    //     </View>

    //     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

    //       <View style={{ width: '55%' }}>
    //         <CustomText
    //           fontWeight={fontsFamily.medium}
    //           style={styles.subHeading}>
    //           Payment Type
    //         </CustomText>
    //         <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
    //           {data?.paymentType}
    //         </CustomText>
    //       </View>

    //       <View style={{ width: '44%' }}>
    //         <CustomText
    //           fontWeight={fontsFamily.medium}
    //           style={styles.subHeading}>
    //           Date
    //         </CustomText>
    //         <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
    //           {moment(data?.purchaseDate).format('DD MMM YYYY')}
    //         </CustomText>
    //       </View>

    //     </View>

    //     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

    //       <View style={{ width: '55%' }}>
    //         <CustomText
    //           fontWeight={fontsFamily.medium}
    //           style={styles.subHeading}>
    //           Amount Paid
    //         </CustomText>
    //         <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
    //           {data?.amountPaid.toLocaleString("en-US")}
    //         </CustomText>
    //       </View>

    //       <View style={{ width: '44%' }}>
    //         <CustomText
    //           fontWeight={fontsFamily.medium}
    //           style={styles.subHeading}>
    //           Total Amount
    //         </CustomText>
    //         <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
    //           {data?.totalAmount.toLocaleString("en-US")}
    //         </CustomText>
    //       </View>

    //     </View>

    //   </View>
    // </TouchableOpacity>
    <TouchableOpacity 
    activeOpacity={1}
    onPress={() => navigation.navigate('purchaseDetail', { data })}
     style={styles.main}>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, justifyContent: 'space-between', padding: 8, paddingHorizontal:20 }}>
        {/* <Image source={Images.house_building_amenty} style={{ width: 30, height: 30, resizeMode: 'contain', marginHorizontal: 18 }} /> */}
        <CustomText children={data?.description} fontWeight={fontsFamily.bold} style={{ fontSize: 18, color: colors.white, }} />
        <CustomText children={moment(data?.addOn).format('DD MMM YYYY')} fontWeight={fontsFamily.bold} style={{ fontSize: 12, color: colors.white, }} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: colors.white, paddingVertical: 18 }}>
          <VisitorDetailView label={'Payment Type'} text={data?.paymentType} img={Images.newMarker} />
          <VisitorDetailView label={'Total Amount'} text={data?.items[0]?.totalAmount} img={Images.newUser} />
          <VisitorDetailView label={'Amount Paid'} text={data?.amountPaid} img={Images.newUsers} />
      </View>
    </TouchableOpacity>
  );
};

export default PurchaseCard;

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
