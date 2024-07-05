import {
    Dimensions,
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    Modal,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import React, { useRef, useState } from 'react';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import { colors } from '../../styles/colors';
import { Images } from '../../assets/Images';
import { fontsFamily } from '../../assets/Fonts';
import { text } from '../../res/strings';
//   import { styles } from './styles/styles';
import PrimaryButton from '../../components/Button/PrimaryButton';
import CommunityModal from '../../components/Modal/Community';
import ActionSheet from 'react-native-actions-sheet';
import CanlerderModal from '../../components/Modal/Calendar';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import DatePicker from 'react-native-date-picker';
import BookingSuccessful from '../FacilityBookingSuccessful';
import { apiCall } from '../../Services/apiCall';
import SecondaryButton from '../../components/Button/SecondaryButton';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useSelector } from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';
import { baseUrl } from '../../../axios';
import RoundButton from '../../components/Button/RoundButton';

const { width, height } = Dimensions.get('window');

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const VisitorDetailView = ({ img, label, text }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
            <Image source={img} style={{ width: 26, height: 26, resizeMode: 'contain', marginRight: 12, tintColor: colors.black }} />
            <View>
                <CustomText
                    fontWeight={fontsFamily.regular}
                    style={{ fontSize: 12, color: colors.dark, }}>
                    {label}
                </CustomText>
                <View style={{ marginVertical: 4 }} />
                <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{ fontSize: 16, color: colors.dark }}>
                    {text}
                </CustomText>
            </View>
        </View>
    )
}

const AmenityDetailScreen = ({ navigation, route }) => {
    const {
        serviceId,
        bookingID,
        endTime,
        eventDate,
        organizer,
        startTime,
        status,
        totalPersons,
        venueID,
        venueName,
        image,
        request,
        managerName,
    } = route?.params?.data;
    const updateData = route?.params?.data?.detail;
    const Permission = route?.params?.data?.permission;
    const servicePermission = useSelector(
        state => state.userDataReducer.servicePermission,
    );
    const facilityPermission = servicePermission?.filter(
        item => item?.name === 'Facility Booking',
    );
    const [approvedLoader, setApprovedLoader] = useState(false);
    const [rejectLoader, setRejectLoader] = useState(false);
    const [permission, setPermission] = useState({});
    const [remarks, setRemarks] = useState('');

    const [approved, setApproved] = useState(false);
    const [rejected, setRejected] = useState(false);

    const [remarksError, setRemarksError] = useState('');

    const [alertType, setAlertType] = useState('s');
    const [errorModal, setErrorModal] = useState(false);
    const [errorModalText, setErrorModalText] = useState('');


    const [approveModal, setApproveModal] = useState(false);

    const goBack = () => {
        navigation.goBack();
    };

    const approvedBookingStatus = async () => {
        if (remarks.trim() === '') {
            setRemarksError('Remarks are required'); // Set the error message
            return; // Prevent further action
        }

        setApprovedLoader(true);
        try {
            let { message } = await apiCall.changeBookingStatus(
                bookingID,
                true,
                remarks,
            );
            setApproved(true);
            setAlertType('s');
            setErrorModalText(message);
            setErrorModal(true);
            setTimeout(() => {
                setErrorModal(false);
                goBack();
            }, 3000);
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setApprovedLoader(false);
            setApproveModal(false)
        }
    };

    const rejectBookingStatus = async () => {
        if (remarks.trim() === '') {
            setRemarksError('Remarks are required'); // Set the error message
            return; // Prevent further action
        }

        setRejectLoader(true);
        try {
            let { message } = await apiCall.changeBookingStatus(
                bookingID,
                false,
                remarks,
            );
            setRejected(true); // Update the state to indicate rejection
            // Additional actions or navigation if needed
            setAlertType('s');
            setErrorModalText(message);
            setErrorModal(true);
            setTimeout(() => {
                setErrorModal(false);
                goBack();
            }, 3000);
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setRejectLoader(true);
        }
    };


    const handleBack = () => {
        goBack();
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBack);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBack);
        };
    }, []);

    // useEffect(() => {
    //   BackHandler.addEventListener("hardwareBackPress", goBack)

    //   return () => {
    //     BackHandler.removeEventListener("hardwareBackPress", goBack)
    //   }
    // }, [])

    useEffect(() => {
        const find = servicePermission?.find(e => e.id == serviceId);
        setPermission(find);
    }, [servicePermission]);

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>

                <View style={{ flex: 0.5, marginTop: Platform.OS == "ios" ? 40 : 0 }}>
                    <ImageBackground
                        source={{ uri: baseUrl + updateData?.image }}
                        resizeMode="cover"
                        style={{
                            width: width,
                            height: width * 0.97,
                            paddingHorizontal: width * 0.038,
                        }}>
                        <Header
                            onBack={goBack}
                            title={venueName}
                            showRightBtn={true}
                            textStyle={{ color: colors.white }}
                        />
                    </ImageBackground>
                </View>

                <View style={styles.viewCard}>
                    <ImageBackground source={Images.darkBG} style={{ flex: 1, paddingHorizontal: width * 0.07, paddingTop: width * 0.07, }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 80 }}>
                            <View>

                                <View style={{ marginBottom: 20 }}>
                                    <CustomText children={'Booking Details'} fontWeight={fontsFamily.bold} style={{ fontSize: 18, color: colors.black }} />
                                </View>
                                <VisitorDetailView label={'Title'} text={updateData?.title} img={Images.userIcon} />
                                <VisitorDetailView label={'Description'} text={updateData?.details} img={Images.userIcon} />
                                <VisitorDetailView label={'Location'} text={updateData?.location} img={Images.location} />
                                <VisitorDetailView label={'Capacity'} text={updateData?.minPersons.toString() + '  -  ' + updateData?.maxPersons.toString() + ' Persons'} img={Images.noOfVisitors} />
                                <VisitorDetailView label={'Manager'} text={updateData?.managerName} img={Images.userIcon} />
                                <VisitorDetailView label={'Timing'} text={moment(updateData?.startTime).format('hh:mm A') + '  -  ' + moment(updateData?.endTime).format('hh:mm A')} img={Images.clock_outlined} />
                                <VisitorDetailView label={'Contact Number'} text={updateData?.contactNo} img={Images.newPhone} />

                                <AlertModal
                                    visible={errorModal}
                                    close={setErrorModal}
                                    text={errorModalText}
                                    type={alertType}
                                />
                            </View>

                            {/* {facilityPermission[0]?.canEdit && !approved && !rejected && (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-evenly',
                                        paddingBottom: width * 0.2,
                                        marginTop: 40
                                    }}>
                                    <RoundButton text={'Approve'} onPress={() => setApproveModal(true)} color={colors.success} />
                                    <RoundButton text={'Reject'} onPress={() => rejectBookingStatus()} color={colors.danger} />
                                </View>
                            )} */}
                        </ScrollView>
                    </ImageBackground>
                </View>
                <Modal animationType="slide" transparent={true} visible={approveModal}>
                    <View style={{ flex: 1, backgroundColor: colors.grayShade, justifyContent: 'center', }}>
                        <View style={{ backgroundColor: colors.white, elevation: 6, marginHorizontal: 20, padding: 10, paddingVertical: 18, borderRadius: 18 }}>
                            <CustomText children={'Are you sure?'} fontWeight={fontsFamily.bold} style={{ textAlign: 'center', fontSize: 18, color: colors.black, marginTop: 18 }} />
                            <TouchableOpacity onPress={() => setApproveModal(false)} style={{ position: 'absolute', top: 8, right: 8 }}>
                                <Image source={Images.cancelFilled} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                            <CustomText children={'Lorem ipsum dolorem non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'} fontWeight={fontsFamily.medium}
                                style={{ textAlign: 'center', fontSize: 12, color: colors.darkGray, paddingVertical: 10 }} />
                            <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => approvedBookingStatus()} style={{ marginVertical: 14, backgroundColor: colors.primary, paddingHorizontal: 8, paddingVertical: 16, width: '90%', borderRadius: 12 }}>
                                    {approvedLoader ?
                                        <View><ActivityIndicator size={'small'} color={colors.white} /></View>
                                        :
                                        <CustomText children={'Confirm'} fontWeight={fontsFamily.medium} style={{ textAlign: 'center', fontSize: 18, color: colors.white }} />}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => rejectBookingStatus()} style={{ marginVertical: 14, paddingHorizontal: 8, width: '90%', borderRadius: 12 }}>
                                    {rejectLoader ?
                                        <View><ActivityIndicator size={'small'} color={colors.primary} /></View>
                                        :
                                        <CustomText children={'Cancel'} fontWeight={fontsFamily.medium} style={{ textAlign: 'center', fontSize: 18, color: colors.black }} />}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </>
    );
};

export default AmenityDetailScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.lightBackground,
    },
    cardWrapper: {
        backgroundColor: colors.white,
        padding: width * 0.03,
    },
    card: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    divider: {
        borderBottomColor: colors.gray,
        borderBottomWidth: 1,
        borderStyle: "dashed",
        marginVertical: width * 0.03,
    },
    viewCard: {
        width: "100%",
        flex: 1,
        justifyContent: 'space-between',
        // paddingTop: width * 0.07,
        // paddingHorizontal: width * 0.07,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.white,
        borderColor: colors.lightoffwhite,
    },
});
