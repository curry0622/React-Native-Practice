import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScanScreen } from '../screens/test';

const Stack = createStackNavigator();

const ScanStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Scan" component={ScanScreen} />
    </Stack.Navigator>
  )
};

export default ScanStack;

const styles = StyleSheet.create({});
