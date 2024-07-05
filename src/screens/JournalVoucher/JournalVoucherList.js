import { Dimensions, ScrollView, Image, Platform, StatusBar, View } from 'react-native';
import React, { Fragment, useState } from 'react';

import moment from 'moment';
import CustomText from '../../components/CustomText';
import { fontsFamily } from '../../assets/Fonts';
import { colors } from '../../styles/colors';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Text } from 'react-native';

const { width, height } = Dimensions.get('window');

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const JournalVoucherList = ({ data }) => {
  return (
    <View>
      <View style={{ marginVertical: height * 0.02 }}>
        <CustomText fontWeight={fontsFamily.bold} style={styles.titleStyle}>
          {data.voucherName}
        </CustomText>
        <CustomText
          fontWeight={fontsFamily.medium}
          style={styles.timeStampStyle}>
          {moment(data.date).format('DD MMM YYYY hh:mm a')}
        </CustomText>

      </View>

      <DataTable style={{ borderColor: colors.gray, borderWidth: 1, borderRadius: 9 }}>
        <DataTable.Header style={{ backgroundColor: colors.primary, borderTopLeftRadius: 9, borderTopRightRadius: 9, }}>
          <DataTable.Title style={styles.tableTitle}>
            <CustomText fontWeight={fontsFamily.semiBold} style={{ color: colors.white }}>Particulars</CustomText>
          </DataTable.Title>
          <DataTable.Title numeric style={[styles.tableCell, styles.border]}>
            <CustomText fontWeight={fontsFamily.semiBold} style={{ color: colors.white }}>Debit</CustomText>
          </DataTable.Title>
          <DataTable.Title numeric style={styles.tableCell}>
            <CustomText fontWeight={fontsFamily.semiBold} style={{ color: colors.white }}>Credit</CustomText>
          </DataTable.Title>
        </DataTable.Header>

        {data?.journalEntries.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.tableTitle}>
              <Text style={{ fontFamily: fontsFamily.medium, color: colors.primary }}>{item?.description}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={[styles.tableCell, styles.border]}>
              <Text style={{ fontFamily: fontsFamily.medium, color: colors.primary }}>{item?.debit}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={styles.tableCell}>
              <Text style={{ fontFamily: fontsFamily.medium, color: colors.primary }}>{item?.credit}</Text>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

      </DataTable>

    </View>
  );
};

export default JournalVoucherList;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tableTitle: {
    flex: 2,
  },
  tableCell: {
    justifyContent: 'center',
  },
  border: {
    borderColor: colors.gray,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  titleStyle: {
    color: colors.primary,
    fontSize: width * 0.04,
  },
  timeStampStyle: {
    color: colors.black,
    fontSize: width * 0.028,
    marginTop: 4
  },
});
