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

const UpdateVendor = ({ navigation, route }) => {

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

  const updateVendor = async (formData) => {
    setLoading(true)
    try {
      let obj = {
        vendorID: updateData?.vendorID,
        name: formData.name,
        details: formData.detail,
      }
      const { message } = await apiCall.updateVendor(obj)
      setAlertType('s')
      setErrorModalText(message)
      setErrorModal(true)
      setTimeout(() => {
        setErrorModal(false)
        navigation.navigate('vendors')
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
      setValue('name', updateData?.name)
      setValue('detail', updateData?.details)
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
          title={"Update Vendor"}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
        }} >

          <View style={{ paddingHorizontal: width * 0.02 }}>

            <FilledTextField
              name={'name'}
              variant={'outlined'}
              placeholder="Vendor Name"
              type={'default'}
              control={control}
              rules={{
                required: "Please enter vendor name.",
              }}
              onSubmitEditing={handleSubmit(updateVendor)}
            />
            <FilledTextField
              name={'detail'}
              variant={'outlined'}
              placeholder="Detail"
              type={'default'}
              multiline={true}
              numberOfLines={4}
              customInputStyle={{ height: width * 0.3 }}
              control={control}
              rules={{
                required: "Please enter detail.",
              }}
              onSubmitEditing={handleSubmit(updateVendor)}
            />


            <View style={{ marginVertical: width * 0.07 }}>
              <PrimaryButton
                customStyle={{ padding: width * 0.032 }}
                title={'Submit'}
                loader={loading}
                onPress={handleSubmit(updateVendor)}
              />
            </View>

          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default UpdateVendor;
