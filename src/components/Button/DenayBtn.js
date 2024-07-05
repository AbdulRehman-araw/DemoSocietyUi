import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../CustomText'
import { colors } from '../../styles/colors'
import { fontsFamily } from '../../assets/Fonts'
import { ActivityIndicator } from 'react-native'


const { width } = Dimensions.get("window")

const DenayBtn = ({ title, onPress, outlined, customStyle, loader, textStyle }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[outlined ? styles.outlineBtn : styles.buttonStyle, customStyle]}>
      {loader ? <ActivityIndicator size={'small'} color={colors.white} /> :
        <CustomText fontWeight={fontsFamily.medium} style={{ ...outlined ? styles.outlineTitle : styles.titleStyle, ...textStyle }} >{title}</CustomText>
      }
    </TouchableOpacity>
  )
}

export default DenayBtn

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.lightwhite,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    borderWidth:1,
    borderColor:colors.primary
    
  },
  outlineBtn: {
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightRed
  },
  titleStyle: {
    color: colors.primary,
    fontSize: width * 0.038
  },
  outlineTitle: {
    color: colors.lightRed,
    fontSize: width * 0.038
  }
})
