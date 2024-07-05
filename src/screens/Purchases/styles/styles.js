import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")



export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card1: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: 'center',
    width: width * 0.92,
    height: width * 0.15,
    marginTop: 20,

  },
  viewname: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: width * 0.016
  },
  username: {
    color: colors.primary,
    fontSize: width * 0.04,
  },
  viewname: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: width * 0.016,
    paddingHorizontal: width * 0.03,
    
  },
  top:{
    paddingTop: width*0.05
  },
   viewnameTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:-100
  },
  tableCell: {
    justifyContent: 'center',
    alignItems:'center',
    flex:0.3,
   
  },
  tableCellName:{
    justifyContent: 'center',
    alignItems:'center',
    flex:0.7,
  },
  border: {
    borderColor: colors.gray,
    borderLeftWidth: 1,
    
  },
  card2: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: 'center',
    width: width * 0.92,
    height: width * 0.15,
    marginTop: 10,
  },
  card3: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: 'center',
    width: width * 0.92,
    height: width * 0.15,
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.02,
    marginVertical: width * 0.02
  },
  card5: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: colors.lightoffwhite,
    borderRadius: 8,
    width: width * 0.86,
    height: width * 0.15,
    marginTop: 15

  },
  card6: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: colors.lightoffwhite,
    borderRadius: 8,
    width: width * 0.86,
    height: width * 0.15,
    marginTop: 15

  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightoffwhite
  },
  hoursstyle: {
    color: colors.black,
    fontSize: width * 0.026,
    paddingVertical: 0.5,

  },
  emergencytext: {
    backgroundColor: colors.lightoffwhite,
    width: width,
    height: width * 0.10,
    marginTop: 15
  },
  communitytext: {
    color: colors.black,
    fontSize: width * 0.038,
    marginTop: 10,
    marginLeft: 15
  },
  communitycontact: {
    backgroundColor: colors.lightoffwhite,
    width: width,
    height: width * 0.10,
    marginTop: 10
  },
  communitycontacttext: {
    color: colors.black,
    fontSize: width * 0.038,
    marginTop: 10,
    marginLeft: 15
  },

  cafeteria1: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: 'center',
    width: width * 0.92,
    height: width * 0.15,
    marginTop: 5,
  },
  cafeteria2: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: 'center',
    width: width * 0.92,
    height: width * 0.15,
    marginTop: 5,
  }




});