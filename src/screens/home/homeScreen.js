import React from 'react';
import { StyleSheet, View, ScrollView  } from 'react-native';
import { ListItem, Badge } from 'react-native-elements';
import stocks from './stocks.json';

const HomeScreen = ({ navigation }) => {
  const onPressStock = (stockName) => {
    navigation.navigate('Stock', { title: stockName });
  };

  const createStockBars = stocks.map((stock) => (
    <View style={styles.listItem}>
      <ListItem
        containerStyle={{ borderRadius: 5 }}
        onPress={() => onPressStock(stock.name)}
        underlayColor="#ddd"
      >
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{`${stock.name}  ${stock.price}`}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>{`開${stock.open}  高${stock.high}  低${stock.low}`}</ListItem.Subtitle>
        </ListItem.Content>
        <Badge value={stock.percentage} status={stock.up ? 'error' : 'success'} />
        <ListItem.Chevron />
      </ListItem>
    </View>
  ));


  return (
    <ScrollView style={styles.container} >
      <View style={styles.listItemsContainer}>
        {createStockBars}
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
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
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
