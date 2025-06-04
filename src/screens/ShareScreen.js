import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ShareScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetch('http://25.33.179.119:9099/posts')
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(err => {
          setPosts([]);
          console.error('게시글 불러오기 실패:', err);
        });
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PostDetail', { post: {
      ...item,
      expirationDate: item.expirationDate || item.expiry || item.expireDate || '',
    } })}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.username}>작성자: {item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.bg}>
      <View style={styles.header}>
        <Text style={styles.location}>게시판</Text>
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
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id?.toString() || Math.random().toString()}
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
  content: {
    fontSize: 15,
    color: '#222',
    marginBottom: 12,
  },
  username: {
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