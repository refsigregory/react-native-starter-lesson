import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({message}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3498db" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
