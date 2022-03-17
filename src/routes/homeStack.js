import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, StockScreen } from '../screens/home';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Stock" component={StockScreen} />
    </Stack.Navigator>
  )
};

export default HomeStack;

const styles = StyleSheet.create({});
