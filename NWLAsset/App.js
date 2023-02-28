//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Alert, Platform, StatusBar, Dimensions } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks';
import LoginScreen from './app/screens/LoginScreen'
export default function App() {

  const orientation = useDeviceOrientation();
  return (
    <SafeAreaView style={styles.container}>

      <LoginScreen />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
