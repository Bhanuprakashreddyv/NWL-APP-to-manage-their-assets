import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import colors from "../Config/colors";
const StatusBarHeight = Constants.statusBarHeight;
const formStyle = StyleSheet.create({
    styledContainer: {
        flex: 1,
        padding: 25,
        backgroundColor: colors.white,
        paddingTop: StatusBarHeight + 10,
        paddingBottom: 300

    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
        flex: 1
    },
    logo: {
        paddingTop: 50,
        marginTop: 30

    },
    subtitle: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
        color: colors.brand

    },
    welcomTitle: {
        fontSize: 30,
        marginTop: 30,
        fontWeight: 'bold',
        color: colors.brand,
        marginBottom: 5,


    },
    welcomeSubTitle: {
        fontWeight: 'normal',
        fontSize: 20,
        marginTop: 5,

    },

    txt: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginTop: 20,
    },
    formArea: {
        width: '90%',
        marginTop: 20,
        borderRadius: 15,
        borderWidth: 1,
        padding: 20,
        borderColor: colors.brand

    },
    welcomeformArea: {
        width: '90%',

        padding: 20,
        borderColor: colors.brand

    },
    styleTextInput: {
        backgroundColor: colors.textBackground,
        padding: 15,
        paddingLeft: 55,
        paddingRight: 55,
        fontSize: 16,
        height: 60,
        marginVertical: 3,
        marginBottom: 10,
    },
    styleInputLabel: {
        fontSize: 15,
        textAlign: 'left',
        fontWeight: 'bold'

    },
    leftIcon: {
        left: 15,
        top: 38,
        position: 'absolute',
        zIndex: 1
    },

    rightIcon: {
        right: 15,
        top: 38,
        position: 'absolute',
        zIndex: 1
    },

    styledButton: {
        padding: 15,
        backgroundColor: colors.brand,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        height: 60,

    },

    homeButton: {
        padding: 15,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: colors.brand,
        borderWidth: 1,
        marginVertical: 5,
        height: 60,

    },
    buttonHomeText: {
        color: colors.brand,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonText: {
        color: colors.buttonColor,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    MsgBox: {
        textAlign: 'center',
        fontSize: 13
    },
    googleButton: {
        padding: 15,
        backgroundColor: colors.white,
        borderColor: colors.red,
        flexDirection: "row",
        borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        height: 60,

    },
    googleText: {
        color: colors.red,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 10
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: colors.darkLight,
        marginVertical: 10
    },
    extraView: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: "center",
        padding: 10
    },
    extraText: {
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 15
    },
    textLink: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContent: {
        color: colors.brand,
        alignItems: 'center',
        marginLeft: 5
    },
    welcomeContainer: {
        width: '100%',
        alignItems: 'center',
        flex: 1
    },
    avatar: {
        width: 100,
        height: 100,
        margin: 'auto',
        borderRadius: 50,
        borderColor: colors.brand,
        borderWidth: 2,
        marginBottom: 10,
        margingTop: 10,
    },
    welcomeImage: {
        height: '150%',
        minWidth: '100%'
    },
    success: {
        color: 'green',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
    },
    warning: {
        color: 'orange',
        fontWeight: 'bold',
    },
});

export default formStyle