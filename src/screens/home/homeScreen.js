import React, { useState, useCallback, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Text, ActivityIndicator, Alert } from 'react-native';
import { ListItem, Badge, ButtonGroup, Input, Button } from 'react-native-elements';
import UserContext from '../../contexts/userContext';
import { getFavStocks, getFavCryptos, getRcmdStocks, getRcmdCryptos } from '../../apis/user';
import { getCryptoInfo } from '../../apis/crypto';
import { getStockInfo } from '../../apis/stock';

const HomeScreen = ({ navigation }) => {
  const { name } = useContext(UserContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [favStocks, setFavStocks] = useState([]);
  const [favCryptos, setFavCryptos] = useState([]);
  const [rcmdStocks, setRcmdStocks] = useState([]);
  const [rcmdCryptos, setRcmdCryptos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState(0);

  const refreshFavStocks = async () => {
    const tmp = await getFavStocks(name);
    if (tmp) {
      setFavStocks([...tmp]);
    }
  };

  const refreshFavCryptos = async () => {
    const tmp = await getFavCryptos(name);
    if (tmp) {
      setFavCryptos([...tmp]);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (selectedIndex === 0) {
      await refreshFavStocks();
    }
    else {
      await refreshFavCryptos();
    }
    setRefreshing(false)
  }, [name, selectedIndex]);

  const onPressStock = (stock) => {
    navigation.navigate('Stock', { ...stock, refreshFavStocks });
  };

  const onPressCrypto = (crypto) => {
    navigation.navigate('Crypto', { ...crypto, refreshFavCryptos });
  };

  const onSearch = async () => {
    setLoading(true);
    if (selectedIndex === 0) {
      const tmp = await getStockInfo(searchVal);
      if (tmp) {
        setLoading(false);
        navigation.navigate('Stock', { ...tmp, refreshFavStocks });
      }
      setSearchVal('')
    } else {
      const tmp = await getCryptoInfo(searchVal.toUpperCase());
      if (tmp) {
        setLoading(false);
        navigation.navigate('Crypto', { ...tmp, refreshFavCryptos });
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
    tmp = await getFavCryptos(name);
    if (tmp) {
      setFavCryptos([...tmp]);
    }
    setLoading(false);
  }, [name]);

  useEffect(async () => {
    setLoading(true);
    let tmp = await getRcmdStocks();
    if (tmp) {
      setRcmdStocks([...tmp]);
    }
    tmp = await getRcmdCryptos();
    if (tmp) {
      setRcmdCryptos([...tmp]);
    }
    setLoading(false);
  }, []);

  const createFavStockBars = favStocks.map((stock) => (
    <View style={styles.listItem} key={stock.number}>
      <ListItem
        containerStyle={{ borderRadius: 5 }}
        onPress={() => onPressStock(stock)}
        underlayColor="#ddd"
        // leftContent={
        //   <Button
        //     title='移除最愛'
        //     icon={{ name: 'delete', color: '#ef233c' }}
        //     titleStyle={{ color: '#ef233c', fontSize: 14 }}
        //     buttonStyle={{ minHeight: '100%', backgroundColor: '#fff', borderRightColor: '#ddd', borderRightWidth: 1, borderRadius: 0 }}
        //     onPress={() => {
        //       Alert.alert(
        //         '警告',
        //         `是否將 [${stock.number} ${stock.name}] 從最愛移除?`, [{
        //             text: 'Cancel',
        //             onPress: () => console.log('Cancel Pressed'),
        //             style: 'cancel'
        //           }, {
        //             text: 'OK',
        //             onPress: () => console.log('OK Pressed')
        //           }]
        //       );
        //     }}
        //   />
        // }
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

  const createFavCryptoBars = favCryptos.map((crypto) => (
    <View style={{ ...styles.listItem, height: 'auto' }} key={crypto.name}>
      <ListItem
        containerStyle={{ borderRadius: 5 }}
        onPress={() => onPressCrypto(crypto)}
        underlayColor="#ddd"
      >
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{`${crypto.name}  $${crypto.now_price}`}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            {`高${crypto.high_price}  低${crypto.low_price}`}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Badge value={crypto.price_increase_rate} status={crypto.price_increase[0] === '+' ? 'error' : 'success'} />
        <ListItem.Chevron color="#707070" />
      </ListItem>
    </View>
  ));

  const createRcmdStockBars = rcmdStocks.map((stock) => (
    <View style={styles.listItem} key={stock.number}>
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

  const createRcmdCryptoBars = rcmdCryptos.map((crypto) => (
    <View style={{ ...styles.listItem, height: 'auto' }} key={crypto.name}>
      <ListItem
        containerStyle={{ borderRadius: 5 }}
        onPress={() => onPressCrypto(crypto)}
        underlayColor="#ddd"
      >
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{`${crypto.name}  $${crypto.now_price}`}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            {`高${crypto.high_price}  低${crypto.low_price}`}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Badge value={crypto.price_increase_rate} status={crypto.price_increase[0] === '+' ? 'error' : 'success'} />
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
            onSubmitEditing={() => onSearch()}
          />
          <Text style={{ marginBottom: 15 }}>[ 我的最愛 ]</Text>
          {name === '' ? (
            <View style={styles.hint}>
              <Text style={{ color: '#707070' }}>- 尚未登入 -</Text>
            </View>
          ) : (
            selectedIndex === 0 ?
            createFavStockBars :
            createFavCryptoBars
          )}
          {name !== '' && selectedIndex === 1 && favCryptos.length === 0 && (
            <View style={styles.hint}>
              <Text style={{ color: '#707070' }}>- 尚無最愛幣種 -</Text>
            </View>
          )}
          <Text style={{ marginBottom: 15 }}>[ 推薦{`${selectedIndex === 0 ? '台股' : '幣種'}`} ]</Text>
          {selectedIndex === 0 ? createRcmdStockBars : createRcmdCryptoBars}
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
  hint: {
    width: '100%',
    height: 72,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -15,
  }
});
