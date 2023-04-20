import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from '../../FirebaseConfig';
import 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth";

// Screens 
import WelcomeScreen from '../screens/WelcomeScreen';
import TabNavigators from './TabNavigators';
import AuthStack from './AuthStack';
import AssetScreen from '../screens/AssetScreen';
import SuccessScreen from '../screens/SuccessScreen';
import colors from '../Config/colors';

const Stack = createNativeStackNavigator();


const AppStack = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLoggedIn(true)
        } else {
            // User is signed out
            setIsLoggedIn(false)
        }
    });
    return (

        <Stack.Navigator>
            {isLoggedIn ? (
                <>
                    <Stack.Screen options={{ backgroundColor: 'transparent', headerShown: false }} name='WelcomeScreen' component={WelcomeScreen} />
                    <Stack.Screen name="TabNavigators" component={TabNavigators} options={{ headerShown: false }} />
                    <Stack.Screen options={{ backgroundColor: 'transparent', title: 'Asset', headerTintColor: colors.brand }} name='AssetScreen' component={AssetScreen} />
                    <Stack.Screen options={{ backgroundColor: 'transparent', headerShown: false }} name='SuccessScreen' component={SuccessScreen} />

                </>
            ) : (
                <Stack.Screen name='Auth' component={AuthStack} />
            )}
        </Stack.Navigator>


    )

}

export default AppStack;