import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

import formStyle from './FormSytle';
import colors from "../Config/colors";

// firebase
import { auth } from '../../FirebaseConfig';
import { signOut } from "firebase/auth";

// Keyboard avoiding wrapper
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper"

function WelcomeScreen({ navigation }) {

    const handleSignout = () => {
        signOut(auth).then(() => {
            navigation.navigate('LoginScreen')
        }).catch((error) => {
            console.log(error.message)
        });

    }

    return (
        <KeyBoardAvoidingWrapper>
            <View style={formStyle.innerContainer}>
                <Image style={formStyle.welcomeImage} source={require('../assets/welcomeImg.jpg')} />

                <StatusBar style="light" />
                <View style={formStyle.welcomeContainer}>


                    <Text style={formStyle.welcomTitle}>Welcome Buddy!
                    </Text>
                    <Text style={formStyle.welcomeSubTitle}>Uloma Okenyi
                    </Text>
                    <Text style={formStyle.welcomeSubTitle}>cyndibilo@gmail.com
                    </Text>
                    <View style={formStyle.welcomeformArea}>

                        <View style={formStyle.line} />
                        <TouchableOpacity onPress={handleSignout} style={formStyle.styledButton}>
                            <Text style={formStyle.buttonText}>

                                Logout
                            </Text>
                        </TouchableOpacity>


                    </View>

                </View>
            </View>
        </KeyBoardAvoidingWrapper>

    );
}



export default WelcomeScreen;