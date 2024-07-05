import {
  BackHandler,
  Text,
  Dimensions,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';

import CustomText from '../CustomText';
import { text } from '../../res/strings';
import { fontsFamily } from '../../assets/Fonts';
import DetailModal from '../../screens/Complain/DetailModal';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const ComplainCard = ({ data, getData }) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const { role } = useSelector(state => state.userDataReducer.userData)

  // console.log('card data', data);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setOpenDetailModal(true)}
      style={styles.viewCard}>

      <View style={styles.greenCard}>
        <CustomText fontWeight={fontsFamily.medium} style={styles.texthead}>
          {data?.location}
        </CustomText>
        <View>
          <CustomText
            fontWeight={fontsFamily.medium}
            style={styles.dateTimeStyle}>
            {data?.time}
          </CustomText>
          <CustomText
            fontWeight={fontsFamily.medium}
            style={styles.dateTimeStyle}>
            {data?.date}
          </CustomText>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "space-around", paddingHorizontal: 10 }}>
        <View style={styles.viewText}>
          <View style={styles.viewcentertext}>
            <CustomText fontWeight={fontsFamily.bold} style={styles.detailTextTitle} numberOfLines={2}>
              {data?.title}
            </CustomText>
            <CustomText fontWeight={fontsFamily.medium} style={styles.subHeading}>Complain ID: {data?.id}</CustomText>
          </View>



          <View style={styles.viewcentertext}>
            <CustomText fontWeight={fontsFamily.bold} style={styles.emergencyStyle1}>{data?.isEmergency == true ? ' (Urgent)' : null}</CustomText>

          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <View>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={styles.subHeading}>
              Reported by
            </CustomText>
            <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
              {data?.reportedBy}
            </CustomText>

          </View>

          <View>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={{ ...styles.subHeading, textAlign: "right" }}>
              Status
            </CustomText>
            <CustomText
              fontWeight={fontsFamily.semiBold}
              style={data?.status === "Resolved" ? styles.detailText : styles.emergencyStyle}>
              {data?.status}
            </CustomText>
          </View>

        </View>

      </View>
      <DetailModal visible={openDetailModal} close={setOpenDetailModal} getData={getData} data={data} />
    </TouchableOpacity>
  );
};

export default ComplainCard;

const styles = StyleSheet.create({
  greenCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    width: width * 0.28,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12
  },
  texthead: {
    fontSize: width * 0.035,
    color: colors.lightBackground,
  },
  subHeading: {
    fontSize: width * 0.030,
    color: colors.lightdarkgray,
  },
  dateTimeStyle: {
    fontSize: width * 0.029,
    color: colors.white,
  },
  detailText: {
    color: colors.primary,
    fontSize: width * 0.038,
  },
  detailTextTitle: {
    color: colors.primary,
    fontSize: width * 0.038,
    width: width * 0.43
  },
  emergencyStyle: {
    color: colors.pending,
    fontSize: width * 0.038,

  },
  emergencyStyle1: {
    color: colors.danger,
    fontSize: width * 0.038,

  },
  viewText: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  viewCard: {
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 12,
    // overflow: 'hidden',
    backgroundColor: colors.white,
    minHeight: width * 0.30,
    elevation: 4,
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    width: "99%"
  }
});
