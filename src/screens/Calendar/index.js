

import { Calendar, LocaleConfig } from 'react-native-calendars';


import { TouchableOpacity, BackHandler, Button, Text, Dimensions, SafeAreaView, StatusBar, View, Image, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'


import CustomText from '../../components/CustomText'
import Header from '../../components/Header/Header'
import { styles } from './styles/styles'
import { fontsFamily } from '../../assets/Fonts'
import { Images } from '../../assets/Images';
import { text } from '../../res/strings'
import PrimaryButton from '../../components/Button/PrimaryButton';
import { apiCall } from '../../Services/apiCall';
import moment from 'moment';


const { width } = Dimensions.get("window")

const Selectcalendar = ({ navigation }) => {

  const [bookingDates, setBookingDates] = useState();
  const [eventDates, setEventDates] = useState()
  console.log('file: index.js:26 => Selectcalendar => bookingDates:', bookingDates)

  const goBack = () => {
    navigation.goBack()
  }

  const handleBack = () => {
    goBack()
    return true
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack)
    }
  }, [])

  const getBookingsDate = async () => {
    try {
      const markedDates = {};
      const { data } = await apiCall.getBookingsDate()
      setEventDates(data)
      data?.forEach((item) => {
        markedDates[moment(item?.date).format('YYYY-MM-DD')] = {
          selected: true, selectedColor: item?.type === 'MyEvents' ? colors.primary : 'orange'
        };
      });

      setBookingDates(markedDates)
    } catch (error) {
      console.log('file: index.js:46 => getBookingsDate => error:', error)
    }
  }


  
console.log(bookingDates)






  const handleDayPress = (date) => {
    const formattedDate = moment(date.dateString).format('YYYY-MM-DD');
  
    if (bookingDates[formattedDate]) {
      navigation.navigate('events',{ color: bookingDates[formattedDate].selectedColor});
    }

   
  };
  



  useEffect(() => {
    getBookingsDate()
  }, []);

  return (

    <SafeAreaView style={styles.root}>
      <StatusBar translucent={false} backgroundColor={colors.white} barStyle="dark-content" />


      <View style={{ paddingHorizontal: width * 0.032, flex: 1 }}>

        <Header
          onBack={goBack}
          title={"Calendar"}
          showRightBtn={true}
        />

        <View style={{ marginTop: 10 }}>
          <Calendar
            markedDates={bookingDates}
            onDayPress={handleDayPress}
           
          />

        </View>


        <View style={{ flexDirection: 'row', alignSelf: "center", marginTop: 25 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 12, height: 12, backgroundColor: 'orange', borderRadius: 10 }} />
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{ color: colors.black, fontSize: width * 0.028, paddingHorizontal: width * 0.02 }}>
              Community Events
            </CustomText>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 12, height: 12, backgroundColor: colors.primary, borderRadius: 10 }} />
            <CustomText
              fontWeight={fontsFamily.bold}
              style={{ color: colors.black, fontSize: width * 0.027, paddingHorizontal: width * 0.02 }}>
              My Events
            </CustomText>
          </View>
        </View>


        <View style={{ flexDirection: 'row', marginVertical: width * 0.35, justifyContent: 'space-evenly' }}>

          <View style={{ marginVertical: width * 0.010 }}>
            <PrimaryButton customStyle={{ padding: width * 0.03, width: width * 0.35 }}
              title={text.invite}
              textcalendar={{ fontSize: width * 0.038 }}
              onPress={() => navigation.navigate("addVisitors")}

            />
          </View>

          <View style={{ marginVertical: width * 0.010 }}>
            <PrimaryButton customStyle={{ padding: width * 0.03, width: width * 0.35 }}
              title={text.bookfacility}
              textcalendar={{ fontSize: width * 0.037 }}
              onPress={() => navigation.navigate("facilityBooking")}
            />
          </View>

        </View>



      </View>
    </SafeAreaView>

  );
};

export default Selectcalendar;
