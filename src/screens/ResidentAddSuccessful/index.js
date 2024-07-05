import {  StyleSheet,TextInput,BackHandler,Button,Text,Dimensions, SafeAreaView, StatusBar, View,Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'

import Header from '../../components/Header/Header'
import CustomText from '../../components/CustomText'
import {Images} from '../../assets/Images';

import { text } from '../../res/strings'
import { fontsFamily } from '../../assets/Fonts'
import PrimaryButton from '../../components/Button/PrimaryButton'
import { styles } from './styles/styles'

const {width} = Dimensions.get("window")


const ResidentAddSuccessful = ({navigation}) => {

  const goBack =()=>{
    navigation.goBack()
}

const handleBack = ()=>{
    goBack()
    return true
}
useEffect(() => {
  BackHandler.addEventListener("hardwareBackPress",handleBack)

  return () => {
    BackHandler.removeEventListener("hardwareBackPress",handleBack)
  }
}, [])
return (
<SafeAreaView style={styles.root}>

<StatusBar translucent={false} backgroundColor={colors.white} barStyle="dark-content" />

<View style={{paddingHorizontal:width * 0.032,flex:1}}>
<Header onBack={goBack} showRightBtn={true}  />

<View style={styles.viewimg}>
  <Image
    source={Images.Tick}
    style={{width: '100%', height: '140%',}}
    resizeMode="contain"
  />
</View>

<View>
<CustomText
fontWeight={fontsFamily.bold}
style={styles.centertext}>
{text.addSuccessful}
  </CustomText>                               
<View style={{marginTop:5}}>
  <Text style={styles.text2}>Confitmation email has been sent to email</Text>
  <Text style={styles.text3}>abc3234@gmail.com</Text>
   </View>
</View>
    

<View style={{flexDirection:'row'}}>

<View style={{marginVertical: width * 0.03}}>     
<PrimaryButton customStyle={styles.btn} 
fonttitle={{fontSize:width*0.045}}
title={text.done} />
</View>


<View style={{marginVertical: width * 0.03}}>     
<PrimaryButton customStyle={styles.btn} 
fonttitle={{fontSize:width*0.045}}
title={text.done} />
</View>

</View>

</View>
</SafeAreaView>
 )
}
  

export default ResidentAddSuccessful;


