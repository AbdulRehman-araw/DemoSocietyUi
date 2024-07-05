import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {styles} from './styles/styles';
import {Images} from '../../assets/Images';
import {fontsFamily} from '../../assets/Fonts';
import CustomText from '../../components/CustomText';
import moment from 'moment';
import {colors} from '../../styles/colors';
import {Dimensions} from 'react-native';
import {useLocalTime} from '../../utils/LocalTime';
import {baseUrl} from '../../../axios';

const {width, height} = Dimensions.get('window');

const ListCon = ({data, navigation}) => {
  const dateStrStart = data?.eventDate;
  const localTimeStart = useLocalTime(dateStrStart);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{marginVertical: width * 0.02}}
        onPress={() =>
          navigation.navigate('eventDetail', {
            data: data,
          })
        }>
        <View style={{position: 'relative'}}>
          <Image
            source={{uri: baseUrl + data?.image}}
            resizeMode="contain"
            style={styles.imgcard}
          />
          <View style={styles.imageOverlay} />
        </View>
        <View style={styles.datebtn}>
          <CustomText fontWeight={fontsFamily.semiBold} style={styles.textbtn}>
            {moment(data?.eventDate).format('DD MMM')}
          </CustomText>
        </View>
        <View style={styles.eventTitle}>
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{color: colors.white, fontSize: width * 0.05}}>
            {data?.eventName}
          </CustomText>
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{
              color: colors.white,
              fontSize: width * 0.03,
              textAlign: 'right',
            }}>
            {data.bookingId !== null
              ? null
              : moment(localTimeStart)?.format('h:mm A')}
          </CustomText>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ListCon;
