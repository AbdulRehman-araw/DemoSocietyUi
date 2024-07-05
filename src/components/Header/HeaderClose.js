import { Dimensions, Image, StyleSheet,  TouchableOpacity,  View } from 'react-native'
import React from 'react'
import CustomText from '../CustomText'
import { Images } from '../../assets/Images'
import { fontsFamily } from '../../assets/Fonts'
import { colors } from '../../styles/colors'

const {width} = Dimensions.get("window")

const HeaderClose = ({title,verificationstyle,textdocument,leftcancel,btnstyle,showRightBtn,textresidant,textStyle,iconStyle,icon,iconText,onBack,newiconstyle,eformstyle,headertext,textwhite,handleRightBtn,arrowstyle,leftarrow,notifcationstyle}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onBack} style={{flex:0.2}}>
            <Image source={Images.iconcancel} resizeMode="contain" style={{width:width * 0.045,height:width*0.045,...iconStyle,...leftarrow,...leftcancel,...arrowstyle,...verificationstyle}} />
        </TouchableOpacity>
        <View style={{flex:0.9,alignItems:"center"}}>
            <CustomText fontWeight={fontsFamily.semiBold} style={{...styles.title,...textStyle,...textresidant,...textwhite,...textdocument,...headertext,...eformstyle}}>{title}</CustomText>
        </View>
            <TouchableOpacity onPress={handleRightBtn} style={{flex:0.2,alignItems:"center"}}>
            {showRightBtn && (
                icon ? (
            <Image source={icon} resizeMode="contain" style={{width:30,height:30,...newiconstyle,...btnstyle,...notifcationstyle}} />
                ):(
                    <CustomText fontWeight={fontsFamily.semiBold} style={{ color:colors.primary,fontSize:width*0.034}}>{iconText}</CustomText>
                )
            )}
        </TouchableOpacity>
    </View>
  )
}

export default HeaderClose;


const styles = StyleSheet.create({
container:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginVertical:15,
    // marginTop:40
   
},
title:{
    fontSize:width*0.047,
    color:colors.black,
    fontWeight:"600"
}
})