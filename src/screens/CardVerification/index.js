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
  TextInput

} from 'react-native';
import React, { useState } from 'react';

import { Images } from '../../assets/Images';
import { text } from '../../res/strings';
import PrimaryButton from '../../components/Button/PrimaryButton';
import CustomText from '../../components/CustomText';
import { fontsFamily } from '../../assets/Fonts';
import Header from '../../components/Header/Header'
import { styles } from './styles/styles';
import { colors } from '../../styles/colors';



const { width, height } = Dimensions.get("window")


const Codeverification = ({ navigation }) => {

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, padding: width * 0.04 }}>
      <StatusBar translucent backgroundColor={colors.white} barStyle="light-content" />


      <Header
        onBack={goBack}
        showRightBtn={true}
        headerContainer={{ paddingVertical: width * 0.03 }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18,
        marginVertical: width * 0.04
      }} >

        <View style={{}}>

          <CustomText
            fontWeight={fontsFamily.bold}
            style={{
              color: colors.primary,
              fontSize: width * 0.060,
            }}>
            {text.cardverification}
          </CustomText>

          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{
              color: colors.lightgray,
              fontSize: width * 0.032,
            }}>
            Please Verify your card
          </CustomText>
        </View>


        <View style={{ flexDirection: 'row-reverse', marginVertical: width * 0.02 }}>
          <Image source={Images.usercode} resizeMode="contain" style={{ width: width * 0.60, height: width * 0.60, marginRight: 10 }} />
        </View>

        <CustomText
          fontWeight={fontsFamily.semiBold}
          style={{
            color: colors.lightgray,
            fontSize: width * 0.036,
          }}>
          Enter your OTP code below
        </CustomText>


        <View style={{ flexDirection: 'row' }}>

          <View style={styles.code1}>
            <TouchableOpacity onPress={() => Alert.alert("work")}>
              <TextInput placeholder='5' placeholderTextColor={colors.primary}
                style={{ fontSize: width * 0.068, height: width * 0.18, marginLeft: 10, fontWeight: "bold" }} />
            </TouchableOpacity>
          </View>

          <View style={styles.code2}>
            <TouchableOpacity onPress={() => Alert.alert("work")}>
              <TextInput placeholder='4' placeholderTextColor={colors.primary}
                style={{ fontSize: width * 0.068, height: width * 0.18, marginLeft: 10, fontWeight: "bold" }} />
            </TouchableOpacity>
          </View>

          <View style={styles.code3}>
            <TouchableOpacity onPress={() => Alert.alert("work")}>
              <TextInput placeholder='7' placeholderTextColor={colors.primary}
                style={{ fontSize: width * 0.068, height: width * 0.18, marginLeft: 10, fontWeight: "bold" }} />
            </TouchableOpacity>
          </View>

          <View style={styles.code4}>
            <TouchableOpacity onPress={() => Alert.alert("work")}>
              <TextInput placeholder='0' placeholderTextColor={colors.primary}
                style={{ fontSize: width * 0.068, height: width * 0.18, marginLeft: 10, fontWeight: "bold" }} />
            </TouchableOpacity>
          </View>
        </View>

        <CustomText
          fontWeight={fontsFamily.semiBold}
          style={{
            color: colors.lightgray,
            fontSize: width * 0.027,
            marginLeft: 130,
            marginTop: 25
          }}>
          Send OTP again
        </CustomText>

        <View style={{ marginTop: 90 }}>
          <PrimaryButton
            customStyle={{ padding: width * 0.03, width: width * 0.86, marginLeft: 20 }}
            title={text.submit}
            paytitle={{ fontSize: width * 0.043 }}
            onPress={() => navigation.navigate("paymentSuccessful")}

          />
        </View>

      </ScrollView>

    </SafeAreaView>

  );
};




export default Codeverification;


/*

import React, { useRef } from 'react';

const ParentComponent = () => {
  const otpInput = useRef(null);

  const clearText = () => {
      otpInput.current.clear();
  }

  const setText = () => {
      otpInput.current.setValue("1234");
  }

  return (
      <View>
          <OTPTextInput ref={e => (otpInput = e)} >
          <Button title="clear" onClick={clearText}>
      </View> ̰
  );
}



*/