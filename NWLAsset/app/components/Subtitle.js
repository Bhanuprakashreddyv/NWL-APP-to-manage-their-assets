import React from 'react';
import { View, Text } from 'react-native';
import formStyle from '../screens/FormSytle';
function Subtitle(props) {
    return (
        <View>
            <Text style={formStyle.subtitle}>
                Northumbria Living Water Asset App
            </Text>

        </View>
    );
}

export default Subtitle;