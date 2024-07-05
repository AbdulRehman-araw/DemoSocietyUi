import {Dimensions, StyleSheet, View, Clipboard} from 'react-native';
import React from 'react';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../styles/colors';
import {fontsFamily} from '../../../assets/Fonts';
import {text} from '../../../res/strings';
import DetailCard from '../../../components/DetailCard';
import PrimaryButton from '../../../components/Button/PrimaryButton';

const {width} = Dimensions.get('window');
const DetailBar = ({
  totalVisitors,
  pendingApproval,
  accepted,
  inviteData,
  getInvitesData,
}) => {
  const copyToClipboard = text => {
    Clipboard.setString(text);
    alert('link copied');
  };
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: width * 0.04,
        padding: 10,
        marginVertical: width * 0.036,
      }}>
      <View style={styles.container}>
        <View style={styles.item}>
          <CustomText style={styles.heading}>{text.totalVisitors}</CustomText>
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={styles.greenText}>
            {totalVisitors}
          </CustomText>
        </View>

        <View style={styles.bar} />

        <View style={styles.item}>
          <CustomText style={styles.heading}>{text.pendingApproval}</CustomText>
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={styles.greenText}>
            {pendingApproval}
          </CustomText>
        </View>

        <View style={styles.bar} />

        <View style={styles.item}>
          <CustomText style={styles.heading}>{text.accepted}</CustomText>
          <CustomText
            fontWeight={fontsFamily.semiBold}
            style={styles.greenText}>
            {accepted}
          </CustomText>
        </View>
      </View>
      <PrimaryButton
        onPress={() => copyToClipboard(inviteData?.link)}
        customStyle={styles.btnStyle}
        title={'Copy Link'}
      />
      {inviteData?.visitorsInvites?.map((val, i) => (
        <DetailCard
          invites={true}
          key={i}
          getData={getInvitesData}
          completeData={val}
          inviteStyle
        />
      ))}
    </View>
  );
};

export default DetailBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: width * 0.04,
    padding: 10,
    marginVertical: width * 0.036,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    width: 1.5,
    backgroundColor: colors.gray,
    height: '70%',
  },
  heading: {
    fontSize: width * 0.028,
    color: colors.darkGray,
  },
  greenText: {
    fontSize: width * 0.05,
    color: colors.primary,
    marginTop: 5,
  },
  btnStyle: {
    marginVertical: width * 0.012,
    padding: width * 0.015,
    borderRadius: 1,
    width: '30%',
    left: 20,
  },
});
