import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FCM 토큰 받아서 서버에 등록 & 알림 가져오기
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        const token = await messaging().getToken();
        console.log('username:', username, 'token:', token);

        // FCM 토큰 서버에 전송
        await fetch('http://25.33.179.119:9099/fcm-token', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X2lkIjoiZWF0bWUtMDJvIiwiaWF0IjoxNzEwMjQ5NjAwfQ.eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X2lkIjoiZWF0bWUtMDJvIiwiaWF0IjoxNzEwMjQ5NjAwfQ'
          },
          body: JSON.stringify({ 
            token,
            username,
            projectId: 'eatme-02o',
            clientEmail: 'firebase-adminsdk-fbsvc@eatme-02o.iam.gserviceaccount.com'
          }),
        });

        // 서버에서 알림 데이터 받아오기
        const res = await fetch(`http://25.33.179.119:9099/notifications?fcmToken=${token}`);
        const data = await res.json();
        console.log('알림 데이터:', data);
        setNotifications(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError('알림이 없습니다.');
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // 포그라운드 상태에서 FCM 알림 받기
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('포그라운드에서 받은 알림:', remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title || '알림',
        remoteMessage.notification?.body || '',
        [{ text: '확인' }]
      );

      // 화면 알림 목록에도 추가 (옵션)
      setNotifications(prev => {
        const arr = Array.isArray(prev) ? prev : [];
        return [
          {
            id: Date.now(), // 임시 id
            text: remoteMessage.notification?.body || '',
          },
          ...arr,
        ];
      });
    });

    return unsubscribe;
  }, []);

  // 앱이 종료 상태에서 알림 열기
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('종료 상태에서 알림으로 앱 열림:', remoteMessage.notification);
          // 필요 시 특정 화면 이동 처리 가능
        }
      });
  }, []);

  // 백그라운드에서 알림 클릭했을 때 처리
  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('백그라운드에서 알림 클릭으로 앱 열림:', remoteMessage.notification);
      // 필요 시 특정 화면 이동 처리 가능
    });

    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Image source={require('../../assets/egg.png')} style={styles.eggIcon} />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.bg}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'\u2039'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>알림</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FFC94A" style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : notifications.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>알림이 없습니다</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id?.toString() || Math.random().toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 32,
    color: '#222',
    marginRight: 2,
    marginTop: -2,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 40,
  },
  listContent: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 16,
    paddingVertical: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  eggIcon: {
    width: 36,
    height: 36,
    marginRight: 16,
  },
  itemText: {
    fontSize: 16,
    color: '#222',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 64,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
});

export default NotificationScreen; 