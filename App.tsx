import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {AuthProvider} from './src/contexts/auth-context';
import {AppNavigator} from './src/navigation/app-navigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
