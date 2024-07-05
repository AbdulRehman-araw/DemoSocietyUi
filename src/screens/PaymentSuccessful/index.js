import {  StyleSheet,TextInput,BackHandler,Button,Text,Dimensions, SafeAreaView, StatusBar, View,Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import { colors } from '../../styles/colors'

import CustomText from '../../components/CustomText'
import Header from '../../components/Header/Header'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { text } from '../../res/strings'
import { fontsFamily } from '../../assets/Fonts'
import { styles } from './styles/styles'

import {Images} from '../../assets/Images';
import PrimaryButton from '../../components/Button/PrimaryButton'


const {width} = Dimensions.get("window")


const PaymentSuccessful = ({navigation}) => {

    
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

<CustomText
fontWeight={fontsFamily.bold}
style={styles.amounttext}>
Rs 600.00
  </CustomText>                               


<View>
<CustomText
fontWeight={fontsFamily.bold}
style={styles.centertext}>
{text.paymentsuccessful}
  </CustomText>

<View style={{marginTop:5}}>
 <View style={{flexDirection:'row',justifyContent:'center'}}> 
  <Text style={styles.text1}>Transaction Number:</Text>
   <Text style={styles.textnum}>#6547864</Text>
   </View>
  
   <Text style={styles.text2}>Confirmation email has been sent to email</Text>
   <Text style={styles.text3}>abc3234@gmail.com</Text>
   </View>
</View>
    

<TouchableOpacity style={styles.duesbtn} onPress={() => navigation.navigate("eBilling")}>
<Text style={styles.textdues}>Check Dues</Text>
</TouchableOpacity>


<View style={{marginTop:80}}>     
<PrimaryButton customStyle={styles.btn} onPress={() => navigation.navigate("home")} 
fonttitle={{fontSize:width*0.044,}}

title={text.done} />
</View>

</View>
</SafeAreaView>
)
}

export default PaymentSuccessful;


