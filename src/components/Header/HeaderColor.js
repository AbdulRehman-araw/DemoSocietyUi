import { StyleSheet, Dimensions, Text, View } from 'react-native'
import React from 'react'
import { fontsFamily } from '../../assets/Fonts'
import { colors } from '../../styles/colors'


const { width } = Dimensions.get("window")


const CustomHeaderColor = ({ children, fontWeight, style, headerstyle, numberOfLines, ellipsizeMode }) => {
  return (

    <View style={{ ...styles.headercolor, ...headerstyle }}>
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

const styles = StyleSheet.create({

  headercolor: {
    backgroundColor: colors.lightoffwhite,
    width: width,
    height: width * 0.12,
    justifyContent: 'center',
    paddingHorizontal: 18

  },

});


export default CustomHeaderColor;


