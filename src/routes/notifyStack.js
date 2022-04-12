import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NotifyScreen from '../screens/test';

const Stack = createStackNavigator();

const NotifyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notify" component={NotifyScreen} />
    </Stack.Navigator>
  )
};

export default NotifyStack;

const styles = StyleSheet.create({});
