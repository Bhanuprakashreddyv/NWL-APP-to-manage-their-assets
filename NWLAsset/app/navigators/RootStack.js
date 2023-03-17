import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from '../../FirebaseConfig';
import 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth";
// Screens 
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import colors from '../Config/colors';
import TabNavigators from './TabNavigators';
import AssetScreen from '../screens/AssetScreen';

const Stack = createNativeStackNavigator();


const RootStack = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("authenticated")
            setIsLoggedIn(true)
        } else {
            // User is signed out
            setIsLoggedIn(false)
        }
    });
    return (
        <NavigationContainer >
            {isLoggedIn ? <Stack.Navigator>
                <Stack.Screen options={{ backgroundColor: 'transparent', headerShown: false }} name='WelcomeScreen' component={WelcomeScreen} />
                <Stack.Screen name="HomeScreen" component={TabNavigators} options={{ headerShown: false }} />
                <Stack.Screen name="AssetScreen" options={{ headerTintColor: colors.brand, headerTitle: 'Asset List ' }} component={AssetScreen} />
            </Stack.Navigator> :
                <Stack.Navigator
                    screenOptions={{
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
            }

        </NavigationContainer>

    )

}

export default RootStack;