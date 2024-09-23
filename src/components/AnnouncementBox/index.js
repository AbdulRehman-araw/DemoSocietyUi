import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import {colors} from '../../styles/colors';
import {fontsFamily} from '../../assets/Fonts';
import {text} from '../../res/strings';
import {Images} from '../../assets/Images';

const {width} = Dimensions.get('window');

export const AnnouncementBox = ({data}) => {
  return (
    <View style={styles.announcement}>
      {/* header */}
      <View style={styles.headerStyle}>
        <View style={styles.flexStyle1}>
          <Image
            source={Images.notice}
            resizeMode="contain"
            style={{width: 20, height: 20}}
          />
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{fontSize: width * 0.034, marginLeft: width * 0.02}}>
            {data?.subject}
          </CustomText>
        </View>

        <View style={styles.flexStyle}>
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: width / 2,
              width: 10,
              height: 10,
            }}
          />
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{fontSize: width * 0.034, marginLeft: width * 0.02}}>
            {'Unread'}
          </CustomText>
        </View>
      </View>

      {/* body */}

      <View style={{flexDirection: 'row', marginVertical: 10}}>
        <View
          style={{
            width: 5,
            marginRight: 8,
            height: '100%',
            backgroundColor: colors.primary,
          }}
        />
        <CustomText
          style={{fontSize: width * 0.028, lineHeight: 16, paddingRight: 10}}>
          {data?.description}
        </CustomText>
      </View>
    </View>
  );
};

export const AnnouncementBoxLight = ({data}) => {
  return (
    // <View style={[styles.announcement1, { width: "100%", alignSelf: 'center' }]}>
    //   {/* header */}
    //   <View style={styles.headerStyle}>
    //     <View style={styles.flexStyle1}>
    //       <Image
    //         source={Images.notice}
    //         resizeMode="contain"
    //         style={{ width: 20, height: 20 }}
    //       />
    //       <CustomText
    //         fontWeight={fontsFamily.bold}
    //         numberOfLines={1}
    //         ellipsizeMode={'tail'}
    //         style={{ fontSize: width * 0.034, marginLeft: width * 0.02 }}>
    //         {data?.subject}
    //       </CustomText>
    //     </View>

    //     <View style={styles.flexStyle1}>
    //       <View
    //         style={{
    //           borderRadius: 10,
    //           width: 10,
    //           height: 10,
    //         }}
    //       />
    //     </View>
    //   </View>

    //   {/* body */}

    //   <View style={{ flexDirection: 'row', marginVertical: 10 }}>
    //     <View
    //       style={{
    //         width: 5,
    //         marginRight: 8,
    //         height: '100%',
    //         backgroundColor: colors.primary,
    //       }}
    //     />
    //     <CustomText
    //       style={{ fontSize: width * 0.028, lineHeight: 16, paddingRight: 10 }}>
    //       {data?.description}
    //     </CustomText>
    //   </View>
    // </View>
    <TouchableOpacity
      activeOpacity={1}
      // onPress={() => navigation.navigate('purchaseDetail', { data })}
      style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.primary,
          padding: 12,
        }}>
        <Image source={Images.house_building_amenty} style={{ width: 24, height: 24, resizeMode: 'contain', marginHorizontal: 18 }} />
        <CustomText
          children={data?.subject}
          fontWeight={fontsFamily.bold}
          style={{fontSize: 18, color: colors.white}}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.white,
          padding: 12,
        }}>
        <AnnouncementCard
          label={'Amount Paid'}
          text={data?.description}
          img={Images.newUsers}
        />
      </View>
    </TouchableOpacity>
  );
};

export const AnnouncementCard = ({img, label, text}) => {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
      <View>
        <CustomText
          fontWeight={fontsFamily.medium}
          style={{fontSize: 14, color: colors.dark}} numberOfLines={4}>
          {text}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  announcement: {
    backgroundColor: colors.lightBackground,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    margin: 5,
  },
  announcement1: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    margin: 5,
  },

  flexStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    flex: 0.25,
    // backgroundColor:'red'
  },
  flexStyle1: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // flex: 0.95,
    // backgroundColor:'red'
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: colors.gray,
  },

  //new style
  main: {
    // flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 32,
    elevation: 6,
  },
});
