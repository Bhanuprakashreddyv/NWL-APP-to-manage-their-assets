import { StyleSheet } from "react-native"


import colors from "../Config/colors";
const formStyle = StyleSheet.create({
    txt: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginTop: 20,
    },
    formArea: {
        width: '90%',
        marginTop: 50,
        marginLeft: 25,
        borderRadius: 15,
        borderWidth: 1,
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
        color: '#fff'
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
        left: 15,
        top: 38,
        position: 'absolute',
        zIndex: 1
    },

    styledButton: {
        padding: 15,
        backgroundColor: colors.brand,
        justifyContent: "center",
        borderRadius: 5,
        marginVertical: 5,
        height: 60
    },
    buttonText: {
        color: colors.buttonColor,
        fontSize: 16
    }
});

export default formStyle