import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import { Images } from '../../assets/Images'
import CustomText from '../CustomText'
import { fontsFamily } from '../../assets/Fonts'

const SocietyCard = () => {
    return (
        <View style={styles.root}>
            <View style={styles.image}>
                <Image source={Images.Hall5} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
            </View>
            <View style={styles.rightSide}>
                <CustomText children={'Luck Yard Apartment'} style={styles.title} fontWeight={fontsFamily.semiBold} />
                <CustomText children={'3048 Buford Town Duluth Georgia 30096'} numberOfLines={2} style={styles.description} fontWeight={fontsFamily.semiBold} />
            </View>
        </View>
    )
}

export default SocietyCard

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.primary,
        marginVertical: 8,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 18,
        minWidth: 340,
        maxWidth: 340,
    },
    image: {
        flex: 0.6,
        margin: 12,
        borderRadius: 8,
        overflow: 'hidden'
    },
    rightSide: {
        flex: 0.8,
        padding: 4
    },
    title: {
        marginBottom: 18,
        fontSize: 18,
        color: colors.dark,
        paddingRight: 8,
    },
    description: {
        fontSize: 14,
        color: colors.dark,
        paddingRight: 8,
    }
})