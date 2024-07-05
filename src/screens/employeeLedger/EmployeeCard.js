// import {
//   BackHandler,
//   Text,
//   Dimensions,
//   SafeAreaView,
//   View,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Image
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import moment from 'moment';
// import { Images } from '../../assets/Images';
// import CustomText from '../../components/CustomText';
// import { fontsFamily } from '../../assets/Fonts';
// import { colors } from '../../styles/colors';
// import { useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');

// const EmployeeCard = ({ data }) => {

//   const navigation = useNavigation()


//   console.log('data',  data);



//   return (
//     <TouchableOpacity
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
//             {data?.employeeName}
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
//               {data?.addBy}
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
//               {data?.basicSalary}
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
//               {data?.noofDays}
//             </CustomText>
//           </View>

//           <View style={{ width: '44%' }}>
//             <CustomText
//               fontWeight={fontsFamily.medium}
//               style={styles.subHeading}>
//               Gross Salary
//             </CustomText>
//             <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//               {data?.grossSalary}
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
//               {data?.paymentType}
//             </CustomText>
//           </View>

//           <View style={{ width: '44%' }}>
//             <CustomText
//               fontWeight={fontsFamily.medium}
//               style={styles.subHeading}>
//               Bank Account
//             </CustomText>
//             <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//               {data?.bankAccount}
//             </CustomText>
//           </View>

//         </View>



//         <View style={styles.viewText}>
//           <CustomText fontWeight={fontsFamily.medium} style={styles.detailText}>
//             Settlements
//           </CustomText>
//         </View>

//         {data.settlements.map((item) => (
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


//         <View style={{ width: '55%', marginTop: 7 }}>
//           <CustomText
//             fontWeight={fontsFamily.medium}
//             style={styles.subHeading}>
//             Total Payable Salary
//           </CustomText>
//           <CustomText fontWeight={fontsFamily.semiBold} style={styles.detailText}>
//             {data?.totalPayableSalary}
//           </CustomText>
//         </View>




//       </View>
//     </TouchableOpacity>
//   );
// };

// export default EmployeeCard;

// const styles = StyleSheet.create({
//   greenCard: {
//     borderColor: colors.primary,
//     backgroundColor: colors.primary,
//     width: width * 0.25,
//     justifyContent: 'space-around',
//     paddingHorizontal: 10,
//     alignItems: 'center',
//   },
//   texthead: {
//     fontSize: width * 0.035,
//     color: colors.lightBackground,
//   },
//   subHeading: {
//     fontSize: width * 0.029,
//     color: colors.lightdarkgray,
//   },
//   dateTimeStyle: {
//     fontSize: width * 0.029,
//     color: colors.white,
//   },
//   detailText: {
//     color: colors.primary,
//     fontSize: width * 0.033,
//   },
//   viewText: {
//     marginTop: 7,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//   },
//   viewCard: {
//     flexDirection: 'row',
//     marginTop: 10,
//     borderRadius: 12,
//     overflow: 'hidden',
//     backgroundColor: colors.white,
//     minHeight: width * 0.30,
//     elevation: 4,
//   }
// });
