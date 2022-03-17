import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const StockScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>StockScreen</Text>
    </SafeAreaView>
  )
};

export default StockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
