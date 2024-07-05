import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import CustomText from '../../../components/CustomText';
import HeaderClose from '../../../components/Header/HeaderClose';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import FilledTextField from '../../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import {apiCall} from '../../../Services/apiCall';
import AlertModal from '../../../components/Modal/AlertModal';
import {colors} from '../../../styles/colors';
import {fontsFamily} from '../../../assets/Fonts';

const {width} = Dimensions.get('window');

const SubmitEForm = ({navigation, route}) => {
  const {formId, formName, properties} = route?.params?.data;

  const {control, handleSubmit, setValue, getValues} = useForm();

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');
  const [loader, setLoader] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const submitForm = async formData => {
    setLoader(true);
    setErrorModal(true);

    try {
      const filledForm = [];

      for (const [key, value] of Object.entries(formData)) {
        const propertyId = key.split('-')[1];
        let property = {
          propertyID: propertyId,
          value: value,
        };
        filledForm.push(property);
      }

      let obj = {
        formID: formId,
        properties: filledForm,
      };

      const {message} = await apiCall.submitEForm(obj);

      setTimeout(() => {
        setAlertType('s');
        setErrorModalText(message);
        navigation.goBack();
      }, 2000);
      for (const property of properties) {
        // Clear the form data after submission
        setValue(`property-${property.id}`, '');
      }

      setTimeout(() => {
        setErrorModal(false);
      }, 5000);
    } catch (error) {
      setAlertType('e');
      setErrorModalText(error.message);
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent
        backgroundColor={colors.white}
        barStyle="light-content"
      />

      <View style={{paddingHorizontal: width * 0.025, flex: 1, marginTop: 30}}>
        <HeaderClose
          onBack={goBack}
          leftarrow={{marginLeft: 10}}
          title={formName}
          showRightBtn={true}
          eformstyle={{fontSize: width * 0.04}}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS === 'ios' ? width * 0.08 : width * 0.18,
            paddingHorizontal:
              Platform.OS === 'ios' ? width * 0.08 : width * 0.03,
          }}>
          {properties?.map((item, index) => (
            <FilledTextField
              key={item.id}
              name={`property-${item.id}`}
              placeholder={item.name}
              type="default"
              control={control}
              rules={{
                required: `Please enter ${item.name}.`,
              }}
              onSubmitEditing={handleSubmit(submitForm)}
            />
          ))}

          <PrimaryButton
            customStyle={{padding: width * 0.03}}
            title="Submit"
            loader={loader}
            onPress={handleSubmit(submitForm)}
          />
        </ScrollView>
      </View>

      <AlertModal
        visible={errorModal}
        close={() => setErrorModal(false)}
        text={'Thanks, the form has been submitted successfully'}
        type={alertType}
      />
    </SafeAreaView>
  );
};

export default SubmitEForm;
