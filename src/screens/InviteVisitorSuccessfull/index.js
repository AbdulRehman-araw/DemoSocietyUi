import { StyleSheet, TextInput, BackHandler, Button, Text, Dimensions, SafeAreaView, StatusBar, View, Image, Alert, TouchableOpacity, Platform } from 'react-native'
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
import { Share, Clipboard } from 'react-native'
// import Clipboard from '@react-native-clipboard/clipboard';
const { width } = Dimensions.get("window")


const InviteVistorSuccessfully = ({ modalVisible, closeModal, mode, number, link }) => {
  // const Details = useSelector(state => state.userDataReducer.userAccountDetails);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("🚀 ~ file: index.js:29 ~ onShare ~ result.activityType:", result.activityType)
          // shared with activity type of result.activityType
        } else {
          console.log(result)
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={[styles.root, { marginTop: Platform.OS == "ios" ? 50 : 0 }]}>



        <Header onBack={closeModal} showRightBtn={true} title={"Invite Now"} />
        <View style={{ paddingHorizontal: width * 0.032, flex: 1, justifyContent: 'center', alignItems: 'center' }}>


          <TouchableOpacity
            activeOpacity={1}
            onPress={closeModal}
            style={styles.viewimg}>
            <Image
              source={Images.Tick}
              style={{ height: '100%', width: '100%' }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={styles.centertext}>
            {text.invitesuccessful}
          </CustomText>
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={styles.text}>
            {mode == 's' ?
              `Invite link has been sent to \n${number}.`
              // {``}

              : 'Confirmation email has been sent to email '}
          </CustomText>

          {mode == 'a' && (
            <View style={styles.viewbtn}>

              <View style={{ marginVertical: width * 0.05, }}>
                <PrimaryButton
                  onPress={() => Clipboard.setString(link)}
                  customStyle={styles.btn}
                  fonttitle={{ fontSize: width * 0.034 }}
                  title={text.copylink} />
              </View>

              <View style={{ marginVertical: width * 0.05 }}>
                <PrimaryButton
                  onPress={onShare}
                  customStyle={styles.btn}
                  fonttitle={{ fontSize: width * 0.034 }}
                  title={text.sharelink} />
              </View>

            </View>
          )}



        </View>
      </View>
    </Modal>
  )
}
export default InviteVistorSuccessfully