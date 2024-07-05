import { StyleSheet, Dimensions, Text, View } from 'react-native'
import React from 'react'
import { fontsFamily } from '../../assets/Fonts'
import { colors } from '../../styles/colors'


const { width } = Dimensions.get("window")


const CustomText = ({ children, fontWeight, style, numberOfLines, ellipsizeMode }) => {
  return (
    <View>
      <Text
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
        style={{
          ...style,
          fontFamily: fontWeight ? fontWeight : fontsFamily.regular,
          color: style?.color ? style?.color : colors.black,

        }} >{children}</Text>
    </View>
  )
}

export default CustomText

const styles = StyleSheet.create({})