import { View, SafeAreaView, StatusBar, ScrollView, Dimensions, Platform, BackHandler, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import CustomModal from '../../components/Modal/CustomModal';

const { width } = Dimensions.get("window")

const UpdateExpense = ({ navigation, route }) => {

  const updateData = route?.params?.data
  const { control, handleSubmit, setValue, clearErrors } = useForm();

  const isFocused = useIsFocused()
  const role = useSelector(state => state.userDataReducer.userRole)
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const [expenseAccounts, setExpenseAccounts] = useState([]);
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [showTypeModal, setShowTypeModal] = useState(false)
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showBankModal, setShowBankModal] = useState(false)
  const [selectedPaymentType, setSelectedPaymentType] = useState();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

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

  const updateExpense = async (formData) => {
    setLoading(true)
    try {
      const expenseAccountId = expenseAccounts.find(e => e.title === formData.expense)?.expenseAccountID
      const paymentTypeId = paymentTypes.find(e => e.title === formData.paymentType)?.typeID
      const bankAccountId = bankAccounts.find(e => e.title === formData.bankAccount)?.bankID
      let obj = {
        expenseID: updateData?.expenseID,
        expenseName: formData.name,
        expenseAccountID: expenseAccountId,
        description: formData.description,
        date: date,
        paymentTypeID: paymentTypeId,
        amount: formData.amount
      }
      if (bankAccountId) {
        obj.bankAccountID = bankAccountId
      }
      const { message } = await apiCall.updateExpense(obj)
      setAlertType('s')
      setErrorModalText(message)
      setErrorModal(true)
      setTimeout(() => {
        setErrorModal(false)
        navigation.navigate('expense')
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

  const getExpenseAccounts = async () => {
    try {
      const { data } = await apiCall.getExpenseAccounts()
      const accountData = []
      data.forEach(element => {
        let obj = {
          ...element,
          title: element?.expenseAccountName
        }
        accountData.push(obj)
      });
      setExpenseAccounts(accountData)
      const expenseAccountName = data.find(e => e.expenseAccountID === updateData.expenseAccountID)?.expenseAccountName
      setValue('expense', expenseAccountName)
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
      data.forEach(element => {
        let obj = {
          ...element,
          title: element?.accountTitle
        }
        bankData.push(obj)
      });
      setBankAccounts(bankData)
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
      setValue('amount', updateData?.amount.toString())
      setDate(new Date(updateData?.date))
    } catch (error) {
      console.log('file: index.js:148 => setDefaultData => error:', error)
    }
  }

  useEffect(() => {
    getExpenseAccounts()
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
          onBack={goBack}
          title={"Update Expense"}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
        }} >

          <View style={{ paddingHorizontal: width * 0.02 }}>

            <FilledTextField
              name={'name'}
              placeholder="Expense Name"
              type={'default'}
              variant={'outlined'}
              control={control}
              rules={{
                required: "Please enter expense name.",
              }}
              onSubmitEditing={handleSubmit(updateExpense)}
            />
            <DropDown
              name={'expense'}
              title="Expense Account"
              type={'default'}
              variant={'outlined'}
              control={control}
              rules={{
                required: "Please select expense account.",
              }}
              img={false}
              onPress={() => {
                setShowExpenseModal(true)
              }}
            />
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
              onSubmitEditing={handleSubmit(updateExpense)}
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
            <DropDown
              name={'paymentType'}
              title="Payment Type"
              type={'default'}
              variant={'outlined'}
              control={control}
              rules={{
                required: "Please select payment Type.",
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
                  required: selectedPaymentType === 'Bank' ? "Please select bank account." : false,
                }}
                img={false}
                onPress={() => {
                  setShowBankModal(true)
                }}
              />
            }
            <FilledTextField
              name={'amount'}
              placeholder="Amount"
              type={'number-pad'}
              variant={'outlined'}
              control={control}
              rules={{
                required: "Please enter amount.",
              }}
              onSubmitEditing={handleSubmit(updateExpense)}
            />


            <View style={{ marginVertical: width * 0.07 }}>
              <PrimaryButton
                customStyle={{ padding: width * 0.032 }}
                title={'Submit'}
                loader={loading}
                onPress={handleSubmit(updateExpense)}
              />
            </View>

          </View>

          <CustomModal
            data={expenseAccounts.length <= 0 ? [] : expenseAccounts}
            modalVisible={showExpenseModal}
            closeModal={() => setShowExpenseModal(false)}
            getvalue={(e) => {
              setValue('expense', e)
              clearErrors('expense')
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

export default UpdateExpense;
