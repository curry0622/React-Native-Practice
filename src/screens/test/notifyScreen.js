import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, SafeAreaView, Platform, View } from 'react-native';
import { Button } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotifyScreen = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Button
        title="   台積電今日股價   "
        type="solid"
        raised
        icon={<FontAwesome name="send" size={16} color="white" />}
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </SafeAreaView>
  )
};

export default NotifyScreen;

const schedulePushNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '台積電(TSMC)',
      body: '2022/03/10 開581 高582 低574 收575 量38709 漲跌-12',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
};

const registerForPushNotificationsAsync = async () => {
  let token;
  // if it's a physical device
  if (Constants.isDevice) {
    // rename status to existingStatus
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      // if no permission, ask for permission
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
