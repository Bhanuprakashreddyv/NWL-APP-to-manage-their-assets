import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase } from '../../FirebaseConfig';
import 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Screens 
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import colors from '../Config/colors';
const Stack = createNativeStackNavigator();


const RootStack = () => {
    const auth = getAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("we are authenticated")
            const uid = user.uid;
            setIsLoggedIn(true)
        } else {
            // User is signed out
            setIsLoggedIn(false)
        }
    });
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

                        },
                        headerTintColor: colors.white,
                        headerTransparent: true,
                        headerTitle: '',

                    }}>
                    <Stack.Screen name='LoginScreen' component={LoginScreen} />
                    <Stack.Screen options={{ headerTintColor: 'black' }} name='SignUpScreen' component={SignUpScreen} />
                </Stack.Navigator>
            }

        </NavigationContainer>

    )

}

export default RootStack;