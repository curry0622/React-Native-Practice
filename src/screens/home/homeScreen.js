import React, { useState, useCallback, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl  } from 'react-native';
import { ListItem, Badge, ButtonGroup } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import stocks from './stocks.json';
import cryptos from './cryptos.json';
import UserContext from '../../contexts/userContext';
import getFavStocks from '../../apis/getFavStocks';

const HomeScreen = ({ navigation }) => {
  const { name, setName } = useContext(UserContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [favStocks, setFavStocks] = useState([]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const tmp = await getFavStocks(name);
    if (tmp) {
      setFavStocks([...tmp]);
      // console.log(tmp)
    }
    setRefreshing(false)
  }, []);

  const onPressStock = (stock) => {
    navigation.navigate('Stock', { ...stock });
  };

  const getPercentageText = (priceIncrease, startPrice) => {
    const percentage = (priceIncrease / startPrice) * 100;
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  useEffect(async () => {
    const tmp = await getFavStocks(name);
    if (tmp) {
      setFavStocks([...tmp]);
      // setFavStocks([...stocks]);
      // console.log(tmp)
    }
  }, []);

  const createStockBars = favStocks.map((stock) => (
    <View style={styles.listItem}>
      <ListItem
        containerStyle={{ borderRadius: 5 }}
        onPress={() => onPressStock(stock)}
        underlayColor="#ddd"
      >
        <ListItem.Content>
          <ListItem.Title style={styles.title}>
            {`[${stock.number}]  ${stock.name}  $${parseInt(stock.now_price).toFixed(2)}`}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            {`開${stock.start_price}  高${stock.high_price}  低${stock.low_price}`}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Badge
          value={getPercentageText(stock.price_increase, stock.now_price)}
          status={stock.price_increase > 0 ? 'error' : 'success'}
        />
        <ListItem.Chevron />
      </ListItem>
    </View>
  ));

  const createCryptoBars = cryptos.map((crypto) => (
    <View style={{ ...styles.listItem, height: 'auto' }}>
      <ListItem
        containerStyle={{ borderRadius: 5 }}
        // onPress={() => onPressStock(crypto.symbol)}
        underlayColor="#ddd"
      >
        <View style={{ width: 36, height: 36, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesome5 name={crypto.name} size={32} color="black" />
        </View>
        <ListItem.Content>
          <ListItem.Title style={{ fontSize: 18 }}>{`${crypto.symbol}  $${crypto.price}`}</ListItem.Title>
        </ListItem.Content>
        <Badge value={crypto.percentage} status={crypto.up ? 'error' : 'success'} />
        <ListItem.Chevron />
      </ListItem>
    </View>
  ));

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.listItemsContainer}>
        <ButtonGroup
          buttons={['股市', '虛擬貨幣']}
          selectedIndex={selectedIndex}
          onPress={(value) => setSelectedIndex(value)}
          containerStyle={styles.btnGrpContainer}
          selectedButtonStyle={styles.selectedBtn}
        />
        {selectedIndex === 0 ? createStockBars : createCryptoBars}
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
  },
  btnGrpContainer: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 25,
    borderRadius: 5,
  },
  selectedBtn: {
    backgroundColor: '#00bbf0',
  }
});
