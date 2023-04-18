import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';


import colors from '../Config/colors';

const Stack = createNativeStackNavigator();


const AuthStack = () => {

    return (


        <Stack.Navigator screenOptions={{
            headerStyle:
            {
                backgroundColor: 'transparent',

            },
            cardStyle: { backgroundColor: '#fff' },
            headerTitle: '',
            contentStyle: {
                backgroundColor: 'transparent',
            },

        }}>

            <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen options={{ headerTintColor: colors.brand }} name='SignUpScreen' component={SignUpScreen} />
        </Stack.Navigator>

    );
}

export default AuthStack;