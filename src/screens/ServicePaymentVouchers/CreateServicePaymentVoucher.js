import { View, SafeAreaView, StatusBar, ScrollView, Dimensions, Platform, BackHandler, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'
import { styles } from './styles/styles'
import Header from '../../components/Header/Header'
import FilledTextField from '../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { getFormattedDate } from '../../utils/helperFunction';
import { apiCall } from '../../Services/apiCall';
import { useIsFocused } from '@react-navigation/native';
import AlertModal from '../../components/Modal/AlertModal';
import CustomModal from '../../components/Modal/CustomModal';
import DropDown from '../../components/TextField/DropDown';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import TimeDateBtn from '../../components/Button/TimeDateBtn';

const { width } = Dimensions.get("window")

const CreateServicePaymentVoucher = ({ navigation }) => {

  const { control, handleSubmit, setValue, clearErrors } = useForm();

  const isFocused = useIsFocused()

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false)
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState();
  const [showTypeModal, setShowTypeModal] = useState(false)
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showBankModal, setShowBankModal] = useState(false)
  const [totalAmount, setTotalAmount] = useState();

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false)
  const [errorModalText, setErrorModalText] = useState('')

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

  const [serviceContracts, setServiceContracts] = useState([]);

  const createServicePaymentVoucher = async (formData) => {
    setLoading(true)
    try {
      const serviceContractId = serviceContracts.find(e => e.title === formData.vendor)?.serviceContractID
      const paymentTypeId = paymentTypes.find(e => e.title === formData.paymentType)?.typeID
      const bankAccountId = bankAccounts.find(e => e.title === formData.bankAccount)?.bankID
      let obj = {
        serviceContractID: serviceContractId,
        paymentTypeID: paymentTypeId,
        description: formData.description,
        date: date,
        amount: formData.amount
      }
      if (bankAccountId) {
        obj.bankAccID = bankAccountId
      }
      console.log(obj)
      const { message } = await apiCall.createServicePaymentVoucher(obj)
      setAlertType('s')
      setErrorModalText(message)
      setErrorModal(true)
      setTimeout(() => {
        setErrorModal(false)
        goBack()
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

  const getServiceContracts = async () => {
    try {
      const { data } = await apiCall.getServiceContracts()
      const service = []
      data?.forEach(element => {
        let obj = {
          ...element,
          title: element?.remarks
        }
        service.push(obj)
      });
      setServiceContracts(service)
    } catch (error) {
      console.log('file: index.js:54 => getPurchases => error:', error)
    }
  }

  const getServiceContractPayable = async (vendor) => {
    try {
      const serviceContractId = serviceContracts.find(e => e.title === vendor)?.serviceContractID
      const { data } = await apiCall.getServiceContractPayable(serviceContractId)
      setTotalAmount(data?.totalPayable)
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
    } catch (error) {
      console.log('file: CreatePurchase.js:215 => getBanks => error:', error)
    }
  }

  useEffect(() => {
    getServiceContracts()
    getPaymentTypes()
    getBanks()
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
          onBack={goBack}
          title={"Create"}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
        }} >

          <View style={{ paddingHorizontal: width * 0.02 }}>

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
              onSubmitEditing={handleSubmit(createServicePaymentVoucher)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: "wrap" }}>
              <View style={{ width: '100%' }}>
                <TimeDateBtn
                  variant={'light'}
                  title={date == new Date() ? 'Date' : getFormattedDate(date)}
                  prefixIcon={true}
                  setOpen={() => setOpen(true)}
                />
              </View>
            </View>
            <FilledTextField
              name={'amount'}
              placeholder="Amount"
              type={'number-pad'}
              variant={'outlined'}
              control={control}
              rules={{
                required: "Please enter amount.",
                validate: (value) => value > totalAmount ? "Please valid amount." : true,
              }}
              onSubmitEditing={handleSubmit(createServicePaymentVoucher)}
            />

            <View style={{ marginVertical: width * 0.07 }}>
              <PrimaryButton
                customStyle={{ padding: width * 0.032 }}
                title={'Submit'}
                loader={loading}
                onPress={handleSubmit(createServicePaymentVoucher)}
              />
            </View>

          </View>

          <CustomModal
            data={serviceContracts.length <= 0 ? [] : serviceContracts}
            modalVisible={showModal}
            closeModal={() => setShowModal(false)}
            getvalue={(e) => {
              setValue('vendor', e)
              clearErrors('vendor')
              getServiceContractPayable(e)
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
            data={bankAccounts.length <= 0 ? [] : bankAccounts}
            modalVisible={showBankModal}
            closeModal={() => setShowBankModal(false)}
            getvalue={(e) => {
              setValue('bankAccount', e)
              clearErrors('bankAccount')
            }}
          />

          <DateTimePicker
            setDate={(e) => setDate(e)}
            closeModal={() => setOpen(false)}
            date={date}
            modalVisible={open}
            mode={'date'}
          />

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default CreateServicePaymentVoucher;
