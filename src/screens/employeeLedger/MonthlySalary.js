// import {
//     BackHandler,
//     Dimensions,
//     SafeAreaView,
//     StatusBar,
//     View,
//     Image,
//     ScrollView,
//     ActivityIndicator,
//     Text,
//     FlatList,
//     TouchableOpacity,
//     StyleSheet
//   } from 'react-native';
//   import React, { useEffect, useState } from 'react';
//   import { colors } from '../../styles/colors';
//   import Header from '../../components/Header/Header';
//   import { Images } from '../../assets/Images';
//   import { Platform } from 'react-native';
//   import { useIsFocused } from '@react-navigation/native';
//   import { useSelector } from 'react-redux';
//   import { apiCall } from '../../Services/apiCall';
//   import { fontsFamily } from '../../assets/Fonts';
//   import ListCard from './ListCard';
//   import SalaryDateCard from './SalaryDateCard';
//   import EmployeeCard from './EmployeeCard';
//   import CustomText from '../../components/CustomText';
//   import moment from 'moment';

//   const { width, height } = Dimensions.get('screen');
  
//   const MonthlySalary = ({ navigation, route }) => {


//     const { data } = route?.params?.data;


    

//     const sortedData = route?.params?.data;

//     console.log('datevoise data =========>', sortedData );

   
  
//     const isFocused = useIsFocused()
//     const role = useSelector(state => state.userDataReducer.userRole);
  
//     const goBack = () => {
//       navigation.goBack();
//     };
  
//     const handleBack = () => {
//       goBack();
//       return true;
//     };
  
//     useEffect(() => {
//       BackHandler.addEventListener('hardwareBackPress', handleBack);
//       return () => {
//         BackHandler.removeEventListener('hardwareBackPress', handleBack);
//       };
//     }, []);
    
  
  
//     return (
//       <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
//         <StatusBar
//           translucent={false}
//           backgroundColor={colors.white}
//           barStyle="dark-content"
//         />
  
  
//         <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
//           <Header
//             onBack={goBack}
//             title={"Employee Ledger"}
//           />
//           <View style={{ paddingHorizontal: width * 0.01, flex: 1, marginTop: 10, paddingBottom: height * 0.1 }}>
  
//           <TouchableOpacity
//       activeOpacity={1}
//       // onPress={() => navigation.navigate('updateEmployee', { data })}
//       style={styles.viewCard}>

//       <View style={styles.greenCard}>
//         <Image
//           source={Images.visitors}
//           resizeMode="contain"
//           style={{ width: '65%' }}
//         />
//       </View>

//       <View style={{ flex: 1, justifyContent: "space-evenly", paddingHorizontal: 10 }}>

//         <View style={styles.viewText}>
//           <CustomText fontWeight={fontsFamily.medium} style={styles.detailText}>
//             {sortedData?.employeeName}
//           </CustomText>
//         </View>

//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>

//           <View style={{ width: '55%' }}>
//             <CustomText
//               fontWeight={fontsFamily.medium}
//               style={styles.subHeading}>
//               Add By
//             </CustomText>
//             <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//               {sortedData?.addBy}
//             </CustomText>
//           </View>

//           <View style={{ width: '44%' }}>
//             <CustomText
//               fontWeight={fontsFamily.medium}
//               style={styles.subHeading}>
//               Add on
//             </CustomText>
//             <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//               {moment(data?.addOn).format('DD MMM YYYY')}
//             </CustomText>
//           </View>

//         </View>

//         <View style={{ width: '55%', marginTop: 7 }}>
//             <CustomText
//               fontWeight={fontsFamily.medium}
//               style={styles.subHeading}>
//               Basic Salary
//             </CustomText>
//             <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//               {sortedData?.basicSalary}
//             </CustomText>
//           </View>

//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>

//           <View style={{ width: '55%' }}>
//             <CustomText
//               fontWeight={fontsFamily.medium}
//               style={styles.subHeading}>
//               No of Days
//             </CustomText>
//             <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//               {sortedData?.noofDays}
//             </CustomText>
//           </View>

//           <View style={{ width: '44%' }}>
//             <CustomText
//               fontWeight={fontsFamily.medium}
//               style={styles.subHeading}>
//               Gross Salary
//             </CustomText>
//             <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//               {sortedData?.grossSalary}
//             </CustomText>
//           </View>

//         </View>



//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>

//           <View style={{ width: '55%' }}>
//             <CustomText
//               fontWeight={fontsFamily.medium}
//               style={styles.subHeading}>
//               Payment Type
//             </CustomText>
//             <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//               {sortedData?.paymentType}
//             </CustomText>
//           </View>

//           <View style={{ width: '44%' }}>
//             <CustomText
//               fontWeight={fontsFamily.medium}
//               style={styles.subHeading}>
//               Bank Account
//             </CustomText>
//             <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//               {sortedData?.bankAccount}
//             </CustomText>
//           </View>

//         </View>



//         <View style={styles.viewText}>
//           <CustomText fontWeight={fontsFamily.medium} style={styles.detailText}>
//             Settlements
//           </CustomText>
//         </View>

//         {sortedData.settlements.map((item) => (
//           <View>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>

//               <View style={{ width: '55%' }}>
//                 <CustomText
//                   fontWeight={fontsFamily.medium}
//                   style={styles.subHeading}>
//                   Description
//                 </CustomText>
//                 <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//                   {item.description}
//                 </CustomText>
//               </View>

//               <View style={{ width: '44%' }}>
//                 <CustomText
//                   fontWeight={fontsFamily.medium}
//                   style={styles.subHeading}>
//                   Type
//                 </CustomText>
//                 <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//                   {item.settlementType}
//                 </CustomText>
//               </View>

//             </View>


//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>

//               <View style={{ width: '55%' }}>
//                 <CustomText
//                   fontWeight={fontsFamily.medium}
//                   style={styles.subHeading}>
//                   Amount
//                 </CustomText>
//                 <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//                   {item.amount}
//                 </CustomText>
//               </View>



//             </View>
//           </View>

//         ))}


//         <View style={{ width: '55%', marginTop: 7, marginBottom:7 }}>
//           <CustomText
//             fontWeight={fontsFamily.medium}
//             style={styles.subHeading}>
//             Total Payable Salary
//           </CustomText>
//           <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//             {sortedData?.totalPayableSalary}
//           </CustomText>
//         </View>




//       </View>
//     </TouchableOpacity>
//           </View>
//         </View>
//       </SafeAreaView>
//     );
//   };
  
//   export default MonthlySalary;
  

//   const styles = StyleSheet.create({
//     greenCard: {
//       borderColor: colors.primary,
//       backgroundColor: colors.primary,
//       width: width * 0.25,
//       justifyContent: 'space-around',
//       paddingHorizontal: 10,
//       alignItems: 'center',
//     },
//     texthead: {
//       fontSize: width * 0.035,
//       color: colors.lightBackground,
//     },
//     subHeading: {
//       fontSize: width * 0.029,
//       color: colors.lightdarkgray,
//     },
//     dateTimeStyle: {
//       fontSize: width * 0.029,
//       color: colors.white,
//     },
//     detailText: {
//       color: colors.primary,
//       fontSize: width * 0.033,
//     },
//     viewText: {
//       marginTop: 7,
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'flex-start',
//     },
//     viewCard: {
//       flexDirection: 'row',
//       marginTop: 10,
//       borderRadius: 12,
//       overflow: 'hidden',
//       backgroundColor: colors.white,
//       minHeight: width * 0.30,
//       elevation: 4,
//     }
//   });