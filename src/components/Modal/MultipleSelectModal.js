import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Image
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors } from '../../styles/colors';
import CustomText from '../CustomText';
import { fontsFamily } from '../../assets/Fonts';
import { ScrollView } from 'react-native';
import { Images } from '../../assets/Images';

const { width } = Dimensions.get('window');

const MultipleSelectModal = ({ modalVisible, closeModal, data, getvalue, search }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [selectedItems, setSelectedItems] = useState([]); // State for selected items

  useEffect(() => {
    filterData(searchQuery);
  }, [searchQuery]);

  const filterData = (query) => {
    const filtered = data.filter((val) => {
      const title = val.title ? val.title.toLowerCase() : '';
      return title.includes(query.toLowerCase());
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (modalVisible) {
      setFilteredData(data);
    }
  }, [modalVisible, data]);

  const toggleItemSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const isItemSelected = (item) => {
    return selectedItems.includes(item);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <StatusBar backgroundColor={colors.white} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <CustomText fontWeight={fontsFamily.semiBold} style={styles.modalText}>
                Select{' '}
              </CustomText>
              <TouchableOpacity style={styles.cancelCross} onPress={closeModal}>
                <CustomText
                  fontWeight={fontsFamily.medium}
                  style={{
                    fontSize: width * 0.038,
                    color: colors.red,
                  }}
                >
                  X
                </CustomText>
              </TouchableOpacity>
            </View>

            {/* Search input */}
            <View style={{
              flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.primary,
              borderRadius: width * 0.05,
              marginVertical: width * 0.02,
              flex: 1,
              borderColor: colors.gray,
            }}>
              <TextInput
                style={styles.searchInput}
                placeholder={search}
                placeholderTextColor={colors.gray}
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
              />
              <Image source={Images.search} style={{ width: width * 0.05, height: width * 0.05, marginRight: width * 0.05 }} />
            </View>

            {filteredData?.length <= 0 ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              filteredData.map((val, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.doneBtn,
                    { backgroundColor: isItemSelected(val.title) ? colors.primary : 'transparent' },
                  ]}
                  onPress={() => toggleItemSelection(val.title)}
                >
                  <CustomText style={[styles.btnText, { color: isItemSelected(val.title) ? colors.white : colors.black }]}>
                    {val.title}
                  </CustomText>
                </TouchableOpacity>
              ))
            )}
            {/* Add a button to confirm selections and close the modal */}
            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => {
                // Implement your logic to pass the selected items to the parent component
                getvalue(selectedItems);
                closeModal();
              }}
            >
              <CustomText style={styles.btnText}>Confirm Selection</CustomText>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MultipleSelectModal;

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
    fontSize: width * 0.040,
    color: colors.primary,
    padding: width * 0.025,
  },
  doneBtn: {
    textAlign: 'center',
    width: '100%',
    padding: 15,
    alignSelf: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: width * 0.02,
    marginBottom: width * 0.02,
  },
  btnText: {
    textAlign: 'center',
    fontSize: width * 0.040,
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
  searchInput: {


    borderRadius: width * 0.02,
    marginVertical: width * 0.01,
    padding: width * 0.02,
    color: colors.black,
    flex: 1
  },
});
