import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Text,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import Header from '../../components/Header/Header';
import {Images} from '../../assets/Images';
import {Platform} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {apiCall} from '../../Services/apiCall';
import {fontsFamily} from '../../assets/Fonts';
import ListCard from './ListCard';
import DropDown from '../../components/TextField/DropDown';
import {useForm} from 'react-hook-form';
import CustomModal from '../../components/Modal/CustomModal';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import {getFormattedDate, getFormattedTime} from '../../utils/helperFunction';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import PrimaryButton from '../../components/Button/PrimaryButton';
import CustomText from '../../components/CustomText';
import CustomSearchModal from '../../components/Modal/CustomSearchModal';

const {width, height} = Dimensions.get('screen');

const EmployeeList = ({navigation}) => {
  const [allEmployee, setAllEmployee] = useState([]);
  const [loader, setLoader] = useState(false);
  const {control, handleSubmit, setValue, clearErrors, resetField} = useForm();
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [getID, setGetID] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('date');

  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const goBack = () => {
    navigation.goBack();
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

  const To = JSON.stringify(startTime);
  const From = JSON.stringify(endTime);

  const getAllEmployee = async () => {
    if (!getID) {
      setErrorMessage('Please select an Employee first.');
    } else {
      setLoader(true);
      try {
        const formattedStartTime = startTime.toISOString();
        const formattedEndTime = endTime.toISOString();
        const {data} = await apiCall.GetPayRoll(
          getID,
          formattedStartTime,
          formattedEndTime,
        );
        // console.log('file: index.js:44 => EmployeeLedger => data:', data)
        setAllEmployee(data);
        navigation.navigate('EmployeeSalary', {data});
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
  };

  // console.log('emoployee===>', allEmployee)

  const jsonData = allEmployee;

  // console.log(allEmployee);

  const transformedData = {};

  jsonData?.forEach(entry => {
    const employeeName = entry.employeeName;
    const date = entry.date;

    if (!transformedData[employeeName]) {
      transformedData[employeeName] = [];
    }

    const details = {
      date: date,
      payID: entry.payID,
      description: entry.description,
      basicSalary: entry.basicSalary,
      noofDays: entry.noofDays,
      grossSalary: entry.grossSalary,
      totalPayableSalary: entry.totalPayableSalary,
      paymentType: entry.paymentType,
      bankAccount: entry.bankAccount,
      addOn: entry.addOn,
      addBy: entry.addBy,
      settlements: entry.settlements,
      employeeName: entry.employeeName,
    };

    transformedData[employeeName].push(details);
  });

  const resultArray = Object.keys(transformedData).map(employeeName => ({
    employeeName,
    details: transformedData[employeeName],
  }));

  const getAllEmployeeData = async searchKey => {
    try {
      const search = searchKey ? searchKey : '';
      const {data} = await apiCall.getAllEmployee(search);
      const employeeData = [];
      data?.forEach(element => {
        let obj = {
          ...element,
          title: element?.name,
          employeeID: element?.employeeID,
        };
        employeeData.push(obj);
      });

      setEmployees(employeeData);
      // console.log('===============>',employees);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  useEffect(() => {
    getAllEmployeeData();
  }, [isFocused]);

  console.log('...........', employees);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header onBack={goBack} title={'Employee Ledger'} />
        <View
          style={{
            paddingHorizontal: width * 0.01,
            flex: 1,
            marginTop: 10,
            paddingBottom: height * 0.1,
          }}>
          <DropDown
            name={'employee'}
            title="Select Employee"
            type={'default'}
            variant={'outlined'}
            control={control}
            rules={{
              required: 'Please select employee',
            }}
            img={false}
            onPress={() => {
              setShowModal(true);
            }}
          />

          {errorMessage ? (
            <CustomText style={{color: colors.danger}}>
              {errorMessage}
            </CustomText>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <View style={{width: '47%', height: width * 0.2}}>
              <TimeDateBtn
                variant={'light'}
                icon={Images.calendar}
                title={
                  startTime == new Date()
                    ? 'Start Time'
                    : getFormattedDate(startTime)
                }
                prefixIcon={true}
                setOpen={() => [setOpen(true), setMode('startTime')]}
              />
            </View>
            <View style={{width: '47%'}}>
              <TimeDateBtn
                variant={'light'}
                icon={Images.calendar}
                title={
                  endTime == new Date() ? 'End Time' : getFormattedDate(endTime)
                }
                prefixIcon={true}
                setOpen={() => [setOpen(true), setMode('endTime')]}
              />
            </View>
          </View>

          <View style={{marginVertical: width * 0.07}}>
            <PrimaryButton
              customStyle={{padding: width * 0.032}}
              title={'Next'}
              onPress={() => getAllEmployee()}
            />
          </View>

          <DateTimePicker
            setDate={
              mode == 'startTime'
                ? e => {
                    setStartTime(e);
                  }
                : e => {
                    setEndTime(e);
                  }
            }
            closeModal={() => setOpen(false)}
            date={mode == 'startTime' ? startTime : endTime}
            modalVisible={open}
            mode={'date'}
          />

          <CustomSearchModal
            search="Search employee..."
            data={employees.length <= 0 ? [] : employees}
            modalVisible={showModal}
            closeModal={() => setShowModal(false)}
            getvalue={e => {
              const employeeID = employees.find(v => v.title === e)?.id;
              setGetID(employeeID);
              setValue('employee', e);
              clearErrors('employee');
            }}
          />

          {/* <FlatList
            data={resultArray}
            renderItem={({ item }) => <ListCard data={item} />}
            keyExtractor={item => item.id}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmployeeList;
