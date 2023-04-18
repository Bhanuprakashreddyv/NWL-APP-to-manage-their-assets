import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { auth } from './FirebaseConfig';
import 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth";

//React Navigator

import AuthStack from './app/navigators/AuthStack';
import AppStack from './app/navigators/AppStack';
const Stack = createNativeStackNavigator();



export default function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });

    return unsubscribeAuth;
  }, []);
  return (
    <View style={styles.container}>

      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen
              name="AppStack"
              component={AppStack}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
