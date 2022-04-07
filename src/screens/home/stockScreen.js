import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, ActivityIndicator } from 'react-native';
import { Badge, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const getPercentageText = (priceIncrease, startPrice) => {
  const percentage = (priceIncrease / startPrice) * 100;
  return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
};

const getIncreaseText = (priceIncrease) => {
  return `${priceIncrease > 0 ? '↑' : '↓'} ${Math.abs(priceIncrease).toFixed(2)}`;
};

const StockScreen = ({ route }) => {
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
          // raised
          icon={
            <Ionicons
              name="heart"
              size={20}
              color="#f50"
            />
          }
          buttonStyle={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
          }}
        />
        {/* <View style={styles.infoContainer}>
          <Text>開 $123</Text><Text>低 $112</Text><Text>高 $125</Text>
        </View> */}
      </View>
      <View style={styles.infoContainer}>
        <Text style={{ fontSize: 16 }}>開  {route.params.start_price}</Text>
        <Text style={{ fontSize: 16 }}>高  {route.params.high_price}</Text>
        <Text style={{ fontSize: 16 }}>低  {route.params.low_price}</Text>
      </View>
      <View style={styles.chartContainer}>
        <ScrollView style={styles.chartScroll} horizontal>
          <Image
            source={{ uri: 'https://i.imgur.com/3tEY53m.jpg' }}
            style={styles.chart}
            resizeMode="contain"
            // placeholder={<ActivityIndicator size="large" color="#00bbf0" />}
          />
          {/* <ActivityIndicator size="large" color="#00bbf0" /> */}
        </ScrollView>
      </View>
      <View style={styles.selector}>
        {/* <Text>Selector</Text> */}
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
    // height: 'auto',
    // borderWidth: 1,
    // borderColor: '#ddd',
    padding: 20,
  },
  headerRightContainer: {
    // borderWidth: 1,
    // borderColor: '#ddd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    // borderWidth: 1,
    // borderColor: '#ddd',
  },
  badgesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 8,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 22,
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor: '#ddd',
  },
  percentage: {},
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 400,
    // borderWidth: 1,
    // borderColor: '#ddd',
    paddingHorizontal: 20,
  },
  chartScroll: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  chart: {
    width: 540,
    height: '100%',
  },
  selector: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 70,
    // borderWidth: 1,
    // borderColor: '#ddd',
    paddingHorizontal: 20,
  },
});
