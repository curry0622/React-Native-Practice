import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const NotifyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>NotifyScreen</Text>
    </SafeAreaView>
  )
};

export default NotifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
