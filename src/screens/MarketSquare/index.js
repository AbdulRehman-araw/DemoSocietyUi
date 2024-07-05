import { TextInput, BackHandler, StyleSheet, Button, Text, Dimensions, SafeAreaView, StatusBar, View, Image, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'


import CustomText from '../../components/CustomText'
import Header from '../../components/Header/Header'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { fontsFamily } from '../../assets/Fonts'
import CustomHeaderColor from '../../components/Header/HeaderColor'
import { styles } from './styles/styles'
import { Images } from '../../assets/Images';


const { width, height } = Dimensions.get("window")


const MarketSquare = ({ navigation }) => {

  const goBack = () => {
    navigation.goBack()
  }

  const handleBack = () => {
    goBack()
    return true
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack)
    }
  }, [])
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar translucent={false} backgroundColor={colors.white} barStyle="dark-content" />

      <View style={{ flex: 1, }}>
        <Header
          onBack={goBack}
          title={"Market Square"}
          showRightBtn={true}
          icon={Images.iconnotifications}
          headerContainer={{ paddingHorizontal: width * 0.032, marginBottom: height * 0.02 }}
          handleRightBtn={() => navigation.navigate('notificaton')}
        />

        <CustomHeaderColor
          children={"Services"}
          style={{ fontSize: width * 0.040, marginLeft: 20, marginTop: 10 }}
          fontWeight={fontsFamily.bold}
        />


        <View style={styles.viewimages}>
          <TouchableOpacity>
            <Image source={Images.pestcontrol} resizeMode="contain" style={{ width: width * 0.13, }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.cleaningservices} resizeMode="contain" style={{ width: width * 0.13, }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.laundry} resizeMode="contain" style={{ width: width * 0.13, }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.blinds} resizeMode="contain" style={{ width: width * 0.13, }} />
          </TouchableOpacity>
        </View>

        <View style={styles.viewtext}>
          <View style={{ marginLeft: 25 }}>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={styles.pestcontroltext}>
              Pest
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{
                color: colors.black,
                fontSize: width * 0.027,
              }}>
              Control
            </CustomText>

          </View>

          <View style={{ marginLeft: 20 }}>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={styles.cleaningtext}>
              Cleaning
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{
                color: colors.black,
                fontSize: width * 0.027,
              }}>
              Services
            </CustomText>

          </View>

          <View style={{ marginLeft: 20, marginTop: 3 }}>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={styles.laundrytext}>
              Laundry
            </CustomText>
          </View>

          <View style={{ marginLeft: 25, marginRight: 35 }}>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={styles.blindstext}>
              Blinds &
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{
                color: colors.black,
                fontSize: width * 0.027,
              }}>
              Fold
            </CustomText>



          </View>
        </View>


      </View>
    </SafeAreaView>
  )
}


export default MarketSquare;






