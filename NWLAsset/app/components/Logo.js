import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import formStyle from '../screens/FormSytle';

function logo(props) {
    return (
        <View style={formStyle.logo}>

            <Image source={require('../assets/Northumbrian-Water-logo.png')} />

        </View>
    );
}

export default logo;
