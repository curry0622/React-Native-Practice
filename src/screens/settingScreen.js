import React from 'react';
import { StyleSheet, Text, SafeAreaView  } from 'react-native';

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.container} >
      <Text>Setting</Text>
    </SafeAreaView >
  )
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
