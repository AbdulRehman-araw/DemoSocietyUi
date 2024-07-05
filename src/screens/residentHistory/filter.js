import { View, Text, SafeAreaView, StatusBar, Dimensions } from 'react-native'
import React, { useState, useRef } from 'react'
import FilledTextField from '../../components/TextField/FilledTextField'
import { colors } from '../../styles/colors'
import Header from '../../components/Header/Header'
import { Images } from '../../assets/Images'
import { useForm } from 'react-hook-form'
import CustomText from '../../components/CustomText'
import TimeDateBtn from '../../components/Button/TimeDateBtn'
import DateTimePicker from '../../components/Modal/DateTimePicker'
import { getFormattedDate, getFormattedTime } from '../../utils/helperFunction'
import PrimaryButton from '../../components/Button/PrimaryButton'
import { styles } from './styles/styles'
import ActionSheet from 'react-native-actions-sheet';






export default function filter({ navigation, route }) {


    const { width, height } = Dimensions.get('screen');
    const [showModal, setShowModal] = useState(false)
    const [employees, setEmployees] = useState([]);
    const [getID, setGetID] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('date');
    const [loader, setLoader] = useState(false)
    const actionSheetRef = useRef(null)

    const { control } = useForm();


    const goBack = () => {
        navigation.goBack();
    };

    const handleBack = () => {
        goBack();
        return true;
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar
                translucent={false}
                backgroundColor={colors.white}
                barStyle="dark-content"
            />

            <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>


            <View style={{}}>
                    <PrimaryButton customStyle={{ padding: width * 0.030 }}
                        title={'Hello'}
                        onPress={() => actionSheetRef.current.show()} />
                </View>

              <ActionSheet
                    defaultOverlayOpacity={0.9}
                    ref={actionSheetRef}
                    containerStyle={{
                        borderTopLeftRadius: 35,
                        borderTopRightRadius: 35,
                        padding: 6,
                        // height: 300,
                        width: '100%'
                    }}
                    indicatorStyle={{
                        width: 0,

                    }}
                    gestureEnabled={true}>
                    <View style={{}}>

                    <FilledTextField
                    name={'Search'}
                    placeholder=" Search"
                    type={'default'}
                    control={control}
                    // justChange={(e) => getAllEmployee(e)}
                    variant="outlined"
                    showRightIcon={true}
                    rightIconImg={Images.search}
                    rightIconStyle={{ flex: 0.4 }}
                    containerStyle={{ borderRadius: 12, marginTop: width * 0.1, backgroundColor: colors.white }}
                />



                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: "wrap" }}>
                    <View style={{ width: '47%', height: width * 0.2 }}>
                        <CustomText style={{ paddingLeft: 5 }}>Start Time</CustomText>
                        <TimeDateBtn
                            variant={'light'}
                            icon={Images.calendar}
                            title={startTime == new Date() ? 'Start Date' : getFormattedDate(startDate)}
                            prefixIcon={true}
                            setOpen={() => [setOpen(true), setMode('startDate')]}
                        />
                    </View>
                    <View style={{ width: '47%' }}>
                        <CustomText style={{ paddingLeft: 5 }}>End Time</CustomText>
                        <TimeDateBtn
                            variant={'light'}
                            icon={Images.calendar}
                            title={endTime == new Date() ? 'End Date' : getFormattedDate(endDate)}
                            prefixIcon={true}
                            setOpen={() => [setOpen(true), setMode('endDate')]}
                        />
                    </View>
                </View>

                <PrimaryButton

                    customStyle={styles.btnStyle} title={"Find"} />

              

                <DateTimePicker
                    setDate={mode == 'startTime' ? (e) => {
                        setStartDate(e)
                    } : (e) => {
                        setEndDate(e)
                    }}
                    closeModal={() => setOpen(false)}
                    date={mode == 'startDate' ? startDate : endDate}
                    modalVisible={open}
                    mode={mode == 'startDate' ? 'date' : 'time'}
                />

                    </View>
                </ActionSheet>




            </View>
        </SafeAreaView>
    )
}