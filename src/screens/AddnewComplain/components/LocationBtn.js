import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../../styles/colors'
import CustomText from '../../../components/CustomText'
import { fontsFamily } from '../../../assets/Fonts'


const {width} = Dimensions.get("window")


const LocationBtn = ({title,selectedItem,setSelectedItem,Location}) => {
  return (
    <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=>setSelectedItem(Location)}
    style={{...styles.container,
        backgroundColor:selectedItem?.name == title ?colors.primary : "#F5F5F5",
        borderWidth:selectedItem == title ? 0 : 1,
        borderColor: colors.gray
    }}
    >
    <CustomText
      fontWeight={fontsFamily.semiBold}
      style={{
        color: selectedItem?.name == title ? colors.white : colors.black,
        fontSize: width* 0.029,
      }}>
      {Location?.name}
    </CustomText>
  </TouchableOpacity>
  )
}

export default LocationBtn

const styles = StyleSheet.create({
    container:{
        borderRadius: 10, 
        alignItems:"center",
        paddingVertical:12,
        paddingHorizontal:width * 0.06,
        marginHorizontal:width*0.02,
        marginVertical:5
    },

})