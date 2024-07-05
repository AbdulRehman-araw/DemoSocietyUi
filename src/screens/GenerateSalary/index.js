import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
  BackHandler,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {colors} from '../../styles/colors';
import {styles} from './styles/styles';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header/Header';
import {fontsFamily} from '../../assets/Fonts';
import FilledTextField from '../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {emailRegex, getFormattedDate} from '../../utils/helperFunction';
import {apiCall} from '../../Services/apiCall';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AlertModal from '../../components/Modal/AlertModal';
import DateTimePicker from '../../components/Modal/DateTimePicker';
import TimeDateBtn from '../../components/Button/TimeDateBtn';
import SetFieldTextField from '../../components/TextField/SetFieldTextField';
import DropDown from '../../components/TextField/DropDown';
import CustomModal from '../../components/Modal/CustomModal';
import {Images} from '../../assets/Images';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {DataTable} from 'react-native-paper';
import CustomSearchModal from '../../components/Modal/CustomSearchModal';

const {width, height} = Dimensions.get('window');

const GenerateSalary = ({navigation}) => {
  const {control, handleSubmit, setValue, clearErrors, resetField} = useForm();

  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState();
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState();
  const [showPaymentStatusModal, setShowPaymentStatusModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showAdjustment, setShowAdjustment] = useState(false);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('date');
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const [firstStepData, setFirstStepData] = useState();
  const [secondStepData, setSecondStepData] = useState();
  const [products, setProducts] = useState([]);
  const [amount, setamount] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [getSalary, setGetSalary] = useState(null);
  console.log(
    '🚀 ~ file: index.js:75 ~ GenerateSalary ~ getSalary:',
    getSalary,
  );
  const [days, setDays] = useState('');

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

  const handleNextStep = () => setStep(prev => prev + 1);
  const handlePrevStep = () => setStep(prev => prev - 1);

  const submitFirstStep = async formData => {
    try {
      const employeeID = employees.find(e => e.title === formData.employee)?.id;
      const employeeSalary = employees.find(
        e => e.title === formData.employee,
      )?.basicSalary;
      let obj = {
        employeeID: employeeID,
        basicSalary: employeeSalary,
        description: 'Testing',
        noofDays: parseInt(formData?.noofDays),
        grossSalary: Math.round((employeeSalary / 30) * formData?.noofDays),
        date: date,
      };

      setFirstStepData(obj);
      handleNextStep();
    } catch (error) {
      console.log(
        'file: Generate Salary.js:111 => submitFirstStep => error:',
        error,
      );
    }
  };

  const createProduct = formData => {
    try {
      let obj = {
        date: date,
        description: formData.description,
        settlementType: formData?.Adjustment,
        amount:
          formData?.Adjustment === 'Deduction'
            ? parseInt(formData.amount)
            : parseInt(formData.amount),
      };
      setProducts(prev => [...prev, obj]);
      resetField('item');
      resetField('quantity');
      resetField('amount');
      let totalAmount = amount;
      if (formData?.Adjustment === 'Deduction') {
        totalAmount -= parseInt(formData.amount);
      } else {
        totalAmount += parseInt(formData.amount);
      }
      setamount(totalAmount);
    } catch (error) {
      console.log(
        'file: GenerateSalary.js:130 => createProduct => error:',
        error,
      );
    }
  };

  const submitSecondStep = async () => {
    try {
      let obj = {
        settlements: products,
        totalPayableSalary: amount + firstStepData.grossSalary,
      };
      setSecondStepData(obj);
      // setValue('amount', amount.toString())
      handleNextStep();
    } catch (error) {
      console.log(
        'file: GenerateSalary.js:149 => submitSecondStep => error:',
        error,
      );
    }
  };

  const AddPayRoll = async formData => {
    setLoading(true);
    try {
      const paymentTypeId = paymentTypes.find(
        e => e.title === formData.paymentType,
      )?.typeID;
      const paymentStatusId = paymentStatus.find(
        e => e.title === formData.paymentStatus,
      )?.id;
      const bankAccountId = bankAccounts.find(
        e => e.title === formData.bankAccount,
      )?.bankID;

      let obj = {
        ...firstStepData,
        ...secondStepData,
        paymentTypeID: paymentTypeId,
        bankAccID: bankAccountId,
      };
      if (bankAccountId) {
        obj.bankAccID = bankAccountId;
      }
      console.log(obj);
      const {message} = await apiCall.AddPayRoll(obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log(error);
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

  const getAllEmployee = async searchKey => {
    try {
      const search = searchKey ? searchKey : '';
      const {data} = await apiCall.getAllEmployee(search);
      const employeeData = [];
      data?.forEach(element => {
        let obj = {
          ...element,
          title: element?.name,
          salary: element?.basicSalary,
        };
        employeeData.push(obj);
      });
      setEmployees(employeeData);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  const AdjustmentType = [{title: 'Addition'}, {title: 'Deduction'}];

  const getPaymentTypes = async () => {
    try {
      const {data} = await apiCall.getPaymentTypes();
      const paymentTypeData = [];
      data?.forEach(element => {
        let obj = {
          ...element,
          title: element?.typeName,
        };
        paymentTypeData.push(obj);
      });
      setPaymentTypes(paymentTypeData);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  const getBanks = async () => {
    try {
      const {data} = await apiCall.getBanks();
      const bankData = [];
      data?.forEach(element => {
        let obj = {
          ...element,
          title: element?.accountTitle,
        };
        bankData.push(obj);
      });
      setBankAccounts(bankData);
    } catch (error) {
      console.log('file: CreatePurchase.js:215 => getBanks => error:', error);
    }
  };

  const getPaymentStatus = async () => {
    try {
      const {data} = await apiCall.getPaymentStatus();
      const paymentData = [];
      data?.forEach(element => {
        let obj = {
          id: element?.id,
          title: element?.status,
        };
        paymentData.push(obj);
      });
      setPaymentStatus(paymentData);
    } catch (error) {
      console.log(
        'file: CreatePurchase.js:232 => getPaymentStatus => error:',
        error,
      );
    }
  };

  const setDefaultData = () => {
    try {
      setValue('salary', getSalary.toString());
      setValue('noofDays', '30');
      const moduleArray = employees?.accessModule?.map(element => {
        const newObj = {...element};
        delete newObj.moduleName;
        return newObj;
      });
      setSelectedServices(moduleArray);
    } catch (error) {
      console.log('file: index.js:148 => setDefaultData => error:', error);
    }
  };

  const justChange = text => {
    setDays(text);
  };

  useEffect(() => {
    getAllEmployee();
    setDefaultData();
    justChange();
    getPaymentTypes();
    getBanks();
    getPaymentStatus();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header
          onBack={() => (step === 0 ? goBack() : handlePrevStep())}
          title={'Generate Salary'}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: width * 0.03,
              marginVertical: height * 0.01,
            }}>
            {[...Array(3)].map((item, index) => (
              <View
                key={index}
                style={{
                  width: width * 0.12,
                  backgroundColor:
                    index === step ? colors.primary : colors.gray,
                  borderRadius: 4,
                  height: width * 0.015,
                  marginVertical: height * 0.01,
                }}
              />
            ))}
          </View>

          <View style={{paddingHorizontal: width * 0.02}}>
            {step === 0 && (
              <Fragment>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: width * 0.04,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.045}}>
                    Employee Salary Detail
                  </CustomText>
                </View>

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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}>
                  <View style={{width: '100%'}}>
                    <TimeDateBtn
                      variant={'light'}
                      title={
                        date == new Date() ? 'Date' : getFormattedDate(date)
                      }
                      prefixIcon={true}
                      setOpen={() => [setOpen(true), setMode('date')]}
                    />
                  </View>
                </View>

                <FilledTextField
                  name={'noofDays'}
                  variant={'outlined'}
                  placeholder="# of Days"
                  type={'number-pad'}
                  control={control}
                  justChange={justChange}
                  rules={{
                    required: 'Please enter no of days.',
                  }}
                  onSubmitEditing={handleSubmit(submitFirstStep)}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: width * 0.1,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.035}}>
                    Salary
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.04, color: colors.primary}}>
                    Rs {getSalary}
                  </CustomText>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: width * 0.1,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.035}}>
                    Gross Salary
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.04, color: colors.primary}}>
                    Rs{' '}
                    {days === undefined
                      ? getSalary
                      : Math.round((getSalary / 30) * days)}
                  </CustomText>
                </View>

                <View style={{marginVertical: width * 0.07}}>
                  <PrimaryButton
                    customStyle={{padding: width * 0.032}}
                    title={'Next'}
                    onPress={handleSubmit(submitFirstStep)}
                  />
                </View>
              </Fragment>
            )}

            {step === 1 && (
              <Fragment>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: width * 0.04,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.045}}>
                    Incentives/Overtime/Deductions/Settlement
                  </CustomText>
                </View>

                <FilledTextField
                  name={'description'}
                  variant={'outlined'}
                  placeholder="Description"
                  type={'default'}
                  multiline={true}
                  numberOfLines={2}
                  customInputStyle={{height: width * 0.2}}
                  control={control}
                  rules={{
                    required: 'Please enter description.',
                  }}
                  onSubmitEditing={handleSubmit(submitFirstStep)}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}>
                  <View style={{width: '100%'}}>
                    <TimeDateBtn
                      variant={'light'}
                      title={
                        date == new Date() ? 'Date' : getFormattedDate(date)
                      }
                      prefixIcon={true}
                      setOpen={() => [setOpen(true), setMode('date')]}
                    />
                  </View>
                </View>

                <DropDown
                  name={'Adjustment'}
                  title="Adjustment"
                  type={'default'}
                  variant={'outlined'}
                  control={control}
                  rules={{
                    required:
                      selectedPaymentType === 'Bank'
                        ? 'Please select bank account'
                        : 'Please select adjustment.',
                  }}
                  img={false}
                  onPress={() => {
                    setShowAdjustment(true);
                  }}
                />
                <FilledTextField
                  name={'amount'}
                  variant={'outlined'}
                  placeholder="Amount"
                  type={'number-pad'}
                  control={control}
                  rules={{
                    terequired: 'Please enr amount.',
                  }}
                  onSubmitEditing={handleSubmit(createProduct)}
                />

                <TouchableOpacity
                  onPress={handleSubmit(createProduct)}
                  style={{flex: 0.2, alignItems: 'center'}}>
                  <Image
                    source={Images.Addcircle}
                    resizeMode="contain"
                    style={{width: width * 0.08, height: width * 0.08}}
                  />
                </TouchableOpacity>

                {products.length > 0 && (
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>#</DataTable.Title>
                      <DataTable.Title>Adjustment</DataTable.Title>
                      <DataTable.Title>Total</DataTable.Title>
                    </DataTable.Header>

                    {products.map((item, index) => (
                      <DataTable.Row key={index}>
                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                        <DataTable.Cell>
                          {' '}
                          {`${item.settlementType}`}
                        </DataTable.Cell>
                        <DataTable.Cell>{item.amount}</DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                )}

                {products.length > 0 && (
                  <View style={{marginVertical: width * 0.07}}>
                    <PrimaryButton
                      customStyle={{padding: width * 0.032}}
                      title={'Next'}
                      onPress={() => submitSecondStep()}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={{alignSelf: 'flex-end'}}
                  onPress={() => submitSecondStep()}>
                  <Text style={{color: colors.primary}}>Skip</Text>
                </TouchableOpacity>
              </Fragment>
            )}

            {step === 2 && (
              <Fragment>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: width * 0.04,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.045}}>
                    Salary Detail
                  </CustomText>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: width * 0.1,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.035}}>
                    Total Salary
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.04, color: colors.primary}}>
                    Rs {amount + firstStepData.grossSalary}
                  </CustomText>
                </View>

                <DropDown
                  name={'paymentType'}
                  title="Select Payment Type"
                  type={'default'}
                  variant={'outlined'}
                  control={control}
                  rules={{
                    required: 'Please select payment type',
                  }}
                  img={false}
                  onPress={() => {
                    setShowTypeModal(true);
                  }}
                />
                {selectedPaymentType === 'Bank' && (
                  <DropDown
                    name={'bankAccount'}
                    title="Bank Account"
                    type={'default'}
                    variant={'outlined'}
                    control={control}
                    rules={{
                      required:
                        selectedPaymentType === 'Bank'
                          ? 'Please select bank account'
                          : false,
                    }}
                    img={false}
                    onPress={() => {
                      setShowBankModal(true);
                    }}
                  />
                )}

                <View style={{marginVertical: width * 0.07}}>
                  <PrimaryButton
                    customStyle={{padding: width * 0.032}}
                    title={'Submit'}
                    loading={loading}
                    onPress={handleSubmit(AddPayRoll)}
                  />
                </View>
              </Fragment>
            )}
          </View>

          <CustomSearchModal
            search="Search employee..."
            data={employees.length <= 0 ? [] : employees}
            modalVisible={showModal}
            closeModal={() => setShowModal(false)}
            getvalue={e => {
              const employeeSalary = employees.find(
                v => v.title === e,
              )?.basicSalary;
              setGetSalary(employeeSalary);
              setValue('employee', e);
              clearErrors('employee');
            }}
          />

          <CustomModal
            data={AdjustmentType.length <= 0 ? [] : AdjustmentType}
            modalVisible={showAdjustment}
            closeModal={() => setShowAdjustment(false)}
            getvalue={e => {
              setValue('Adjustment', e);
              clearErrors('Adjustment');
            }}
          />

          <CustomModal
            data={paymentTypes.length <= 0 ? [] : paymentTypes}
            modalVisible={showTypeModal}
            closeModal={() => setShowTypeModal(false)}
            getvalue={e => {
              setValue('paymentType', e);
              setSelectedPaymentType(e);
              clearErrors('paymentType');
            }}
          />
          <CustomModal
            data={paymentStatus.length <= 0 ? [] : paymentStatus}
            modalVisible={showPaymentStatusModal}
            closeModal={() => setShowPaymentStatusModal(false)}
            getvalue={e => {
              setValue('paymentStatus', e);
              setSelectedPaymentStatus(e);
              clearErrors('paymentStatus');
            }}
          />
          <CustomModal
            data={bankAccounts.length <= 0 ? [] : bankAccounts}
            modalVisible={showBankModal}
            closeModal={() => setShowBankModal(false)}
            getvalue={e => {
              setValue('bankAccount', e);
              clearErrors('bankAccount');
            }}
          />

          <DateTimePicker
            setDate={
              mode == 'date'
                ? e => {
                    setDate(e);
                  }
                : e => {
                    setInvoiceDate(e);
                  }
            }
            closeModal={() => setOpen(false)}
            date={mode == 'date' ? date : invoiceDate}
            modalVisible={open}
            mode={'date'}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default GenerateSalary;
