import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {colors} from '../../../styles/colors';
import CustomText from '../../../components/CustomText';
import {fontsFamily} from '../../../assets/Fonts';
import {Images} from '../../../assets/Images';
import Header from '../../../components/Header/Header';
import {styles} from '../styles/styles';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const FormDetail = ({navigation, route}) => {
  const DetailData = route?.params?.data;
  console.log(
    'file: FormDetail.js:35 => FormDetail => DetailData:',
    DetailData,
  );

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header
          onBack={goBack}
          title={'Form Details'}
          showRightBtn={false}
          // icon={Images.Addcircle}
          // handleRightBtn={() => navigation.navigate('createEvent')}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View style={styles.viewall}>
            <View style={styles.viewname}>
              <View>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.name}>
                  Submitted By
                </CustomText>

                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.username}>
                  {DetailData?.addBy}
                </CustomText>
              </View>
            </View>

            <View style={styles.viewname}>
              <View>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.name}>
                  Apartment
                </CustomText>

                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.username}>
                  {DetailData?.appartment}
                </CustomText>
              </View>
            </View>
            <View style={styles.viewname}>
              <View>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.name}>
                  Submit Date
                </CustomText>

                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.username}>
                  {moment(DetailData?.date).format('DD MMM YYYY')}
                </CustomText>
              </View>
            </View>

            <CustomText
              fontWeight={fontsFamily.bold}
              style={{
                fontSize: width * 0.04,
                marginVertical: width * 0.04,
                color: colors?.black,
              }}>
              {DetailData?.formName}
            </CustomText>

            <View
              style={{
                borderBottomWidth: 1,
                borderColor: colors.gray,
                marginBottom: width * 0.04,
                width: width * 0.3,
              }}
            />

            {DetailData?.properties?.map((item, index) => (
              <View key={index} style={styles.viewname}>
                <View>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    {item?.name}
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {item?.value}
                  </CustomText>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FormDetail;
