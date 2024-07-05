import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import { Images } from '../../assets/Images'
import CustomText from '../CustomText'
import { fontsFamily } from '../../assets/Fonts'
import RoundButton from '../Button/RoundButton'
import moment from 'moment'

const FacilityBookingCard = ({ data, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.mainView}>
            <View style={{ ...styles.row, justifyContent: 'space-between' }}>
                <View style={{ ...styles.row }}>
                    <Image source={Images.Hall3} style={styles.img} />
                    <View style={{ maxWidth: '60%' }}>
                        <CustomText children={data?.venueName} style={styles.title} fontWeight={fontsFamily.bold} />
                    </View>
                </View>

                <View style={{}}>
                    <CustomText children={'Request Date Time'} fontWeight={fontsFamily.semiBold} style={{ ...styles.dateTimeTxt, color: colors.darkGray, alignSelf: 'flex-end' }} />
                    <View style={{ ...styles.row, alignSelf: 'flex-end', marginVertical: 6 }}>
                        <Image source={Images.clock_outlined} style={styles.dateTimeImg} />
                        <CustomText children={data?.startTime} style={styles.dateTimeTxt} fontWeight={fontsFamily.bold} />
                    </View>
                    <View style={{ ...styles.row, alignSelf: 'flex-end' }}>
                        <Image source={Images.calender_outlined} style={styles.dateTimeImg} />
                        <CustomText children={moment(data?.eventDate).format('DD MMMM YYYY')} style={styles.dateTimeTxt} fontWeight={fontsFamily.bold} />
                    </View>
                </View>

            </View>


            <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                <CustomText children={'Time'} fontWeight={fontsFamily.semiBold} style={{ ...styles.dateTimeTxt, color: colors.darkGray }} />
                <View style={{ ...styles.row, justifyContent: 'space-between', marginTop: 6 }}>
                    <View style={{ ...styles.row, alignSelf: 'flex-end', marginVertical: 6, borderBottomWidth: 1, width: '45%', paddingBottom: 20, justifyContent: 'flex-start' }}>
                        <Image source={Images.clock_outlined} style={styles.dateTimeImg} />
                        <CustomText children={data?.startTime} style={styles.dateTimeTxt} fontWeight={fontsFamily.bold} />
                    </View>
                    <CustomText children={'To'} fontWeight={fontsFamily.semiBold} style={{ ...styles.dateTimeTxt, color: colors.darkGray, marginHorizontal: 8, fontSize: 16, bottom: 10 }} />
                    <View style={{ ...styles.row, alignSelf: 'flex-end', marginVertical: 6, borderBottomWidth: 1, width: '45%', paddingBottom: 20, justifyContent: 'flex-end' }}>
                        <Image source={Images.clock_outlined} style={styles.dateTimeImg} />
                        <CustomText children={data?.endTime} style={styles.dateTimeTxt} fontWeight={fontsFamily.bold} />
                    </View>
                </View>
            </View>


            <View style={{ ...styles.row, justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                    <CustomText children={'Booked By'} fontWeight={fontsFamily.semiBold} style={{ ...styles.dateTimeTxt, color: colors.darkGray }} />
                    <View style={{ ...styles.row, marginTop: 10 }}>
                        <Image source={Images.Hall3} style={styles.img} />
                        <View>
                            <CustomText children={'Kim Hardy'} style={{ ...styles.title, fontSize: 16 }} fontWeight={fontsFamily.bold} />
                            <CustomText children={'Block B 404'} style={styles.subTitle} fontWeight={fontsFamily.semiBold} />
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 8, marginTop: 10 }}>
                    <CustomText children={'Persons'} fontWeight={fontsFamily.semiBold} style={{ ...styles.dateTimeTxt, color: colors.darkGray }} />
                    <View style={{ ...styles.row, marginTop: 10 }}>
                        <Image source={Images.Hall3} style={styles.img} />
                        <View>
                            <CustomText children={data?.totalPersons + ' Persons'} style={{ ...styles.title, fontSize: 16 }} fontWeight={fontsFamily.bold} />
                        </View>
                    </View>
                </View>

            </View>

            <View style={{ ...styles.row, justifyContent: 'space-evenly', marginTop: 50 }}>
                <RoundButton color={colors.success} text={'Accept'} />
                <RoundButton color={colors.danger} text={'Reject'} />
            </View>

        </TouchableOpacity>
    )
}

export default FacilityBookingCard

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 14,
        marginVertical: 14
    },
    img: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginHorizontal: 8,
        borderRadius: 20,
    },
    dateTimeImg: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        tintColor: colors.primary,
        marginHorizontal: 8
    },
    dateTimeTxt: {
        fontSize: 12,
        color: colors.primary
    },
    title: {
        fontSize: 18,
        color: colors.black,
    },
    subTitle: {
        fontSize: 14,
        color: colors.black
    },

    //utility style
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})