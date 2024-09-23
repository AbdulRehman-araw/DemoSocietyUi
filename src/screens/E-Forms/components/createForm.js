import {
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
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
import Header from '../../../components/Header/Header';
import LinearGradientPrimaryButton from '../../../components/Button/LinearGradientPrimaryButton';

const {width} = Dimensions.get('window');

const CreateForm = ({navigation}) => {
  const {control, handleSubmit, setValue, getValues} = useForm();

  const [formList, setFormList] = useState([
    {id: uuid.v4(), type: 'text', name: ''},
  ]);
  const [loader, setLoader] = useState(false);
  const [alertType, setAlertType] = useState('s');
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalText, setErrorModalText] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const addNewField = () => {
    try {
      const updateList = [...formList];
      let obj = {
        id: uuid.v4(),
        type: 'text',
        name: '',
      };
      updateList.push(obj);
      setFormList(updateList);
    } catch (error) {
      console.log('file: createForm.js:38 => addNewField => error:', error);
    }
  };

  const removeField = id => {
    try {
      const updateList = [...formList];
      const index = updateList.findIndex(e => e.id == id);
      if (index !== -1) {
        updateList.splice(index, 1);
      }
      setFormList(updateList);
    } catch (error) {
      console.log('file: createForm.js:38 => addNewField => error:', error);
    }
  };

  const handleChange = (index, value) => {
    try {
      const newFormList = [...formList];
      const newObj = newFormList[index];
      newObj.name = value;
      setFormList(newFormList);
    } catch (error) {
      console.log('file: createForm.js:68 => handleChange => error:', error);
    }
  };

  const createForm = async formData => {
    setLoader(true);
    try {
      formList?.forEach(element => delete element.id);
      const newFormList = [...formList];
      for (const [key, value] of Object.entries(formData)) {
        const keyValue = key.split('_');
        const index = formList?.findIndex(e => e.id == keyValue[0]);
        if (index !== -1) {
          const newObj = newFormList[index];
          delete newObj.id;
          newObj.name = value;
        }
      }
      let obj = {
        formName: formData.title,
        properties: newFormList,
      };
      console.log('obj=>', JSON.stringify(obj));
      const {message} = await apiCall.createEForm(obj);
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {/* <StatusBar
        translucent
        backgroundColor={colors.white}
        barStyle="light-content"
      /> */}

      <AlertModal
        visible={errorModal}
        close={setErrorModal}
        text={errorModalText}
        type={alertType}
      />

      <ImageBackground source={Images.lightBG} style={{flex: 1}}>
        <View style={{paddingHorizontal: width * 0.025, flex: 1}}>
          <Header
            onBack={goBack}
            leftarrow={{marginLeft: 10}}
            title={'Add New'}
            showRightBtn={true}
            eformstyle={{fontSize: width * 0.04}}
          />

          <View
            style={{
              // borderBottomWidth: 1,
              // borderColor: colors.lightoffwhite,
              // shadowColor: '#4d4d4d',
              // shadowOffset: {
              //   width: 0,
              //   height: 8,
              // },
              // shadowOpacity: 0.8,
              // shadowRadius: 13.1,
              // elevation: 10,
              marginVertical: 5,
            }}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: Platform.OS == 'ios' ? width * 0.08 : width * 0.18,
              paddingHorizontal:
                Platform.OS == 'ios' ? width * 0.08 : width * 0.03,
            }}>
            <FilledTextField
              name={'title'}
              placeholder="FormTitle"
              type={'default'}
              control={control}
              rules={{
                required: 'Please enter form title.',
              }}
              variant={'outlined'}
              onSubmitEditing={handleSubmit(createForm)}
            />

            <CustomText
              children={'Form Input Fields'}
              fontWeight={fontsFamily.bold}
              style={{fontSize: width * 0.04, marginVertical: width * 0.04}}
            />

            {formList?.map((item, index) => (
              <FilledTextField
                name={`fieldLabel_${item?.id}`}
                placeholder="Name"
                type={'default'}
                defaultValue={item?.name}
                control={control}
                variant={'outlined'}
                rules={{
                  required: index === 0 ? `Please enter field label.` : false,
                }}
                onSubmitEditing={handleSubmit(createForm)}
                justChange={e => handleChange(index, e)}
                showDeleteIcon={formList.length > 1 ? true : false}
                changeSecureTextEntry={() => removeField(item?.id)}
              />
            ))}

            <TouchableOpacity
              onPress={() => addNewField()}
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginVertical: 20,
              }}>
              <CustomText
                children={'Add New Field'}
                fontWeight={fontsFamily.bold}
                style={{fontSize: 18, color: colors.primary, right: 14}}
              />
              <CustomText
                children={'+'}
                fontWeight={fontsFamily.medium}
                style={{fontSize: 30, color: colors.primary, top: -8}}
              />
              {/* <PrimaryButton
                customStyle={{padding: width * 0.025, width: width * 0.3}}
                textStyle={{fontSize: width * 0.03}}
                title={'Add Field'}
                onPress={() => addNewField()}
              /> */}
            </TouchableOpacity>

            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <LinearGradientPrimaryButton
                customStyle={{padding: width * 0.03}}
                title={text.submit}
                loader={loader}
                onPress={handleSubmit(createForm)}
              />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateForm;
