import { StyleSheet, TextInput, BackHandler, Button, Text, Dimensions, SafeAreaView, StatusBar, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'

import Header from '../../components/Header/Header'
import CustomText from '../../components/CustomText'
import { Images } from '../../assets/Images';

import { text } from '../../res/strings'
import { fontsFamily } from '../../assets/Fonts'
import PrimaryButton from '../../components/Button/PrimaryButton'
import { styles } from './styles/styles'
import { Modal } from 'react-native'
import { useSelector } from 'react-redux'

const { width } = Dimensions.get("window")


const BookingSuccessful = ({ visible, handleClose }) => {

  const { email } = useSelector(state => state.userDataReducer.userAccountDetails);

  return (
    <Modal visible={visible} onRequestClose={handleClose} animationType='slide'>
      {/* <StatusBar translucent={false} backgroundColor={colors.white} barStyle="dark-content" /> */}
      <View style={styles.root}>


        <View style={{ paddingHorizontal: width * 0.03 }}>
          <Header onBack={handleClose} showRightBtn={true} />

        </View>

        <View style={{ flex: 1, justifyContent: 'center' }}>

          <View style={styles.viewimg}>
            <Image
              source={Images.Tick}
              style={{ width: '100%', height: '100%', }}
              resizeMode="contain"
            />
          </View>

          <View>
            <CustomText
              fontWeight={fontsFamily.bold}
              style={styles.centertext}>
              {text.bookingSuccessful}
            </CustomText>
            <View style={{ marginTop:30 }}>
              <Text style={styles.text2}>Your request has been submitted.</Text>
              <Text  style={styles.text2}>Admin will review and approve or reject your submission</Text>
              <Text  style={styles.text2}>according to booking slot. Thanks!</Text>
             
            </View>
          </View>


          <View style={{ marginBottom: width * 0.2, marginTop:width*0.04 }}>
            <PrimaryButton customStyle={styles.btn} onPress={handleClose}
              fonttitle={{ fontSize: width * 0.045 }}
              title={text.done} />
          </View>
        </View>
      </View>
    </Modal>
  )
}


export default BookingSuccessful;


