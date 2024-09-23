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
import ExpenseCard from './ExpenseCard';
import DropDown from '../../components/TextField/DropDown';
import {useForm} from 'react-hook-form';
import CustomModal from '../../components/Modal/CustomModal';

const {width, height} = Dimensions.get('screen');

const Expenses = ({navigation}) => {
  const isFocused = useIsFocused();
  const role = useSelector(state => state.userDataReducer.userRole);

  const {control, handleSubmit, setValue, clearErrors} = useForm();

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

  const [expenses, setExpenses] = useState([]);
  const [loader, setLoader] = useState(false);

  const [expenseAccounts, setExpenseAccounts] = useState([]);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const getExpenses = async () => {
    setLoader(true);
    try {
      const {data} = await apiCall.getExpenses();
      setExpenses(data);
    } catch (error) {
      console.log('file: index.js:54 => getEForms => error:', error);
    } finally {
      setLoader(false);
    }
  };

  const getExpenseByAccountId = async formData => {
    setLoader(true);
    try {
      const id = expenseAccounts.find(
        e => e.title === formData,
      )?.expenseAccountID;
      const {data} = await apiCall.getExpenseByAccountId(id);
      setExpenses(data);
    } catch (error) {
      console.log('file: index.js:54 => getEForms => error:', error);
    } finally {
      setLoader(false);
    }
  };

  const getExpenseAccounts = async () => {
    try {
      const {data} = await apiCall.getExpenseAccounts();
      const accountData = [];
      data.forEach(element => {
        let obj = {
          ...element,
          title: element?.expenseAccountName,
        };
        accountData.push(obj);
      });
      setExpenseAccounts(accountData);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    }
  };

  useEffect(() => {
    getExpenses();
    getExpenseAccounts();
  }, [isFocused]);

  const reversedData = expenses?.expenses?.slice().reverse();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={{paddingHorizontal: width * 0.032, flex: 1}}>
        <Header
          onBack={goBack}
          title={'Expenses'}
          showRightBtn={true}
          icon={Images.newAdd}
          handleRightBtn={() => navigation.navigate('createExpense')}
        />
        <View
          style={{
            paddingHorizontal: width * 0.01,
            flex: 1,
            marginTop: 10,
            paddingBottom: height * 0.15,
          }}>
          <DropDown
            name={'expense'}
            title="Expense Account"
            type={'default'}
            variant={'outlined'}
            control={control}
            rules={{
              required: 'Please select expense account.',
            }}
            img={false}
            onPress={() => {
              setShowExpenseModal(true);
            }}
          />

          {loader ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : expenses?.expenses?.length > 0 ? (
            <FlatList
              data={reversedData}
              renderItem={({item}) => <ExpenseCard data={item} />}
              keyExtractor={item => item.id}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: width * 0.035,
                  fontFamily: fontsFamily.medium,
                }}>
                No expenses found
              </Text>
            </View>
          )}
        </View>

        <CustomModal
          data={expenseAccounts.length <= 0 ? [] : expenseAccounts}
          modalVisible={showExpenseModal}
          closeModal={() => setShowExpenseModal(false)}
          getvalue={e => {
            setValue('expense', e);
            getExpenseByAccountId(e);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Expenses;
