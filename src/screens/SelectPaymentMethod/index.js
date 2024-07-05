import {TouchableOpacity, TextInput,BackHandler,Button,Text,Dimensions, SafeAreaView, StatusBar, View,Image,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'


import CustomText from '../../components/CustomText'
import { styles } from './styles/styles'
import { fontsFamily } from '../../assets/Fonts'
import {Images} from '../../assets/Images';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {text} from '../../res/strings';
import HeaderClose from '../../components/Header/HeaderClose';
 


const {width} = Dimensions.get("window")


const SelectPaymentMethod = ({navigation}) => {
  const { control, handleSubmit } = useForm();
  
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

        <HeaderClose
          onBack={goBack}
          leftarrow={{ marginLeft: 10 }}
          title={"Select a payment method"}
          showRightBtn={true}
        /> 
         

 <Image source={Images.linebilling} resizeMode="contain" style={{width:width*0.95,marginTop:8,shadowColor:"#E5E5E5BD",}}/>

 <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1,
   paddingBottom:Platform.OS == "ios" ? width * 0.08 :width * 0.18}} >   

 <TouchableOpacity style={styles.viewtitle}   
  onPress={() => navigation.navigate("Addcredit")}>

 <View>
 <CustomText
 fontWeight={fontsFamily.bold}
 style={{color: colors.black,fontSize: width * 0.036}}>
 Credit or Debit Card
</CustomText>
<Image source={Images.visacard} resizeMode="contain" style={{width:width*0.25,marginTop:8,shadowColor:"#E5E5E5BD",}}/>
 </View>
 <Image source={Images.arrowforward} resizeMode="contain" style={{width:width*0.25,}}/>
  
 </TouchableOpacity>

 
</ScrollView>                                          
    
</View>
    </SafeAreaView>
  )
}

export default SelectPaymentMethod;






