import { TouchableOpacity, Modal,BackHandler,Dimensions, SafeAreaView,ScrollView,StatusBar, View,Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'

import CustomText from '../../components/CustomText'
import Header from '../../components/Header/Header'
import { text } from '../../res/strings'
import { fontsFamily } from '../../assets/Fonts'


import {Images} from '../../assets/Images';
import PrimaryButton from '../../components/Button/PrimaryButton'
import { styles } from './styles/styles'
import ComplainTextField from '../../components/TextField/complainTextField'
import {useForm} from 'react-hook-form';


const {width} = Dimensions.get("window")


const Tutorial = ({navigation}) => {
const [open, setOpen] = useState(false)
const {control, handleSubmit} = useForm();

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
    <Header onBack={goBack} 
    showRightBtn={true} 
    title={"Tutorial"}
     />
 
     <ComplainTextField
          name={'societyhood'}
          placeholder="            societyhood.com"
          type={'default'}
          control={control}
            />

            <View style={{
              borderBottomWidth: 1,
              borderColor: colors.lightoffwhite,
              shadowColor: "#4d4d4d",
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.8,
              shadowRadius: 13.10,
              elevation: 10,
              marginTop: 15
            }} />
    
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
            }}>
    
      
       </ScrollView>
 </View>
    </SafeAreaView>
  )
}





export default Tutorial;


