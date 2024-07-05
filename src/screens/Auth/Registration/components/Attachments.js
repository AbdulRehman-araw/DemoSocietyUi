import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';
import {Images} from '../../../../assets/Images';
import {colors} from '../../../../styles/colors';
import CustomText from '../../../../components/CustomText';
import {fontsFamily} from '../../../../assets/Fonts';

const Attachments = ({
  docFilePdf,
  frcUrl,
  setFrcUrl,
  frcLoader,
  possessionLetter,
  setPossessionLetter,
  carRunningPage,
  setCarRunningPage,
  workingLetter,
  setWorkingLetter,
  acknowledgement,
  setAcknowledgement,
  checkingList,
  setCheckingList,
  possesionLetterLoader,
  workingLetterLoader,
  carRunngingPageLoader,
  acknowledgementLoader,
  cheackingListLoader,
}) => {
  return (
    <View style={styles.textMainCon}>
      <CustomText fontWeight={fontsFamily.semiBold} style={styles.textTitle}>
        Attachments
      </CustomText>

      <TouchableOpacity
        onPress={() => [docFilePdf('FRC')]}
        activeOpacity={1}
        style={styles.addAttach}>
        <CustomText
          ellipsizeMode={'tail'}
          numberOfLines={1}
          fontWeight={fontsFamily.semiBold}
          style={styles.browse}>
          {frcUrl == '' ? 'FRC' : frcUrl.split('/').pop()}
        </CustomText>
        <View style={styles.browseImgCon}>
          {frcLoader ? (
            <ActivityIndicator size={'small'} color={colors.white} />
          ) : (
            <Image
              source={Images.upload_big_arrow}
              resizeMode="contain"
              style={{
                width: '40%',
                height: '40%',
                tintColor: colors.white,
              }}
            />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => [docFilePdf('workingLetter')]}
        activeOpacity={1}
        style={styles.addAttach}>
        <CustomText
          ellipsizeMode={'tail'}
          numberOfLines={2}
          fontWeight={fontsFamily.semiBold}
          style={styles.browse}>
          {workingLetter == ''
            ? 'Working letter'
            : workingLetter.split('/').pop()}
        </CustomText>
        <View style={styles.browseImgCon}>
          {workingLetterLoader ? (
            <ActivityIndicator size={'small'} color={colors.white} />
          ) : (
            <Image
              source={Images.upload_big_arrow}
              resizeMode="contain"
              style={{
                width: '40%',
                height: '40%',
                tintColor: colors.white,
              }}
            />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => [docFilePdf('possessionLetter')]}
        activeOpacity={1}
        style={styles.addAttach}>
        <CustomText
          ellipsizeMode={'tail'}
          numberOfLines={2}
          fontWeight={fontsFamily.semiBold}
          style={styles.browse}>
          {possessionLetter == ''
            ? 'Possession letter'
            : possessionLetter.split('/').pop()}
        </CustomText>
        <View style={styles.browseImgCon}>
          {possesionLetterLoader ? (
            <ActivityIndicator size={'small'} color={colors.white} />
          ) : (
            <Image
              source={Images.upload_big_arrow}
              resizeMode="contain"
              style={{
                width: '40%',
                height: '40%',
                tintColor: colors.white,
              }}
            />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => [docFilePdf('checkingList')]}
        activeOpacity={1}
        style={styles.addAttach}>
        <CustomText
          ellipsizeMode={'tail'}
          numberOfLines={2}
          fontWeight={fontsFamily.semiBold}
          style={styles.browse}>
          {checkingList == '' ? 'Checking list' : checkingList.split('/').pop()}
        </CustomText>
        <View style={styles.browseImgCon}>
          {cheackingListLoader ? (
            <ActivityIndicator size={'small'} color={colors.white} />
          ) : (
            <Image
              source={Images.upload_big_arrow}
              resizeMode="contain"
              style={{
                width: '40%',
                height: '40%',
                tintColor: colors.white,
              }}
            />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => [docFilePdf('carRunningPage')]}
        activeOpacity={1}
        style={styles.addAttach}>
        <CustomText
          ellipsizeMode={'tail'}
          numberOfLines={2}
          fontWeight={fontsFamily.semiBold}
          style={styles.browse}>
          {carRunningPage == ''
            ? 'Car running page for parking lot'
            : carRunningPage.split('/').pop()}
        </CustomText>
        <View style={styles.browseImgCon}>
          {carRunngingPageLoader ? (
            <ActivityIndicator size={'small'} color={colors.white} />
          ) : (
            <Image
              source={Images.upload_big_arrow}
              resizeMode="contain"
              style={{
                width: '40%',
                height: '40%',
                tintColor: colors.white,
              }}
            />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => [docFilePdf('acknowledgement')]}
        activeOpacity={1}
        style={styles.addAttach}>
        <CustomText
          ellipsizeMode={'tail'}
          numberOfLines={2}
          fontWeight={fontsFamily.semiBold}
          style={styles.browse}>
          {acknowledgement == ''
            ? 'Acknowledgement of possession'
            : acknowledgement.split('/').pop()}
        </CustomText>
        <View style={styles.browseImgCon}>
          {acknowledgementLoader ? (
            <ActivityIndicator size={'small'} color={colors.white} />
          ) : (
            <Image
              source={Images.upload_big_arrow}
              resizeMode="contain"
              style={{
                width: '40%',
                height: '40%',
                tintColor: colors.white,
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Attachments;
