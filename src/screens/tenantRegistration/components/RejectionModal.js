import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../styles/colors';
import CustomText from '../../../components/CustomText';
import {fontsFamily} from '../../../assets/Fonts';
import FilledTextField from '../../../components/TextField/FilledTextField';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import {apiCall} from '../../../Services/apiCall';
const {width} = Dimensions.get('window');
const RejectionModal = ({
  completeData,
  rejectionModal,
  setRejectionModal,
  setErrorModalText,
  setAlertType,
  setErrorModal1,
}) => {
  const navigation = useNavigation();

  const {control, handleSubmit, setValue, resetField} = useForm();

  const registrationRejection = async formData => {
    try {
      let result = await apiCall.tenantRejectRegistrationStatus(
        completeData?.registrationID,
        false,
        formData?.status,
      );
      setAlertType('s');
      setErrorModalText('Registration rejected successfully');
      setErrorModal1(true);
      setTimeout(() => {
        setErrorModal1(false);
        navigation?.goBack();
      }, 2000);
    } catch (error) {
      setRejectionModal(false);
      setAlertType('w');
      setErrorModalText(error);
      setErrorModal1(true);
    } finally {
    }
  };

  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={rejectionModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setRejectionModal(!rejectionModal);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{fontSize: width * 0.06, marginBottom: width * 0.06}}>
            Registration Rejection
          </CustomText>

          <View style={{width: '100%'}}>
            <FilledTextField
              name={'status'}
              placeholder="Reason"
              type={'default'}
              control={control}
              rules={{
                required: 'Reason is required',
              }}
              onSubmitEditing={handleSubmit(registrationRejection)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              width: '80%',
            }}>
            <View style={{width: '40%'}}>
              <PrimaryButton
                outlined
                customStyle={{
                  padding: width * 0.032,
                  marginTop: 15,
                  borderColor: colors.primary,
                }}
                textStyle={{color: colors.primary}}
                title={'Close'}
                onPress={() => setRejectionModal(!rejectionModal)}
              />
            </View>
            <View style={{width: '40%'}}>
              <PrimaryButton
                customStyle={{padding: width * 0.032}}
                title={'Reject'}
                //   loader={loader}
                onPress={handleSubmit(registrationRejection)}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: width * 0.08,
    backgroundColor: 'rgba(0,0,0,.8)',
  },
  modalView: {
    margin: width * 0.05,
    backgroundColor: 'white',
    borderRadius: width * 0.04,
    padding: width * 0.04,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: width * 0.01,
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.02,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors?.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default RejectionModal;
