import { Dimensions, Modal, StatusBar, StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'

import React, { useState } from 'react'
import { colors } from '../../styles/colors';
import CustomText from '../CustomText';
import { fontsFamily } from '../../assets/Fonts';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets/Images';
import PrimaryButton from '../../components/Button/PrimaryButton'
import { text } from '../../res/strings'
import CanlerderModal from './Calendar';



const { width } = Dimensions.get("window")

const CommunityModal = ({ modalVisible, date, setDate, closeModal }) => {
  const navigation = useNavigation();
  const [counter, setCounter] = useState(40);
  const [open, setOpen] = useState(false)

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
    >
      <StatusBar backgroundColor={colors.lightdark} />
      <View style={styles.centeredView}>

        <View style={styles.modalView}>
          <View>
            <View style={styles.viewall}>

              <CanlerderModal
                modalVisible={open}
                closeModal={() => setOpen(false)}

              />
              <CustomText
                fontWeight={fontsFamily.bold}
                style={{ color: colors.primary, fontSize: width * 0.045, marginLeft: 10 }}>
                Book a community hall?
              </CustomText>
            </View>

            <CustomText
              fontWeight={fontsFamily.bold}
              style={{ color: colors.black, fontSize: width * 0.034, marginLeft: 10 }}>
              When do you want to book this place?
            </CustomText>

            <TouchableOpacity style={styles.viewreservation} onPress={() => setOpen(true)}>
              <CustomText
                fontWeight={fontsFamily.bold}
                style={{ color: colors.black, fontSize: width * 0.037, marginLeft: 10 }}>
                Reservation
              </CustomText>

              <View style={{ flexDirection: 'row' }}>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.number}>
                  26 Feb 2023
                </CustomText>
                <Image source={Images.ionicarrowforward} resizeMode="contain" style={{ width: width * 0.022, marginLeft: 15 }} />
              </View>
            </TouchableOpacity>

            <View style={styles.line} />

            <TouchableOpacity style={styles.viewtime}>
              <CustomText
                fontWeight={fontsFamily.bold}
                style={{ color: colors.black, fontSize: width * 0.038, marginLeft: 10 }}>
                Time
              </CustomText>

              <View style={{ flexDirection: 'row' }}>
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={styles.time}>
                  7:30 PM to 12:00 AM
                </CustomText>
                <Image source={Images.ionicarrowforward} resizeMode="contain" style={{ width: width * 0.022, marginLeft: 15 }} />
              </View>
            </TouchableOpacity>

            <View style={styles.line} />

            <CustomText
              fontWeight={fontsFamily.bold}
              style={{ color: colors.black, fontSize: width * 0.035, marginLeft: 10, marginTop: 20 }}>
              How many people?
            </CustomText>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setCounter(counter - 1)}>
                <Image source={Images.minusarrow} resizeMode="contain" style={{ width: width * 0.045, marginLeft: 5 }} />
              </TouchableOpacity>
              <CustomText
                fontWeight={fontsFamily.bold}
                style={{ color: colors.black, fontSize: width * 0.032, marginLeft: 5, marginTop: 15 }}>
                {counter}
              </CustomText>
              <TouchableOpacity onPress={() => setCounter(counter + 1)}>
                <Image source={Images.plusarrow} resizeMode="contain" style={{ width: width * 0.045, marginLeft: 15 }} />
              </TouchableOpacity>
            </View>

            <View style={{ marginVertical: width * 0.17 }}>
              <PrimaryButton customStyle={{ padding: width * 0.035, width: width * 0.75, marginLeft: 25 }}
                title={text.booknow}
                onPress={() => navigation.navigate("bookingSuccessfully")} />
            </View>

          </View>
        </View>

      </View>

      <TouchableOpacity onPress={closeModal} />

    </Modal>


  )
}

export default CommunityModal;



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(255,255,255,0.8)",
    backgroundColor: colors.lightdark

  },
  modalView: {
    padding: width * 0.034,
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "relative",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 380

  },
  modalText: {
    fontSize: width * 0.038,
    color: colors.black,
    padding: width * 0.022,
    marginHorizontal: width * 0.060
  },
  viewall: {
    marginVertical: width * 0.08,
  },
  viewreservation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  viewtime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
  },

  viewaddress: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',

  },
  line: {
    borderBottomWidth: 1.5,
    borderColor: colors.lightoffwhite,
    marginTop: 5,
    marginLeft: 10,
    width: width * 0.72
  },
  arrowforward: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
    marginTop: 25
  },
  number: {
    color: colors.darkGray,
    fontSize: width * 0.027,
    marginLeft: 10,
    marginTop: 15,
  },
  time: {
    color: colors.lightgray,
    fontSize: width * 0.027,
    marginLeft: 10,
    marginTop: 15,
  },


})