import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import colors from "../Config/colors";

const AppStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        paddingBottom: 20, // smaller padding below screen
        backgroundColor: colors.white,
        justifyContent: 'space-between',
    },
    siteImgContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        alignItems: 'center',
        paddingBottom: 20, // smaller padding below screen
        backgroundColor: colors.white,
        justifyContent: 'space-between',
    },
    imgContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.2,
        justifyContent: 'center', // center vertically
        alignItems: 'center', // center horizontally
        borderRadius: 15,
        marginTop: 20, // no margin between images
        marginBottom: 30, // no space between last image and screen bottom
    },



    image: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
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
        fontSize: 30,
        fontWeight: 'bold',
    },
    siteListContainer: {
        padding: 5,
        paddingTop: 10,

    },

    siteList: {
        height: 60,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.brand
    },

    siteListText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.brand,

    },
    assetListContainer: {
        padding: 5,
        paddingTop: 10,

    },
    assetListText: {
        fontSize: 15,
        color: colors.brand,
        fontWeight: 'bold',

    },
    assetList: {
        height: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.brand
    },
    searchIcon: {
        marginTop: 15,
        marginHorizontal: 8,
        color: colors.white,
    },
    searchWrapper: {
        backgroundColor: colors.darkash,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 50,
        margin: 10,
        borderRadius: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 0,
        color: "white"
    }
})

export default AppStyle;
