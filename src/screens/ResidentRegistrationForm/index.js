import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  Alert,
  TextInput

} from 'react-native';
import React, { useState } from 'react';

import { Images } from '../../assets/Images';
import { text } from '../../res/strings';
import PrimaryButton from '../../components/Button/PrimaryButton';
import CustomText from '../../components/CustomText';
import { fontsFamily } from '../../assets/Fonts';
import { styles } from './styles/styles';
import { colors } from '../../styles/colors';
import HeaderClose from '../../components/Header/HeaderClose';
import SetFieldTextField from '../../components/TextField/SetFieldTextField';
import FormField from '../../components/TextField/FormField';

const { width } = Dimensions.get("window")


const ResidentRegistrationForm = ({ navigation }) => {

  const goBack = () => {
    navigation.goBack()
  }

  const ownerParticular = [
    {
      title: 'Name',
    },
    {
      title: 'IC/Passport No.',
    },
    {
      title: 'Phone Number',
    },
    {
      title: 'Home No.',
    },
    {
      title: 'Vehicle Registration No. 1',
    },
    {
      title: 'Vehicle Registration No. 2',
    },
  ]

  const tenantParticular = [
    {
      title: 'Name',
    },
    {
      title: 'IC/Passport No.',
    },
    {
      title: 'Phone Number',
    },
    {
      title: 'Home No.',
    },
  ]

  const tenancyPeriod = [
    {
      title: 'from',
    },
    {
      title: 'to',
    },
    {
      title: 'Vehicle Registration No. 1',
    },
    {
      title: 'Vehicle Registration No. 2',
    },
  ]

  const additionalInformation = [
    {
      title: 'Worker Details',
    },
    {
      title: 'Worker Name',
    },
    {
      title: 'IC/Passport No.',
    },
    {
      title: 'Phone Number',
    },
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar translucent backgroundColor={colors.white} barStyle="light-content" />

      <View style={{ paddingHorizontal: width * 0.025, flex: 1, marginTop: 30 }}>


        <HeaderClose
          onBack={goBack}
          leftarrow={{ marginLeft: 10 }}
          title={"Resident Registration Form "}
          showRightBtn={true}
          eformstyle={{ fontSize: width * 0.04 }}
        />

        <View style={{
          borderBottomWidth: 1,
          borderColor: colors.lightoffwhite,
          shadowColor: "#4d4d4d",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.8,
          shadowRadius: 13.10,
          elevation: 10,
          marginVertical: 5
        }} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18,
          paddingHorizontal: Platform.OS == "ios" ? width * 0.08 : width * 0.03,
        }}
        >

          <FormField title={'Unit/House No.'} />

          <CustomText children={"Owner's Particular"} fontWeight={fontsFamily.bold} style={{ fontSize: width * 0.04, marginVertical: width * 0.04 }} />
          {ownerParticular.map((item, index) => (
            <FormField title={item?.title} key={index} />
          ))}

          <CustomText children={"Tenant's Particular"} fontWeight={fontsFamily.bold} style={{ fontSize: width * 0.04, marginVertical: width * 0.04 }} />
          {tenantParticular.map((item, index) => (
            <FormField title={item?.title} key={index} />
          ))}


          <CustomText children={"Tenancy Period"} fontWeight={fontsFamily.bold} style={{ fontSize: width * 0.04, marginVertical: width * 0.04 }} />
          {tenancyPeriod.map((item, index) => (
            <FormField title={item?.title} key={index} />
          ))}



          <CustomText children={"Additional Information"} fontWeight={fontsFamily.bold} style={{ fontSize: width * 0.04, marginVertical: width * 0.04 }} />
          {additionalInformation.map((item, index) => (
            <FormField title={item?.title} key={index} />
          ))}


          <PrimaryButton
            customStyle={{ padding: width * 0.03 }}
            title={text.submit}
            paytitle={{ fontSize: width * 0.043 }}
            onPress={() => navigation.navigate("home")}
          />


          {/* <View style={styles.labelContainer}>
            <CustomText fontWeight={fontsFamily.medium}
              style={styles.labeltext}>Unit/House No.</CustomText>
          </View>

          <View style={styles.input1}>
            <TextInput style={styles.textinputfield} defaultValue="" />
          </View>

          <CustomText fontWeight={fontsFamily.bold}
            style={styles.Ownerstyle}>Owner's Particular</CustomText>


          <View>
            <View style={styles.label2}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext2}>Name</CustomText>
            </View>

            <View style={styles.input2}>
              <TextInput style={styles.textinputfield2} defaultValue="" />
            </View>
          </View>

          <View>
            <View style={styles.label3}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext3}>IC/Passport No.</CustomText>
            </View>

            <View style={styles.input3}>
              <TextInput style={styles.textinputfield3} defaultValue="" />
            </View>
          </View>

          <View>
            <View style={styles.label4}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext4}>Phone Number</CustomText>
            </View>

            <View style={styles.input4}>
              <TextInput style={styles.textinputfield4} defaultValue="" />
            </View>
          </View>

          <View>
            <View style={styles.label5}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext5}>Home No.</CustomText>
            </View>

            <View style={styles.input5}>
              <TextInput style={styles.textinputfield5} defaultValue="" />
            </View>
          </View>

          <View>
            <View style={styles.label6}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext6}>Vehicle Registration No.1</CustomText>
            </View>

            <View style={styles.input6}>
              <TextInput style={styles.textinputfield6} defaultValue="" />
            </View>
          </View>

          <View>
            <View style={styles.label7}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext7}>Vehicle Registration No.2</CustomText>
            </View>

            <View style={styles.input7}>
              <TextInput style={styles.textinputfield7} defaultValue="" />
            </View>
          </View>

          <CustomText fontWeight={fontsFamily.bold}
            style={styles.Ownerstyle}>Tenant's Particular</CustomText>

          <View style={{ marginTop: 5 }}>
            <View style={styles.label2}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext2}>Name</CustomText>
            </View>

            <View style={styles.input2}>
              <TextInput style={styles.textinputfield2} defaultValue="" />
            </View>
          </View>

          <View>
            <View style={styles.label3}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext3}>IC/Passport No.</CustomText>
            </View>

            <View style={styles.input3}>
              <TextInput style={styles.textinputfield3} defaultValue="" />
            </View>
          </View>

          <View>
            <View style={styles.label4}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext4}>Phone Number</CustomText>
            </View>

            <View style={styles.input4}>
              <TextInput style={styles.textinputfield4} defaultValue="" />
            </View>
          </View>

          <View>
            <View style={styles.label5}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext5}>Home No.</CustomText>
            </View>

            <View style={styles.input5}>
              <TextInput style={styles.textinputfield5} defaultValue="" />
            </View>
          </View>

          <CustomText fontWeight={fontsFamily.bold}
            style={styles.Ownerstyle}>Tenancy Period</CustomText>

          <View style={{ marginTop: 10 }}>
            <View style={styles.labelFrom}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltextFrom}>From</CustomText>
            </View>

            <View style={styles.inputFrom}>
              <TextInput style={styles.textinputfieldFrom} defaultValue="" />
            </View>
          </View>

          <View>
            <View style={styles.labelTo}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltextTo}>To</CustomText>
            </View>

            <View style={styles.inputTo}>
              <TextInput style={styles.textinputfieldTo} defaultValue="" />
            </View>
          </View>


          <View>
            <View style={styles.label6}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext6}>Vehicle Registration No.1</CustomText>
            </View>

            <View style={styles.input6}>
              <TextInput style={styles.textinputfield6} defaultValue="" />
            </View>
          </View>

          <View>
            <View style={styles.labelresgiatration}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltextresgiatration}>Vehicle Registration No.2</CustomText>
            </View>

            <View style={styles.inputresgiatration}>
              <TextInput style={styles.textinputfieldresgiatration} defaultValue="" />
            </View>
          </View>



          <CustomText fontWeight={fontsFamily.bold}
            style={styles.Ownerstyle}>Additional Information</CustomText>

          <View style={{ marginTop: 10 }}>
            <View style={styles.labelWorker}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltextWorker}>Worker Details</CustomText>
            </View>

            <View style={styles.inputWorker}>
              <TextInput style={styles.textinputfieldWorker} defaultValue="" />
            </View>
          </View>


          <View>
            <View style={styles.labelWorkername}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltextWorkername}>Worker Name</CustomText>
            </View>

            <View style={styles.inputWorkername}>
              <TextInput style={styles.textinputfieldWorkername} defaultValue="" />
            </View>
          </View>


          <View>
            <View style={styles.label4}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext4}>Phone Number</CustomText>
            </View>

            <View style={styles.input4}>
              <TextInput style={styles.textinputfield4} defaultValue="" />
            </View>
          </View>


          <View style={{ marginTop: 80 }}>
            <PrimaryButton
              customStyle={{ padding: width * 0.03, width: width * 0.86, marginLeft: 20 }}
              title={text.submit}
              paytitle={{ fontSize: width * 0.043 }}
              onPress={() => navigation.navigate("home")}
            />
          </View> */}

        </ScrollView>
      </View>

    </SafeAreaView>

  );
};





export default ResidentRegistrationForm;