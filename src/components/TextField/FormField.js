import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../CustomText'
import { Dimensions } from 'react-native'
import { colors } from '../../styles/colors'
import { fontsFamily } from '../../assets/Fonts'
import { TextInput } from 'react-native'

const { width, height } = Dimensions.get("window")

export default function FormField({ title }) {
    return (
        <View style={{ borderWidth: 1, borderRadius: 10, borderColor: colors.gray, marginVertical: width * 0.03 }}>
            <CustomText fontWeight={fontsFamily.medium}
                style={styles.enteramountview}>{title}</CustomText>

            <TextInput style={styles.textinputfield} />
        </View>
    )
}

const styles = StyleSheet.create({
    amountcard: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: width * 0.035,
        marginVertical: width * 0.01
    },
    enteramountview: {
        color: colors.black,
        backgroundColor: colors.white,
        paddingHorizontal: 8,
        position: 'absolute',
        top: -10,
        left: 14
    },
    textinputfield: {
        flex: 1,
        fontFamily: "Montserrat-Bold",
        fontSize: width * 0.045
    },
    labelContainer: {
        marginLeft: 25,
        paddingHorizontal: 15, // Amount of spacing between border and first/last letter
        marginStart: 10, // How far right do you want the label to start
        zIndex: 1, // Label must overlap border
        elevation: 1, // Needed for android
        shadowColor: colors.white, // Same as background color because elevation: 1 creates a shadow that we don't want
        position: "absolute", // Needed to be able to precisely overlap label with border
        top: -5, // Vertical position of label. Eyeball it to see where label intersects border.
        marginTop: 30,

    },
})