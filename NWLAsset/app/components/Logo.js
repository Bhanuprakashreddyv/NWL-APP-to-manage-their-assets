import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import formStyle from '../screens/FormSytle';

function logo(props) {
    return (
        <View style={formStyle.logo}>

            <Image source={require('../assets/Nlogo.png')} />

        </View>
    );
}

export default logo;
