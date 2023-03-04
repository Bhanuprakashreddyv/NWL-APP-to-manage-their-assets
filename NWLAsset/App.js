//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Alert, Platform, StatusBar, Dimensions } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks';

import LoginScreen from './app/screens/LoginScreen';
//React Navigator
import RootStack from './app/navigators/RootStack';
export default function App() {

  const orientation = useDeviceOrientation();
  return (
    <View style={styles.container}>

      <RootStack />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
