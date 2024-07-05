import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")


export const styles = StyleSheet.create({

  paymentview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: width * 0.05,
    marginBottom: width * 0.02
  },
  amountcard: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 35,
    borderRadius: 10,
    borderColor: colors.lightgray,
    marginHorizontal: width * 0.05,

  },
  labelContainer: {
    marginLeft: 25,
    paddingHorizontal: 10, // Amount of spacing between border and first/last letter
    marginStart: 10, // How far right do you want the label to start
    zIndex: 1, // Label must overlap border
    elevation: 1, // Needed for android
    shadowColor: colors.white, // Same as background color because elevation: 1 creates a shadow that we don't want
    position: "absolute", // Needed to be able to precisely overlap label with border
    top: -5, // Vertical position of label. Eyeball it to see where label intersects border.
    marginTop: 30,

  },


});
