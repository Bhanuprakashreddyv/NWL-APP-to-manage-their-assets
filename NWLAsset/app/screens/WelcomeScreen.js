import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

import formStyle from './FormSytle';
import colors from "../Config/colors";

// Keyboard avoiding wrapper
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper"

function WelcomeScreen({ navigation }) {
    const [hidePassword, setHidePassword] = useState(true)
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
                        <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen') }} style={formStyle.styledButton}>
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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <View style={formStyle.leftIcon}>
                <Octicons name={icon} size={30} color={colors.brand}></Octicons>

            </View>
            <Text style={formStyle.styleInputLabel}>{label}</Text>
            <TextInput style={formStyle.styleTextInput} {...props} />
            {
                isPassword && (
                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={formStyle.rightIcon}>
                        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={colors.darkLight} />
                    </TouchableOpacity>
                )
            }
        </View>

    )
}

export default WelcomeScreen;