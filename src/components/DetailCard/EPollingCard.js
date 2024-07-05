import {  BackHandler, Text, Dimensions, SafeAreaView, View, ScrollView,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../styles/colors'

import CustomText from '../../components/CustomText'
import { text } from '../../res/strings'
import { fontsFamily } from '../../assets/Fonts'



const { width ,height} = Dimensions.get("window")

const EPollingCard = () => {

  return (

          <View style={styles.ViewCard}>
            <View style={styles.viewcard1}>
              <Text style={styles.texthead}>B-101</Text>
              <View style={styles.textbottom}>
                <Text style={styles.text}>10:00 AM</Text>
                <Text style={styles.text}>16 May 2023</Text>
              </View>
            </View>
            <View>
              <View style={styles.viewText}>
                <View style={styles.viewcentertext}>
                <CustomText
                fontWeight={fontsFamily.medium}
                style={styles.title}>
                {text.FaultyElevator}
              </CustomText>
                 <Text style={styles.textId}>ID 0032435</Text>
                </View>
              </View>

              <View style={{ marginVertical: 25, marginLeft: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", }}>
                  <Text style={styles.text1}>Reported by</Text>
                  <Text style={styles.text2}>Status</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", }}>
                  <CustomText
                    fontWeight={fontsFamily.medium}
                    style={styles.title}>
                    {text.Name}
                  </CustomText>
                  <CustomText
                    fontWeight={fontsFamily.medium}
                    style={styles.pendingtitle}>
                    {text.pending}
                    </CustomText>
                    </View>
              </View>
            </View>
            </View>

  )
}

export default EPollingCard;



const styles = StyleSheet.create({
    root: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
  },

  viewcard1: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    width: width * 0.28,
    justifyContent: "space-around"
  },
  textbottom: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 5
  },
  texthead: {
    marginLeft: 15,
    fontSize: width * 0.040,
    fontWeight: "bold",
    color: "#FFF"
  },
  text1: {
    marginLeft: 5, 
    fontSize: width * 0.030, 
    color: colors.darkGray
    
  },
  text2: {
    marginLeft: 120, 
    fontSize: width * 0.030, 
    color: colors.darkGray
    
  },
  title:{
    color: colors.primary, 
    fontSize: width * 0.038, 
    marginLeft: 5, 
    fontWeight: "700"
  },
  titlependiing:{
    color: colors.primary, 
    fontSize: width * 0.038, 
    fontWeight: "700",
  },
  textId:{
    marginLeft: 4, 
    fontSize: 13, 
    color: colors.darkGray
  },
   textcentr: {
    fontSize: 15,
    fontFamily: "Montserrat-Regular",
    fontWeight: '400',
    color: "#555555",
    marginLeft: 5
  },
  viewText: {
    marginTop: 7,
    marginLeft: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  viewcentertext: {
    justifyContent: 'center',
    alignItems: 'flex-start',

  },
  ViewCard: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    height: height * 0.150,
    width: width * 0.88,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  titlename:{
    marginLeft: 4, 
    fontSize: width * 0.040, 
    color: colors.primary, 
    // fontWeight: "700"
  },

});








