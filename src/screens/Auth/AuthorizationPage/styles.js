import { StyleSheet, Dimensions, I18nManager } from 'react-native';

//Color
import { colors } from '../../../styles/colors';
// dimenstion
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },

    contStyle: {
        flexGrow: 1,
        justifyContent: 'center',
        // backgroundColor:colors.black
        // marginTop: height * 0.04,
        // paddingBottom: height * 0.04,
    },
    txt1: {
        fontSize: width * 0.033,
        color: 'black',
    },
    imgCon: {
        height: width * 0.5,
        width: width * 0.5,
        alignSelf: 'center'
    },
    img: {
        height: '100%',
        width: '100%',
    },
    btn: {
        width: width * 0.9,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingVertical: width * 0.02,
        borderRadius: width * 0.02
    },
    btnImage: {
        width: width * 0.5,
        height: width * 0.5,
    },
    bottomBtn: {
        width: width * 0.3,
        paddingVertical: 10,
        borderColor: colors.primary,
        borderWidth: 1,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: width * 0.02,
        top: width * 0.1,
        position: 'absolute',
        right: width * 0.04
        // marginBottom:width*0.1,

    },
    bottomBtnImg: {
        width: width * 0.05,
        height: width * 0.05,
    }
});