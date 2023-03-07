import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import colors from "../Config/colors";

const AppStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        paddingBottom: 20, // smaller padding below screen
        backgroundColor: colors.white

    },
    siteImgContainer: {
        width: '95%',
        padding: 10,
        marginTop: 40,
        height: '25%',
        justifyContent: 'center', // center vertically
        alignItems: 'center', // center horizontally
        borderRadius: 15,

    },
    imgContainer: {
        width: '95%',
        height: '25%',
        justifyContent: 'center', // center vertically
        alignItems: 'center', // center horizontally
        borderRadius: 15,
        marginTop: -5, // smaller margin between images
        marginBottom: -15, // smaller space between last image and screen bottom

    },
    image: {
        width: '100%',
        borderRadius: 10,
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colors.white,
        fontSize: 40,
        fontWeight: 'bold',
    },
})

export default AppStyle;