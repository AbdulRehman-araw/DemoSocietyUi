import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")



export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  discussion1: {
    flexDirection: 'row',
    alignItems: "center",
    marginVertical: width * 0.04,
  },
  discussion2: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.92,
    height: width * 0.15,
    marginTop: 20,

  },
  discussion3: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.88,
    height: width * 0.15,
    marginTop: 20,

  },


});