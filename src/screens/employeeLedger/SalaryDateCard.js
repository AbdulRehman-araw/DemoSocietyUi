import {
    BackHandler,
    Text,
    Dimensions,
    SafeAreaView,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import CustomText from '../../components/CustomText';
  import { fontsFamily } from '../../assets/Fonts';
  import { colors } from '../../styles/colors';
  import { useNavigation } from '@react-navigation/native';
  import { Images } from '../../assets/Images';
  import moment from 'moment';
  import { DataTable } from 'react-native-paper';

  const { width, height } = Dimensions.get('window');
  
  const SalaryDateCard = ({ data }) => {
  
    const navigation = useNavigation()

    // console.log('sssssssssssssssss',data)
  
    return (
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

        
          <DataTable.Row>
            <DataTable.Cell style={styles.tableTitle}>
              <Text style={{ fontFamily: fontsFamily.medium, color: colors.primary }}>{data?.addBy}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={[styles.tableCell, styles.border]}>
              <Text style={{ fontFamily: fontsFamily.medium, color: colors.primary }}>{data?.addBy}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={styles.tableCell}>
              <Text style={{ fontFamily: fontsFamily.medium, color: colors.primary }}>{data?.addBy}</Text>
            </DataTable.Cell>
          </DataTable.Row>
        

      </DataTable>
    );
  };
  
  export default SalaryDateCard;
  
  const styles = StyleSheet.create({
    card1: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: 'center',
      borderWidth: 1.3,
      borderColor: colors.gray,
      borderRadius: 8,
      width: width * 0.86,
      height: width * 0.15,
      marginTop: 20,
    },
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

