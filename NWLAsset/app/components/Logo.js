import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

function logo(props) {
    return (
        <View style={styles.img}>

            <Image source={require('../assets/Northumbrian-Water-logo.png')} />

        </View>
    );
}
const styles = StyleSheet.create({
    img: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50
    }
})
export default logo;
