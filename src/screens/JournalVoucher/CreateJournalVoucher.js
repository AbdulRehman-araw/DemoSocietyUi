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
import { DataTable } from 'react-native-paper'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Images } from '../../assets/Images'
import CustomText from '../../components/CustomText'
import { fontsFamily } from '../../assets/Fonts'

const { width } = Dimensions.get("window")

const CreateJournalVoucher = ({ navigation }) => {

  const { control, handleSubmit, setValue, clearErrors, resetField } = useForm();

  const isFocused = useIsFocused()

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false)
  const [errorModalText, setErrorModalText] = useState('')

  const [journalEntry, setJournalEntry] = useState([]);

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

  const createJournalEntry = (formData) => {
    try {
      let obj = {
        description: formData.description,
        debit: formData?.debit,
        credit: formData.credit,
      }
      setJournalEntry(prev => [...prev, obj])
      resetField('description')
      resetField('debit')
      resetField('credit')
    } catch (error) {
      console.log('file: CreatePurchase.js:106 => createProduct => error:', error)
    }
  }

  const createJournalVoucher = async (formData) => {
    setLoading(true)
    try {
      let obj = {
        voucherName: formData.voucherName,
        date: date,
        journalEntry: journalEntry,
      }
      const { message } = await apiCall.createJournalVoucher(obj)
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
                Voucher Detail
              </CustomText>
            </View>
            <FilledTextField
              name={'voucherName'}
              variant={'outlined'}
              placeholder="Voucher Name"
              type={'default'}
              control={control}
              rules={{
                required: journalEntry.length > 0 ? false : "Please enter voucher name.",
              }}
              onSubmitEditing={handleSubmit(createJournalVoucher)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: "wrap" }}>
              <View style={{ width: '100%' }}>
                <TimeDateBtn
                  variant={'light'}
                  title={date == new Date() ? 'Date' : getFormattedDate(date)}
                  prefixIcon={true}
                  setOpen={() => [setOpen(true)]}
                />
              </View>
            </View>
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
                Journal Entry
              </CustomText>
            </View>
            <FilledTextField
              name={'description'}
              variant={'outlined'}
              placeholder="Description"
              type={'default'}
              control={control}
              rules={{
                required: journalEntry.length > 0 ? false : "Please enter description.",
              }}
              onSubmitEditing={handleSubmit(createJournalEntry)}
            />
            <FilledTextField
              name={'debit'}
              variant={'outlined'}
              placeholder="Debit"
              type={'number-pad'}
              control={control}
              rules={{
                required: journalEntry.length > 0 ? false : "Please enter debit.",
              }}
              onSubmitEditing={handleSubmit(createJournalEntry)}
            />
            <FilledTextField
              name={'credit'}
              variant={'outlined'}
              placeholder="Credit"
              type={'number-pad'}
              control={control}
              rules={{
                required: journalEntry.length > 0 ? false : "Please enter credit.",
              }}
              onSubmitEditing={handleSubmit(createJournalEntry)}
            />

            <TouchableOpacity onPress={handleSubmit(createJournalEntry)} style={{ flex: 0.2, alignItems: "center" }}>
              <Image source={Images.Addcircle} resizeMode="contain" style={{ width: width * 0.08, height: width * 0.08 }} />
            </TouchableOpacity>

            {journalEntry.length > 0 &&
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Description</DataTable.Title>
                  <DataTable.Title numeric>Debit</DataTable.Title>
                  <DataTable.Title numeric>Credit</DataTable.Title>
                </DataTable.Header>

                {journalEntry.map((item, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{item.description}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.debit}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.credit}</DataTable.Cell>
                  </DataTable.Row>
                ))}

              </DataTable>
            }

            <View style={{ marginVertical: width * 0.07 }}>
              <PrimaryButton
                customStyle={{ padding: width * 0.032 }}
                title={'Submit'}
                loader={loading}
                onPress={handleSubmit(createJournalVoucher)}
              />
            </View>

          </View>

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

export default CreateJournalVoucher;
