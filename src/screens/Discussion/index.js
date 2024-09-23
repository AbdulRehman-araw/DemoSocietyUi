import { TouchableOpacity, TextInput, BackHandler, Button, Text, Dimensions, SafeAreaView, StatusBar, View, Image, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'


import CustomText from '../../components/CustomText'
import Header from '../../components/Header/Header'
import { styles } from './styles/styles'
import { fontsFamily } from '../../assets/Fonts'
import { Images } from '../../assets/Images';
import ComplainTextField from '../../components/TextField/complainTextField'
import { useForm } from 'react-hook-form';
import { text } from '../../res/strings'
import FilledTextField from '../../components/TextField/FilledTextField'



const { width } = Dimensions.get("window")


const Discussions = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const goBack = () => {
    navigation.goBack()
  }

  const handleBack = () => {
    goBack()
    return true
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack)
    }
  }, [])
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar translucent={false} backgroundColor={colors.white} barStyle="dark-content" />

      <View style={{ marginHorizontal: width * 0.01, flex: 1 }}>

        <Header
          onBack={goBack}
          title={"Discussion"}
          showRightBtn={true}
          handleRightBtn={() => navigation.navigate("addNewDiscussion")}
          icon={Images.buttonchat}
          headerContainer={{ paddingHorizontal: width * 0.03 }}
        />

        <FilledTextField
          name={'Search'}
          placeholder=" Search"
          type={'default'}
          control={control}
          variant={"outlined"}
          showRightIcon={true}
          rightIconImg={Images.search}
          rightIconStyle={{ flex: 0.4 }}
          // customInputStyle={{ marginHorizontal: width * 0.01 }}
          containerStyle={{
            borderRadius: 12,
            marginTop: width * 0.05,
            backgroundColor: colors.white,
            borderWidth: 1,
            marginHorizontal: width * 0.04
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
        }} >

          <View style={{ marginHorizontal: width * 0.02, flex: 1, paddingVertical: width * 0.04 }}>

            <TouchableOpacity style={styles.discussion1} onPress={() => navigation.navigate("chat")}>
              <View style={{ width: width * 0.12, height: width * 0.12 }}>
                <Image source={Images.personimg} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
              </View>

              <View style={{ flex: 1, paddingHorizontal: 12 }}>
                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={{ color: colors.primary, fontSize: width * 0.045 }}>
                  {text.waterdiscussion}
                </CustomText>

                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={{ color: colors.lightgray, fontSize: width * 0.035 }}>
                  Yaseen: Scoiety Meeting will be at...
                </CustomText>

              </View>

              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: width * 0.04, height: width * 0.04 }}>
                  <Image source={Images.iconmore} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
                </View>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{ color: colors.white, backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 10, fontSize: width * 0.025, textAlign: 'center' }}>
                  6
                </CustomText>
              </View>

            </TouchableOpacity>

            <TouchableOpacity style={styles.discussion1} onPress={() => navigation.navigate("chat")}>
              <View style={{ width: width * 0.12, height: width * 0.12 }}>
                <Image source={Images.personimg} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
              </View>

              <View style={{ flex: 1, paddingHorizontal: 12 }}>
                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={{ color: colors.primary, fontSize: width * 0.045 }}>
                  {text.waterdiscussion}
                </CustomText>

                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={{ color: colors.lightgray, fontSize: width * 0.035 }}>
                  Yaseen: Scoiety Meeting will be at...
                </CustomText>

              </View>

              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: width * 0.04, height: width * 0.04 }}>
                  <Image source={Images.iconmore} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
                </View>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{ color: colors.white, backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 10, fontSize: width * 0.025, textAlign: 'center' }}>
                  6
                </CustomText>
              </View>

            </TouchableOpacity>

            <TouchableOpacity style={styles.discussion1} onPress={() => navigation.navigate("chat")}>
              <View style={{ width: width * 0.12, height: width * 0.12 }}>
                <Image source={Images.personimg} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
              </View>

              <View style={{ flex: 1, paddingHorizontal: 12 }}>
                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={{ color: colors.primary, fontSize: width * 0.045 }}>
                  {text.waterdiscussion}
                </CustomText>

                <CustomText
                  fontWeight={fontsFamily.bold}
                  style={{ color: colors.lightgray, fontSize: width * 0.035 }}>
                  Yaseen: Scoiety Meeting will be at...
                </CustomText>

              </View>

              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: width * 0.04, height: width * 0.04 }}>
                  <Image source={Images.iconmore} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
                </View>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{ color: colors.white, backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 10, fontSize: width * 0.025, textAlign: 'center' }}>
                  6
                </CustomText>
              </View>

            </TouchableOpacity>


          </View>



        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default Discussions;






