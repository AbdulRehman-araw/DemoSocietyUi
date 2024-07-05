import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../CustomText'
import { fontsFamily } from '../../assets/Fonts'

const RoundButton = ({ text, loader, color, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.mainView, borderColor: color }}>
            {loader ?
                <View>
                    <ActivityIndicator size={'small'} color={color} />
                </View>
                :
                <CustomText children={text} fontWeight={fontsFamily.bold} style={{ ...styles.text, color: color }} />}
        </TouchableOpacity>
    )
}

export default RoundButton

const styles = StyleSheet.create({
    mainView: {
        borderWidth: 1.5,
        padding: 10,
        minWidth: 160,
        borderRadius: 30
    },
    text: {
        fontSize: 14,
        textAlign: 'center'
    }
})