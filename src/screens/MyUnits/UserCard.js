import React from 'react';
import {Dimensions, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './styles/styles';
import CustomText from '../../components/CustomText';
import {fontsFamily} from '../../assets/Fonts';
import {colors} from '../../styles/colors';
import {Images} from '../../assets/Images';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const UserCard = ({id, name, relation, prefixImage, isRental}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.residentuser}
      onPress={() =>
        navigation.navigate('myUnitDetail', {
          data: {unitId: id, isRental: isRental ? true : false},
        })
      }>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={prefixImage}
          resizeMode="contain"
          style={{
            width: width * 0.08,
            height: width * 0.08,
            marginHorizontal: width * 0.03,
          }}
        />
        <View style={{}}>
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{color: colors.primary, fontSize: width * 0.046}}>
            {name}
          </CustomText>
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={{color: colors.gray, fontSize: width * 0.027}}>
            {relation}
          </CustomText>
        </View>
      </View>
      <Image
        source={Images.rightarrow}
        resizeMode="contain"
        style={{width: width * 0.045, marginHorizontal: width * 0.02}}
      />
    </TouchableOpacity>
  );
};

export default UserCard;
