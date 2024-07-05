import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { fontsFamily } from '../../../assets/Fonts';

import CustomText from '../../../components/CustomText';
import { text } from '../../../res/strings';
import Paginator from './Paginator';
import { slides } from '../../../utils/defaultData';
import { colors } from '../../../styles/colors';
import LinearGradientPrimaryButton from '../../../components/Button/LinearGradientPrimaryButton';

const { height, width } = Dimensions.get('window');
const OnboardingItems = ({ item, scrollX, navigateLogin }) => {

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={[styles.imgCon, { height: item.id == "1" ? width * 0.97 : width * 1 }]}>
            <Image source={item.image} resizeMode="contain" style={styles.img} />
          </View>
          {/* <Paginator data={slides} scrollX={scrollX}/> */}
          <View style={{ width: width * 0.7, marginTop: width * 0.08 }}>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{
                fontSize: width * 0.04,
                color: colors.primary,
                textAlign: 'center',
              }}>
              {item.title}
            </CustomText>

            <CustomText
              style={{
                fontSize: width * 0.025,
                color: colors.black,
                textAlign: 'center',
                marginTop: width * 0.03,
              }}>
              {item.subText}
            </CustomText>
          </View>
          {/* <View style={{ alignItems: "center", marginTop: width * 0.08 }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigateLogin()} style={styles.loginBtn}>
              <CustomText fontWeight={fontsFamily.semiBold} style={{ color: colors.primary }} >{text.login}</CustomText>
            </TouchableOpacity>
          </View> */}
        </View>

      </ScrollView>
      <View style={styles.row}>
        <Paginator data={slides} scrollX={scrollX} />
        <View style={{ alignItems: 'flex-end', }}>
          <LinearGradientPrimaryButton title={'Continue'} onPress={() => navigateLogin()} />
        </View>
      </View>
    </View>
  );
};

export default OnboardingItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgCon: {
    width: width * 1,
    // height: width * 1,
    // marginBottom:20
    // paddingHorizontal: 12
    paddingTop: 10
  },
  img: {
    width: '100%',
    height: '100%',
  },
  loginBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    width: width * 0.3,
    alignItems: "center",
    paddingVertical: width * 0.02,
    borderRadius: 6
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 30,
    margin: 8
  }
});
