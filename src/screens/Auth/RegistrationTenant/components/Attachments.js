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
  frcLoader,
  undertakingLetter,
  undertakingLetterLoader,
  noc,
  nocLoader,
  policeVerification,
  policeVerificationLoader,
  agreement,
  agreementLoader,
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
          {frcUrl == '' ? 'FRC' : frcUrl?.split('/')?.pop()}
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
        onPress={() => [docFilePdf('agreement')]}
        activeOpacity={1}
        style={styles.addAttach}>
        <CustomText
          ellipsizeMode={'tail'}
          numberOfLines={2}
          fontWeight={fontsFamily.semiBold}
          style={styles.browse}>
          {agreement == ''
            ? 'Agreement'
            : agreement?.split('/')?.pop()}
        </CustomText>
        <View style={styles.browseImgCon}>
          {agreementLoader ? (
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
        onPress={() => [docFilePdf('noc')]}
        activeOpacity={1}
        style={styles.addAttach}>
        <CustomText
          ellipsizeMode={'tail'}
          numberOfLines={2}
          fontWeight={fontsFamily.semiBold}
          style={styles.browse}>
          {noc == ''
            ? 'NOC'
            : noc?.split('/').pop()}
        </CustomText>
        <View style={styles.browseImgCon}>
          {nocLoader ? (
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
        onPress={() => [docFilePdf('undertaking')]}
        activeOpacity={1}
        style={styles.addAttach}>
        <CustomText
          ellipsizeMode={'tail'}
          numberOfLines={2}
          fontWeight={fontsFamily.semiBold}
          style={styles.browse}>
          {undertakingLetter == '' ? 'Undertaking Letter' : undertakingLetter?.split('/').pop()}
        </CustomText>
        <View style={styles.browseImgCon}>
          {undertakingLetterLoader ? (
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
        onPress={() => [docFilePdf('policeVerificationLetter')]}
        activeOpacity={1}
        style={styles.addAttach}>
        <CustomText
          ellipsizeMode={'tail'}
          numberOfLines={2}
          fontWeight={fontsFamily.semiBold}
          style={styles.browse}>
          {policeVerification == ''
            ? 'Police Verification'
            : policeVerification?.split('/').pop()}
        </CustomText>
        <View style={styles.browseImgCon}>
          {policeVerificationLoader ? (
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
