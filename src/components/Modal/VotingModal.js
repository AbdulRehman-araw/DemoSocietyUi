import { StyleSheet, Text, View, Modal, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import { Images } from '../../assets/Images'
import CustomText from '../CustomText'
import { fontsFamily } from '../../assets/Fonts'
import PrimaryButton from '../Button/PrimaryButton'
import DenayBtn from '../Button/DenayBtn'

const { width, height } = Dimensions.get('window')
const VotingModal = ({ visible, close, type, text, button, warning, loading, cancel }) => {
    return (
        <Modal visible={visible} transparent={true} onRequestClose={() => close(false)}>
            <View style={styles.MainCon}>
                <View style={styles.centerCon}>
                    <View style={styles.Header}>

                    </View>
                    <View style={styles.CenterImg}>
                        <Image source={type == 'w' ? Images.Tick : Images.cancelFilled} resizeMode={'contain'} style={styles.img} />
                    </View>
                    <CustomText fontWeight={fontsFamily.semiBold} style={styles.text}>
                        {text}
                    </CustomText>
                    {button &&

                        <View style={{ flexDirection: 'row' }}>

                            <DenayBtn
                                customStyle={{ paddingHorizontal: width * 0.045, paddingVertical: width * 0.032, marginRight: width * 0.05, color:'red'}}
                                title={'Cancel'}
                                loader={loading}
                                onPress={cancel}
                            />
                            <PrimaryButton
                                customStyle={{ paddingHorizontal: width * 0.055, paddingVertical: width * 0.032 , marginLeft: width * 0.02   }}
                                title={'Lock it'}
                                loader={loading}
                                onPress={warning}
                            />




                        </View>



                    }
                </View>
            </View>
        </Modal>
    )
}

export default VotingModal

const styles = StyleSheet.create({
    MainCon: {
        flex: 1,
        backgroundColor: 'rgba(192,192,192,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width * 0.03
    },
    centerCon: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.white,
        paddingVertical: width * 0.04,
        paddingBottom: width * 0.06,
        paddingHorizontal: width * 0.05,
        borderRadius: width * 0.03,
        alignItems: 'center',
        justifyContent: 'center'
    },
    CenterImg: {
        width: width * 0.2,
        height: width * 0.2,
        alignSelf: 'center',
        marginVertical: width * 0.03
    },
    img: {
        width: '100%',
        height: '100%',
    },
    text: {
        color: colors.black,
        fontSize: width * 0.035
    },
    Header: {
        width: '100%',
        alignItems: 'flex-end'
    },
    HeaderImg: {
        width: width * 0.05,
        height: width * 0.05,
    }
})