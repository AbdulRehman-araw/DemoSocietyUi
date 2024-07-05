import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import CustomText from '../../../components/CustomText'
import { fontsFamily } from '../../../assets/Fonts'
import { colors } from '../../../styles/colors'
import { styles } from '../styles/styles'
import moment from 'moment'


const { width } = Dimensions.get("window")

const RecentPaymentItem = ({ title, date, img, amount }) => {
  return (
    <View style={styles.paymentdetail}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={img}
          resizeMode="contain"
          style={{ width: width * 0.039 }}
        />
        <CustomText
          fontWeight={fontsFamily.bold}
          style={{
            textTransform: "capitalize",
            color: colors.black,
            fontSize: width * 0.035,
            marginLeft: 10,
            alignItems: 'center',
          }}>
          {title}
        </CustomText>
        <CustomText
          fontWeight={fontsFamily.medium}
          style={{
            color: colors.lightgray,
            fontSize: width * 0.03,
            marginLeft: 5,
            alignItems: 'center',
          }}>
          {`(${moment(date).format('DD/MM/yyyy')})`}
        </CustomText>
      </View>
      <CustomText
        fontWeight={fontsFamily.regular}
        style={{
          color: colors.primary,
          fontSize: width * 0.028,
          // marginLeft: 5,/s
          alignItems: 'center',
        }}>
        - Rs {amount}
      </CustomText>
    </View>
  )
}

export default RecentPaymentItem