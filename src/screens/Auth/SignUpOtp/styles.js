import { StyleSheet, Dimensions, I18nManager, Platform } from 'react-native';
import { fontsFamily } from '../../../assets/Fonts';
import { colors } from '../../../styles/colors';

//Color
// import color from '../../constants/color';


// dimenstion
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },

    contStyle: {
        marginTop: height * 0.04,
        paddingBottom: height * 0.04,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt1: {
        fontSize: width * 0.033,
        color: 'black',
    },
    mainImg: {
        width: width * 0.5,
        height: width * 0.5,
        marginBottom: width * 0.1
    },
    img: {
        width: '100%',
        height: '100%',
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    textInputContainer: {
        marginBottom: 20,
    },
    roundedTextInput: {
        borderRadius: 10,
        borderWidth: 4,
    },
    btnMainView: {
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: width * 0.1
    },
    btnCon: {
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: width * 0.03,
        backgroundColor: colors.primary,
        borderRadius: width * 0.02
    },
    btnText: {
        fontFamily: fontsFamily.regular,
        fontSize: width * 0.035,
        color: colors.white
    },
    TextInputCon: {
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: colors.gray,
        borderWidth: 1,
        padding: width * 0.025,
        borderRadius: width * 0.03
    },
    TextInput: {
        width: '88%',
        // borderColor:colors.gray,
        // borderWidth:1,
        // borderRadius:width*0.02,
        // paddingHorizontal:width*0.03,
        paddingVertical: Platform.OS == 'ios' ? width * 0.02 : 0
    },
    inputImg: {
        height: width * 0.07,
        width: width * 0.07,
    },
    textToVerify: {
        color: colors.black,
        fontSize: width * 0.04
    }
});