import React, {useState, useEffect} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {colors} from '../../styles/colors';
import CustomText from '../CustomText';
import {fontsFamily} from '../../assets/Fonts';
import {Dimensions, StatusBar} from 'react-native';
import {Images} from '../../assets/Images';

const {width} = Dimensions.get('window');

const PostDatesPicker = ({modalVisible, date, setDate, closeModal, mode}) => {
  const [modalDate, setModalDate] = useState(new Date()); // Initialize with the current date

  // Calculate the minimum date as today's date
  const minDate = new Date();
  const tomorrow = new Date(minDate);
  tomorrow.setDate(minDate.getDate() + 1);
  useEffect(() => {
    if (modalVisible) {
      // Reset modalDate to the current date when the modal is opened
      setModalDate(tomorrow);
    }
  }, [modalVisible]);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <StatusBar backgroundColor={colors.white} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={styles.modalText}>
              Select {mode === 'date' ? 'Date' : 'Time'}
            </CustomText>
            <TouchableOpacity style={styles.cancelCross} onPress={closeModal}>
              <CustomText
                fontWeight={fontsFamily.medium}
                style={{fontSize: width * 0.038, color: colors.red}}>
                X
              </CustomText>
            </TouchableOpacity>
          </View>
          <DatePicker
            onDateChange={e => setModalDate(e)}
            textColor="black"
            title={mode === 'date' ? 'Set Date' : 'Set Time'}
            mode={mode}
            open={modalVisible}
            date={modalDate} // Use modalDate instead of date here
            dividerHeight={0}
            minimumDate={tomorrow} // Set minimumDate to restrict past dates
            style={{alignSelf: 'center'}}
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

export default PostDatesPicker;

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
