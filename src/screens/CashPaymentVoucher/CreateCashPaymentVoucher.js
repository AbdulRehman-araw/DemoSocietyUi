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

const CreateCashPaymentVoucher = ({ navigation }) => {

  const { control, handleSubmit, setValue, clearErrors } = useForm();

  const isFocused = useIsFocused()

  const [loading, setLoading] = useState(false);

  const [vendors, setVendors] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [purchases, setPurchases] = useState([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
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

  const createCashPaymentVoucher = async (formData) => {
    setLoading(true)
    try {
      const vendorId = vendors.find(e => e.title === formData.vendor)?.vendorID
      const purchaseId = purchases.find(e => e.title === formData.purchase)?.purchaseID
      let obj = {
        vendorID: vendorId,
        purchaseID: purchaseId,
        description: formData.description,
        date: date,
        amount: formData.amount
      }
      const { message } = await apiCall.createCashPaymentVoucher(obj)
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
      setVendors(vendorData)
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error)
    }
  }

  const getPurchases = async (formData) => {
    try {
      const vendorId = vendors.find(e => e.title === formData)?.vendorID
      const { data } = await apiCall.getPurchases(vendorId, false)
      const purchaseData = []
      data.forEach(element => {
        let obj = {
          ...element,
          title: element?.description
        }
        purchaseData.push(obj)
      });
      setPurchases(purchaseData)
    } catch (error) {
      console.log('file: index.js:54 => getPurchases => error:', error)
    }
  }

  useEffect(() => {
    getVendors()
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
              name={'purchase'}
              title="Select Purchase"
              type={'default'}
              variant={'outlined'}
              control={control}
              rules={{
                required: "Please select purchase",
              }}
              img={false}
              onPress={() => {
                setShowPurchaseModal(true)
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
              onSubmitEditing={handleSubmit(createCashPaymentVoucher)}
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
              }}
              onSubmitEditing={handleSubmit(createCashPaymentVoucher)}
            />

            <View style={{ marginVertical: width * 0.07 }}>
              <PrimaryButton
                customStyle={{ padding: width * 0.032 }}
                title={'Submit'}
                loader={loading}
                onPress={handleSubmit(createCashPaymentVoucher)}
              />
            </View>

          </View>

          <CustomModal
            data={vendors.length <= 0 ? [] : vendors}
            modalVisible={showModal}
            closeModal={() => setShowModal(false)}
            getvalue={(e) => {
              setValue('vendor', e)
              getPurchases(e)
              clearErrors('vendor')
            }}
          />
          <CustomModal
            data={purchases.length <= 0 ? [] : purchases}
            modalVisible={showPurchaseModal}
            closeModal={() => setShowPurchaseModal(false)}
            getvalue={(e) => {
              setValue('purchase', e)
              clearErrors('purchase')
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

export default CreateCashPaymentVoucher;
