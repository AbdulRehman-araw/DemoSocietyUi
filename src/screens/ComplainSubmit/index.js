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
import React, { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';

import Header from '../../components/Header/Header';
import CustomText from '../../components/CustomText';
import { Images } from '../../assets/Images';

import { text } from '../../res/strings';
import { fontsFamily } from '../../assets/Fonts';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { styles } from './styles/styles';

const { width } = Dimensions.get('window');

const ComplainSubmit = ({ navigation }) => {

  const goBack = () => {

    navigation.reset({
      index: 0,
      routes: [
        { name: 'home' },
      ],
    })
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

      <Header onBack={goBack} showRightBtn={true} />
      <View style={{ flex: 1 }}>

        <View style={styles.viewimg}>
          <Image
            source={Images.Tick}
            style={{ width: '100%', height: '140%' }}
            resizeMode="contain"
          />
        </View>

        <View style={{ flex: 0.22, justifyContent: "space-between" }}>
          <View>
            <CustomText fontWeight={fontsFamily.bold} style={styles.centertext}>
              {text.responseSubmit}
            </CustomText>
            <CustomText style={styles.subText}>
              Thankyou for your Feedback
            </CustomText>
          </View>
          <View style={{ marginTop: 10 }}>
            <CustomText style={styles.subText}>
              Be Patience while we look into your problem
            </CustomText>
            <CustomText style={styles.subText}>Thank you!</CustomText>
          </View>
        </View>

        <PrimaryButton
          onPress={() => goBack()}
          customStyle={styles.btnStyle}
          title={text.done}
        />
      </View>
    </SafeAreaView>
  );
};

export default ComplainSubmit;
