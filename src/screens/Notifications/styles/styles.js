import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";


const { width, height } = Dimensions.get("window")


export const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: colors.white,
    },

    viewdiscussion: {
        flexDirection: 'row',
        alignItems: "center",
        width: width * 0.70,
        marginLeft: 20,
        marginTop: 20,
        height: width * 0.15,
    },

    discussiontext: {
        color: colors.dark,
        fontSize: width * 0.033,
        marginLeft: 15,
        marginTop: 3
    },

    discussiontext2: {
        color: colors.black,
        fontSize: width * 0.033,
        marginLeft: 15,
        marginTop: 3

    },
    elevatortext: {
        color: colors.dark,
        fontSize: width * 0.042,
        marginLeft: 10
    },

    elevatortext2: {
        color: colors.lightgray,
        fontSize: width * 0.033,
        marginLeft: 10,
        marginTop: 3
    },

    datetext: {
        color: colors.dark,
        fontSize: width * 0.026,
        marginLeft: 15
    },
    timetext: {
        color: colors.dark,
        fontSize: width * 0.026,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lightgray,
        width: width * 0.80,
        marginLeft: 30,
        marginTop: 10,
        marginBottom: 12
    },
    viewdiscussion2: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        width: width * 0.70,
        marginLeft: 25,
        height: width * 0.12,
        marginTop: 10,
        height: width * 0.25,
    },
    dateelevator: {
        color: colors.lightgray,
        fontSize: width * 0.026,
        marginLeft: 12
    },
    timeelevator: {
        color: colors.lightgray,
        fontSize: width * 0.026,

    },

    //new styles
    leftHeading: {
        fontSize: width * 0.05,
        marginHorizontal: width * 0.04,
        marginTop: width * 0.02
    }

});

