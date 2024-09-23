import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../styles/colors';
import {fontsFamily} from '../../../assets/Fonts';
import {styles} from '../styles/styles';
import {Dimensions} from 'react-native';
import VotingScreen from './VotingScreen';
import {useState} from 'react';
import {successToaster} from '../../../utils/toastConfig';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Images} from '../../../assets/Images';

const {width, height} = Dimensions.get('window');

const PollingDetailView = ({img, label, text}) => {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
      <Image
        source={img}
        style={{width: 20, height: 20, resizeMode: 'contain', marginRight: 18}}
      />
      <View>
        <CustomText
          fontWeight={fontsFamily.regular}
          style={{fontSize: 10, color: colors.darkGray}}>
          {label}
        </CustomText>
        <View style={{marginVertical: 4}} />
        <CustomText
          fontWeight={fontsFamily.bold}
          style={{fontSize: 14, color: colors.dark}}>
          {text}
        </CustomText>
      </View>
    </View>
  );
};

const DetailPollingCard = ({mainstate, setmainstate, data, getData, index}) => {
  // console.log("🚀 ~ DetailPollingCard ~ data:", data)
  const [showModal, setModal] = useState(false);
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );
  const ePollingPermission = servicePermission?.filter(
    item => item?.name === 'E-Polling',
  );
  return (
    // <View style={styles.mainView}>
    //   <Image
    //     source={require('../../../assets/Images/Line.png')}
    //     style={styles.imgTag}
    //   />
    //   <View style={styles.dateView}>
    //     <View
    //       style={[
    //         styles.circle,
    //         {
    //           borderColor:
    //             data?.status == 'Voted' ? colors.lightgreen : colors.primary,
    //         },
    //       ]}>
    //       <View style={{}}></View>
    //     </View>
    //     <CustomText
    //       children={data?.createdOn}
    //       fontWeight={fontsFamily.semiBold}
    //       style={{fontSize: width * 0.035, paddingHorizontal: 8}}
    //     />
    //   </View>
    //   <TouchableOpacity
    //     activeOpacity={1}
    //     onPress={() => {
    //       // successToaster('','')
    //       data?.timeRemaining === 'Expired' ? null : setModal(true);
    //     }}
    //     style={styles.detailCard}>
    //     <View style={styles.textContainer}>
    //       <CustomText
    //         children={data?.title}
    //         fontWeight={fontsFamily.bold}
    //         numberOfLines={1}
    //       />
    //       <View style={{flexDirection: 'row'}}>
    //         <CustomText
    //           children={`Time Remaining `}
    //           fontWeight={fontsFamily.light}
    //         />
    //         <CustomText
    //           style={{width: width * 0.4}}
    //           children={` ${data?.timeRemaining}`}
    //           fontWeight={fontsFamily.bold}
    //         />
    //       </View>
    //       <View style={{flexDirection: 'row'}}>
    //         <CustomText
    //           children={`Participants `}
    //           fontWeight={fontsFamily.light}
    //         />
    //         <CustomText
    //           children={` ${data?.totalParticipants}`}
    //           fontWeight={fontsFamily.bold}
    //         />
    //       </View>
    //       <View style={{flexDirection: 'row'}}>
    //         <CustomText
    //           children={`Created by `}
    //           fontWeight={fontsFamily.light}
    //         />
    //         <CustomText
    //           children={` ${data?.createdBy}`}
    //           fontWeight={fontsFamily.bold}
    //         />
    //       </View>
    //     </View>
    //     <View
    //       style={[
    //         styles.voteTag,
    //         {
    //           backgroundColor:
    //             data?.status == 'Vote'
    //               ? colors.primary
    //               : data?.status == 'Voted'
    //               ? colors.lightgreen
    //               : data?.status == 'Vote'
    //               ? colors.primary
    //               : data?.status == 'Active'
    //               ? colors.primary
    //               : colors.red,
    //         },
    //       ]}>
    //       <CustomText
    //         children={data?.status}
    //         fontWeight={fontsFamily.semiBold}
    //         style={{
    //           fontSize: width * 0.035,
    //           color: colors.white,
    //           textAlign: 'center',
    //           textAlignVertical: 'center',
    //           height: width * 0.1,
    //         }}
    //       />
    //     </View>
    //   </TouchableOpacity>
    //   <VotingScreen
    //     visible={showModal}
    //     close={setModal}
    //     data={data}
    //     getData={getData}
    //     mainState={mainstate}
    //     setMainState={setmainstate}
    //     mainIndex={index}
    //     canDelete={ePollingPermission[0]?.canDelete}
    //   />
    // </View>
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        // successToaster('','')
        data?.timeRemaining === 'Expired' ? null : setModal(true);
      }}
      style={
        //new style
        {
          // flex: 1,
          borderRadius: 18,
          overflow: 'hidden',
          marginBottom: 32,
          elevation: 6,
        }
      }>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.primary,
          justifyContent: 'space-between',
          padding: 8,
          paddingHorizontal: 20,
        }}>
        {/* <Image
          source={Images.house_building_amenty}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
            marginHorizontal: 18,
          }}
        /> */}
        <CustomText
          children={data?.title}
          fontWeight={fontsFamily.bold}
          style={{fontSize: 18, color: colors.white}}
        />
        <CustomText
          children={moment(data?.addOn).format('DD MMM YYYY')}
          fontWeight={fontsFamily.bold}
          style={{fontSize: 12, color: colors.white}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: colors.white,
          paddingVertical: 18,
        }}>
        <PollingDetailView
          label={'Participants'}
          text={data?.totalParticipants}
          img={Images.newUsers}
        />
        <PollingDetailView
          label={'End Date'}
          text={data?.endDate}
          img={Images.newClock}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: colors.white,
          paddingVertical: 18,
        }}>
        <PollingDetailView
          label={'Created By'}
          text={data?.createdBy}
          img={Images.newUser}
        />
        <PollingDetailView
          label={'Status'}
          text={data?.timeRemaining}
          img={Images.status}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DetailPollingCard;
