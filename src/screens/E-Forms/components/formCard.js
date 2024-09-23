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
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import CustomText from '../../../components/CustomText';
import {fontsFamily} from '../../../assets/Fonts';
import {colors} from '../../../styles/colors';
import {Images} from '../../../assets/Images';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {getFormattedTime} from '../../../utils/helperFunction';

const {width, height} = Dimensions.get('window');

const VisitorDetailView = ({img, label, text}) => {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
      <Image
        source={img}
        style={{
          width: 20,
          height: 20,
          resizeMode: 'contain',
          marginRight: 18,
          tintColor: colors.primary,
        }}
      />
      <View>
        <CustomText
          fontWeight={fontsFamily.regular}
          style={{fontSize: 12, color: colors.darkGray}}>
          {label}
        </CustomText>
        <View style={{marginVertical: 4}} />
        <CustomText
          fontWeight={fontsFamily.bold}
          style={{fontSize: 14, color: colors.dark}}>
          {text}
        </CustomText>
      </View>
    </View>
  );
};

const FormCard = ({data, navigate}) => {
  return (
    <TouchableOpacity onPress={() => navigate()} style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.primary,
          justifyContent: 'center',
          padding: 8,
        }}>
        <Image
          source={Images.newEForm}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
            marginHorizontal: 18,
          }}
        />
        <CustomText
          children={'Resident Registration Form'}
          fontWeight={fontsFamily.bold}
          style={{fontSize: 18, color: colors.white}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: colors.white,
          paddingVertical: 18,
        }}>
        <View>
          <VisitorDetailView
            label={'Filled By'}
            text={data?.addBy}
            img={Images.newUser}
          />
          <VisitorDetailView
            label={'Time'}
            text={moment(data?.date).format('h:mm A')}
            img={Images.newClock}
          />
        </View>
        <View>
          <VisitorDetailView
            label={'Flat Number'}
            text={data?.appartment}
            img={Images.house_building_amenty}
          />
          <VisitorDetailView
            label={'Date'}
            text={moment(data?.date).format('DD MMM YYYY')}
            img={Images.newClock}
          />
        </View>
      </View>
    </TouchableOpacity>
    // <TouchableOpacity
    //   activeOpacity={1}
    //   onPress={() => navigate()}
    //   style={[styles.viewCard, {
    //     shadowOpacity: 0.2,
    //     shadowOffset: { width: 1, height: 1 },
    //     shadowColor: "black",
    //     overflow: 'hidden'
    //   }]}>

    //   <View style={[styles.greenCard, {
    //     borderTopLeftRadius: 10,
    //     borderBottomLeftRadius: 10
    //   }]}>
    //     <Image
    //       source={Images.eForms}
    //       resizeMode="contain"
    //       style={{ width: '65%' }}
    //     />
    //   </View>

    //   <View style={{ flex: 1, justifyContent: "space-evenly", paddingHorizontal: 10 }}>

    //     <View style={styles.viewText}>
    //       <View style={styles.viewcentertext}>
    //         <CustomText fontWeight={fontsFamily.medium} style={styles.detailText}>
    //           {data?.formName}
    //         </CustomText>
    //       </View>
    //     </View>

    //     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

    //       <View style={{ width: '55%' }}>
    //         <CustomText
    //           fontWeight={fontsFamily.medium}
    //           style={styles.subHeading}>
    //           Filled by
    //         </CustomText>
    //         <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
    //           {data?.addBy}
    //         </CustomText>
    //       </View>

    //       <View style={{ width: '44%' }}>
    //         <CustomText
    //           fontWeight={fontsFamily.medium}
    //           style={styles.subHeading}>
    //           Flat Number
    //         </CustomText>
    //         <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
    //           {data?.appartment}
    //         </CustomText>
    //       </View>

    //     </View>
    //     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

    //       <View style={{ width: '55%' }}>
    //         <CustomText
    //           fontWeight={fontsFamily.medium}
    //           style={styles.subHeading}>
    //           Date
    //         </CustomText>
    //         <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
    //           {moment(data?.date).format('DD MMM YYYY')}
    //         </CustomText>
    //       </View>

    //       <View style={{ width: '44%' }}>
    //         <CustomText
    //           fontWeight={fontsFamily.medium}
    //           style={styles.subHeading}>
    //           Time
    //         </CustomText>
    //         <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
    //           {moment(data?.date).format('h:mm A')}
    //         </CustomText>
    //       </View>

    //     </View>

    //   </View>
    // </TouchableOpacity>
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
    minHeight: width * 0.3,
    elevation: 4,
  },

  //new style
  main: {
    // flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 32,
  },
});
