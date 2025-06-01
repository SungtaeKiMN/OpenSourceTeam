import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const dummyLocation = '보정동'; // 추후 위치 연동
const dummyPosts = [
  { id: 1, title: '계란 10알 나눔', expiry: '유통기한 3일 전', chat: 5, like: 10 },
  { id: 2, title: '베이컨 나눔', expiry: '유통기한 2일 전', chat: 5, like: 10 },
  { id: 3, title: '브로콜리 한 박스 나눔', expiry: '유통기한 10일 전', chat: 5, like: 10 },
  { id: 4, title: '돼지 목살 1kg 나눔', expiry: '유통기한 1일 전', chat: 5, like: 10 },
];

const ShareScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.expiry}>{item.expiry}</Text>
      <View style={styles.iconRow}>
        <View style={styles.iconWithText}>
          {/* chat 아이콘 */}
          <Image source={require('../../assets/chat.png')} style={styles.icon} />
          <Text style={styles.iconText}>{item.chat}</Text>
        </View>
        <View style={styles.iconWithText}>
          {/* heart 아이콘은 임시로 하트 이모지 */}
          <Text style={styles.heartIcon}>♡</Text>
          <Text style={styles.iconText}>{item.like}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.bg}>
      <View style={styles.header}>
        <Text style={styles.location}>{dummyLocation}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Image source={require('../../assets/chat.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image source={require('../../assets/search.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={dummyPosts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  location: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 28,
    height: 28,
    marginLeft: 18,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 0,
    marginBottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  expiry: {
    fontSize: 15,
    color: '#222',
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  heartIcon: {
    fontSize: 20,
    color: '#FF6666',
    marginRight: 4,
  },
  iconText: {
    fontSize: 15,
    color: '#222',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 0,
  },
});

export default ShareScreen; 