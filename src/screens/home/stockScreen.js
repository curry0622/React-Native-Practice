import React, { useState, useEffect, useCallback, useContext } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { Badge, Button, ButtonGroup } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import UserContext from '../../contexts/userContext';
import getFavStocks from '../../apis/getFavStocks';
import getStockInfo from  '../../apis/getStockInfo';
import getStockHist from '../../apis/getStockHist';
import getStockPred from  '../../apis/getStockPred';
import getStockMACD from '../../apis/getStockMACD';
import getStockMACDOP from '../../apis/getStockMACDOP';
import getStockKD from '../../apis/getStockKD';
import getStockRSI from '../../apis/getStockRSI';
import getStockBOOL from '../../apis/getStockBOOL';
import addFavStock from '../../apis/addFavStock';
import delFavStock from '../../apis/delFavStock';

const getPercentageText = (priceIncrease, startPrice) => {
  const percentage = (priceIncrease / startPrice) * 100;
  return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
};

const getIncreaseText = (priceIncrease) => {
  return `${priceIncrease > 0 ? '↑' : '↓'} ${Math.abs(priceIncrease).toFixed(2)}`;
};

const blankImg = 'https://imgur.com/KNsnWx0.png'

const StockScreen = ({ route }) => {
  const { name, setName } = useContext(UserContext);
  const [stockInfo, setStockInfo] = useState(route.params);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scale, setScale] = useState(true)
  const [fav, setFav] = useState(false)
  const [chartLoading, setChartLoading] = useState(false)
  const [favLoading, setFavLoading] = useState(false);
  const [imgLink, setImgLink] = useState('')
  const [refreshing, setRefreshing] = useState(false);
  const [pred, setPred] = useState('');

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const tmp = await getStockInfo(stockInfo.number);
    if (tmp) {
      setStockInfo(tmp);
    }
    setRefreshing(false);
  }, []);

  const onPressAdd = async () => {
    if (stockInfo.number === '0000') {
      return;
    } else if (fav) {
      setFav(false);
      const tmp = await delFavStock({ name, stockNum: stockInfo.number });
      if (!tmp) {
        setFav(true);
      }
    } else {
      setFav(true);
      const tmp = await addFavStock({ name, stockNum: stockInfo.number });
      if (!tmp) {
        setFav(false);
      }
    }
    await route.params.refreshFavStocks();
  };

  useEffect(async () => {
    setChartLoading(true);
    let tmp;
    switch (selectedIndex) {
      case 0:
        tmp = await getStockHist(stockInfo.number);
        if (tmp) {
          setImgLink(tmp);
        }
        break;
      case 1:
        tmp = await getStockMACD(stockInfo.number);
        if (tmp) {
          setImgLink(tmp);
        }
        break;
      case 2:
        tmp = await getStockKD(stockInfo.number);
        if (tmp) {
          setImgLink(tmp);
        }
        break;
      case 3:
        tmp = await getStockMACDOP(stockInfo.number);
        if (tmp) {
          setImgLink(tmp);
        }
        break;
      case 4:
        tmp = await getStockRSI(stockInfo.number);
        if (tmp) {
          setImgLink(tmp);
        }
        break;
      case 5:
        tmp = await getStockBOOL(stockInfo.number);
        if (tmp) {
          setImgLink(tmp);
        }
        break;
    }
    setChartLoading(false);
  }, [selectedIndex]);

  useEffect(async () => {
    const tmp = await getStockPred(stockInfo.number);
    if (tmp) {
      setPred(tmp[0]);
    }
  }, [stockInfo]);

  useEffect(async () => {
    if (stockInfo.number === '0000') {
      setFav(true);
    } else {
      setFavLoading(true);
      const tmp = await getFavStocks(name);
      if (tmp) {
        setFav(tmp.filter(e => e.number === stockInfo.number).length > 0)
      }
      setFavLoading(false);
    }
  }, [name]);

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
      <View style={styles.headerContainer}>
        <View style={styles.headerRightContainer}>
          <Text style={styles.price}>${stockInfo.now_price}</Text>
          <View style={styles.badgesContainer}>
            <Badge
              containerStyle={{ marginRight: 5 }}
              value={getPercentageText(stockInfo.price_increase, stockInfo.now_price)}
              status={stockInfo.price_increase > 0 ? 'error' : 'success'}
            />
            <Badge
              badgeStyle={{
                backgroundColor: '#fff',
                borderWidth: 1.5,
                borderColor: stockInfo.price_increase > 0 ? '#f44336' : '#52c41a'
              }}
              textStyle={{
                color: stockInfo.price_increase > 0 ? '#f44336' : '#52c41a',
                fontWeight: 'bold'
              }}
              value={getIncreaseText(stockInfo.price_increase)}
            />
          </View>
        </View>
        <Button
          type="solid"
          disabled={favLoading}
          icon={!favLoading ? {
            name: `${fav ? 'bookmark' : 'bookmark-o'}`,
            type: 'font-awesome',
            size: 20,
            color: '#f50',
          } : <ActivityIndicator />}
          buttonStyle={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
          }}
          disabledStyle={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#f1f2f1',
            borderRadius: 5,
          }}
          onPress={() => onPressAdd()}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.todayInfoContainer}>
          <Text style={{ fontSize: 16 }}>開：${stockInfo.start_price}</Text>
          <Text style={{ fontSize: 16 }}>高：${stockInfo.high_price}</Text>
          <Text style={{ fontSize: 16 }}>低：${stockInfo.low_price}</Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          明日股價預測：${pred || ((
            parseFloat(stockInfo.now_price) +
            parseFloat(stockInfo.high_price) +
            parseFloat(stockInfo.low_price) +
            parseFloat(stockInfo.start_price)
          ) / 4).toFixed(2)}
        </Text>
      </View>
      <View style={styles.selector}>
        <ButtonGroup
          buttons={['歷史價位', 'MACD', 'KD策略']}
          selectedIndex={selectedIndex}
          onPress={(value) => setSelectedIndex(value)}
          containerStyle={styles.btnGrpContainer}
          selectedButtonStyle={styles.selectedBtn}
        />
        <ButtonGroup
          buttons={['MACD策略', 'RSI', '布林通道']}
          selectedIndex={selectedIndex - 3}
          onPress={(value) => setSelectedIndex(value + 3)}
          containerStyle={styles.btnGrpContainer}
          selectedButtonStyle={styles.selectedBtn}
        />
      </View>
      <View style={styles.chartContainer}>
        {scale ? (
          chartLoading ? (
            <ActivityIndicator size="large"/>
          ) : (
            <ScrollView style={styles.chartScroll} horizontal>
              <Image
                source={{ uri: imgLink || blankImg }}
                style={styles.chart}
                resizeMode="contain"
                placeholder={<ActivityIndicator size="large"/>}
              />
            </ScrollView>
          )
        ) : (
          chartLoading ? (
            <ActivityIndicator size="large"/>
          ) : (
            <View style={styles.chartScroll}>
              <Image
                source={{ uri: imgLink || blankImg }}
                style={styles.chartMinified}
                resizeMode="contain"
                placeholder={<ActivityIndicator size="large"/>}
              />
            </View>
            )
        )}
        <Button
          icon={{
            name: `${scale ? 'search-minus' : 'search-plus'}`,
            type: 'font-awesome',
            size: 20,
            color: 'white',
          }}
          containerStyle={styles.scaleBtnContainer}
          buttonStyle={styles.scaleBtn}
          onPress={() => setScale(!scale)}
        />
      </View>
    </ScrollView>
  )
};

export default StockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  headerRightContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  badgesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 22,
  },
  todayInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 400,
    position: 'relative',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  chartScroll: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    height: '100%',
  },
  chart: {
    width: 540,
    height: '100%',
  },
  chartMinified: {
    width: '100%',
    height: '100%',
  },
  selector: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnGrpContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  selectedBtn: {
    backgroundColor: '#00bbf0',
  },
  scaleBtnContainer: {
    position: 'absolute',
    top: 10,
    left: 30,
  },
  scaleBtn: {
    backgroundColor: '#707070',
    opacity: 0.3
  }
});
