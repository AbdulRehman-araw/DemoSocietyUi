import { TouchableOpacity, Image, View, Text, SafeAreaView, StatusBar, ScrollView, Dimensions, Platform, BackHandler, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'
import { styles } from './styles/styles'
import Header from '../../components/Header/Header'
import { Images } from '../../assets/Images'
import { apiCall } from '../../Services/apiCall';
import FilledTextField from '../../components/TextField/FilledTextField';
import { useForm } from 'react-hook-form';
import { useIsFocused } from '@react-navigation/native';
import DropDown from '../../components/TextField/DropDown';
import CustomModal from '../../components/Modal/CustomModal';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import { getFormattedDate, getFormattedTime } from '../../utils/helperFunction';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import PrimaryButton from '../../components/Button/PrimaryButton';
import ImageCropPicker from 'react-native-image-crop-picker';
import { baseUrl } from '../../../axios';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox'
import CustomText from '../../components/CustomText'
import { fontsFamily } from '../../assets/Fonts'
import { LayoutAnimation } from 'react-native'
import { UIManager } from 'react-native'



const { width } = Dimensions.get("window")

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default function UpdateCafeteria({ navigation, route }) {


    const item = route?.params?.data

    console.log('updateData1', item);

    const { control, handleSubmit, setValue, clearErrors } = useForm();
    const isFocused = useIsFocused()
    const [loader, setLoader] = useState(false);
    const [image, setImage] = useState();
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [dayTime, setDayTime] = useState('');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

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

    // *For Handle Open Accordion
    const handleSelectDays = (day) => {
        try {
            const currentIndex = selectedDays.findIndex((e) => e.DAY === day);
            const newDays = [...selectedDays];

            if (currentIndex === -1) {
                let obj = {
                    DAY: day,
                    STARTTIME: '',
                    ENDTIME: ''
                }
                newDays.push(obj);
            } else {
                newDays.splice(currentIndex, 1);
            }

            setSelectedDays(newDays);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        } catch (error) {
            console.log('file: index.js:50 => handleOpenAccordion => error:', error)
        }
    }

    const uploadImage = async () => {
        try {
            ImageCropPicker.openPicker({
                compressImageQuality: 0.7,
                cropping: true,
            }).then(async file => {
                let filePath = file.path.split('/')
                const formData = new FormData()
                formData.append('file', {
                    uri: file.path,
                    type: file.mime,
                    name: filePath[filePath.length - 1]
                })
                const { data } = await apiCall.uploadCafeteriaImage(formData)
                setImage(data)
                console.log(image);
            });
        } catch (err) {
            console.warn(err);
        }
    }

  


    const editCafeteria = async (formData) => {
        setLoader(true);
        try {
          if (image) {
            if (selectedDays.length > 0) {
              let obj = {
                cafeteriaID: item.cafeteriaID,
                name: formData.name,
                contactNo: formData.contactNo,
                altContactNo: formData.altContactNo,
                menuLink: image,
                timings: selectedDays
              }
              await apiCall.editCafeteria(obj)
              goBack()
            } else {
              alert('Please select at least one day for timings.');
            }
          } else {
            alert('Please upload an image.');
          }
        } catch (error) {
          console.log('file: addContact.js:77 => addEmergencyContact => error:', error)
        } finally {
          setLoader(false)
        }
      }

    const handleDayTime = (e) => {
        try {
            const duplicate = [...selectedDays]
            const day = dayTime.split('-')
            const updateDayTime = duplicate.find(d => d.DAY === day[0])
            if (day[1] === 'start') {
                updateDayTime.STARTTIME = e
            } else {
                updateDayTime.ENDTIME = e
            }
            setSelectedDays(duplicate)
        } catch (error) {
            console.log('file: addContact.js:118 => handleDayTime => error:', error)
        }
    }



    const setDefaultData = () => {
        try {
            setValue('name', item?.cafeteriaName)
            setValue('altContactNo', item?.altContactNo)
            setValue('contactNo', item?.contactNo)
            setValue('salary', item.basicSalary.toString())
            const moduleArray = item?.accessModule?.map(element => {
                const newObj = { ...element };
                delete newObj.moduleName;
                return newObj;
            });

            setSelectedServices(moduleArray)
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

            <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
                <Header
                    onBack={goBack}
                    title={"Update Cafeteria"}
                />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
                }} >

                    <View style={{ paddingHorizontal: width * 0.038 }}>
                        <FilledTextField
                            name={'name'}
                            placeholder="Name"
                            type={'default'}
                            control={control}
                            rules={{
                                required: "Please enter name.",
                            }}
                            onSubmitEditing={handleSubmit(editCafeteria)}
                        />
                        <FilledTextField
                            name={'contactNo'}
                            placeholder="Contact No"
                            type={'default'}
                            control={control}
                            rules={{
                                required: "Please enter contact no.",
                            }}
                            onSubmitEditing={handleSubmit(editCafeteria)}
                        /> 
                        <FilledTextField
                            name={'altContactNo'}
                            placeholder="Alt Contact No"
                            type={'default'}
                            control={control}
                            onSubmitEditing={handleSubmit(editCafeteria)}
                        />
                        <TimeDateBtn
                            variant={'primary'}
                            title={'Upload Image'}
                            prefixIcon={true}
                            showRightIcon={true}
                            rightIconImg={Images.camera}
                            setOpen={() => uploadImage()}
                        />
                        {image &&
                            <View>
                                <Image source={{ uri: baseUrl + image }} resizeMode="contain" style={{ width: 'auto', height: width * 0.6 }} />
                            </View>
                        }
                        <CustomText
                            fontWeight={fontsFamily.bold}
                            style={{ color: colors.black, fontSize: width * 0.04 }}>
                            Select Opening Days and Hours
                        </CustomText>
                        {days?.map((day, index) => (
                            <View key={index}>
                                <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: width * 0.015 }} onPress={() => handleSelectDays(day)}>
                                    <CheckBox
                                        onCheckColor={colors.primary}
                                        tintColors={{ true: colors.primary, false: colors.black }}
                                        style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                                        disabled={false}
                                        value={selectedDays.findIndex((e) => e.DAY === day) !== -1}
                                        onChange={() => handleSelectDays(day)}
                                    />
                                    <CustomText
                                        fontWeight={fontsFamily.semiBold}
                                        style={{ color: colors.black, fontSize: width * 0.035, marginVertical: width * 0.03 }}>
                                        {day}
                                    </CustomText>
                                </TouchableOpacity>
                                {selectedDays.findIndex((e) => e.DAY === day) !== -1 &&
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: "wrap" }}>
                                        <View style={{ width: '47%' }}>
                                            <TimeDateBtn
                                                variant={'primary'}
                                                icon={Images.time3x}
                                                title={selectedDays[selectedDays?.findIndex((e) => e.DAY === day)]?.STARTTIME !== '' ? getFormattedTime(selectedDays[selectedDays?.findIndex((e) => e.DAY === day)]?.STARTTIME) : 'Start Time'}
                                                prefixIcon={true}
                                                setOpen={() => { setOpen(true); setDayTime(day + '-start'); setTime(selectedDays[selectedDays.findIndex((e) => e.DAY === day)]?.STARTTIME) }}
                                            />
                                        </View>
                                        <View style={{ width: '47%' }}>
                                            <TimeDateBtn
                                                variant={'primary'}
                                                icon={Images.time3x}
                                                title={selectedDays[selectedDays?.findIndex((e) => e.DAY === day)]?.ENDTIME !== '' ? getFormattedTime(selectedDays[selectedDays.findIndex((e) => e.DAY === day)]?.ENDTIME) : 'End Time'}
                                                prefixIcon={true}
                                                setOpen={() => { setOpen(true); setDayTime(day + '-end'); setTime(selectedDays[selectedDays.findIndex((e) => e.DAY === day)]?.ENDTIME) }}
                                            />
                                        </View>
                                    </View>
                                }
                            </View>
                        ))}

                        <View style={{ marginTop: width * 0.03, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: "wrap" }}>
                           
                        <View style={{ width: '47%' }}>
                                <PrimaryButton
                                    outlined
                                    customStyle={{ padding: width * 0.032, marginTop: 15, borderColor: colors.primary }}
                                    textStyle={{ color: colors.primary }}
                                    title={'Cancel'}
                                    onPress={() => goBack()}
                                />
                            </View>
                            <View style={{ width: '47%' }}>
                                <PrimaryButton
                                    customStyle={{ padding: width * 0.032 }}
                                    title={'Update'}
                                    loader={loader}
                                    onPress={handleSubmit(editCafeteria)}
                                />
                            </View>
                           
                        </View>

                    </View>

                    <DateTimePicker
                        setDate={(e) => handleDayTime(e)}
                        closeModal={() => setOpen(false)}
                        date={time ? time : new Date()}
                        modalVisible={open}
                        mode={'time'}
                    />

                </ScrollView>


            </View>
        </SafeAreaView>
    )
}