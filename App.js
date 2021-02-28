import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/homeScreen';
import ListScreen from './src/screens/listScreen';
import ScanScreen from './src/screens/scanScreen'
import NotifyScreen from './src/screens/notifyScreen';
import SettingScreen from './src/screens/settingScreen';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ focused }) => <Entypo name="home" size={20} color={focused ? '#4d419e' : '#707070'} /> }} />
        <Tab.Screen name="List" component={ListScreen} options={{ tabBarIcon: ({ focused }) => <Foundation name="list" size={20} color={focused ? '#4d419e' : '#707070'} /> }} />
        <Tab.Screen name="Scan" component={ScanScreen} options={{ tabBarIcon: ({ focused }) => <Ionicons name="scan-circle" size={30} color={focused ? '#4d419e' : '#707070'} /> }} />
        <Tab.Screen name="Notify" component={NotifyScreen} options={{ tabBarIcon: ({ focused }) => <Ionicons name="notifications" size={20} color={focused ? '#4d419e' : '#707070'} /> }} />
        <Tab.Screen name="Setting" component={SettingScreen} options={{ tabBarIcon: ({ focused }) => <Ionicons name="settings-sharp" size={20} color={focused ? '#4d419e' : '#707070'} /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
