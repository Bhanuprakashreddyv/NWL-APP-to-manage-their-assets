import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import colors from '../Config/colors';

function SuccessScreen({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.title}> Success !</Text>

            <Ionicons name="checkmark-circle" size={150} color='green' />

            <Text style={styles.message} textAlign='center' textAlignVertical='center'>Inspection record and media files have been added successfully to the storage.</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InspectionScreen')}>
                    <Text style={styles.buttonText}><Ionicons name='add-circle' size={15} /> New Inspection</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonReport} onPress={() => navigation.navigate('ReportScreen')}>
                    <Text style={styles.buttonText}><Ionicons name="document-text-outline" size={15} color="white" /> Report Page</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30,
        color: colors.brand,


    },
    message: {
        fontSize: 20,
        marginBottom: 20,
        color: 'black',
        justifyContent: 'center',
        marginTop: 50,

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 130,
    },
    button: {
        backgroundColor: '#007aff',
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
    buttonReport: {
        backgroundColor: '#FF8C00',
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SuccessScreen;