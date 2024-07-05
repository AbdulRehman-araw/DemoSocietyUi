import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {text} from '../../../res/strings';
import CustomText from '../../../components/CustomText';
import {fontsFamily} from '../../../assets/Fonts';
import {colors} from '../../../styles/colors';
import HeaderClose from '../../../components/Header/HeaderClose';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import FilledTextField from '../../../components/TextField/FilledTextField';
import {useForm} from 'react-hook-form';
import uuid from 'react-native-uuid';
import {apiCall} from '../../../Services/apiCall';
import AlertModal from '../../../components/Modal/AlertModal';
import {Images} from '../../../assets/Images';
import WarningModal from '../../../components/Modal/WarningModal';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

const EFormForAdmin = ({navigation, route}) => {
  const data = route?.params?.data || [];

  const {control, handleSubmit, setValue, getValues} = useForm();

  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const [loader, setLoader] = useState(false);
  const [errorModal1, setErrorModal1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertWarning, setAlertWarning] = useState('w');
  const role = useSelector(state => state.userDataReducer.userRole);

  const goBack = () => {
    navigation.goBack();
  };

  const submitForm = async formData => {
    setLoader(true);
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
      setLoader(false);
    }
  };

  const DeleteEForm = async id => {
    setErrorModal1(false);
    setLoading(true);
    try {
      const {message} = await apiCall.DeleteEForm(id);
      setAlertType('s');
      setErrorModalText(message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
        goBack();
      }, 3000);
    } catch (error) {
      console.log('file: createEvent.js:53 => createEvent => error:', error);
    } finally {
      setLoading(false);
    }
  };

  const AlertFunction = () => {
    setAlertWarning('w');
    setErrorModalText('Are you sure you want to delete this e-form?');
    setErrorModal1(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <WarningModal
        visible={errorModal1}
        close={setErrorModal}
        text={errorModalText}
        type={alertWarning}
        button={true}
        warning={() => DeleteEForm(data?.formId)}
        cancel={() => setErrorModal1(false)}
      />

      <StatusBar
        translucent
        backgroundColor={colors.white}
        barStyle="light-content"
      />

      <View style={{paddingHorizontal: width * 0.025, flex: 1, marginTop: 30}}>
        <HeaderClose
          onBack={goBack}
          leftarrow={{marginLeft: 10}}
          title={data.formName}
          showRightBtn={true}
          eformstyle={{fontSize: width * 0.04}}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
            paddingHorizontal:
              Platform.OS == 'ios' ? width * 0.08 : width * 0.03,
          }}>
          {data?.properties?.map((item, index) => (
            <FilledTextField
              editable={false}
              name={`${item?.name}-${item?.id}`}
              placeholder={item?.name}
              type={'default'}
              control={control}
              rules={{
                required: `Please enter ${item?.name}.`,
              }}
              onSubmitEditing={handleSubmit(submitForm)}
            />
          ))}

          <PrimaryButton
            customStyle={{padding: width * 0.03}}
            title={text.submit}
            loader={loader}
          />

          {(role == 'SuperAdmin' || role == 'Admin') && (
            <View
              style={{
                marginVertical: width * 0.07,
                flexDirection: 'row',
                gap: 8,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                disabled={loading}
                onPress={() => AlertFunction()}
                activeOpacity={1}
                style={{
                  width: width * 0.13,
                  height: width * 0.13,
                  marginRight: width * 0.02,
                  backgroundColor: colors.danger,
                  borderRadius: 10,
                  padding: width * 0.02,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    tintColor: colors.white,
                    width: width * 0.06,
                    height: width * 0.06,
                  }}
                  source={Images.icondelete}
                />
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={() => navigation.navigate('updateAmenity', { data: updateData })} activeOpacity={1} style={{
                  width: width * 0.13,
                  height: width * 0.13,
                  marginRight: width * 0.02,
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  padding: width * 0.02,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Image
                    resizeMode='contain'
                    style={{ tintColor: colors.white, width: width * 0.06, height: width * 0.06 }}
                    source={Images.editIcon}
                  />
                </TouchableOpacity> */}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EFormForAdmin;
