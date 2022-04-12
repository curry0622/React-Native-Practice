import React, { useState, useEffect, useCallback, useContext } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { Badge, Button, ButtonGroup } from 'react-native-elements';
import UserContext from '../../contexts/userContext';
import {
  getCryptoBOOL,
  getCryptoHist,
  getCryptoInfo,
  getCryptoKD,
  getCryptoMACD,
  getCryptoMACDOP,
  getCryptoPred,
  getCryptoRSI,
} from '../../apis/crypto';

const blankImg = 'https://imgur.com/KNsnWx0.png';

const CryptoScreen = ({ route }) => {
  const { name, fav, addFav, delFav } = useContext(UserContext);
  const [cryptoInfo, setCryptoInfo] = useState(route.params);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scale, setScale] = useState(true)
  const [isFav, setIsFav] = useState(
    fav.cryptos.filter((c) => c.name === route.params.name).length > 0
  );
  const [chartLoading, setChartLoading] = useState(false);
  const [imgLink, setImgLink] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [pred, setPred] = useState('');

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let tmp = await getCryptoInfo(cryptoInfo.name);
    if (tmp) {
      setCryptoInfo(tmp);
    }
    tmp = await getCryptoPred(cryptoInfo.name);
    if (tmp) {
      setPred(tmp[0]);
    }
    setRefreshing(false);
  }, []);

  const onPressFav = () => {
    if (isFav) {
      setIsFav(false);
      delFav('crypto', cryptoInfo);
    } else {
      setIsFav(true);
      addFav('crypto', cryptoInfo);
    }
  };

  useEffect(async () => {
    setChartLoading(true);
    let tmp;
    switch (selectedIndex) {
      case 0:
        tmp = await getCryptoHist(cryptoInfo.name);
        if (tmp) {
          setImgLink(tmp);
        }
        break;
      case 1:
        tmp = await getCryptoMACD(cryptoInfo.name);
        if (tmp) {
          setImgLink(tmp);
        }
        break;
      case 2:
        tmp = await getCryptoKD(cryptoInfo.name);
        if (tmp) {
          setImgLink(tmp);
        }
        break;
      case 3:
        tmp = await getCryptoMACDOP(cryptoInfo.name);
        if (tmp) {
          setImgLink(tmp);
        }
        break;
      case 4:
        tmp = await getCryptoRSI(cryptoInfo.name);
        if (tmp) {
          setImgLink(tmp);
        }
        break;
      case 5:
        tmp = await getCryptoBOOL(cryptoInfo.name);
        if (tmp) {
          setImgLink(tmp);
        }
        break;
    }
    setChartLoading(false);
  }, [selectedIndex]);

  useEffect(async () => {
    const tmp = await getCryptoPred(cryptoInfo.name);
    if (tmp) {
      setPred(tmp[0]);
    }
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
      <View style={styles.headerContainer}>
        <View style={styles.headerRightContainer}>
          <Text style={styles.price}>${cryptoInfo.now_price}</Text>
          <View style={styles.badgesContainer}>
            <Badge
              containerStyle={{ marginRight: 5 }}
              value={cryptoInfo.price_increase_rate}
              status={cryptoInfo.price_increase[0] === '+' ? 'error' : 'success'}
            />
            <Badge
              badgeStyle={{
                backgroundColor: '#fff',
                borderWidth: 1.5,
                borderColor: cryptoInfo.price_increase[0] === '+' ? '#f44336' : '#52c41a'
              }}
              textStyle={{
                color: cryptoInfo.price_increase[0] === '+' ? '#f44336' : '#52c41a',
                fontWeight: 'bold'
              }}
              value={cryptoInfo.price_increase}
            />
          </View>
        </View>
        <Button
          type="solid"
          disabled={name === ''}
          icon={{
            name: `${isFav ? 'bookmark' : 'bookmark-o'}`,
            type: 'font-awesome',
            size: 20,
            color: `${name !== '' ? '#f50' : '#ddd'}`,
          }}
          buttonStyle={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
          }}
          disabledStyle={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
          }}
          onPress={() => onPressFav()}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.todayInfoContainer}>
          <Text style={{ fontSize: 16, marginRight: 20 }}>高：${cryptoInfo.high_price}</Text>
          <Text style={{ fontSize: 16 }}>低：${cryptoInfo.low_price}</Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          明日股價預測：${pred || ((
            parseFloat(cryptoInfo.now_price) +
            parseFloat(cryptoInfo.high_price) +
            parseFloat(cryptoInfo.low_price)
          ) / 3)}
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

export default CryptoScreen;

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
    justifyContent: 'flex-start',
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
