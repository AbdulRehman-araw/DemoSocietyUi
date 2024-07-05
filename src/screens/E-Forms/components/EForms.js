import React from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import {colors} from '../../../styles/colors';
import {fontsFamily} from '../../../assets/Fonts';
import CustomText from '../../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../../assets/Images';

const {width} = Dimensions.get('window');

const EFormsModal = ({
  modalVisible,
  setModalVisible,
  closeModal,
  formsData,
}) => {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <View
              style={{
                width: width * 0.05,
                height: width * 0.05,
                alignSelf: 'flex-end',
              }}>
              <Image
                source={Images.iconcancel}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </TouchableOpacity>
          {formsData?.length > 0 ? (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
                {formsData?.map((item, index) => (
                  <View key={index}>
                    <TouchableOpacity
                      style={{marginTop: 10}}
                      onPress={() => [
                        navigation.navigate('submitEForm', {data: item}),
                        setModalVisible(false),
                      ]}>
                      <CustomText
                        fontWeight={fontsFamily.semiBold}
                        style={styles.modalText}>
                        {item?.formName}
                      </CustomText>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: colors.gray,
                        width: width * 0.65,
                        marginTop: 5,
                        marginHorizontal: width * 0.05,
                      }}
                    />
                  </View>
                ))}
              </ScrollView>
            </>
          ) : (
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={styles.modalText}>
              {'No E-Form found'}
            </CustomText>
          )}
        </View>
        <TouchableOpacity onPress={closeModal} />
      </View>
    </Modal>
  );
};

export default EFormsModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "rgba(255,255,255,0.8)",
    backgroundColor: colors.lightdark,
  },
  modalView: {
    width: width * 0.8,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.06,
    backgroundColor: 'white',
    borderRadius: width * 0.044,
    shadowColor: '#000',
    marginVertical: width * 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: width * 0.038,
    color: colors.black,
    padding: width * 0.022,
    marginHorizontal: width * 0.06,
    textAlign: 'center',
  },
  modalComplaint: {
    fontSize: width * 0.04,
    color: colors.black,
    padding: width * 0.022,
    alignSelf: 'center',
  },
  modalGym: {
    fontSize: width * 0.04,
    color: colors.black,
    padding: width * 0.022,
    marginHorizontal: width * 0.055,
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
