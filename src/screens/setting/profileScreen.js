import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ProfileScreen</Text>
    </SafeAreaView>
  )
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
