import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView  } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Ionicons, AntDesign } from '@expo/vector-icons';


const SettingScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} >
      <View style={styles.listItemsContainer}>
        <ListItem
          containerStyle={styles.listItem}
          bottomDivider
          onPress={() => navigation.push('Profile')}
        >
          <Ionicons name="person-circle-sharp" size={36} color="#00bbf0" />
          <ListItem.Content>
            <ListItem.Title>Profile</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          containerStyle={styles.listItem}
          bottomDivider
        >
          <Ionicons name="stats-chart" size={36} color="#00bbf0" />
          <ListItem.Content>
            <ListItem.Title>Favorite Stocks</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          containerStyle={styles.listItem}
          bottomDivider
        >
          <Ionicons name="logo-bitcoin" size={36} color="#00bbf0" />
          <ListItem.Content>
            <ListItem.Title>Favorite Crypto</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </ScrollView >
  )
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItemsContainer: {
    width: '100%',
  },
  listItem: {
    height: 72,
    paddingHorizontal: 20,
  }
});
