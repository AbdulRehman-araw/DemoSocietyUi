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
  import Header from '../../components/Header/Header'

  
  const { width } = Dimensions.get("window")
  
  
  
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
  
  
  const EditRentalDetails = ({ navigation }) => {
    
    const goBack = () => {
      navigation.goBack()
    }
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <StatusBar translucent backgroundColor={colors.white} barStyle="light-content" />
  
        <View style={{ paddingHorizontal: width * 0.025, flex: 1,marginTop:20 }}>
  
        <Header
          onBack={goBack}
          title={"Edit Rental Details"}
          showRightBtn={true}
          />

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS == "ios" ? width * 0.08 : width * 0.18
          }}>
  
          <CustomText fontWeight={fontsFamily.bold}
              style={styles.rentaldetailstyle}>Edit Rental Details</CustomText>
  
            <View style={styles.labelContainer}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext}>Unit/House No.</CustomText>
            </View>
  
            <View style={styles.input1}>
              <TextInput style={styles.textinputfield} defaultValue="Block A, Flat 101" />
            </View>
  
            <CustomText fontWeight={fontsFamily.bold}
              style={styles.rentalstyle}>Rental's Particular</CustomText>
    
            <View>
              <View style={styles.label2}>
                <CustomText fontWeight={fontsFamily.medium}
                  style={styles.labeltext2}>Name</CustomText>
              </View>
  
              <View style={styles.input2}>
                <TextInput style={styles.textinputfield2} defaultValue="Muhammad Hamza" />
              </View>
            </View>
  
            <View>
              <View style={styles.label3}>
                <CustomText fontWeight={fontsFamily.medium}
                  style={styles.labeltext3}>IC/Passport No.</CustomText>
              </View>
  
              <View style={styles.input3}>
                <TextInput style={styles.textinputfield3} defaultValue="42031-4535654-1" />
              </View>
            </View>
  
            <View>
              <View style={styles.label4}>
                <CustomText fontWeight={fontsFamily.medium}
                  style={styles.labeltext4}>Phone Number</CustomText>
              </View>
  
              <View style={styles.input4}>
                <TextInput style={styles.textinputfield4} defaultValue="+92 343 6546096" />
              </View>
            </View>
  
            <View>
              <View style={styles.label5}>
                <CustomText fontWeight={fontsFamily.medium}
                  style={styles.labeltext5}>Email</CustomText>
              </View>
  
              <View style={styles.input5}>
                <TextInput style={styles.textinputfield5} defaultValue="hamza1@gmail.com" />
              </View>
            </View>
  
            <View>
              <View style={styles.label6}>
                <CustomText fontWeight={fontsFamily.medium}
                  style={styles.labeltext6}>Vehicle Registration No.1</CustomText>
              </View>
  
              <View style={styles.input6}>
                <TextInput style={styles.textinputfield6} defaultValue="HAI-098" />
              </View>
            </View>
  
            <View>
              <View style={styles.label7}>
                <CustomText fontWeight={fontsFamily.medium}
                  style={styles.labeltext7}>Vehicle Registration No.2</CustomText>
              </View>
  
              <View style={styles.input7}>
                <TextInput style={styles.textinputfield7} defaultValue="PLI-896" />
              </View>
            </View>
            
   
            <View style={{ marginTop: 80 }}>
              <PrimaryButton
                customStyle={{ padding: width * 0.030, width: width * 0.30, marginLeft: 110 }}
                title={text.save}
                savetitle={{ fontSize: width * 0.038 }}
                onPress={() => navigation.navigate("codeverification")}
              />
            </View>
  
          </ScrollView>
        </View>
  
      </SafeAreaView>
  
    );
  };
  
  
  
  
  
  export default EditRentalDetails;