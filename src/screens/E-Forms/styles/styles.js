import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")



export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  viewbtnssubmit: {
    backgroundColor: colors.primary,
    height: width * 0.12,
    width: width * 0.70,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 25

  },
  textbtnssubmit: {
    color: colors.white,
    fontSize: width * 0.049,
    marginTop: 8,
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular',

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  modalViewmessage: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    height: "40%",
    width: "60%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    height: "72%",
    width: "85%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  username: {
    color: colors.primary,
    fontSize: width * 0.04,
  },
  name: {
    color: colors.lightdarkgray,
    fontSize: width * 0.03,
  },
  viewname: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: width * 0.016
  },

});


