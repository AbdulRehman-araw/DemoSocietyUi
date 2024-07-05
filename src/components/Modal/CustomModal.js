import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../styles/colors';
import CustomText from '../CustomText';
import { fontsFamily } from '../../assets/Fonts';
import { ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const CustomModal = ({ modalVisible, closeModal, data, getvalue }) => {

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <StatusBar backgroundColor={colors.white} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <CustomText
                fontWeight={fontsFamily.semiBold}
                style={styles.modalText}>
                Select{' '}
              </CustomText>
              <TouchableOpacity style={styles.cancelCross} onPress={closeModal}>
                <CustomText
                  fontWeight={fontsFamily.medium}
                  style={{
                    fontSize: width * 0.038,
                    color: colors.red,
                  }}>
                  X
                </CustomText>
              </TouchableOpacity>
            </View>

            {data?.length <= 0 ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              data?.map((val, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.doneBtn}
                  onPress={() => {
                    getvalue(val?.purpose
                      ? val?.purpose
                      : val?.apartmentID
                        ? val
                        : val?.title);
                    closeModal();
                  }}>
                  <CustomText style={styles.btnText}>
                    {val?.purpose
                      ? val?.purpose
                      : val?.apartmentID
                        ? val?.unit
                        : val?.title}
                  </CustomText>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    height: "80%",
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  modalView: {
    padding: width * 0.034,
    width: '80%',
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: width * 0.044,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: width * 0.04,
    color: colors.primary,
    padding: width * 0.025,
  },
  doneBtn: {
    textAlign: 'center',
    width: '100%',
    alignSelf: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: width * 0.02,
    marginBottom: width * 0.02,
  },
  btnText: {
    textAlign: 'center',
    fontSize: width * 0.04,
    color: colors.black,
    marginVertical: 13,
  },
  cancelCross: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 25,
    height: 25,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
