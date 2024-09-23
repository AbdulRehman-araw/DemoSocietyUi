import {
  BackHandler,
  Text,
  Dimensions,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../../components/CustomText';
import { fontsFamily } from '../../assets/Fonts';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets/Images';

const { width, height } = Dimensions.get('window');

const ListCard = ({ data }) => {

  const navigation = useNavigation()

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.card1} onPress={() => navigation.navigate(data.path)}>
      <View style={{ flexDirection: "row", alignItems: "center",  }}>

        <View style={{ flex:1 }}>
          <CustomText
            fontWeight={fontsFamily.bold}
            style={{ color: colors.black, fontSize: width * 0.039 }}>
            {data?.title}
          </CustomText>
        </View>
        <Image source={Images.card_arrow} resizeMode="contain" style={{ width: width * 0.04, }} />
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  card1: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: 'center',
    borderBottomWidth: 1.3,
    borderColor: colors.primary,
    // borderRadius: 8,
    width: width * 0.86,
    height: width * 0.15,
    marginTop: 20,
  }
});
