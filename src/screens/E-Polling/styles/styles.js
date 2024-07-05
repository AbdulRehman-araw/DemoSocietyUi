import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
  },

  btncard1: {
    alignItems: 'center',
    borderRadius: 12,
    borderColor: colors.gray,
    borderWidth: 1,
    width: width * 0.41,
    height: width * 0.12,
    marginTop: 10,
    marginBottom: 10
  },
  btncard2: {
    alignItems: 'center',
    borderRadius: 12,
    borderColor: colors.gray,
    borderWidth: 1,
    width: width * 0.44,
    height: width * 0.12,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10

  },
  mainView: {
    marginHorizontal: 16
  },
  mainLine: {
    position: 'absolute',
    width: 2,
    height: '100%',
    backgroundColor: colors.gray,
  },
  imgTag: {
    position: 'absolute',
    marginHorizontal: 9

  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 4,
    backgroundColor: colors.white
  },
  dateView: {
    flexDirection: 'row',
    marginVertical: 14
  },
  detailCard: {
    borderWidth: 1,
    height: width * 0.26,
    width: width * 0.8,
    paddingHorizontal: 10,
    borderColor: colors.gray, borderRadius: 20, flexDirection: 'row', overflow: "hidden",
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  voteTag: {
    width: width * 0.26,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    transform: [{ rotate: `-90deg` }],
    marginLeft: width* 0.12,
  },
  textContainer: {
    width: width * 0.55,
    padding: 10,
    justifyContent: "space-between",
    
  }

});