import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, ActivityIndicator } from 'react-native';
import { Badge, Button, ButtonGroup } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import getStockKD from '../../apis/getStockKD';

const getPercentageText = (priceIncrease, startPrice) => {
  const percentage = (priceIncrease / startPrice) * 100;
  return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
};

const getIncreaseText = (priceIncrease) => {
  return `${priceIncrease > 0 ? '↑' : '↓'} ${Math.abs(priceIncrease).toFixed(2)}`;
};

const StockScreen = ({ route }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scale, setScale] = useState(true)
  const [fav, setFav] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imgLink, setImgLink] = useState('')

  useEffect(async () => {
    setLoading(true)
    console.log(route.params.number)
    const tmp = await getStockKD('2230');
    if (tmp) {
      setImgLink(tmp)
    }
    setLoading(false)
  }, [selectedIndex]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerRightContainer}>
          <Text style={styles.price}>${route.params.now_price.toFixed(2)}</Text>
          <View style={styles.badgesContainer}>
            <Badge
              containerStyle={{ marginRight: 5 }}
              value={getPercentageText(route.params.price_increase, route.params.now_price)}
              status={route.params.price_increase > 0 ? 'error' : 'success'}
            />
            <Badge
              badgeStyle={{
                backgroundColor: '#fff',
                borderWidth: 1.5,
                borderColor: route.params.price_increase > 0 ? '#f44336' : '#52c41a'
              }}
              textStyle={{
                color: route.params.price_increase > 0 ? '#f44336' : '#52c41a',
                fontWeight: 'bold'
              }}
              value={getIncreaseText(route.params.price_increase)}
            />
          </View>
        </View>
        <Button
          type="solid"
          icon={{
            name: `${fav ? 'bookmark' : 'bookmark-o'}`,
            type: 'font-awesome',
            size: 20,
            color: '#f50',
          }}
          buttonStyle={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
          }}
          onPress={() => setFav(!fav)}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.todayInfoContainer}>
          <Text style={{ fontSize: 16 }}>開：${(route.params.start_price).toFixed(2)}</Text>
          <Text style={{ fontSize: 16 }}>高：${(route.params.high_price).toFixed(2)}</Text>
          <Text style={{ fontSize: 16 }}>低：${(route.params.low_price).toFixed(2)}</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>
          明日股價預測：$574.00
        </Text>
      </View>
      <View style={styles.selector}>
        <ButtonGroup
          buttons={['MACD', 'KD', 'MA', '布林通道']}
          selectedIndex={selectedIndex}
          onPress={(value) => setSelectedIndex(value)}
          containerStyle={styles.btnGrpContainer}
          selectedButtonStyle={styles.selectedBtn}
        />
      </View>
      <View style={styles.chartContainer}>
        {scale ? (
          loading ? (
            <ActivityIndicator size="large" color="#00bbf0" />
          ) : (
            <ScrollView style={styles.chartScroll} horizontal>
              <Image
                source={{ uri: imgLink }}
                style={styles.chart}
                resizeMode="contain"
                placeholder={<ActivityIndicator size="large" color="#00bbf0" />}
              />
            </ScrollView>
          )
        ) : (
          loading ? (
            <ActivityIndicator size="large" color="#00bbf0" />
          ) : (
            <View style={styles.chartScroll}>
              <Image
                source={{ uri: imgLink }}
                style={styles.chartMinified}
                resizeMode="contain"
                placeholder={<ActivityIndicator size="large" color="#00bbf0" />}
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
    height: 70,
    paddingHorizontal: 20,
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
