import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const ListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ListScreen</Text>
    </SafeAreaView>
  )
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
