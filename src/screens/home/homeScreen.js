import React, { useState, useCallback, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Text, ActivityIndicator } from 'react-native';
import { ListItem, Badge, ButtonGroup, Input, Button } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import cryptos from './cryptos.json';
import UserContext from '../../contexts/userContext';
import getFavStocks from '../../apis/getFavStocks';
import getRcmdStocks from '../../apis/getRcmdStocks';
import getStockInfo from '../../apis/getStockInfo';

const HomeScreen = ({ navigation }) => {
  const { name, setName } = useContext(UserContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [favStocks, setFavStocks] = useState(null);
  const [rcmdStocks, setRcmdStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState(0);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const tmp = await getFavStocks(name);
    if (tmp) {
      setFavStocks([...tmp]);
    }
    setRefreshing(false)
  }, [name]);

  const onPressStock = (stock) => {
    // if (stock.number !== '0000')
    navigation.navigate('Stock', { ...stock });
  };

  const onSearch = async (type) => {
    setLoading(true);
    if (type === 'stock') {
      const tmp = await getStockInfo(searchVal);
      if (tmp) {
        setLoading(false)
        navigation.navigate('Stock', { ...tmp });
      }
      setSearchVal('')
    }
    setLoading(false);
  };

  const getPercentageText = (priceIncrease, startPrice) => {
    const percentage = (priceIncrease / startPrice) * 100;
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  useEffect(async () => {
    setLoading(true);
    let tmp = await getFavStocks(name);
    if (tmp) {
      setFavStocks([...tmp]);
    }
    tmp = await getRcmdStocks();
    if (tmp) {
      setRcmdStocks([...tmp]);
    }
    setLoading(false);
  }, [name]);

  const createFavStockBars = [...new Set(favStocks)].map((stock) => (
    <View style={styles.listItem}>
      <ListItem
        containerStyle={{ borderRadius: 5 }}
        onPress={() => onPressStock(stock)}
        underlayColor="#ddd"
      >
        <ListItem.Content>
          <ListItem.Title style={styles.title}>
            {stock.number === '0000' ? (
              `${stock.name}  $${stock.now_price}`
            ) : (
              `[${stock.number}]  ${stock.name}  $${stock.now_price}`
            )}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            {`開${stock.start_price}  高${stock.high_price}  低${stock.low_price}`}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Badge
          value={getPercentageText(stock.price_increase, stock.now_price)}
          status={stock.price_increase > 0 ? 'error' : 'success'}
        />
        <ListItem.Chevron color="#707070" />
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

  const createRcmdStockBars = rcmdStocks.map((stock) => (
    <View style={styles.listItem}>
      <ListItem
        containerStyle={{ borderRadius: 5 }}
        onPress={() => onPressStock(stock)}
        underlayColor="#ddd"
      >
        <ListItem.Content>
          <ListItem.Title style={styles.title}>
            {`[${stock.number}]  ${stock.name}  $${stock.now_price}`}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            {`開${stock.start_price}  高${stock.high_price}  低${stock.low_price}`}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Badge
          value={getPercentageText(stock.price_increase, stock.now_price)}
          status={stock.price_increase > 0 ? 'error' : 'success'}
        />
        <ListItem.Chevron color="#707070" />
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
      {loading ? (
        <View style={{ marginTop: '65%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ marginBottom: 30 }}>處理中，請稍候...</Text>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.listItemsContainer}>
          <ButtonGroup
            buttons={['台灣股市', '虛擬貨幣']}
            selectedIndex={selectedIndex}
            onPress={(value) => setSelectedIndex(value)}
            containerStyle={styles.btnGrpContainer}
            selectedButtonStyle={styles.selectedBtn}
          />
          <Input
            keyboardType="web-search"
            placeholder={` 輸入${selectedIndex === 0 ? '代碼' : '幣種'}`}
            inputStyle={{ fontSize: 14 }}
            containerStyle={{ width: 120, paddingHorizontal: 0 }}
            inputContainerStyle={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 5, height: 40, padding: 10 }}
            leftIcon={{ type: 'font-awesome', name: 'search', size: 20, color: '#707070' }}
            value={searchVal}
            onChange={(e) => setSearchVal(e.nativeEvent.text)}
            onSubmitEditing={() => onSearch('stock')}
          />
          <Text style={{ marginBottom: !favStocks ? 0 : 15 }}>[ 我的最愛 ]</Text>
          {!favStocks
            ? <View style={styles.loginHint}><Text style={{ color: '#707070' }}>- 尚未登入 -</Text></View>
            : (
              selectedIndex === 0 ? createFavStockBars : createCryptoBars
          )}
          {selectedIndex === 0 && <Text style={{ marginBottom: 15 }}>[ 推薦台股 ]</Text>}
          {selectedIndex === 0 && createRcmdStockBars}
        </View>
      )}
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
  },
  loginHint: {
    // borderWidth: 1,
    // borderColor: '#ddd',
    width: '100%',
    height: 72,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
