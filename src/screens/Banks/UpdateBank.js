import { View, SafeAreaView, StatusBar, ScrollView, Dimensions, Platform, BackHandler, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'
import { styles } from './styles/styles'
import Header from '../../components/Header/Header'
import FilledTextField from '../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { apiCall } from '../../Services/apiCall';
import AlertModal from '../../components/Modal/AlertModal';
import { useIsFocused } from '@react-navigation/native'

const { width } = Dimensions.get("window")

const UpdateBank = ({ navigation, route }) => {

  const updateData = route?.params?.data
  const { control, handleSubmit, setValue, clearErrors } = useForm();
  const isFocused = useIsFocused()
  const [loading, setLoading] = useState(false);

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

  const updateBank = async (formData) => {
    setLoading(true)
    try {
      let obj = {
        bankID: updateData?.bankID,
        accountTitle: formData.title,
        branchCode: formData.branchCode,
        bank: formData.bank,
        accountNo: formData.accountNo,
      }
      const { message } = await apiCall.updateBank(obj)
      setAlertType('s')
      setErrorModalText(message)
      setErrorModal(true)
      setTimeout(() => {
        setErrorModal(false)
        navigation.navigate('banks')
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

  const setDefaultData = () => {
    try {
      setValue('title', updateData?.accountTitle)
      setValue('branchCode', updateData?.branchCode)
      setValue('bank', updateData?.bankName)
      setValue('accountNo', updateData?.accountNo)
    } catch (error) {
      console.log('file: index.js:148 => setDefaultData => error:', error)
    }
  }

  useEffect(() => {
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
          title={"Update Bank"}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
        }} >

          <View style={{ paddingHorizontal: width * 0.02 }}>

            <FilledTextField
              name={'title'}
              variant={'outlined'}
              placeholder="Account Title"
              type={'default'}
              control={control}
              rules={{
                required: "Please enter account title.",
              }}
              onSubmitEditing={handleSubmit(updateBank)}
            />
            <FilledTextField
              name={'bank'}
              variant={'outlined'}
              placeholder="Bank Name"
              type={'default'}
              control={control}
              rules={{
                required: "Please enter bank name.",
              }}
              onSubmitEditing={handleSubmit(updateBank)}
            />
            <FilledTextField
              name={'branchCode'}
              variant={'outlined'}
              placeholder="Branch Code"
              type={'default'}
              control={control}
              rules={{
                required: "Please enter branch code.",
              }}
              onSubmitEditing={handleSubmit(updateBank)}
            />
            <FilledTextField
              name={'accountNo'}
              variant={'outlined'}
              placeholder="Account No."
              type={'default'}
              control={control}
              rules={{
                required: "Please enter account number.",
              }}
              onSubmitEditing={handleSubmit(updateBank)}
            />

            <View style={{ marginVertical: width * 0.07 }}>
              <PrimaryButton
                customStyle={{ padding: width * 0.032 }}
                title={'Submit'}
                loader={loading}
                onPress={handleSubmit(updateBank)}
              />
            </View>

          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default UpdateBank;
