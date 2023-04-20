import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import formStyle from './FormSytle';
import Ionicons from '@expo/vector-icons/Ionicons'

// firebase
import { auth } from '../../FirebaseConfig';
import { signOut } from "firebase/auth";
// Keyboard avoiding wrapper
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper"

function WelcomeScreen({ navigation, displayName = '' }) {
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
                <Image  source={require('../assets/welcomeImg.jpg')} />

                <StatusBar style="light" />
                <View style={formStyle.welcomeContainer}>


                    <Text style={formStyle.welcomTitle}>Welcome {displayName || auth.currentUser?.displayName}!
                    </Text>

                    <Text style={formStyle.welcomeSubTitle}> {auth.currentUser?.email}
                    </Text>
                    <View style={formStyle.welcomeformArea}>

                        <View style={formStyle.line} />
                        <TouchableOpacity onPress={handleSignout} style={formStyle.styledButton}>
                            <Text style={formStyle.buttonText}>

                                Logout
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('TabNavigators')} style={formStyle.homeButton}>
                            <Text style={formStyle.buttonHomeText}>

                                <Ionicons name='home' size={20} ></Ionicons>  Home
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </KeyBoardAvoidingWrapper>

    );
}

export default WelcomeScreen;