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

const {width, height} = Dimensions.get('window');

const DetailPollingCard = ({mainstate, setmainstate, data, getData, index}) => {
  const [showModal, setModal] = useState(false);
  const servicePermission = useSelector(
    state => state.userDataReducer.servicePermission,
  );
  const ePollingPermission = servicePermission?.filter(
    item => item?.name === 'E-Polling',
  );
  return (
    <View style={styles.mainView}>
      <Image
        source={require('../../../assets/Images/Line.png')}
        style={styles.imgTag}
      />
      <View style={styles.dateView}>
        <View
          style={[
            styles.circle,
            {
              borderColor:
                data?.status == 'Voted' ? colors.lightgreen : colors.primary,
            },
          ]}>
          <View style={{}}></View>
        </View>
        <CustomText
          children={data?.createdOn}
          fontWeight={fontsFamily.semiBold}
          style={{fontSize: width * 0.035, paddingHorizontal: 8}}
        />
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          // successToaster('','')
          data?.timeRemaining === 'Expired' ? null : setModal(true);
        }}
        style={styles.detailCard}>
        <View style={styles.textContainer}>
          <CustomText
            children={data?.title}
            fontWeight={fontsFamily.bold}
            numberOfLines={1}
          />
          <View style={{flexDirection: 'row'}}>
            <CustomText
              children={`Time Remaining `}
              fontWeight={fontsFamily.light}
            />
            <CustomText
              style={{width: width * 0.4}}
              children={` ${data?.timeRemaining}`}
              fontWeight={fontsFamily.bold}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <CustomText
              children={`Participants `}
              fontWeight={fontsFamily.light}
            />
            <CustomText
              children={` ${data?.totalParticipants}`}
              fontWeight={fontsFamily.bold}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <CustomText
              children={`Created by `}
              fontWeight={fontsFamily.light}
            />
            <CustomText
              children={` ${data?.createdBy}`}
              fontWeight={fontsFamily.bold}
            />
          </View>
        </View>
        <View
          style={[
            styles.voteTag,
            {
              backgroundColor:
                data?.status == 'Vote'
                  ? colors.primary
                  : data?.status == 'Voted'
                  ? colors.lightgreen
                  : data?.status == 'Vote'
                  ? colors.primary
                  : data?.status == 'Active'
                  ? colors.primary
                  : colors.red,
            },
          ]}>
          <CustomText
            children={data?.status}
            fontWeight={fontsFamily.semiBold}
            style={{
              fontSize: width * 0.035,
              color: colors.white,
              textAlign: 'center',
              textAlignVertical: 'center',
              height: width * 0.1,
            }}
          />
        </View>
      </TouchableOpacity>
      <VotingScreen
        visible={showModal}
        close={setModal}
        data={data}
        getData={getData}
        mainState={mainstate}
        setMainState={setmainstate}
        mainIndex={index}
        canDelete={ePollingPermission[0]?.canDelete}
      />
    </View>
  );
};

export default DetailPollingCard;
