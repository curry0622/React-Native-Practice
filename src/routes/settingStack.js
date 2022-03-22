import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingScreen, ProfileScreen, LoginScreen, SignupScreen } from '../screens/setting/';

const Stack = createStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
};

export default SettingStack;

const styles = StyleSheet.create({});
