import {
  StyleSheet,
  TextInput,
  BackHandler,
  Button,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {colors} from '../../styles/colors';

import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {text} from '../../res/strings';
import {fontsFamily} from '../../assets/Fonts';
import {styles} from './styles/styles';

import {Images} from '../../assets/Images';
import PrimaryButton from '../../components/Button/PrimaryButton';

const {width} = Dimensions.get('window');

const AddvisitorsORcode = ({navigation, route}) => {
  console.log('🚀 ~ file: index.js:21 ~ AddvisitorsORcode ~ route:', route);

  const goBack = () => {
    navigation.goBack();
  };

  const handleBack = () => {
    goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} showRightBtn={true} />

        <View style={styles.viewimg}>
          <Image
            source={Images.Tick}
            style={{width: '100%', height: '140%'}}
            resizeMode="contain"
          />
        </View>

        <View>
          <CustomText fontWeight={fontsFamily.bold} style={styles.centertext}>
            {text.invitesuccessful}
          </CustomText>

          <View style={{marginTop: 5}}>
            <Text style={styles.text2}>Invite link has been sent to</Text>
            <Text style={styles.text3}> Visitor's Number.</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={styles.copybtn}
            onPress={() => navigation.navigate('eBilling')}>
            <Text style={styles.copytext}>Copy link</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sharebtn}
            onPress={() => navigation.navigate('eBilling')}>
            <Text style={styles.sharetext}>Share link</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddvisitorsORcode;
