import {
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';

import React, {useState} from 'react';
import {colors} from '../../styles/colors';
import CustomText from '../CustomText';
import {fontsFamily} from '../../assets/Fonts';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets/Images';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {text} from '../../res/strings';

import {Calendar, LocaleConfig} from 'react-native-calendars';

const {width} = Dimensions.get('window');

const CanlerderModal = ({modalVisible, date, setDate, closeModal}) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <StatusBar backgroundColor={colors.lightdark} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{
              color: colors.primary,
              fontSize: width * 0.045,
              marginLeft: 10,
            }}>
            When do you want to book this place?
          </CustomText>

          <View style={{marginTop: 10}}>
            <Calendar
              onDayPress={day => {
                setSelected(day.dateString);
                closeModal();
              }}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'orange',
                },
              }}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={closeModal} />
    </Modal>
  );
};

export default CanlerderModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "rgba(255,255,255,0.8)",
    backgroundColor: colors.lightdark,
  },
  modalView: {
    padding: width * 0.034,
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'relative',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 380,
  },
  modalText: {
    fontSize: width * 0.038,
    color: colors.black,
    padding: width * 0.022,
    marginHorizontal: width * 0.06,
  },
  viewall: {
    marginVertical: width * 0.08,
  },
  viewreservation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  viewtime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },

  viewaddress: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 1.5,
    borderColor: colors.lightoffwhite,
    marginTop: 5,
    marginLeft: 10,
    width: width * 0.72,
  },
  arrowforward: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
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
});
