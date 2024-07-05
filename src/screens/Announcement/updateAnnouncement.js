import { View, SafeAreaView, StatusBar, ScrollView, Dimensions, Platform, BackHandler, Image, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'
import { styles } from './styles/styles'
import Header from '../../components/Header/Header'
import FilledTextField from '../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import { getFormattedDate, getFormattedTime } from '../../utils/helperFunction';
import { apiCall } from '../../Services/apiCall';
import { useSelector } from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import { useIsFocused } from '@react-navigation/native'
import { Images } from '../../assets/Images'
import ImageCropPicker from 'react-native-image-crop-picker'
import { baseUrl } from '../../../axios'
import { useLocalTime } from '../../utils/LocalTime';


const { width } = Dimensions.get("window")

const UpdateAnnouncement = ({ navigation, route }) => {

  const updateData = route?.params?.DetailData
  console.log('>>>>>>>>>>>>',updateData)
  const isFocused = useIsFocused()
  const { control, handleSubmit, setValue } = useForm();
  const Details = useSelector(state => state.userDataReducer.userAccountDetails);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('startTime');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false)
  const [errorModalText, setErrorModalText] = useState('')
  const [update, setUpdate] = useState(true)
  const [update1, setUpdate1] = useState(true)

  const [image, setImage] = useState();


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

  const ReadAnnouncement = async (formData) => {
   

    setLoading(true);
    try {
      let obj = {
        announcementID: updateData?.announcementID,
        subject: formData?.subject,
        description: formData?.description,
        
      };
      const { message } = await apiCall.ReadAnnouncement(obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        navigation.navigate('amenities');
      }, 3000);
    } catch (error) {
      setAlertType('e');
      setErrorModalText(error);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };


  const setDefaultData = () => {
    try {
      setValue('Subject', updateData?.subject)
      setValue('description', updateData?.description)
    } catch (error) {
      console.log('file: index.js:148 => setDefaultData => error:', error)
    }
  }

  useEffect(() => {
    setDefaultData()
  }, [isFocused]);

//   const uploadImage = async () => {
//     try {
//       ImageCropPicker.openPicker({
//         compressImageQuality: 0.7,
//         cropping: true,
//       }).then(async file => {
//         let filePath = file.path.split('/')
//         const formData = new FormData()
//         formData.append('file', {
//           uri: file.path,
//           type: file.mime,
//           name: filePath[filePath.length - 1]
//         })
//         const { data } = await apiCall.uploadAmenityImage(formData)
//         setImage(data)
//       });
//     } catch (err) {
//       console.warn(err);
//     }
//   }

 

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
          title={"Update Announcement"}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
        }} >

          <View style={{ paddingHorizontal: width * 0.02 }}>

            <FilledTextField
              name={'Subject'}
              variant={'outlined'}
              placeholder="Title"
              type={'default'}
              control={control}
              rules={{
                required: "Please enter title.",
              }}
              onSubmitEditing={handleSubmit(ReadAnnouncement)}
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
              onSubmitEditing={handleSubmit(ReadAnnouncement)}
            />
           
          
           



          

           
            <View style={{ marginVertical: width * 0.07 }}>
              <PrimaryButton
                customStyle={{ padding: width * 0.032 }}
                title={'Update Now'}
                loader={loading}
                onPress={handleSubmit(ReadAnnouncement)}
              />
            </View>

          </View>

         

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default UpdateAnnouncement;
