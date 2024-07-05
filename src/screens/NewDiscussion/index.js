import { TouchableOpacity, TextInput, BackHandler, Button, Text, Dimensions, SafeAreaView, StatusBar, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'


import CustomText from '../../components/CustomText'
import { styles } from './styles/styles'
import { fontsFamily } from '../../assets/Fonts'
import { Images } from '../../assets/Images';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { text } from '../../res/strings';
import HeaderClose from '../../components/Header/HeaderClose';
import LinesDraw from '../../components/Lines/Lines'



const { width } = Dimensions.get("window")


const Addnewdiscussions = ({ navigation }) => {
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

        <HeaderClose
          onBack={goBack}
          title={"New Discussion"}
          showRightBtn={true}
          containerStyle={{ borderRadius: 12, marginBottom: 10 }}
        />


        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18,
          marginTop: width * 0.05,
        }} >

          <View style={styles.viewtitle}>
            <TextInput style={styles.inputtitle} placeholder="Title" placeholderTextColor="#818181" />
          </View>

          <View style={styles.viewdescription}>
            <TextInput style={styles.inputdescription} placeholder="Description" placeholderTextColor="#818181" />
          </View>



        </ScrollView>
        <View style={{ marginVertical: width * 0.1 }}>
          <PrimaryButton
            customStyle={{ padding: width * 0.03 }}
            title={text.submit}
            paytitle={{ fontSize: width * 0.043 }}
            onPress={() => navigation.navigate("chat")}
          />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Addnewdiscussions;






