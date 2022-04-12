import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack, SettingStack } from './src/routes/';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import UserContext from './src/contexts/userContext';
import {
  addFavStock,
  addFavCrypto,
  delFavStock,
  delFavCrypto,
  getFavStocks,
  getFavCryptos,
} from './src/apis/user';

const Tab = createBottomTabNavigator();

export default function App() {
  const [name, setName] = useState('');
  const [fav, setFav] = useState({
    stocks: [],
    cryptos: [],
  });

  const addFav = (type, item) => {
    if (type === 'stock') {
      addFavStock({ name, stockNum: item.number });
      setFav({
        stocks: [...fav.stocks, item],
        cryptos: fav.cryptos,
      });
    } else {
      addFavCrypto({ name, cryptoName: item.name });
      setFav({
        stocks: fav.stocks,
        cryptos: [...fav.cryptos, item],
      });
    }
  };

  const delFav = (type, item) => {
    if (type === 'stock') {
      delFavStock({ name, stockNum: item.number });
      setFav({
        stocks: fav.stocks.filter((stock) => stock.number !== item.number),
        cryptos: fav.cryptos,
      });
    } else {
      delFavCrypto({ name, cryptoName: item.name });
      setFav({
        stocks: fav.stocks,
        cryptos: fav.cryptos.filter((crypto) => crypto.name !== item.name),
      });
    }
  };

  const refreshFav = async (type) => {
    if (type === 'stock') {
      const stocks = await getFavStocks(name);
      if (stocks) {
        setFav({
          stocks,
          cryptos: fav.cryptos,
        });
      }
    } else if (type === 'crypto') {
      const cryptos = await getFavCryptos(name);
      if (cryptos) {
        setFav({
          stocks: fav.stocks,
          cryptos,
        });
      }
    } else {
      const stocks = await getFavStocks(name);
      const cryptos = await getFavCryptos(name);
      if (stocks && cryptos) {
        setFav({
          stocks,
          cryptos,
        });
      }
    }
  };

  return (
    <UserContext.Provider value={{ name, setName, fav, addFav, delFav, refreshFav }}>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{ showLabel: false }}>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({ focused }) => <Foundation name="home" size={26} color={focused ? '#00bbf0' : '#707070'} />
            }}
          />
          <Tab.Screen
            name="Setting"
            component={SettingStack}
            options={{
              tabBarIcon: ({ focused }) => <Ionicons name="person" size={24} color={focused ? '#00bbf0' : '#707070'} />
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({});
