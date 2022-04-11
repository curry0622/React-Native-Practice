import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack, ListStack, ScanStack, NotifyStack, SettingStack } from './src/routes/';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import UserContext from './src/contexts/userContext';

const Tab = createBottomTabNavigator();

export default function App() {
  const [name, setName] = useState('');

  return (
    <UserContext.Provider value={{ name, setName }}>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{ showLabel: false }}>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ tabBarIcon: ({ focused }) => <Foundation name="home" size={26} color={focused ? '#00bbf0' : '#707070'} /> }}
          />
          {/* <Tab.Screen
            name="List"
            component={ListStack}
            options={{ tabBarIcon: ({ focused }) => <Foundation name="list" size={26} color={focused ? '#00bbf0' : '#707070'} /> }}
          /> */}
          {/* <Tab.Screen name="Scan" component={ScanStack} options={{ tabBarIcon: ({ focused }) => <Ionicons name="scan-circle" size={30} color={focused ? '#00bbf0' : '#707070'} /> }} /> */}
          {/* <Tab.Screen
            name="Notify"
            component={NotifyStack}
            options={{ tabBarIcon: ({ focused }) => <Ionicons name="notifications" size={24} color={focused ? '#00bbf0' : '#707070'} /> }}
          /> */}
          <Tab.Screen
            name="Setting"
            component={SettingStack}
            options={{ tabBarIcon: ({ focused }) => <Ionicons name="person" size={24} color={focused ? '#00bbf0' : '#707070'} /> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({});
