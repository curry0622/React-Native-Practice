import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const ScanScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ScanScreen</Text>
    </SafeAreaView>
  )
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
