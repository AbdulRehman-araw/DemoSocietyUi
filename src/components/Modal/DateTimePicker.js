import {
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
import DatePicker from 'react-native-date-picker';
import { fontsFamily } from '../../assets/Fonts';

const { width } = Dimensions.get('window');

const DateTimePicker = ({ modalVisible, date, setDate, closeModal, mode }) => {
  const [modalDate, setModalDate] = useState('');
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <StatusBar backgroundColor={colors.white} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={styles.modalText}>
              Select {mode == 'date' ? 'Date' : 'Time'}
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
          <DatePicker
            onDateChange={e => {
              console.log("date channge ===>", e);
              setModalDate(e)
              setDate(e)
            }}
            textColor="black"
            title={'Set Time'}
            mode={mode}
            open={modalVisible}
            date={date}
            dividerHeight={0}
            style={{ alignSelf: 'center' }}
          />

          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => {
              setDate(modalDate ? modalDate : date);
              closeModal();
            }}>
            <CustomText style={styles.btnText}>Done</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
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
  },
  btnText: {
    textAlign: 'center',
    fontSize: width * 0.04,
    color: colors.primary,
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
