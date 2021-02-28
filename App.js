import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack, ListStack, ScanStack, NotifyStack, SettingStack } from './src/routes/';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} options={{ tabBarIcon: ({ focused }) => <Entypo name="home" size={20} color={focused ? '#4d419e' : '#707070'} /> }} />
        <Tab.Screen name="List" component={ListStack} options={{ tabBarIcon: ({ focused }) => <Foundation name="list" size={20} color={focused ? '#4d419e' : '#707070'} /> }} />
        <Tab.Screen name="Scan" component={ScanStack} options={{ tabBarIcon: ({ focused }) => <Ionicons name="scan-circle" size={30} color={focused ? '#4d419e' : '#707070'} /> }} />
        <Tab.Screen name="Notify" component={NotifyStack} options={{ tabBarIcon: ({ focused }) => <Ionicons name="notifications" size={20} color={focused ? '#4d419e' : '#707070'} /> }} />
        <Tab.Screen name="Setting" component={SettingStack} options={{ tabBarIcon: ({ focused }) => <Ionicons name="settings-sharp" size={20} color={focused ? '#4d419e' : '#707070'} /> }} />
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
