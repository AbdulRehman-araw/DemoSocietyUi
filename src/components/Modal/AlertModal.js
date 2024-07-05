import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../../styles/colors';
import {Images} from '../../assets/Images';
import CustomText from '../CustomText';
import {fontsFamily} from '../../assets/Fonts';

const {width, height} = Dimensions.get('window');
const AlertModal = ({visible, close, type, text, text2}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={() => close(false)}>
      <View style={styles.MainCon}>
        <View style={styles.centerCon}>
          <View style={styles.Header}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => close(false)}
              style={styles.HeaderImg}>
              <Image
                source={Images.cancelFilled}
                resizeMode={'contain'}
                style={styles.img}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.CenterImg}>
            <Image
              source={
                type == 's'
                  ? Images.Tick
                  : type === 'c'
                  ? Images.warning
                  : Images.cancelFilled
              }
              resizeMode={'contain'}
              style={styles.img}
            />
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.text}>
              {text}
            </CustomText>

            <CustomText fontWeight={fontsFamily.semiBold} style={styles.text2}>
              {text2}
            </CustomText>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  MainCon: {
    flex: 1,
    backgroundColor: 'rgba(192,192,192,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.03,
  },
  centerCon: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    paddingVertical: width * 0.04,
    paddingBottom: width * 0.06,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CenterImg: {
    width: width * 0.2,
    height: width * 0.2,
    alignSelf: 'center',
    marginVertical: width * 0.03,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: colors.black,
    fontSize: width * 0.035,
  },
  text2: {
    color: colors.primary,
    fontSize: width * 0.035,
  },
  Header: {
    width: '100%',
    alignItems: 'flex-end',
  },
  HeaderImg: {
    width: width * 0.05,
    height: width * 0.05,
  },
});
