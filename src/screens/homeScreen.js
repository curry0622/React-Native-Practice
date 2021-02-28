import React from 'react';
import { StyleSheet, Text, SafeAreaView  } from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container} >
      <Text>Home</Text>
    </SafeAreaView >
  )
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
