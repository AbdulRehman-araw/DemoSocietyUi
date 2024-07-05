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
import DropDown from '../../components/TextField/DropDown';
import CustomModal from '../../components/Modal/CustomModal';
import {Images} from '../../assets/Images';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {DataTable} from 'react-native-paper';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const CreateServiceContract = ({navigation}) => {
  const {control, handleSubmit, setValue, clearErrors, resetField} = useForm();

  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(0);
  const [vendors, setVendors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState();
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showBankModal, setShowBankModal] = useState(false);
  const [numOfMonth, setNumOfMonth] = useState(1);
  const [planTypes, setPlanTypes] = useState([]);
  const [showPlanTypeModal, setShowPlanTypeModal] = useState(false);
  const [selectedPlanType, setSelectedPlanType] = useState();
  const [totalInstallment, setTotalInstallment] = useState(1);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('date');
  const [installmentDate, setInstallmentDate] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const [firstStepData, setFirstStepData] = useState();
  const [secondStepData, setSecondStepData] = useState();
  const [thirdStepData, setThirdStepData] = useState();
  const [services, setServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [installments, setInstallments] = useState([]);
  const [installmentTotalAmount, setInstallmentTotalAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [installmentPerMonth, setInstallmentPerMonth] = useState(0);
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
      const vendorId = vendors.find(e => e.title === formData.vendor)?.vendorID;
      let obj = {
        vendorID: vendorId,
        remarks: formData?.remarks,
        date: moment(date).format(),
      };
      setFirstStepData(obj);
      handleNextStep();
    } catch (error) {
      console.log(
        'file: CreatePurchase.js:89 => submitFirstStep => error:',
        error,
      );
    }
  };

  const createService = formData => {
    try {
      let obj = {
        id: Math.random().toString(36).substring(2),
        description: formData.item,
        qty: formData?.quantity,
        rate: formData.amount,
        amount: formData?.quantity * formData.amount,
      };
      setServices(prev => [...prev, obj]);
      resetField('item');
      resetField('quantity');
      resetField('amount');
      setTotalAmount(prev => prev + obj.amount);
      setNumOfMonth(formData?.numOfMonth);
    } catch (error) {
      console.log(
        'file: CreatePurchase.js:106 => createService => error:',
        error,
      );
    }
  };

  const submitSecondStep = async () => {
    try {
      let obj = {
        serviceDetail: services,
        totalMonths: numOfMonth,
      };
      setSecondStepData(obj);
      setValue('totalAmount', totalAmount.toString());

      if (numOfMonth > 1) {
        setPlanTypes([{id: 2, title: 'Monthly'}]);
      } else {
        setPlanTypes([
          {id: 1, title: 'Single'},
          // {id: 1, title: 'Single'},
          // {id: 2, title: 'Monthly'},
        ]);
      }
      setBalance((totalAmount - installmentTotalAmount) * numOfMonth);
      setInstallmentPerMonth(
        ((totalAmount - installmentTotalAmount) * numOfMonth) / numOfMonth,
      );
      handleNextStep();
    } catch (error) {
      console.log(
        'file: CreatePurchase.js:115 => submitSecondStep => error:',
        error,
      );
    }
  };

  const createInstallment = formData => {
    let planType;
    if (numOfMonth > 1) {
      planType = {id: 2, title: 'Monthly'};
    } else {
      planType = {id: 1, title: 'Single'};
    }
    try {
      let obj = {
        // planType: formData.planType,
        planType: planType?.title,
        description: `Installment# `,
        date: moment(installmentDate).format(),
        totalInstallments: numOfMonth,
        amount: installmentPerMonth,
        totalAmount: balance,
      };
      console.log(
        '🚀 ~ file: CreateServiceContract.js:185 ~ createInstallment ~ obj:',
        obj,
      );
      submitThirdStep(obj);
      setInstallments(prev => [...prev, obj]);
      resetField('planType');
      resetField('description');
      setInstallmentDate(new Date());
      resetField('totalInstallment');
      resetField('amount');
      setSelectedPlanType();
      setTotalInstallment(1);
      setInstallmentTotalAmount(prev => prev + obj.totalAmount);
    } catch (error) {
      console.log(
        'file: CreatePurchase.js:106 => createService => error:',
        error,
      );
    }
  };

  const submitThirdStep = async data => {
    console.log(
      '🚀 ~ file: CreateServiceContract.js:200 ~ submitThirdStep ~ data:',
      data,
    );
    try {
      let obj = {
        installmentPlan: [data],
      };
      setThirdStepData(obj);
      handleNextStep();
    } catch (error) {
      console.log(
        'file: CreatePurchase.js:115 => submitSecondStep => error:',
        error,
      );
    }
  };

  const createServiceContract = async formData => {
    setLoading(true);
    try {
      const paymentTypeId = paymentTypes.find(
        e => e.title === formData.paymentType,
      )?.typeID;
      const bankAccountId = bankAccounts.find(
        e => e.title === formData.bankAccount,
      )?.bankID;
      let obj = {
        ...firstStepData,
        ...secondStepData,
        ...thirdStepData,
        paymentTypeID: paymentTypeId,
        amountPaid: formData?.amountPaid,
        totalAmount: balance,
      };
      if (bankAccountId) {
        obj.bankAccID = bankAccountId;
      }
      console.log(
        '🚀 ~ file: CreateServiceContract.js:228 ~ createServiceContract ~ obj:',
        obj,
      );
      const {message} = await apiCall.createServiceContract(obj);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
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

  const getVendors = async () => {
    try {
      const {data} = await apiCall.getVendors();
      const vendorData = [];
      data?.forEach(element => {
        let obj = {
          ...element,
          title: element?.name,
        };
        vendorData.push(obj);
      });
      setVendors(vendorData);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

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
  const handleRemove = obj => {
    setServices(services.filter(item => item.id !== obj?.id));
    setTotalAmount(prev => prev - obj.amount);
  };
  useEffect(() => {
    getVendors();
    getPaymentTypes();
    getBanks();
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
          title={'Create Service Contract'}
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
            {[...Array(4)].map((item, index) => (
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
                    Vendor Detail
                  </CustomText>
                </View>
                <DropDown
                  name={'vendor'}
                  title="Select Vendor"
                  type={'default'}
                  variant={'outlined'}
                  control={control}
                  rules={{
                    required: 'Please select vendor',
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
                  name={'remarks'}
                  variant={'outlined'}
                  placeholder="Remarks"
                  type={'default'}
                  multiline={true}
                  numberOfLines={4}
                  customInputStyle={{height: width * 0.3}}
                  control={control}
                  rules={{
                    required: 'Please enter remarks.',
                  }}
                  onSubmitEditing={handleSubmit(submitFirstStep)}
                />

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
                    Service Detail
                  </CustomText>
                </View>

                <FilledTextField
                  name={'item'}
                  variant={'outlined'}
                  placeholder="Description"
                  type={'default'}
                  multiline={true}
                  numberOfLines={4}
                  customInputStyle={{height: width * 0.2}}
                  control={control}
                  rules={{
                    required: 'Please enter description.',
                  }}
                  onSubmitEditing={handleSubmit(createService)}
                />
                <FilledTextField
                  name={'quantity'}
                  variant={'outlined'}
                  placeholder="Quantity"
                  type={'number-pad'}
                  control={control}
                  rules={{
                    required: 'Please enter quantity.',
                  }}
                  onSubmitEditing={handleSubmit(createService)}
                />
                <FilledTextField
                  name={'amount'}
                  variant={'outlined'}
                  placeholder="Amount"
                  type={'number-pad'}
                  control={control}
                  rules={{
                    required: 'Please enter amount.',
                  }}
                  onSubmitEditing={handleSubmit(createService)}
                />
                <FilledTextField
                  name={'numOfMonth'}
                  variant={'outlined'}
                  placeholder="Number Of Month"
                  type={'number-pad'}
                  control={control}
                  rules={{
                    required: 'Please enter number of month.',
                  }}
                  onSubmitEditing={handleSubmit(createService)}
                />
                <TouchableOpacity
                  onPress={handleSubmit(createService)}
                  style={{flex: 0.2, alignItems: 'center'}}>
                  <Image
                    source={Images.Addcircle}
                    resizeMode="contain"
                    style={{width: width * 0.08, height: width * 0.08}}
                  />
                </TouchableOpacity>

                {services.length > 0 && (
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>#</DataTable.Title>
                      <DataTable.Title>Description</DataTable.Title>
                      <DataTable.Title>Rate</DataTable.Title>
                      <DataTable.Title>Total</DataTable.Title>
                      <DataTable.Title></DataTable.Title>
                    </DataTable.Header>

                    {services.map((item, index) => (
                      <DataTable.Row key={index}>
                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                        <DataTable.Cell>
                          {item.description} {`(x${item.qty})`}
                        </DataTable.Cell>
                        <DataTable.Cell>{item.rate}</DataTable.Cell>
                        <DataTable.Cell>{item.amount}</DataTable.Cell>
                        <DataTable.Cell>
                          <TouchableOpacity onPress={() => handleRemove(item)}>
                            <Image
                              resizeMode="contain"
                              style={{
                                tintColor: colors.darkGray,
                                width: width * 0.04,
                                height: width * 0.04,
                              }}
                              source={Images.icondelete}
                            />
                          </TouchableOpacity>
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                )}

                {services.length > 0 && (
                  <View style={{marginVertical: width * 0.07}}>
                    <PrimaryButton
                      customStyle={{padding: width * 0.032}}
                      title={'Next'}
                      onPress={() => submitSecondStep()}
                    />
                  </View>
                )}
              </Fragment>
            )}

            {step === 2 && (
              <Fragment>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: width * 0.03,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.045}}>
                    Installment Plan
                  </CustomText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: width * 0.02,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.045}}>
                    Balance
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.045}}>
                    Rs {balance}
                  </CustomText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: width * 0.02,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.regular}
                    style={{fontSize: width * 0.035}}>
                    Installment Per Month
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.035}}>
                    Rs {installmentPerMonth}
                  </CustomText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: width * 0.02,
                  }}>
                  <CustomText
                    fontWeight={fontsFamily.regular}
                    style={{fontSize: width * 0.035}}>
                    IInstallment plan type
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.035}}>
                    {numOfMonth > 1 ? 'Monthly' : 'Single'}
                  </CustomText>
                </View>
                {/* <DropDown
                  name={'planType'}
                  title="Select Plan Type"
                  type={'default'}
                  variant={'outlined'}
                  control={control}
                  rules={{
                    required: 'Please select plan type',
                  }}
                  img={false}
                  onPress={() => {
                    setShowPlanTypeModal(true);
                  }}
                /> */}
                {/* {selectedPlanType === 'Monthly' && (
                  <FilledTextField
                    name={'totalInstallment'}
                    variant={'outlined'}
                    placeholder="Total Installment"
                    type={'number-pad'}
                    control={control}
                    rules={{
                      required:
                        selectedPlanType === 'Monthly'
                          ? 'Please enter total installment.'
                          : false,
                      onChange: e => setTotalInstallment(e?.target?.value),
                    }}
                    onSubmitEditing={handleSubmit(createInstallment)}
                  />
                )} */}
                {/* <FilledTextField
                  name={'description'}
                  variant={'outlined'}
                  placeholder="Description"
                  type={'default'}
                  multiline={true}
                  numberOfLines={4}
                  customInputStyle={{height: width * 0.2}}
                  control={control}
                  rules={{
                    required: 'Please enter description.',
                  }}
                  onSubmitEditing={handleSubmit(createInstallment)}
                /> */}
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
                        installmentDate == new Date()
                          ? 'Date'
                          : getFormattedDate(installmentDate)
                      }
                      prefixIcon={true}
                      setOpen={() => [
                        setOpen(true),
                        setMode('installmentDate'),
                      ]}
                    />
                  </View>
                </View>
                {/* <FilledTextField
                  name={'amount'}
                  variant={'outlined'}
                  placeholder="Amount"
                  type={'number-pad'}
                  control={control}
                  rules={{
                    required: 'Please enter amount.',
                    validate: (value, formValues) =>
                      value * totalInstallment >
                      totalAmount - installmentTotalAmount
                        ? 'Please valid amount.'
                        : true,
                  }}
                  onSubmitEditing={handleSubmit(createInstallment)}
                /> */}
                <View style={{marginVertical: width * 0.07}}>
                  <PrimaryButton
                    customStyle={{padding: width * 0.032}}
                    title={'Next'}
                    onPress={handleSubmit(createInstallment)}
                  />
                </View>
                {/* <TouchableOpacity
                  onPress={handleSubmit(createInstallment)}
                  style={{flex: 0.2, alignItems: 'center'}}>
                  <Image
                    source={Images.Addcircle}
                    resizeMode="contain"
                    style={{width: width * 0.08, height: width * 0.08}}
                  />
                </TouchableOpacity> */}

                {/* {installments.length > 0 && (
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>#</DataTable.Title>
                      <DataTable.Title>Plan Type</DataTable.Title>
                      <DataTable.Title>Installments</DataTable.Title>
                      <DataTable.Title>Total</DataTable.Title>
                    </DataTable.Header>

                    {installments.map((item, index) => (
                      <DataTable.Row key={index}>
                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                        <DataTable.Cell>{item.planType}</DataTable.Cell>
                        <DataTable.Cell>
                          {item.totalInstallments}
                        </DataTable.Cell>
                        <DataTable.Cell>{item.totalAmount}</DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                )} */}

                {/* {totalAmount - installmentTotalAmount === 0 && ( */}
                {/* <View style={{marginVertical: width * 0.07}}>
                  <PrimaryButton
                    customStyle={{padding: width * 0.032}}
                    title={'Next'}
                    onPress={() => submitThirdStep()}
                  />
                </View> */}
                {/* )} */}
              </Fragment>
            )}

            {step === 3 && (
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
                    Payment Detail
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

                <FilledTextField
                  name={'amountPaid'}
                  variant={'outlined'}
                  placeholder="Paid Amount"
                  type={'number-pad'}
                  control={control}
                  rules={{
                    required: 'Please enter paid amount.',
                    validate: value =>
                      value > totalAmount ? 'Please valid amount.' : true,
                  }}
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
                    Total Amount Per Month
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.bold}
                    style={{fontSize: width * 0.04, color: colors.primary}}>
                    Rs {totalAmount}
                  </CustomText>
                </View>

                <View style={{marginVertical: width * 0.07}}>
                  <PrimaryButton
                    customStyle={{padding: width * 0.032}}
                    title={'Submit'}
                    loader={loading}
                    onPress={handleSubmit(createServiceContract)}
                  />
                </View>
              </Fragment>
            )}
          </View>

          <CustomModal
            data={vendors.length <= 0 ? [] : vendors}
            modalVisible={showModal}
            closeModal={() => setShowModal(false)}
            getvalue={e => {
              setValue('vendor', e);
              clearErrors('vendor');
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
            data={bankAccounts.length <= 0 ? [] : bankAccounts}
            modalVisible={showBankModal}
            closeModal={() => setShowBankModal(false)}
            getvalue={e => {
              setValue('bankAccount', e);
              clearErrors('bankAccount');
            }}
          />
          <CustomModal
            data={planTypes.length <= 0 ? [] : planTypes}
            modalVisible={showPlanTypeModal}
            closeModal={() => setShowPlanTypeModal(false)}
            getvalue={e => {
              setValue('planType', e);
              setSelectedPlanType(e);
              clearErrors('planType');
            }}
          />

          <DateTimePicker
            setDate={
              mode == 'date'
                ? e => {
                    setDate(e);
                  }
                : e => {
                    setInstallmentDate(e);
                  }
            }
            closeModal={() => setOpen(false)}
            date={mode == 'date' ? date : installmentDate}
            modalVisible={open}
            mode={'date'}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateServiceContract;