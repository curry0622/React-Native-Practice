import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../screens/listScreen';

const Stack = createStackNavigator();

const ListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} />
    </Stack.Navigator>
  )
};

export default ListStack;

const styles = StyleSheet.create({});
