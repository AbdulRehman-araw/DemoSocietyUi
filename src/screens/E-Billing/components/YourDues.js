import { Dimensions, ScrollView, Image, Platform, StatusBar, View } from 'react-native';
import React, { Fragment, useState } from 'react';

import { colors } from '../../../styles/colors';
import { Images } from '../../../assets/Images';
import { text } from '../../../res/strings';
import { styles } from '../styles/styles';
import CustomText from '../../../components/CustomText';
import { fontsFamily } from '../../../assets/Fonts';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const YourDues = ({ data }) => {
  return (
    <Fragment>

      {/* <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: "space-between" }}>
            <CustomText fontWeight={fontsFamily.bold} style={styles.titleStyle}>
              {item.day}
            </CustomText>
            {index > 0 &&
              <View style={{
                backgroundColor: colors.gray,
                padding: 0.5,
                flex: 1,
                marginLeft: 10
              }} />
            }

          </View> */}

      <View style={styles.itemContainer}>
        <View>
          <CustomText
            fontWeight={fontsFamily.bold}
            style={styles.paymentTitleStyle}>
            {data.invoiceTitle}
          </CustomText>
          <CustomText
            fontWeight={fontsFamily.medium}
            style={styles.timeStampStyle}>
            {moment(data.date).format('DD MMM YYYY hh:mm a')}
          </CustomText>
        </View>

        <CustomText fontWeight={fontsFamily.medium} style={{
          fontSize: width * 0.038,
          color: data.credit > 0 ? colors.success : colors.danger

        }}>
          Rs {data.amount}
        </CustomText>
      </View>

    </Fragment>
  );
};

export default YourDues;
