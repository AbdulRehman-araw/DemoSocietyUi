import {
  BackHandler,
  Text,
  Dimensions,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';

import CustomText from '../CustomText';
import {text} from '../../res/strings';
import {fontsFamily} from '../../assets/Fonts';
import DetailModal from '../../screens/Complain/DetailModal';
import {useSelector} from 'react-redux';
import {Images} from '../../assets/Images';
import moment from 'moment';
import RoundButton from '../Button/RoundButton';
import {globalVariable} from '../../enviroment/GlobalVariable';

const {width, height} = Dimensions.get('window');

const ComplainCard = ({data, getData, onPress}) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const {role} = useSelector(state => state.userDataReducer.userData);

  console.log('card data', data);
  return (
    // <TouchableOpacity
    //   activeOpacity={1}
    //   onPress={() => setOpenDetailModal(true)}
    //   style={styles.viewCard}>

    //   <View style={styles.greenCard}>
    //     <CustomText fontWeight={fontsFamily.medium} style={styles.texthead}>
    //       {data?.location}
    //     </CustomText>
    //     <View>
    //       <CustomText
    //         fontWeight={fontsFamily.medium}
    //         style={styles.dateTimeStyle}>
    //         {data?.time}
    //       </CustomText>
    //       <CustomText
    //         fontWeight={fontsFamily.medium}
    //         style={styles.dateTimeStyle}>
    //         {data?.date}
    //       </CustomText>
    //     </View>
    //   </View>

    //   <View style={{ flex: 1, justifyContent: "space-around", paddingHorizontal: 10 }}>
    //     <View style={styles.viewText}>
    //       <View style={styles.viewcentertext}>
    //         <CustomText fontWeight={fontsFamily.bold} style={styles.detailTextTitle} numberOfLines={2}>
    //           {data?.title}
    //         </CustomText>
    //         <CustomText fontWeight={fontsFamily.medium} style={styles.subHeading}>Complain ID: {data?.id}</CustomText>
    //       </View>

    //       <View style={styles.viewcentertext}>
    //         <CustomText fontWeight={fontsFamily.bold} style={styles.emergencyStyle1}>{data?.isEmergency == true ? ' (Urgent)' : null}</CustomText>

    //       </View>
    //     </View>

    //     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

    //       <View>
    //         <CustomText
    //           fontWeight={fontsFamily.semiBold}
    //           style={styles.subHeading}>
    //           Reported by
    //         </CustomText>
    //         <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
    //           {data?.reportedBy}
    //         </CustomText>

    //       </View>

    //       <View>
    //         <CustomText
    //           fontWeight={fontsFamily.semiBold}
    //           style={{ ...styles.subHeading, textAlign: "right" }}>
    //           Status
    //         </CustomText>
    //         <CustomText
    //           fontWeight={fontsFamily.semiBold}
    //           style={data?.status === "Resolved" ? styles.detailText : styles.emergencyStyle}>
    //           {data?.status}
    //         </CustomText>
    //       </View>

    //     </View>

    //   </View>
    //   <DetailModal visible={openDetailModal} close={setOpenDetailModal} getData={getData} data={data} />
    // </TouchableOpacity>

    <TouchableOpacity
      onPress={() => setOpenDetailModal(true)}
      style={styles.mainView}>
      <View style={{...styles.row, justifyContent: 'space-between'}}>
        <View style={{...styles.row}}>
          <View style={{minWidth: '60%', maxWidth: '80%'}}>
            <CustomText
              children={data?.title}
              style={styles.title}
              fontWeight={fontsFamily.bold}
            />
            <CustomText
              children={`Complain ID: ${data?.id}`}
              style={{...styles.subHeading, marginTop: 8}}
              fontWeight={fontsFamily.regular}
            />
          </View>
        </View>

        <View style={{}}>
          <View
            style={{...styles.row, alignSelf: 'flex-end', marginVertical: 6}}>
            <View>
              <View
                style={{
                  borderWidth: 2,
                  borderColor:data?.status === "In Progress" ?  colors.pending : colors.success,
                  borderRadius: 18,
                }}>
                <CustomText
                  children={data?.status}
                  style={{
                    ...styles.dateTimeTxt,
                    padding: 8,
                    color: data?.status === "In Progress" ?  colors.pending : colors.success,
                  }}
                  fontWeight={fontsFamily.bold}
                />
              </View>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: colors.red,
                  borderRadius: 18,
                  marginTop: 6,
                }}>
                <CustomText
                  children={data?.isEmergency ? ' Urgent' : 'Pending'}
                  style={{
                    ...styles.dateTimeTxt,
                    padding: 8,
                    color: colors.danger,
                    textAlign:'center'
                  }}
                  fontWeight={fontsFamily.bold}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{marginHorizontal: 8, marginTop: 10}}>
        <View
          style={{
            ...styles.row,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              ...styles.row,
              alignSelf: 'flex-end',
              marginVertical: 6,
              borderBottomWidth: 1,
              width: '45%',
              paddingBottom: 20,
              justifyContent: 'flex-start',
            }}></View>
          <View
            style={{
              ...styles.row,
              alignSelf: 'flex-end',
              marginVertical: 6,
              borderBottomWidth: 1,
              width: '45%',
              paddingBottom: 20,
              justifyContent: 'flex-end',
            }}></View>
        </View>
      </View>

      <View
        style={{
          ...styles.row,
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
        <View style={{marginHorizontal: 8}}>
          <View style={{...styles.row, marginTop: 10}}>
            <Image
              // source={{
              //   uri: data?.verifyImage ? globalVariable.baseUrl + data?.verifyImage :  Images.Hall1,
              // }}
              source={Images.Hall1}
              style={styles.img}
            />
            <View>
              <CustomText
                children={'Reported By'}
                style={{...styles.subHeading, fontSize: 12}}
                fontWeight={fontsFamily.regular}
              />
              <CustomText
                children={data?.reportedBy}
                style={{...styles.title, fontSize: 14}}
                fontWeight={fontsFamily.semiBold}
              />
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: 8, marginTop: 10}}>
          <CustomText
            children={data?.time}
            style={{...styles.title, fontSize: 12}}
            fontWeight={fontsFamily.semiBold}
          />
          <CustomText
            children={data?.date}
            style={{...styles.title, fontSize: 12}}
            fontWeight={fontsFamily.semiBold}
          />
        </View>
      </View>
      <DetailModal
        visible={openDetailModal}
        close={setOpenDetailModal}
        getData={getData}
        data={data}
      />
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
    borderBottomLeftRadius: 12,
  },
  texthead: {
    fontSize: width * 0.035,
    color: colors.lightBackground,
  },
  subHeading: {
    fontSize: width * 0.03,
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
    width: width * 0.43,
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
    minHeight: width * 0.3,
    elevation: 4,
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    width: '99%',
  },

  ///
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
    elevation: 7,
    borderRadius: 12,
    padding: 14,
    marginVertical: 14,
  },
  img: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginHorizontal: 8,
    borderRadius: 20,
  },
  dateTimeImg: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: colors.primary,
    marginHorizontal: 8,
  },
  dateTimeTxt: {
    fontSize: 12,
    color: colors.primary,
  },
  title: {
    fontSize: 18,
    color: colors.black,
  },
  subTitle: {
    fontSize: 14,
    color: colors.black,
  },

  //utility style
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
