import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import Logo from "../components/Logo";
import Welcome from '../components/Welcome';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import formStyle from './FormSytle';
import { Octicons } from '@expo/vector-icons'

const { primary, brand, buttonColor } = Colors;
function LoginScreen(props) {
    return (
        <View>
            <StatusBar style="dark" />
            <Logo />
            <Welcome />
            <Text style={formStyle.txt}>Account Login
            </Text>
            <Formik initialValues={{ email: '', password: '' }}
                onSubmit={(values) => { console.log(values) }}>

                {
                    ({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={formStyle.formArea}>

                            <MyTextInput
                                label="Email Address"
                                icon="mail"
                                placeholder="andj@email.com"
                                placeholderTextColor={brand}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                        </View>
                    )
                }
            </Formik>
        </View>

    );
}

const MyTextInput = ({ label, icon, ...props }) => {
    return (
        <View>
            <View style={formStyle.leftIcon}>
                <Octicons name={icon} size={30} color={brand}></Octicons>

            </View>
            <Text style={formStyle.styleInputLabel}>{label}</Text>
            <TextInput style={formStyle.styleTextInput} {...props} />
        </View>

    )
}

export default LoginScreen;