import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { colors } from '../../styles/colors';
import { fontsFamily } from '../../assets/Fonts';
import CustomText from '../../components/CustomText';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Images } from '../../assets/Images';
import CheckBox from '@react-native-community/checkbox';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');

const PermissionModal = ({ open, close, serviceId, selectedServices, savePermission }) => {
  console.log("🚀 ~ file: permissionModal.js:23 ~ PermissionModal ~ serviceId:", serviceId)

  const [permission, setPermission] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canView: false
  });

  const handleSelectPermission = (key, value) => {
    try {
      const newPermission = { ...permission }
      newPermission[key] = !value;
      if (key === 'canAdd' || key === 'canEdit' || key === 'canDelete') {
        if (!value) {
          newPermission.canView = true;
        }
      }
      setPermission(newPermission);
    } catch (error) {
    }
  }

  const handleSave = () => {
    try {
      let obj = {
        moduleID: serviceId,
        ...permission
      }
      savePermission(obj)
      handleClose()
    } catch (error) {
      console.log('file: permissionModal.js:28 => handleSelectPermission => error:', error)
    }
  }

  const handleClose = () => {
    close()
    setPermission({
      canAdd: false,
      canEdit: false,
      canDelete: false,
      canView: false
    });
  }

  const handleSetDefaultData = () => {
    try {
      const service = selectedServices.find((e) => e.moduleID === serviceId);
      setPermission({
        canAdd: service?.canAdd ?? false,
        canEdit: service?.canEdit ?? false,
        canDelete: service?.canDelete ?? false,
        canView: service?.canView ?? false
      })
    } catch (error) {
      console.log('file: permissionModal.js:76 => handleSetDefaultData => error:', error)
    }
  }

  useEffect(() => {
    if (selectedServices) {
      handleSetDefaultData(selectedServices)
    }
  }, [open]);

  return (
    <Modal animationType="fade" transparent={true} visible={open} onRequestClose={() => handleClose()} >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => handleClose()}>
            <View style={{ width: width * 0.05, height: width * 0.05, alignSelf: 'flex-end' }}>
              <Image source={Images.iconcancel} style={{ width: '100%', height: '100%' }} />
            </View>
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}>
            <View>

              <TouchableOpacity disabled={(permission?.canAdd || permission?.canEdit || permission?.canDelete) ? true : false} activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', width: width * 0.6, marginVertical: width * 0.002 }}
                onPress={() => handleSelectPermission('canView', permission?.canView)}>
                <CheckBox
                  onCheckColor={colors.primary}
                  tintColors={{ true: colors.primary, false: colors.black }}
                  style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                  disabled={false}
                  value={permission?.canView}
                // onChange={() => handleSelectPermission('canView', permission?.canView)}
                />
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{ color: colors.black, fontSize: width * 0.035, marginVertical: width * 0.03 }}>
                  View
                </CustomText>
              </TouchableOpacity>
              {serviceId != 1 && serviceId != 2 && serviceId != 4 &&
                <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', width: width * 0.6, marginVertical: width * 0.002 }}
                  onPress={() => handleSelectPermission('canAdd', permission?.canAdd)}>
                  <CheckBox
                    onCheckColor={colors.primary}
                    tintColors={{ true: colors.primary, false: colors.black }}
                    style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                    disabled={false}
                    value={permission?.canAdd}
                  // onChange={() => handleSelectPermission('canAdd', permission?.canAdd)}
                  />
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{ color: colors.black, fontSize: width * 0.035, marginVertical: width * 0.03 }}>
                    Add
                  </CustomText>
                </TouchableOpacity>
              }
              {serviceId != 5 && serviceId != 6 && serviceId != 8 && serviceId != 9 &&
                <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', width: width * 0.6, marginVertical: width * 0.002 }}
                  onPress={() => handleSelectPermission('canEdit', permission?.canEdit)}>
                  <CheckBox
                    onCheckColor={colors.primary}
                    tintColors={{ true: colors.primary, false: colors.black }}
                    style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                    disabled={false}
                    value={permission?.canEdit}
                  // onChange={() => handleSelectPermission('canEdit', permission?.canEdit)}
                  />
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{ color: colors.black, fontSize: width * 0.035, marginVertical: width * 0.03 }}>
                    Edit
                  </CustomText>
                </TouchableOpacity>
              }
              <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', width: width * 0.6, marginVertical: width * 0.002 }}
                onPress={() => handleSelectPermission('canDelete', permission?.canDelete)}>
                <CheckBox
                  onCheckColor={colors.primary}
                  tintColors={{ true: colors.primary, false: colors.black }}
                  style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                  disabled={false}
                  value={permission?.canDelete}
                // onChange={() => handleSelectPermission('canDelete', permission?.canDelete)}
                />
                <CustomText
                  fontWeight={fontsFamily.semiBold}
                  style={{ color: colors.black, fontSize: width * 0.035, marginVertical: width * 0.03 }}>
                  Delete
                </CustomText>
              </TouchableOpacity>
              <PrimaryButton
                customStyle={{ padding: width * 0.02 }}
                title={'Save'}
                onPress={() => handleSave()}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default PermissionModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "rgba(255,255,255,0.8)",
    backgroundColor: colors.lightdark,
  },
  modalView: {
    padding: width * 0.05,
    backgroundColor: 'white',
    borderRadius: width * 0.044,
    shadowColor: '#000',
    marginVertical: width * 0.55,
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
