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
import SetFieldTextField from '../../components/TextField/SetFieldTextField';
import DropDown from '../../components/TextField/DropDown';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { Images } from '../../assets/Images';
import { DataTable } from 'react-native-paper';
import CustomModal from '../../components/Modal/CustomModal';

const { width } = Dimensions.get("window")

const UpdatePurchase = ({ navigation, route }) => {

  const updateData = route?.params?.data
  console.log('file: UpdatePurchase.js:31 => UpdatePurchase => updateData:', updateData)
  const { control, handleSubmit, setValue, clearErrors, resetField } = useForm();

  const isFocused = useIsFocused()
  const role = useSelector(state => state.userDataReducer.userRole)

  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(0);
  const [vendors, setVendors] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState();
  const [showTypeModal, setShowTypeModal] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState();
  const [showPaymentStatusModal, setShowPaymentStatusModal] = useState(false)
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showBankModal, setShowBankModal] = useState(false)

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('date');
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false)
  const [errorModalText, setErrorModalText] = useState('')

  const [firstStepData, setFirstStepData] = useState();
  const [secondStepData, setSecondStepData] = useState();
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

  const handleNextStep = () => setStep((prev) => prev + 1)
  const handlePrevStep = () => setStep((prev) => prev - 1)

  const submitFirstStep = async (formData) => {
    try {
      const vendorId = vendors.find(e => e.title === formData.vendor)?.vendorID
      let obj = {
        vendorID: vendorId,
        description: formData?.description,
        purchaseDate: date,
      }
      setFirstStepData(obj)
      handleNextStep()
    } catch (error) {
      console.log('file: CreatePurchase.js:89 => submitFirstStep => error:', error)
    }
  }

  const createProduct = (formData) => {
    try {
      let obj = {
        item: formData.item,
        quantity: formData?.quantity,
        unitPrice: formData.amount,
        totalAmount: formData?.quantity * formData.amount,
      }
      setProducts(prev => [...prev, obj])
      resetField('item')
      resetField('quantity')
      resetField('amount')
      setTotalAmount(prev => prev + obj.totalAmount)
    } catch (error) {
      console.log('file: CreatePurchase.js:106 => createProduct => error:', error)
    }
  }

  const submitSecondStep = async () => {
    try {
      let obj = {
        items: products,
        totalAmount: totalAmount,
      }
      setSecondStepData(obj)
      setValue('totalAmount', totalAmount.toString())
      handleNextStep()
    } catch (error) {
      console.log('file: CreatePurchase.js:115 => submitSecondStep => error:', error)
    }
  }

  const updatePurchase = async (formData) => {
    setLoading(true)
    try {
      const paymentTypeId = paymentTypes.find(e => e.title === formData.paymentType)?.typeID
      const paymentStatusId = paymentStatus.find(e => e.title === formData.paymentStatus)?.id
      const bankAccountId = bankAccounts.find(e => e.title === formData.bankAccount)?.bankID
      let obj = {
        ...firstStepData,
        ...secondStepData,
        purchaseID: updateData?.purchaseID,
        paymentTypeID: paymentTypeId,
        paymentStatusID: paymentStatusId,
        amountPaid: paymentStatusId === 2 ? formData?.amountPaid : 0
      }
      if (bankAccountId) {
        obj.bankAccID = bankAccountId
      }
      const { message } = await apiCall.updatePurchase(obj)
      setAlertType('s')
      setErrorModalText(message)
      setErrorModal(true)
      setTimeout(() => {
        setErrorModal(false)
        navigation.navigate('purchases')
      }, 3000);
    } catch (error) {
      setAlertType('e')
      setErrorModalText(error)
      setErrorModal(true)
      setTimeout(() => {
        setErrorModal(false)
      }, 3000);
    } finally {
      setLoading(false)
    }
  }

  const getVendors = async () => {
    try {
      const { data } = await apiCall.getVendors()
      const vendorData = []
      data?.forEach(element => {
        let obj = {
          ...element,
          title: element?.name
        }
        vendorData.push(obj)
      });
      setVendors(vendorData)
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
      data?.forEach(element => {
        let obj = {
          ...element,
          title: element?.typeName
        }
        paymentTypeData.push(obj)
      });
      setPaymentTypes(paymentTypeData)
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
      data?.forEach(element => {
        let obj = {
          ...element,
          title: element?.accountTitle
        }
        bankData.push(obj)
      });
      setBankAccounts(bankData)
      const bankName = data.find(e => e.bankID === updateData.bankAccountID)?.accountTitle
      setValue('bankAccount', bankName)
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error)
    }
  }

  const getPaymentStatus = async () => {
    try {
      const { data } = await apiCall.getPaymentStatus()
      const paymentData = []
      data?.forEach(element => {
        let obj = {
          id: element?.id,
          title: element?.status
        }
        paymentData.push(obj)
      });
      setPaymentStatus(paymentData)
      const status = data.find(e => e.status === updateData.paymentStatus)?.status
      console.log('file: UpdatePurchase.js:240 => getPaymentStatus => status:', status)
      setValue('paymentStatus', status)
      setSelectedPaymentStatus(status)
    } catch (error) {
      console.log('file: CreatePurchase.js:232 => getPaymentStatus => error:', error)
    }
  }

  const setDefaultData = () => {
    try {
      setValue('name', updateData?.expenseName)
      setValue('description', updateData?.description)
      setValue('totalAmount', updateData?.totalAmount.toString())
      setValue('amountPaid', updateData?.amountPaid.toString())
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

  useEffect(() => {
    getVendors()
    getPaymentTypes()
    getBanks()
    setDefaultData()
    getPaymentStatus()
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
          onBack={() => step === 0 ? goBack() : handlePrevStep()}
          title={"Update Purchase"}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
        }} >

          <View style={{ paddingHorizontal: width * 0.02 }}>

            {step === 0 &&
              <Fragment>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: width * 0.04,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{ fontSize: width * 0.045 }}>
                    Vendor Detail
                  </CustomText>
                </View>
                <DropDown
                  name={'vendor'}
                  title="Select Vendor"
                  type={'default'}
                  variant={'outlined'}
                  control={control}
                  rules={{
                    required: "Please select vendor",
                  }}
                  img={false}
                  onPress={() => {
                    setShowModal(true)
                  }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: "wrap" }}>
                  <View style={{ width: '100%' }}>
                    <TimeDateBtn
                      variant={'light'}
                      title={date == new Date() ? 'Date' : getFormattedDate(date)}
                      prefixIcon={true}
                      setOpen={() => [setOpen(true), setMode('date')]}
                    />
                  </View>
                </View>
                <FilledTextField
                  name={'description'}
                  variant={'outlined'}
                  placeholder="Description"
                  type={'default'}
                  multiline={true}
                  numberOfLines={4}
                  customInputStyle={{ height: width * 0.3 }}
                  control={control}
                  rules={{
                    required: "Please enter description.",
                  }}
                  onSubmitEditing={handleSubmit(submitFirstStep)}
                />

                <View style={{ marginVertical: width * 0.07 }}>
                  <PrimaryButton
                    customStyle={{ padding: width * 0.032 }}
                    title={'Next'}
                    onPress={handleSubmit(submitFirstStep)}
                  />
                </View>
              </Fragment>
            }

            {step === 1 &&
              <Fragment>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: width * 0.04,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{ fontSize: width * 0.045 }}>
                    Product Detail
                  </CustomText>
                </View>

                <FilledTextField
                  name={'item'}
                  variant={'outlined'}
                  placeholder="Product Name"
                  type={'default'}
                  control={control}
                  rules={{
                    required: "Please enter product name.",
                  }}
                  onSubmitEditing={handleSubmit(createProduct)}
                />
                <FilledTextField
                  name={'quantity'}
                  variant={'outlined'}
                  placeholder="Quantity"
                  type={'number-pad'}
                  control={control}
                  rules={{
                    required: "Please enter quantity.",
                  }}
                  onSubmitEditing={handleSubmit(createProduct)}
                />
                <FilledTextField
                  name={'amount'}
                  variant={'outlined'}
                  placeholder="Amount"
                  type={'number-pad'}
                  control={control}
                  rules={{
                    required: "Please enter amount.",
                  }}
                  onSubmitEditing={handleSubmit(createProduct)}
                />

                <TouchableOpacity onPress={handleSubmit(createProduct)} style={{ flex: 0.2, alignItems: "center" }}>
                  <Image source={Images.Addcircle} resizeMode="contain" style={{ width: width * 0.08, height: width * 0.08 }} />
                </TouchableOpacity>

                {products.length > 0 &&
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>#</DataTable.Title>
                      <DataTable.Title>Product</DataTable.Title>
                      <DataTable.Title>Total</DataTable.Title>
                    </DataTable.Header>

                    {products.map((item, index) => (
                      <DataTable.Row key={index}>
                        <DataTable.Cell >{index + 1}</DataTable.Cell>
                        <DataTable.Cell>{item.item} {`(x${item.quantity})`}</DataTable.Cell>
                        <DataTable.Cell>{item.totalAmount}</DataTable.Cell>
                      </DataTable.Row>
                    ))}

                  </DataTable>
                }

                <View style={{ marginVertical: width * 0.07 }}>
                  <PrimaryButton
                    customStyle={{ padding: width * 0.032 }}
                    disabled={products.length > 0 ? false : true}
                    title={'Next'}
                    onPress={() => submitSecondStep()}
                  />
                </View>
              </Fragment>
            }

            {step === 2 &&
              <Fragment>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: width * 0.04,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{ fontSize: width * 0.045 }}>
                    Payment Detail
                  </CustomText>
                </View>

                <DropDown
                  name={'paymentType'}
                  title="Select Payment Type"
                  type={'default'}
                  variant={'outlined'}
                  control={control}
                  rules={{
                    required: "Please select payment type",
                  }}
                  img={false}
                  onPress={() => {
                    setShowTypeModal(true)
                  }}
                />
                {selectedPaymentType === 'Bank' &&
                  <DropDown
                    name={'bankAccount'}
                    title="Bank Account"
                    type={'default'}
                    variant={'outlined'}
                    control={control}
                    rules={{
                      required: selectedPaymentType === 'Bank' ? "Please select bank account" : false,
                    }}
                    img={false}
                    onPress={() => {
                      setShowBankModal(true)
                    }}
                  />
                }

                <DropDown
                  name={'paymentStatus'}
                  title="Select Payment Status"
                  type={'default'}
                  variant={'outlined'}
                  control={control}
                  rules={{
                    required: "Please select payment status",
                  }}
                  img={false}
                  onPress={() => {
                    setShowPaymentStatusModal(true)
                  }}
                />

                {selectedPaymentStatus === 'Partial Paid' &&
                  <FilledTextField
                    name={'amountPaid'}
                    variant={'outlined'}
                    placeholder="Paid Amount"
                    type={'number-pad'}
                    control={control}
                    rules={{
                      required: selectedPaymentStatus === 'Partial Paid' ? "Please enter paid amount." : false,
                      validate: (value, formValues) => value > totalAmount ? "Please valid amount." : true,
                    }}
                    onSubmitEditing={handleSubmit(updatePurchase)}
                  />
                }

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: width * 0.1,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{ fontSize: width * 0.035 }}>
                    Total Amount
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{ fontSize: width * 0.04, color: colors.primary }}>
                    Rs {totalAmount}
                  </CustomText>
                </View>

                <View style={{ marginVertical: width * 0.07 }}>
                  <PrimaryButton
                    customStyle={{ padding: width * 0.032 }}
                    title={'Submit'}
                    loading={loading}
                    onPress={handleSubmit(updatePurchase)}
                  />
                </View>
              </Fragment>
            }

          </View>

          <CustomModal
            data={vendors.length <= 0 ? [] : vendors}
            modalVisible={showModal}
            closeModal={() => setShowModal(false)}
            getvalue={(e) => {
              setValue('vendor', e)
              clearErrors('vendor')
            }}
          />
          <CustomModal
            data={paymentTypes.length <= 0 ? [] : paymentTypes}
            modalVisible={showTypeModal}
            closeModal={() => setShowTypeModal(false)}
            getvalue={(e) => {
              setValue('paymentType', e)
              setSelectedPaymentType(e)
              clearErrors('paymentType')
            }}
          />
          <CustomModal
            data={paymentStatus.length <= 0 ? [] : paymentStatus}
            modalVisible={showPaymentStatusModal}
            closeModal={() => setShowPaymentStatusModal(false)}
            getvalue={(e) => {
              setValue('paymentStatus', e)
              setSelectedPaymentStatus(e)
              clearErrors('paymentStatus')
            }}
          />
          <CustomModal
            data={bankAccounts.length <= 0 ? [] : bankAccounts}
            modalVisible={showBankModal}
            closeModal={() => setShowBankModal(false)}
            getvalue={(e) => {
              setValue('bankAccount', e)
              clearErrors('bankAccount')
            }}
          />

          <DateTimePicker
            setDate={mode == 'date' ? (e) => {
              setDate(e)
            } : (e) => {
              setInvoiceDate(e)
            }}
            closeModal={() => setOpen(false)}
            date={mode == 'date' ? date : invoiceDate}
            modalVisible={open}
            mode={'date'}
          />

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default UpdatePurchase;
