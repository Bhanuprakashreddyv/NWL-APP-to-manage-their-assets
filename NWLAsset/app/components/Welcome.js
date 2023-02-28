import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Welcome(props) {
    return (
        <View>
            <Text style={styles.txt}>
                Northumbria Living Water Asset App
            </Text>

        </View>
    );
}
const styles = StyleSheet.create({

    txt: {
        textAlign: 'center',
        fontSize: 20,
        margin: 7,
        marginTop: 30,
        fontWeight: 'bold',
        color: '#047717'

    }
})
export default Welcome;