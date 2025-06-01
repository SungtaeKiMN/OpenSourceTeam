import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: 실제 API 주소로 교체
    fetch('https://your-backend.com/api/notifications')
      .then(res => res.json())
      .then(data => {
        setNotifications(data); // data는 [{id, text}, ...] 형태
        setLoading(false);
      })
      .catch(err => {
        setError('알림을 불러오지 못했습니다.');
        setLoading(false);
      });
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
          keyExtractor={item => item.id.toString()}
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
    marginRight: 40, // backBtn 공간 확보
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