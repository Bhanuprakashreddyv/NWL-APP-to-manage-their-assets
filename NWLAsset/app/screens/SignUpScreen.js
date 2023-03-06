import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from '../../FirebaseConfig';
import formStyle from './FormSytle';
import colors from "../Config/colors";
import Welcome from '../components/Subtitle';
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper"

function SignUpScreen({ navigation }) {
    const [hidePassword, setHidePassword] = useState(true);
    const validateEmail = (email) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return regex.test(email);
    };

    const handleSignUp = (credentials, setSubmitting) => {
        handleMessage(null)
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                console.log(" User Created")
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: credentials.firstName + ' ' + credentials.lastName
                }).then(() => {
                    console.log(" Display name " + user.displayName)
                }).catch((error) => {
                    handleMessage(error.message, "FAILED")
                    setSubmitting(false);
                });
                navigation.navigate('WelcomeScreen', user.displayName)
            })
            .catch(error => {
                handleMessage(error.message, "FAILED")
                setSubmitting(false);
            });

    }
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
                    <Welcome />
                    <Text style={formStyle.txt}>Account Sign Up
                    </Text>
                    <Formik initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            const isValidEmail = validateEmail(values.email);
                            if (values.firstName == '') {
                                handleMessage('First Name is Required');
                                setSubmitting(false);
                            }
                            else if (values.lastName == '') {
                                handleMessage('Last Name is Required');
                                setSubmitting(false);
                            }
                            else if (values.email == '') {
                                handleMessage('Email is Required');
                                setSubmitting(false);
                            }
                            else if (values.password == '') {
                                handleMessage('Password is Required');
                                setSubmitting(false);
                            }
                            else if (values.confirmPassword == '') {
                                handleMessage('Confirm Password is Required');
                                setSubmitting(false);
                            }
                            else if (values.password.trim() != values.confirmPassword.trim()) {
                                handleMessage('Passwords does not match ');
                                setSubmitting(false);
                            }
                            else if (!isValidEmail) {
                                handleMessage('Email is invalid');
                                setSubmitting(false);
                            }
                            else {
                                handleSignUp(values, setSubmitting)
                            }
                            console.log(values)


                        }}>

                        {
                            ({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                                <View style={formStyle.formArea}>


                                    <MyTextInput
                                        label="First Name"
                                        icon="person"
                                        placeholder="John"
                                        placeholderTextColor={colors.darkLight}
                                        onChangeText={handleChange('firstName')}
                                        onBlur={handleBlur('firstName')}
                                        value={values.firstName}
                                    />
                                    <MyTextInput
                                        label="Last Name"
                                        icon="person"
                                        placeholder="Doe"
                                        placeholderTextColor={colors.darkLight}
                                        onChangeText={handleChange('lastName')}
                                        onBlur={handleBlur('lastName')}
                                        value={values.lastName}
                                    />

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
                                    <MyTextInput
                                        label="Confirm Password"
                                        icon="lock"
                                        placeholder="* * * * * * * * * * *"
                                        placeholderTextColor={colors.darkLight}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />
                                    <Text style={[formStyle.MsgBox, textStyle]}>{message}</Text>

                                    {!isSubmitting &&

                                        <TouchableOpacity onPress={handleSubmit} style={formStyle.styledButton}>
                                            <Text style={formStyle.buttonText}>

                                                Signup
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                    {isSubmitting &&
                                        <TouchableOpacity style={formStyle.styledButton}>
                                            <ActivityIndicator size="large" color={colors.white} />
                                        </TouchableOpacity>
                                    }
                                    <View style={formStyle.line} />

                                    <View style={formStyle.extraView}>
                                        <Text style={formStyle.extraText}>
                                            Already have an account?
                                        </Text>
                                        <TouchableOpacity style={formStyle.textLink} onPress={() => navigation.navigate('LoginScreen')} >
                                            <Text style={formStyle.textContent}>
                                                Login
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

export default SignUpScreen;