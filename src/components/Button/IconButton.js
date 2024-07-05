import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../CustomText'
import { fontsFamily } from '../../assets/Fonts'
import { Images } from '../../assets/Images'
import { colors } from '../../styles/colors'

const { width, height } = Dimensions.get('screen')

const IconButton = ({ btnText, img, isSelected, onPress }) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.mainView, backgroundColor: isSelected ? colors.white : colors.btnInactiveColor }}>
      <View style={{ ...styles.imgView, borderRadius: 8, }}>
        <Image style={{ ...styles.img, tintColor: isSelected ? colors.primary : colors.white, }} source={img} />
      </View>
      <CustomText
        children={btnText}
        fontWeight={fontsFamily.semiBold}
        style={{ ...styles.btnText, color: isSelected ? colors.primary : colors.white }} />
    </TouchableOpacity>
  )
}

export default IconButton

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 16,
    alignSelf: 'center',
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.04,
    minWidth: 190,
  },
  imgView: {
    width: width * 0.06, height: width * 0.06,
    marginHorizontal: 8
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  btnText: {
    fontSize: 16,
    paddingLeft: 20,
  }
})