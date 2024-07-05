import React, { useState, useEffect } from 'react';
import { Text, Dimensions, SafeAreaView, ScrollView, View, Image, TouchableOpacity } from 'react-native';

//local imports
// import Header from '../../../components/Header.component';
import styles from './styles';
import { colors } from '../../../styles/colors';
import { Images } from '../../../assets/Images';
import CustomText from '../../../components/CustomText';
import { fontsFamily } from '../../../assets/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { setUserRole } from '../../../redux/slices/userDataSlice';
//third party library

// dimenstion
const { width, height } = Dimensions.get('window');

const Index = ({ navigation, ...props }) => {

    const { role } = useSelector(state => state.userDataReducer.userData)
    const dispatch = useDispatch();

    const updateRole = (userRole) => {
        dispatch(setUserRole(userRole));
        navigation.replace('drawer')
    }

    return (
        <>
            {/* <MyStatusBar backgroundColor={color.PRIMARY} /> */}
            <SafeAreaView style={styles.container}>
                {/* <Header HeadTxt={'Home'} /> */}
                <ScrollView
                    contentContainerStyle={styles.contStyle}
                    showsVerticalScrollIndicator={false}>
                    {/* <Text style={styles.txt1}>Home</Text> */}
                    <View>

                        <View style={styles.imgCon}>
                            <Image
                                source={Images.logo}
                                resizeMode={'contain'}
                                style={styles.img}
                            />
                        </View>

                        <CustomText
                            fontWeight={fontsFamily.semiBold}
                            style={{
                                color: colors.black,
                                width: width * 0.9,
                                alignSelf: 'center',
                                marginBottom: width * 0.05
                            }}
                        >Continue with?</CustomText>
                        {role?.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => updateRole(item)}
                                activeOpacity={1}
                                style={[styles.btn, { marginBottom: width * 0.03 }]}
                            >
                                <CustomText fontWeight={fontsFamily.medium} style={{ fontSize: width * 0.04, color: colors.white }}>{item}</CustomText>
                            </TouchableOpacity>
                        ))}
                        {/* <TouchableOpacity
                            // onPress={}
                            activeOpacity={1}
                            style={styles.btn}
                        >
                            <CustomText fontWeight={fontsFamily.medium} style={{ fontSize: width * 0.04, color: colors.white }}>{role[1]}</CustomText>
                        </TouchableOpacity> */}
                    </View>
                    <TouchableOpacity activeOpacity={1} style={styles.bottomBtn}>
                        <View style={styles.bottomBtnImg}>
                            <Image
                                source={Images.exittoapp}
                                resizeMode='contain'
                                style={[styles.img, { tintColor: colors.black }]}
                            />
                        </View>
                        <CustomText fontWeight={fontsFamily?.medium} style={{
                            fontSize: width * 0.03,
                            color: colors.black,
                            marginLeft: width * 0.04
                        }}>Log Out</CustomText>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
            {/* {loader && <Loader />} */}
        </>
    );
};

export default Index;