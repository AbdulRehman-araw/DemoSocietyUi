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
import {colors} from '../../styles/colors';
import FilledTextField from '../TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import PrimaryButton from '../Button/PrimaryButton';
import CustomText from '../CustomText';
import {fontsFamily} from '../../assets/Fonts';
import {useNavigation} from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import DropDown from '../TextField/DropDown';
import CustomSearchModal from './CustomSearchModal';
import {apiCall} from '../../Services/apiCall';
import {globalVariable} from '../../enviroment/GlobalVariable';
const {width} = Dimensions.get('window');
const RegistrationModal = ({modalVisible, setModalVisible}) => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(1);
  const [availableBuilding, setAvailableBuilding] = useState([]);
  const [myApartments, setMyApartments] = useState([]);
  const [appartmentId, setAppartmentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [showSocietyModal, setShowSocietyModal] = useState(false);
  const [society, setSociety] = useState([]);
  const [societyId, setSocietyId] = useState(null);
  const {control, handleSubmit, setValue, resetField} = useForm();

  const radioButtons = useMemo(
    () => [
      {
        id: 1, // acts as primary key, should be unique and non-empty string
        label: 'Register as resident',
        value: 'option1',
        labelStyle: {color: '#747474'},
        color: `${colors?.primary}`,
      },
      {
        id: 2,
        label: 'Register as tenent',
        value: 'option2',
        labelStyle: {color: '#747474'},
        color: `${colors?.primary}`,
      },
    ],
    [],
  );
  
  const getAvailableBuildingsAndAppartmentForResident = async id => {
    setAvailableBuilding([]);
    try {
      const {data} = await apiCall?.getAvailableAppartment(id);
      const building = [];
      data.forEach(element => {
        let obj = {
          title: element?.building,
          apartments: element?.apartments,
        };
        building.push(obj);
      });
      setAvailableBuilding(building);
    } catch (error) {}
  };

  useEffect(() => {
    resetField('building')
    resetField('appartment')
    setMyApartments([])
    setSocietyId(null)
    if (selectedId === 1) {
      getAvailableBuildingsAndAppartmentForResident(societyId);
    } else {
      getAvailableBuildingsAndAppartmentForTenant(societyId);
    }
  }, [selectedId]);

  const getAvailableBuildingsAndAppartmentForTenant = async id => {
    setAvailableBuilding([]);
    try {
      const {data} = await apiCall?.getAvailableAppartmentForTenant(id);
      console.log(
        '🚀 ~ getAvailableBuildingsAndAppartmentForTenant ~ data:',
        data,
      );
      const building = [];
      data.forEach(element => {
        let obj = {
          title: element?.building,
          apartments: element?.apartments,
        };
        building.push(obj);
      });
      console.log(
        '🚀 ~ getAvailableBuildingsAndAppartmentForTenant ~ building:',
        building,
      );
      setAvailableBuilding(building);
    } catch (error) {}
  };

  const getSocieties = async () => {
    try {
      const {data} = await apiCall?.getSocieties(globalVariable?.society);
      const society = [];
      data.forEach(element => {
        let obj = {
          title: element?.name,
          societyId: element?.id,
        };
        society.push(obj);
      });
      setSociety(society);
    } catch (error) {}
  };
  const registration = async formData => {
    setModalVisible(false);
    if (selectedId === 1) {
      navigation.navigate('Registration', {
        data: {appartmentId: appartmentId, societyId: societyId},
      });
    } else {
      navigation.navigate('RegistrationTenant', {
        data: {appartmentId: appartmentId, societyId: societyId},
      });
    }
  };
  useEffect(() => {
    getSocieties();
  }, []);
  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{fontSize: width * 0.06, marginBottom: width * 0.06}}>
            Registration
          </CustomText>
          <View style={{}}>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={e => {
                setSelectedId(e);
                // registerAs(e);
              }}
              selectedId={selectedId}
              layout="row"
            />
            <DropDown
              name={'society'}
              title="Select society"
              type={'default'}
              variant={'outlined'}
              control={control}
              rules={{
                required: 'Please select society',
              }}
              img={false}
              onPress={() => {
                setShowSocietyModal(true), setValue('society', null);
              }}
            />
            {societyId && (
              <DropDown
                name={'building'}
                title="Select Building"
                type={'default'}
                variant={'outlined'}
                control={control}
                rules={{
                  required: 'Please select building',
                }}
                img={false}
                onPress={() => {
                  setShowModal(true), setValue('building', null);
                }}
              />
            )}
            {myApartments?.length !== 0 && (
              <DropDown
                coma
                name={'appartment'}
                title="Apartment no"
                type={'default'}
                variant={'outlined'}
                control={control}
                rules={{
                  required: 'Please select Apartment no',
                }}
                img={false}
                onPress={() => {
                  setShowUnitModal(true);
                }}
              />
            )}
            <View
              style={{
                // marginTop: width * 0.15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <View style={{width: '47%'}}>
                <PrimaryButton
                  outlined
                  customStyle={{
                    padding: width * 0.032,
                    marginTop: 15,
                    borderColor: colors.primary,
                  }}
                  textStyle={{color: colors.primary}}
                  title={'Close'}
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
              <View style={{width: '47%'}}>
                <PrimaryButton
                  customStyle={{padding: width * 0.032}}
                  title={'Next'}
                  //   loader={loader}
                  onPress={handleSubmit(registration)}
                />
              </View>
            </View>
            <View>
              <CustomSearchModal
                search="Search"
                data={availableBuilding.length <= 0 ? [] : availableBuilding}
                modalVisible={showModal}
                closeModal={() => setShowModal(false)}
                getvalue={e => {
                  const allApartments = availableBuilding.find(
                    v => v.title === e,
                  )?.apartments;
                  setMyApartments(allApartments);
                  setValue('building', e);
                }}
              />
              <CustomSearchModal
                search="Search"
                data={myApartments?.length <= 0 ? [] : myApartments}
                modalVisible={showUnitModal}
                closeModal={() => setShowUnitModal(false)}
                getvalue={e => {
                  setAppartmentId(e?.apartmentID);
                  setValue('appartment', e?.apartmentNo);
                }}
              />
              <CustomSearchModal
                search="Search"
                data={society?.length <= 0 ? [] : society}
                modalVisible={showSocietyModal}
                closeModal={() => setShowSocietyModal(false)}
                getvalue={e => {
                  setValue('society', e?.title);
                  setSocietyId(e?.societyId);
                  if (selectedId === 1) {
                    getAvailableBuildingsAndAppartmentForResident(e?.societyId);
                  } else {
                    getAvailableBuildingsAndAppartmentForTenant(e?.societyId);
                  }
                }}
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
    alignItems: 'center',
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
  buttonOpen: {
    backgroundColor: '#F194FF',
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

export default RegistrationModal;
