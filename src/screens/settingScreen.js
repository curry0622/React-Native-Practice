import React from 'react';
import { StyleSheet, Text, SafeAreaView, View  } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.listContainer}>
        <ListItem bottomDivider>
          <Ionicons name="person-circle-sharp" size={24} color="#4d419e" />
          <ListItem.Content>
            <ListItem.Title>My Profile</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </SafeAreaView >
  )
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  listContainer: {
    width: 'auto'
  }
});
