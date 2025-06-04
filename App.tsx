/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): React.JSX.Element {
  useEffect(() => {
    const sendFcmTokenToServer = async () => {
      try {
        await messaging().requestPermission();
        const fcmToken = await messaging().getToken();
        console.log('FCM Token:', fcmToken);

        // username이 AsyncStorage에 저장되어 있다면 같이 전송
        const username = await AsyncStorage.getItem('username');
        console.log('username:', username);

        const response = await fetch('http://25.33.179.119:9099/fcm-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: fcmToken,
            username: username,
          }),
        });

        if (response.ok) {
          console.log('FCM 토큰 서버 전송 성공');
        } else {
          console.log('FCM 토큰 서버 전송 실패:', await response.text());
        }
      } catch (e) {
        console.log('FCM 토큰 전송 중 오류:', e);
      }
    };

    sendFcmTokenToServer();
  }, []);
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
