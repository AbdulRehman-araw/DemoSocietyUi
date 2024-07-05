import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDrawerProgress } from '@react-navigation/drawer'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { colors } from '../styles/colors'

const DrawerScreenWrapper = ({ children, style }) => {
    const progress = useDrawerProgress()
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(progress.value, [0, 1], [1, 0.8], 'clamp')
            }
        ]
    }))
    return (
        <Animated.View style={[styles.container, style, animatedStyle]}>
            {children}
        </Animated.View>
    )
}

export default DrawerScreenWrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
