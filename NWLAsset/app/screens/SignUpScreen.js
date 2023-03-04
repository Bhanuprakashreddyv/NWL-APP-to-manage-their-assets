import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

import formStyle from './FormSytle';
import colors from "../Config/colors";
import Logo from "../components/Logo";
import Welcome from '../components/Subtitle';
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper"

function SignUpScreen({ navigation }) {
    const [hidePassword, setHidePassword] = useState(true)

    
    return (
        <KeyboardAvoidingView>
            <View style={formStyle.styledContainer}>
                <StatusBar style="dark" />
                <View style={formStyle.innerContainer}>
                    <Welcome />
                    <Text style={formStyle.txt}>Account Sign Up
                    </Text>
                    <Formik initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
                        onSubmit={(values) => { console.log(values) }}>

                        {
                            ({ handleChange, handleBlur, handleSubmit, values }) => (
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
                                    <Text style={formStyle.MsgBox}>....</Text>
                                    <TouchableOpacity onPress={handleSubmit} style={formStyle.styledButton}>
                                        <Text style={formStyle.buttonText}>

                                            Signup
                                        </Text>
                                    </TouchableOpacity>
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

export default SignUpScreen;