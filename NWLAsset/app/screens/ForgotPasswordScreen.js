import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper"

import { auth } from '../../FirebaseConfig';
import formStyle from './FormSytle';
import colors from "../Config/colors";
import Logo from "../components/Logo";
import Welcome from '../components/Subtitle';


export default function ForgotPasswordScreen() {

    const [message, setMessage] = useState('');
    const [textStyle, setTextStyle] = useState({});

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        let textStyle = {};
        type === 'FAILED' ? textStyle = formStyle.error : textStyle = formStyle.success;
        setTextStyle(textStyle);

    }
    const handleResetPassword = async (credentials, setSubmitting) => {
        try {

            handleMessage(null)
            await sendPasswordResetEmail(auth, credentials.email);

            // Email sent.
            setSubmitting(false);
            Alert.alert("Reset password email sent!");
            handleMessage("Reset password email sent!");

        } catch (error) {
            handleMessage(error.message, "FAILED")
            alert(error.message)
            setSubmitting(false);
        }
    };
    return (

        <KeyBoardAvoidingWrapper>
            <View style={formStyle.styledContainer}>
                <StatusBar style="dark" />
                <View style={formStyle.innerContainer}>

                    <Logo />
                    <Welcome />
                    <Text style={formStyle.txt}>Forgot Password
                    </Text>
                    <Formik initialValues={{ email: '' }}
                        onSubmit={(values, { setSubmitting }) => {

                            if (values.email == '') {
                                handleMessage('Please Enter Email');
                                setSubmitting(false);
                            }
                            else {
                                handleResetPassword(values, setSubmitting)
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


                                    <Text style={[formStyle.MsgBox, textStyle]}>{message}</Text>
                                    {!isSubmitting &&
                                        <TouchableOpacity onPress={handleSubmit} style={formStyle.styledButton}>
                                            <Text style={formStyle.buttonText}>
                                                Reset Password
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                    {isSubmitting &&
                                        <TouchableOpacity style={formStyle.styledButton}>
                                            <ActivityIndicator size="large" color={colors.white} />
                                        </TouchableOpacity>
                                    }

                                </View>
                            )
                        }
                    </Formik>
                </View>

            </View>
        </KeyBoardAvoidingWrapper>
    )
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <View style={formStyle.leftIcon}>
                <Octicons name={icon} size={30} color={colors.brand}></Octicons>

            </View>
            <Text style={formStyle.styleInputLabel}>{label}</Text>
            <TextInput style={formStyle.styleTextInput} {...props} />

        </View>

    )
}
