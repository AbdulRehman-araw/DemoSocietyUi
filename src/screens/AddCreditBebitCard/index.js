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



const { width } = Dimensions.get("window")



const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;


const AddCreditBebitCard = ({ navigation }) => {
  
  const goBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar translucent backgroundColor={colors.white} barStyle="light-content" />

      <View style={{ paddingHorizontal: width * 0.032, flex: 1 ,marginTop:50}}>
    
      <HeaderClose
      onBack={goBack}
      leftarrow={{ marginLeft: 10 }}
      title={"Add a credit or debit card"}
      showRightBtn={true}
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
          marginTop: 5
        }} />
     
              <View style={{marginTop:20}}>     
                   <View style={styles.labelContainer}>
            <CustomText fontWeight={fontsFamily.medium}
              style={styles.labeltext}>Card Number</CustomText>
          </View>

          <View style={styles.input1}>
            <TextInput style={styles.textinputfield} defaultValue="" />
          </View>
          </View>

          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <View style={styles.label2}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext2}>MM/YY</CustomText>
            </View>

            <View style={styles.input2}>
              <TextInput style={styles.textinputfield2} defaultValue="" />
            </View>
            
            <View>
            <View style={styles.label3}>
            <CustomText fontWeight={fontsFamily.medium}
            style={styles.labeltext3}>CVC</CustomText>
            </View>
            
            <View style={styles.input3}>
            <TextInput style={styles.textinputfield3} defaultValue="" />
            </View>
            </View>
            
            </View>


          <View>
            <View style={styles.label4}>
              <CustomText fontWeight={fontsFamily.medium}
                style={styles.labeltext4}>Name of the card holder</CustomText>
            </View>

            <View style={styles.input4}>
              <TextInput style={styles.textinputfield4} defaultValue="" />
            </View>
          </View>


          <View style={{ marginVertical:width*0.90 }}>
            <PrimaryButton
              customStyle={{ padding: width * 0.03, width: width * 0.86, marginLeft: 20 }}
              title={text.done}
              paytitle={{ fontSize: width * 0.043 }}
              onPress={() => navigation.navigate("codeverification")}
            />
          </View>

        
      </View>

    </SafeAreaView>

  );
};





export default AddCreditBebitCard;