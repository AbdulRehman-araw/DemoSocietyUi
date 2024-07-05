import { View, SafeAreaView, StatusBar, ScrollView, Dimensions, Platform, BackHandler, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'
import { styles } from './styles/styles'
import Header from '../../components/Header/Header'
import FilledTextField from '../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';
import { apiCall } from '../../Services/apiCall';
import AlertModal from '../../components/Modal/AlertModal';
import { useIsFocused } from '@react-navigation/native'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Images } from '../../assets/Images'

const { width, height } = Dimensions.get("window")

const BankDetail = ({ navigation, route }) => {

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


  const deleteBank = async (id) => {
    setLoading(true)
    try {
      const { message } = await apiCall.deleteBank(id)
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
          title={"Bank Detail"}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
        }} >

          <View style={{ paddingHorizontal: width * 0.02 }}>

            <FilledTextField
              editable={false}
              name={'title'}
              variant={'outlined'}
              placeholder="Account Title"
              type={'default'}
              control={control}
            />
            <FilledTextField
              editable={false}
              name={'bank'}
              variant={'outlined'}
              placeholder="Bank Name"
              type={'default'}
              control={control}
            />
            <FilledTextField
              editable={false}
              name={'branchCode'}
              variant={'outlined'}
              placeholder="Branch Code"
              type={'default'}
              control={control}
            />
            <FilledTextField
              editable={false}
              name={'accountNo'}
              variant={'outlined'}
              placeholder="Account No."
              type={'default'}
              control={control}
            />

            <View style={{ marginVertical: width * 0.07, flexDirection: 'row', gap: 8, justifyContent: 'center', marginTop: height * 0.4 }}>
              <TouchableOpacity disabled={loading} onPress={() => deleteBank(updateData?.bankID)} activeOpacity={1} style={{
                width: width * 0.13,
                height: width * 0.13,
                marginRight: width * 0.02,
                backgroundColor: colors.danger,
                borderRadius: 10,
                padding: width * 0.02,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Image
                  resizeMode='contain'
                  style={{ tintColor: colors.white, width: width * 0.06, height: width * 0.06 }}
                  source={Images.icondelete}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('updateBank', { data: updateData })} activeOpacity={1} style={{
                width: width * 0.13,
                height: width * 0.13,
                marginRight: width * 0.02,
                backgroundColor: colors.primary,
                borderRadius: 10,
                padding: width * 0.02,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Image
                  resizeMode='contain'
                  style={{ tintColor: colors.white, width: width * 0.06, height: width * 0.06 }}
                  source={Images.editIcon}
                />
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default BankDetail;
