import React, { useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from '../../Config';

import formStyle from './FormSytle';
import colors from "../Config/colors";
import Logo from "../components/Logo";
import Welcome from '../components/Subtitle';



function LoginScreen({ navigation }) {

    const handleLogin = (credentials) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                console.log('Logged in with:', user.email);
                const user = userCredential.user;

            })
            .catch(error => alert(error.message));

    }
    const [hidePassword, setHidePassword] = useState(true)
    return (
        <KeyboardAvoidingView>
            <View style={formStyle.styledContainer}>
                <StatusBar style="dark" />
                <View style={formStyle.innerContainer}>

                    <Logo />
                    <Welcome />
                    <Text style={formStyle.txt}>Account Login
                    </Text>
                    <Formik initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => {
                            handleLogin(values)
                            navigation.navigate('WelcomeScreen')

                        }}>

                        {
                            ({ handleChange, handleBlur, handleSubmit, values }) => (
                                <View style={formStyle.formArea}>

                                    <MyTextInput
                                        label="Email Address"
                                        icon="mail"
                                        placeholder="andj@email.com"
                                        placeholderTextColor={colors.darkLight}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                    />

                                    <MyTextInput
                                        label="Password"
                                        icon="lock"
                                        placeholder="* * * * * * * * * * *"
                                        placeholderTextColor={colors.darkLight}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />
                                    <Text style={formStyle.MsgBox}>....</Text>
                                    <TouchableOpacity onPress={handleSubmit} style={formStyle.styledButton}>
                                        <Text style={formStyle.buttonText}>

                                            Login
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={formStyle.line} />
                                    {/* <TouchableOpacity onPress={handleSubmit} style={formStyle.googleButton}>
                                        <Fontisto name='google' color={colors.red} size={25} />
                                        <Text google={true} style={formStyle.googleText}>

                                            Sign in with Google
                                        </Text>

                                    </TouchableOpacity> */}
                                    <View style={formStyle.extraView}>
                                        <Text style={formStyle.extraText}>
                                            Don't have and account already?
                                        </Text>
                                        <TouchableOpacity style={formStyle.textLink} onPress={() => navigation.navigate('SignUpScreen')} >
                                            <Text style={formStyle.textContent}>
                                                Sign Up
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                    </Formik>
                </View>

            </View>
        </KeyboardAvoidingView>


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

export default LoginScreen;