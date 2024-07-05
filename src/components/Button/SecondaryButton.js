import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../CustomText'
import { colors } from '../../styles/colors'
import { fontsFamily } from '../../assets/Fonts'
import { ActivityIndicator } from 'react-native'


const { width } = Dimensions.get("window")

const SecondaryButton = ({ title, onPress, customStyle, textStyle, loader, buttonColor }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ ...styles.outlineBtn, ...customStyle, borderColor: buttonColor, backgroundColor: buttonColor + '26' }}>
      {loader ? <ActivityIndicator size={'small'} color={colors.white} /> :
        <CustomText fontWeight={fontsFamily.medium} style={{ ...styles.outlineTitle, color: buttonColor, ...textStyle }}>{title}</CustomText>
      }
    </TouchableOpacity >
  )
}

export default SecondaryButton

const styles = StyleSheet.create({
  outlineBtn: {
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    marginBottom: width * 0.01
  },
  outlineTitle: {
    fontSize: width * 0.026,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.01,
    fontWeight: 'bold',
  }
})
