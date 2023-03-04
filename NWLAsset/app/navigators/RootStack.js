import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase } from '../../Config';
import 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Screens 
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import colors from '../Config/colors';
const Stack = createNativeStackNavigator();

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("we are authenticated")
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});
const [isLoggedIn, setIsLoggedIn] = useState(false)
const RootStack = () => {
    return (
        <NavigationContainer >
            {isLoggedIn ? <Stack.Navigator>
                <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
            </Stack.Navigator> :
                <Stack.Navigator
                    screenOptions={{
                        headerStyle:
                        {
                            backgroundColor: 'transparent',
                            height: 0,
                            paddingTop: 50,

                        },
                        headerTintColor: colors.white,
                        headerTransparent: true,
                        headerTitle: '',

                    }}>
                    <Stack.Screen options={{ headerShown: false }} name='LoginScreen' component={LoginScreen} />
                    <Stack.Screen options={{ headerTintColor: 'black' }} name='SignUpScreen' component={SignUpScreen} />
                </Stack.Navigator>
            }

        </NavigationContainer>

    )

}

export default RootStack;