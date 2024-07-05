import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")


export const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: width * 0.06,
    zIndex: 99
  },
  amountcard: {
    height: height * 0.125,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    marginHorizontal: width * 0.02,
    top: 30
  },
  recentpayments: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },
  paymentdetail: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
    
  },
  titleStyle: {
    color: colors.darkGray,
    fontSize: width * 0.032,
  },
  paymentTitleStyle: {
    color: colors.primary,
    fontSize: width * 0.04,
    alignItems: 'center',
  },
  timeStampStyle: {
    color: colors.lightgray,
    fontSize: width * 0.028,
    marginTop: 4
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  }
});




