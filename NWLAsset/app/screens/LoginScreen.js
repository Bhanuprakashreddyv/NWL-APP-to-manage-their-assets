import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons'
import { signInWithEmailAndPassword } from "firebase/auth";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper"

import { auth } from '../../FirebaseConfig';
import formStyle from './FormSytle';
import colors from "../Config/colors";
import Logo from "../components/Logo";
import Welcome from '../components/Subtitle';

function LoginScreen({ navigation }) {
    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null)
        signInWithEmailAndPassword(auth, credentials.email.trim(), credentials.password.trim())
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('WelcomeScreen')
            })
            .catch(error => {
                handleMessage(error.message, "FAILED")
                alert(error.message)
                setSubmitting(false);
            });

    }
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState('');
    const [textStyle, setTextStyle] = useState({});

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        let textStyle = {};
        type === 'FAILED' ? textStyle = formStyle.error : textStyle = formStyle.success;
        setTextStyle(textStyle);

    }
    return (
        <KeyBoardAvoidingWrapper>
            <View style={formStyle.styledContainer}>
                <StatusBar style="dark" />
                <View style={formStyle.innerContainer}>

                    <Logo />
                    <Welcome />
                    <Text style={formStyle.txt}>Account Login
                    </Text>
                    <Formik initialValues={{ email: '', password: '' }}
                        onSubmit={(values, { setSubmitting }) => {

                            if (values.email == '' || values.password == '') {
                                handleMessage('Please Enter Email and Password');
                                setSubmitting(false);
                            }
                            else {
                                handleLogin(values, setSubmitting)
                            }

                        }}>

                        {
                            ({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
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
                                    <Text style={[formStyle.MsgBox, textStyle]}>{message}</Text>
                                    {!isSubmitting &&
                                        <TouchableOpacity onPress={handleSubmit} style={formStyle.styledButton}>
                                            <Text style={formStyle.buttonText}>
                                                Login
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                    {isSubmitting &&
                                        <TouchableOpacity style={formStyle.styledButton}>
                                            <ActivityIndicator size="large" color={colors.white} />
                                        </TouchableOpacity>
                                    }
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

export default LoginScreen;