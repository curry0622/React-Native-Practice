import React from 'react';
import { StyleSheet, View, ScrollView  } from 'react-native';
import { ListItem, Badge } from 'react-native-elements';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} >
      <View style={styles.listItemsContainer}>
        <ListItem
          containerStyle={styles.listItem}
        >
          <ListItem.Content>
            <ListItem.Title style={styles.title}>台積電  579.00</ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>開578.00  高582.00  低575.0</ListItem.Subtitle>
          </ListItem.Content>
          <Badge value="-1.56%" status="success" />
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          containerStyle={styles.listItem}
        >
          <ListItem.Content>
            <ListItem.Title style={styles.title}>聯發科  971.00</ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>開578.00  高582.00  低575.0</ListItem.Subtitle>
          </ListItem.Content>
          <Badge value="+5.69%" status="error" />
          <ListItem.Chevron />
        </ListItem>
      </View>
    </ScrollView >
  )
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItemsContainer: {
    width: '100%',
    padding: 20,
  },
  listItem: {
    height: 72,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  }
});
