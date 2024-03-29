import React, { useState, useCallback, useEffect, useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, ScrollView, RefreshControl, Text, ActivityIndicator } from 'react-native';
import { ButtonGroup, Input, Button } from '@rneui/themed';
import { InfoBar } from '../../components/home';
import UserContext from '../../contexts/userContext';
import { getRcmdStocks, getRcmdCryptos } from '../../apis/user';
import { getCryptoInfo } from '../../apis/crypto';
import { getStockInfo } from '../../apis/stock';
// import { useLogger } from '../../hooks';

const HomeScreen = ({ navigation }) => {
  const { name, fav, addFav, delFav, refreshFav } = useContext(UserContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [rcmdStocks, setRcmdStocks] = useState([]);
  const [rcmdCryptos, setRcmdCryptos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState(0);

  // useLogger(rcmdStocks);

  const refreshRcmd = async (type) => {
    if (type === 'Stock') {
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
    await refreshRcmd(selectedIndex === 0 ? 'Stock' : 'crypto');
    if (name !== '') {
      await refreshFav(selectedIndex === 0 ? 'Stock' : 'crypto');
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

  const createInfoBars = (type, items) => items.map((item) => {
    const {
      number, // stock
      name: itemName, // both
      start_price: startPrice, // stock
      now_price: nowPrice, // both
      high_price: highPrice, // both
      low_price: lowPrice, // both
      price_increase: priceIncrease, // both
      price_increase_rate: priceIncreaseRate, // crypto
    } = item;

    const isFav = type === 'Stock'
      ? fav.stocks.filter((s) => s.number === number).length > 0
      : fav.cryptos.filter((c) => c.name === itemName).length > 0;

    const getTitleText = () => {
      if (type === 'Stock') {
        if (number === '0000') {
          return `${itemName}  $${nowPrice}`;
        } else {
          return `[${number}]  ${itemName}  $${nowPrice}`;
        }
      } else {
        return `${itemName}  $${nowPrice}`
      }
    };

    const getIncreaseRate = () => {
      const percentage = (parseFloat(priceIncrease) / parseFloat(startPrice)) * 100;
      return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
    };

    const LeftSwipeBtn = (reset) => ((
      <Button
        title={isFav ? '   移除最愛' : '   加入最愛'}
        titleStyle={{
          ...styles.leftSwipeBtnTitle,
          color: isFav ? '#707070' : '#f72585',
        }}
        buttonStyle={styles.leftSwipeBtn}
        icon={
          <FontAwesome
            size={18}
            name={isFav ? 'trash' : 'bookmark'}
            color={isFav ? '#707070' : '#f72585'}
          />
        }
        onPress={() => {
          isFav ? delFav(type, item) : addFav(type, item);
          reset();
        }}
      />
    ));

    return (
      <InfoBar
        swipeable={number !== '0000' && name !== ''}
        key={itemName}
        titleText={getTitleText()}
        subtitleText={
          type === 'Stock'
            ? `開${startPrice}  高${highPrice}  低${lowPrice}`
            : `高${highPrice}  低${lowPrice}`
        }
        badgeText={
          type === 'Stock'
            ? getIncreaseRate()
            : priceIncreaseRate
        }
        isBadgeRed={
          type === 'Stock'
            ? parseFloat(priceIncrease) > 0
            : priceIncrease[0] === '+'
        }
        leftSwipeBtn={LeftSwipeBtn}
        onPressFunc={() => navigation.navigate(type, { ...item })}
      />
    );
  });

  // Refresh favorite stocks and cryptos when user login
  useEffect(async () => {
    setLoading(true);
    if (name !== '') {
      await refreshFav('both');
    }
    setLoading(false);
  }, [name]);

  // Refresh recommended stocks and cryptos when mounted
  useEffect(async () => {
    setLoading(true);
    await refreshRcmd('both');
    setLoading(false);
  }, []);

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
        <View style={styles.contentContainer}>
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
            selectedIndex === 0
              ? createInfoBars('Stock', fav.stocks)
              : createInfoBars('Crypto', fav.cryptos)
          )}
          {name !== '' && selectedIndex === 1 && fav.cryptos.length === 0 && (
            <View style={styles.hint}>
              <Text style={{ color: '#707070' }}>- 尚無最愛幣種 -</Text>
            </View>
          )}
          <Text style={{ marginBottom: 15 }}>[ 推薦{`${selectedIndex === 0 ? '台股' : '幣種'}`} ]</Text>
          {selectedIndex === 0 ? createInfoBars('Stock', rcmdStocks) : createInfoBars('Crypto', rcmdCryptos)}
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
  contentContainer: {
    width: '100%',
    padding: 20,
  },
  leftSwipeBtn: {
    minHeight: '100%',
    backgroundColor: '#fff',
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    borderRadius: 0
  },
  leftSwipeBtnTitle: {
    fontSize: 14
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
