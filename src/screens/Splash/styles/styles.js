import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";

const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    // position:"absolute",
    // width:width / 2.4 ,
    // height:width / 2.4,
    alignSelf: 'center'
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: "#ECF4F8",
    justifyContent: "center",
    // alignItems:"center"
  },
  center: {
    flex: 0.5,
    alignSelf: 'center',
    alignItems: 'center'
  }

});