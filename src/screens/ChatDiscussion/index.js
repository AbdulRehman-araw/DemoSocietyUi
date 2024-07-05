import { TouchableOpacity, TextInput, BackHandler, Button, Text, Dimensions, SafeAreaView, StatusBar, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'


import CustomText from '../../components/CustomText'
import { styles } from './styles/styles'
import { fontsFamily } from '../../assets/Fonts'
import { Images } from '../../assets/Images';
import { useForm } from 'react-hook-form';



const { width } = Dimensions.get("window")


const Chatdiscussions = ({ navigation }) => {
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


      <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>

        <View style={{ flexDirection: "row", marginVertical: width * 0.02 }}>
          <TouchableOpacity onPress={() => goBack()} style={{ flex: 0.3 }} >
            <Image source={Images.back} resizeMode="contain" style={{ width: width * 0.058, marginTop: 10 }} />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Image source={Images.personimg} resizeMode="contain" style={{ width: width * 0.11, height: width * 0.11, }} />
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{ color: colors.black, fontSize: width * 0.042, marginTop: 9, marginLeft: 10 }}>
              Water Discussion
            </CustomText>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
        }} >

          <View style={{ paddingHorizontal: width * 0.03, flex: 1, }}>


          </View>

        </ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: width * 0.03,borderRadius:4 }}>
          <TouchableOpacity style={{ width: width * 0.08, height: width * 0.08, paddingLeft: width * 0.02 }}>
            <Image source={Images.documents} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
          </TouchableOpacity>
          <TextInput placeholder='Enter your text here' style={{ paddingRight: width * 0.06, flex: 1, paddingLeft: width * 0.02,color:"black",borderBottomColor:"black",borderBottomWidth:1 }} placeholderTextColor={"black"} />
          <TouchableOpacity style={{ width: width * 0.08, height: width * 0.08 }}>
            <Image source={Images.buttonsend} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>


  )
}

export default Chatdiscussions;






