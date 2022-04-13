import React, { useState, useCallback, useEffect, useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, ScrollView, RefreshControl, Text, ActivityIndicator, Alert } from 'react-native';
import { ListItem, Badge, ButtonGroup, Input, Button } from 'react-native-elements';
import UserContext from '../../contexts/userContext';
import { getRcmdStocks, getRcmdCryptos } from '../../apis/user';
import { getCryptoInfo } from '../../apis/crypto';
import { getStockInfo } from '../../apis/stock';

const HomeScreen = ({ navigation }) => {
  const { name, fav, refreshFav } = useContext(UserContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [rcmdStocks, setRcmdStocks] = useState([]);
  const [rcmdCryptos, setRcmdCryptos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState(0);

  const getPercentageText = (priceIncrease, startPrice) => {
    const percentage = (priceIncrease / startPrice) * 100;
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const refreshRcmd = async (type) => {
    if (type === 'stock') {
      const tmp = await getRcmdStocks();
      if (tmp) {
        setRcmdStocks([...tmp]);
      }
    } else if (type === 'crypto') {
      const tmp = await getRcmdCryptos();
      if (tmp) {
        setRcmdCryptos([...tmp]);
      }
    } else {
      let tmp = await getRcmdStocks();
      if (tmp) {
        setRcmdStocks([...tmp]);
      }
      tmp = await getRcmdCryptos();
      if (tmp) {
        setRcmdCryptos([...tmp]);
      }
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshRcmd(selectedIndex === 0 ? 'stock' : 'crypto');
    if (name !== '') {
      await refreshFav(selectedIndex === 0 ? 'stock' : 'crypto');
    }
    setRefreshing(false);
  }, [name, selectedIndex]);

  const onSearch = async () => {
    setLoading(true);
    if (selectedIndex === 0) {
      const tmp = await getStockInfo(searchVal);
      if (tmp) {
        setLoading(false);
        navigation.navigate('Stock', { ...tmp });
      }
      setSearchVal('');
    } else {
      const tmp = await getCryptoInfo(searchVal.toUpperCase());
      if (tmp) {
        setLoading(false);
        navigation.navigate('Crypto', { ...tmp });
      }
      setSearchVal('');
    }
    setLoading(false);
  };

  // Refresh favorite stocks and cryptos when user login
  useEffect(async () => {
    // setLoading(true);
    if (name !== '') {
      await refreshFav('both');
    }
    // setLoading(false);
  }, [name]);

  // Refresh recommended stocks and cryptos when mounted
  useEffect(async () => {
    // setLoading(true);
    await refreshRcmd('both');
    // setLoading(false);
  }, []);

  const testFunc = (type) => {
    return (type === 'fav' ? fav.stocks : rcmdStocks).map((s) => {
      console.log(s.name);
      return <Text>{s.name}</Text>;
    });
  };

  const createStockBars = (type) => ((type === 'fav' ? fav.stocks : rcmdStocks).map((stock) => {
    const {
      number,
      name,
      start_price,
      now_price,
      high_price,
      low_price,
      price_increase
    } = stock;

    const isFav = fav.stocks.filter((s) => s.number === number).length > 0;

    return (
      <View style={styles.listItem} key={number}>
        <ListItem.Swipeable
          containerStyle={{ borderRadius: 5 }}
          onPress={() => navigation.navigate('Stock', { ...stock })}
          underlayColor="#ddd"
          leftContent={
            <Button
              title={isFav ? '   移除最愛' : '   加入最愛'}
              icon={<FontAwesome name={isFav ? 'trash' : 'bookmark'} size={18} color="#f72585" />}
              titleStyle={{ color: '#f72585', fontSize: 14 }}
              buttonStyle={{ minHeight: '100%', backgroundColor: '#fff', borderRightColor: '#ddd', borderRightWidth: 1, borderRadius: 0 }}
              onPress={() => {
                Alert.alert(
                  '警告',
                  `是否將 [${number} ${name}] 從最愛移除?`, [{
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                    }, {
                      text: 'OK',
                      onPress: () => console.log('OK Pressed')
                    }]
                );
              }}
            />
          }
        >
          <ListItem.Content>
            <ListItem.Title style={styles.title}>
              {number === '0000' ? (
                `${name}  $${now_price}`
              ) : (
                `[${number}]  ${name}  $${now_price}`
              )}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>
              {`開${start_price}  高${high_price}  低${low_price}`}
            </ListItem.Subtitle>
          </ListItem.Content>
          <Badge
            value={getPercentageText(parseFloat(price_increase), parseFloat(now_price))}
            status={price_increase > 0 ? 'error' : 'success'}
          />
          <ListItem.Chevron color="#707070" />
        </ListItem.Swipeable>
      </View>
    );
  }));

  const createCryptoBars = (type) => ((type === 'fav' ? fav.cryptos : rcmdCryptos).map((crypto) => {
    const {
      name,
      now_price,
      high_price,
      low_price,
      price_increase,
      price_increase_rate
    } = crypto;

    return (
      <View style={{ ...styles.listItem, height: 'auto' }} key={name}>
        <ListItem
          containerStyle={{ borderRadius: 5 }}
          onPress={() => navigation.navigate('Crypto', { ...crypto })}
          underlayColor="#ddd"
        >
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{`${name}  $${now_price}`}</ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>
              {`高${high_price}  低${low_price}`}
            </ListItem.Subtitle>
          </ListItem.Content>
          <Badge value={price_increase_rate} status={price_increase[0] === '+' ? 'error' : 'success'} />
          <ListItem.Chevron color="#707070" />
        </ListItem>
      </View>
    );
  }));

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
            createStockBars('fav') :
            createCryptoBars('fav')
          )}
          {name !== '' && selectedIndex === 1 && fav.cryptos.length === 0 && (
            <View style={styles.hint}>
              <Text style={{ color: '#707070' }}>- 尚無最愛幣種 -</Text>
            </View>
          )}
          <Text style={{ marginBottom: 15 }}>[ 推薦{`${selectedIndex === 0 ? '台股' : '幣種'}`} ]</Text>
          {selectedIndex === 0 ? createStockBars('rcmd') : createCryptoBars('rcmd')}
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
