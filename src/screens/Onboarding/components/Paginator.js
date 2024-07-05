import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import React from 'react'
import { colors } from '../../../styles/colors'


const { height, width } = Dimensions.get('window')
const Paginator = ({ data, scrollX }) => {
    return (
        <View style={styles.cont}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })
                return <Animated.View style={[styles.dot, { opacity, width: opacity === 1 ? width * 0.06 : width * 0.014 }]} key={i.toString()}
                />
            })}
        </View>
    )
}

export default Paginator

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: width * 0.05,
        marginVertical: width * 0.05
    },
    dot: {
        height: width * 0.014,
        borderRadius: width / 2,
        backgroundColor: colors.primary,
        marginHorizontal: 4,
        // width: width * 0.014
    }
})