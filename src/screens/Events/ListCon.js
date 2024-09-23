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
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}

      <TouchableOpacity
        style={{
          backgroundColor: colors.white,
          elevation: 4,
          borderRadius: 30,
          overflow: 'hidden',
          width: width * 0.43,
          // height: 220,
          margin: 8,
        }}
        onPress={() =>
          navigation.navigate('eventDetail', {
            data: data,
          })
        }>
        <View style={{}}>
          <Image
            source={{uri: baseUrl + data?.image}}
            resizeMode="cover"
            // style={styles.imgcard}
            style={{height: 120, width: '100%'}}
          />
        </View>

        <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{color: colors.primary, fontSize: width * 0.04}}>
            {data?.eventName}
          </CustomText>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{marginVertical: 16, padding: 6}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={Images.eventBuilding}
                  resizeMode="cover"
                  style={{height: 16, width: 16}}
                />
                <CustomText
                  fontWeight={fontsFamily.medium}
                  style={{
                    color: colors.gray,
                    fontSize: width * 0.028,
                    left: 8,
                  }}>
                  Main Building Hall
                </CustomText>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 8,
                }}>
                <Image
                  source={Images.eventTime}
                  resizeMode="cover"
                  style={{height: 16, width: 16}}
                />
                <CustomText
                  fontWeight={fontsFamily.medium}
                  style={{
                    color: colors.gray,
                    fontSize: width * 0.028,
                    left: 8,
                  }}>
                  3:00 PM - 5:00 PM
                </CustomText>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.eventDate}
                  resizeMode="cover"
                  style={{height: 16, width: 16}}
                />
                <CustomText
                  fontWeight={fontsFamily.medium}
                  style={{
                    color: colors.gray,
                    fontSize: width * 0.028,
                    left: 8,
                  }}>
                  7 September 2024
                </CustomText>
              </View>
            </View>

            <Image
              source={Images.card_arrow}
              resizeMode="contain"
              style={{height: 12, width: 12, tintColor: colors.primary}}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ListCon;
