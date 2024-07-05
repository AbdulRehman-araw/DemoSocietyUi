import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import CustomText from '../CustomText'

const { width } = Dimensions.get("window")

const SlideButton = ({ data, selectedItem, handleBtn }) => {
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleBtn(item.name)} style={[styles.btnStyle, { backgroundColor: item.name == selectedItem ? colors.white : colors.p }]} key={item.name} >
          <CustomText style={{
            fontSize: width * 0.036,
            color: item.name == selectedItem ? colors.primary : colors.white
          }} >{item.name}</CustomText>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default SlideButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 6,
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 10
  },
  btnStyle: {
    flex: 1,
    alignItems: "center",
    padding: 6,
    borderRadius: 8,
  }
})