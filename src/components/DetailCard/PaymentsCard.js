import {
    Dimensions,
    Image,
    TouchableOpacity,
    View,
    StyleSheet
  } from 'react-native';
  import React, { useState } from 'react';
  
  import { colors } from '../../styles/colors';
  import { Images } from '../../assets/Images';
  import { text } from '../../res/strings';
  import CustomText from '../../components/CustomText';
  import { fontsFamily } from '../../assets/Fonts';

  
  const { width, height } = Dimensions.get("window")
  
     
  const PaymentCards = ({ cardNumber,cardName,cardImage,selectedCard,setSelectedCard }) => {
    return (
            <TouchableOpacity activeOpacity={0.6} style={styles.paymentCard} onPress={()=>setSelectedCard(cardName)} >
              <View style={styles.card1}>
      <View style={styles.bullet}  >
        <View style={[styles.bulletSelected,{
            backgroundColor: cardName == selectedCard ? colors.primary : colors.white,

        }]} />
      </View>
               <View style={{ marginLeft: 20, }}>
  
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={styles.mastertext}>
                    {cardName}
                  </CustomText>
                  {cardNumber &&
                  <CustomText
                    fontWeight={fontsFamily.semiBold}
                    style={{ color: colors.lightgray, fontSize: width * 0.030, }}>
                    {cardNumber}
                  </CustomText>
                  } 
                </View>
              </View>
              <Image source={cardImage} resizeMode="contain" style={{ width: width * 0.12, marginRight: 15 }} />
            </TouchableOpacity>
    );
  };
  


const styles = StyleSheet.create({
  
    paymentCard: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
        borderColor: colors.gray,
        height: width * 0.15,    
      },
      card1:{
        flexDirection: "row", 
        alignItems: "center", 
        marginLeft: 10
      },
      mastertext:{
      color: colors.black, 
      fontSize: width * 0.044, 
      },
      bullet:{
        borderWidth:1,
        width:25,
        height:25,
        borderRadius:25,
        borderColor:colors.gray,
        alignItems:"center",
        justifyContent:"center"
      },
      bulletSelected:{
        width:17,
        height:17,
        borderRadius:25,
      }
      
     
      
})

  
  
  
  export default PaymentCards;