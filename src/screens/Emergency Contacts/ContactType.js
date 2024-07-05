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
import AlertModal from '../../components/Modal/AlertModal'
import WarningModal from '../../components/Modal/WarningModal'

const { width } = Dimensions.get("window")

// Enable layout animation for Android
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const ContactType = ({ navigation }) => {

    const foucsed = useIsFocused()
    const { control, handleSubmit, setValue, clearErrors } = useForm();

    const [loader, setLoader] = useState(false);
    const [contactTypes, setContactTypes] = useState([]);
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState('');
    const [showModal, setShowModal] = useState(false)

    const [alertType, setAlertType] = useState('s');
    const [errorModal, setErrorModal] = useState(false)
    const [errorModalText, setErrorModalText] = useState('')
    const [contacts, setContacts] = useState([]);


    const [errorModal1, setErrorModal1] = useState(false)
    const [alertWarning, setAlertWarning] = useState('w');

    const [loading, setLoading] = useState(false);


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




    const AddContactType = async (formData) => {
        setLoader(true)
        try {

            let obj = {
                contactType: formData.contactType,

            }
            const { message } = await apiCall.AddContactType(obj)
            setAlertType('s')
            setErrorModalText(message)
            setErrorModal(true)
            setTimeout(() => {
                setErrorModal(false)
                goBack()
            }, 3000);
        } catch (error) {
            console.log('file: addContactType.js:77 => addContactType => error:', error)
        } finally {
            setLoader(false)
        }
    }



    const getContactTypes = async () => {
        try {
            const { data } = await apiCall.getContactTypes()
            setContacts(data)
        } catch (error) {
            console.log('file: addContact.js:57 => getContactTypes => error:', error)
        }
    }

    console.log(contacts)

    const DeleteContactType = async (id) => {
        console.log(id)
        setErrorModal(false)
        setLoading(true)
        try {
            const { message } = await apiCall.DeleteContactType(id)
            setAlertType('s')
            setErrorModalText(message)
            setErrorModal(true)
            setTimeout(() => {
                setErrorModal(false)
                goBack()
            }, 3000);
        } catch (error) {
            console.log(error);
            console.log('file: createEvent.js:53 => createEvent => error:', error)
        } finally {
            setLoading(false)
        }
    }

    const AlertFunction = () => {
        setAlertWarning('w')
        setErrorModalText('Are you sure you want to delete this contact type?')
        setErrorModal1(true)
    }


    useEffect(() => {
        AddContactType()
        getContactTypes()
    }, [foucsed]);

    return (
        <SafeAreaView style={styles.root}>
            <StatusBar translucent={false} backgroundColor={colors.white} barStyle="dark-content" />

            <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>
                <Header
                    onBack={goBack}
                    title={"Add Contact Type"}

                />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
                }} >

                    <View style={{ paddingHorizontal: width * 0.038 }}>

                        <FilledTextField
                            name={'contactType'}
                            placeholder="Contact Type"
                            type={'default'}
                            control={control}
                            rules={{
                                required: "Please enter contact name.",
                            }}
                            onSubmitEditing={handleSubmit(AddContactType)}
                        />



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
                                    title={'Create'}
                                    loader={loader}
                                    onPress={handleSubmit(AddContactType)}
                                />
                            </View>



                        </View>

                        <View style={{ marginTop: width * 0.1 }}>
                            {contacts.map((item) => (
                                <TouchableOpacity onPress={() => AlertFunction()} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: width * 0.02, borderWidth: 1, marginVertical: width * 0.02, borderColor: colors.primary, borderRadius: 10 }} key={item.id}>


                                    <CustomText
                                        fontWeight={fontsFamily.semiBold}
                                        style={{
                                            color: colors.primary,
                                            fontSize: width * 0.040,
                                        }}>
                                        {item.contactType}
                                    </CustomText>


                                    <Image
                                        resizeMode='contain'
                                        style={{ tintColor: colors.danger, width: width * 0.05, height: width * 0.05 }}
                                        source={Images.icondelete}
                                    />


                                    <WarningModal
                                        visible={errorModal1}
                                        close={setErrorModal}
                                        text={errorModalText}
                                        type={alertWarning}
                                        button={true}
                                        warning={() => [DeleteContactType(item.id), setErrorModal1(false)]}
                                        cancel={() => setErrorModal1(false)}
                                    />



                                </TouchableOpacity> 
                            ))}
                        </View>


                    </View>



                    <CustomModal
                        data={contactTypes.length <= 0 ? [] : contactTypes.map(({ contactType }) => ({ title: contactType }))}
                        modalVisible={showModal}
                        closeModal={() => setShowModal(false)}
                        getvalue={(e) => {
                            setValue('contactType', e)
                            clearErrors('contactType')
                        }}
                    />



                    <AlertModal
                        visible={errorModal}
                        close={setErrorModal}
                        text={errorModalText}
                        type={alertType}
                    />




                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ContactType;
