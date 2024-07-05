import { View, SafeAreaView, StatusBar, ScrollView, Dimensions, Platform, BackHandler, Text, ActivityIndicator } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { colors } from '../../styles/colors'
import { styles } from './styles/styles'
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header'
import { fontsFamily } from '../../assets/Fonts';
import FilledTextField from '../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { emailRegex, getFormattedDate } from '../../utils/helperFunction';
import { apiCall } from '../../Services/apiCall';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import DropDown from '../../components/TextField/DropDown';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { Images } from '../../assets/Images';
import { DataTable } from 'react-native-paper';
import CustomModal from '../../components/Modal/CustomModal';
import moment from 'moment';


const { width, height } = Dimensions.get("window")

const PurchaseDetail = ({ navigation, route }) => {

  const updateData = route?.params?.data
  const { control, handleSubmit, setValue, clearErrors, resetField } = useForm();

  const isFocused = useIsFocused()
  const role = useSelector(state => state.userDataReducer.userRole)

  const [loading, setLoading] = useState(false);

  const [selectedPaymentType, setSelectedPaymentType] = useState();

  const [date, setDate] = useState(new Date());

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false)
  const [errorModalText, setErrorModalText] = useState('')

  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const goBack = () => {
    navigation.goBack()
  }

  const handleBack = () => {
    goBack()
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack)
    }

  }, [])

  const deletePurchase = async (id) => {
    setLoading(true)
    try {
      const { message } = await apiCall.deletePurchase(id)
      setAlertType('s')
      setErrorModalText(message)
      setErrorModal(true)
      setTimeout(() => {
        setErrorModal(false)
        goBack()
      }, 3000);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getVendors = async () => {
    try {
      const { data } = await apiCall.getVendors()
      const vendorData = []
      data.forEach(element => {
        let obj = {
          ...element,
          title: element?.name
        }
        vendorData.push(obj)
      });
      const vendorName = data.find(e => e.vendorID === updateData.vendorID)?.name
      setValue('vendor', vendorName)
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error)
    }
  }

  const getPaymentTypes = async () => {
    try {
      const { data } = await apiCall.getPaymentTypes()
      const paymentTypeData = []
      data.forEach(element => {
        let obj = {
          ...element,
          title: element?.typeName
        }
        paymentTypeData.push(obj)
      });
      const typeName = data.find(e => e.typeID === updateData.paymentTypeID)?.typeName
      setValue('paymentType', typeName)
      setSelectedPaymentType(typeName)
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error)
    }
  }

  const getBanks = async () => {
    try {
      const { data } = await apiCall.getBanks()
      const bankData = []
      data.forEach(element => {
        let obj = {
          ...element,
          title: element?.accountTitle
        }
        bankData.push(obj)
      });
      const bankName = data.find(e => e.bankID === updateData.bankAccountID)?.bankName
      setValue('bankAccount', bankName)
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error)
    }
  }

  const setDefaultData = () => {
    try {
      setValue('name', updateData?.expenseName)
      setValue('description', updateData?.description)
      setValue('totalAmount', updateData?.totalAmount.toString())
      setTotalAmount(updateData?.totalAmount)
      setDate(new Date(updateData?.purchaseDate))
      const updateProduct = []
      updateData?.items.forEach(element => {
        let obj = {
          ...element,
          item: element?.itemName
        }
        updateProduct.push(obj)
      });
      setProducts(updateProduct)
    } catch (error) {
      console.log('file: index.js:148 => setDefaultData => error:', error)
    }
  }

  console.log(updateData);

  useEffect(() => {
    getVendors()
    getPaymentTypes()
    getBanks()
    setDefaultData()
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar translucent={false} backgroundColor={colors.white} barStyle="dark-content" />

      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
        <Header
          onBack={() => goBack()}
          title={"Purchase Detail"}
        />

<View style={[styles.viewname, styles.top]}>
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Purchase Account 
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {updateData?.vendorName}
                  </CustomText>
                </View>
              </View>


              <View style={styles.viewname}>
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Description
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {updateData?.description}
                  </CustomText>
                </View>
              </View>

              <View style={styles.viewname}>
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Date
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {moment(updateData?.purchaseDate).format('l')}
                  </CustomText>
                </View>
              </View>

      <View>
        <ScrollView horizontal showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
        }} >

          



<View style={{ paddingHorizontal: width * 0.01,  marginTop: 10, paddingBottom: width * 0.1, width: 1000 }}>


<DataTable style={{ borderColor: colors.gray, borderWidth: 1, borderRadius: 9 }}>
  <DataTable.Row style={{ backgroundColor: colors.primary, borderTopLeftRadius: 9, borderTopRightRadius: 9 }}>
    <DataTable.Cell style={{ flex: 0.1 }}>
      <CustomText fontWeight={fontsFamily.semiBold} style={{ color: colors.white }}>S.No</CustomText>
    </DataTable.Cell>
    <DataTable.Title numeric style={[styles.tableCellName, styles.border]}>
      <CustomText fontWeight={fontsFamily.semiBold} style={{ color: colors.white }}>Product Name</CustomText>
    </DataTable.Title>
    <DataTable.Title numeric style={[styles.tableCell, styles.border]}>
      <CustomText fontWeight={fontsFamily.semiBold} style={{ color: colors.white }}>Quantity</CustomText>
    </DataTable.Title>
    <DataTable.Title numeric style={[styles.tableCell, styles.border]}>
      <CustomText fontWeight={fontsFamily.semiBold} style={{ color: colors.white }}>Price</CustomText>
    </DataTable.Title>
    <DataTable.Title numeric style={[styles.tableCell, styles.border]}>
      <CustomText fontWeight={fontsFamily.semiBold} style={{ color: colors.white }}>Amount</CustomText>
    </DataTable.Title>
  </DataTable.Row>



  {updateData.items?.map((item, index) => (

  <DataTable.Row>
    <DataTable.Cell style={{ flex: 0.1 }}>
      <Text style={{ fontFamily: fontsFamily.medium, color: colors.primary }}>{index + 1}</Text>
    </DataTable.Cell>
    <DataTable.Title numberOfLines={2} style={[styles.tableCellName, styles.border]}>
      <Text style={{ fontFamily: fontsFamily.medium, color: colors.primary }}>{item?.itemName}</Text>
    </DataTable.Title>


    <DataTable.Title numberOfLines={3} style={[styles.tableCell, styles.border]}>
      <Text style={{ fontFamily: fontsFamily.medium, color: colors.primary }}> {item?.quantity.toLocaleString("en-US")}</Text>
    </DataTable.Title>
    <DataTable.Cell style={[styles.tableCell, styles.border]}>
      <Text style={{ fontFamily: fontsFamily.medium, color: colors.primary }}>{item?.unitPrice.toLocaleString("en-US")}</Text>
    </DataTable.Cell>
    <DataTable.Cell style={[styles.tableCell, styles.border]}>
      <Text style={{ fontFamily: fontsFamily.medium, color: colors.primary }}>{item.totalAmount.toLocaleString("en-US")}</Text>
    </DataTable.Cell>
   

  </DataTable.Row>

  ))}




</DataTable>

</View>




        </ScrollView>
        </View>
        <View style={styles.viewnameTotal}>
                <Image source={Images.money} resizeMode="contain" style={{ width: width * 0.06, height: width * 0.06, marginHorizontal: width * 0.035, justifyContent:'flex-end' }} />
                <View style={{}}>
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.name}>
                    Net Total
                  </CustomText>

                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.username}>
                    {updateData?.totalAmount.toLocaleString("en-US")}
                  </CustomText>
                </View>
              </View>
     
        
      </View>

     

     



    </SafeAreaView>
  )
}

export default PurchaseDetail;
