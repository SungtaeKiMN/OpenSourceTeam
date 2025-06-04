import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const dummyChats = [
  { id: 1, name: '김땡땡', message: '안녕하세요! 혹시 나눔 끝났나요?' },
  { id: 2, name: '김땡땡', message: '안녕하세요! 혹시 나눔 끝났나요?' },
  { id: 3, name: '김땡땡', message: '안녕하세요! 혹시 나눔 끝났나요?' },
  { id: 4, name: '김땡땡', message: '안녕하세요! 혹시 나눔 끝났나요?' },
  { id: 5, name: '김땡땡', message: '안녕하세요! 혹시 나눔 끝났나요?' },
];

const ChatScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatRow} onPress={() => navigation.navigate('ChatRoom', { chatId: item.id })}>
      <View style={styles.profileImgBox}>
        {/* 실제 이미지는 assets/profile.png 등으로 교체 */}
        <Image
          source={require('../../assets/profile.png')}
          style={styles.profileImg}
        />
      </View>
      <View style={styles.chatTextBox}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.bg}>
      <Text style={styles.header}>채팅</Text>
      <FlatList
        data={dummyChats}
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 18,
    marginLeft: 18,
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 24,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  profileImgBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  profileImg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ddd',
  },
  chatTextBox: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginBottom: 2,
  },
  message: {
    fontSize: 15,
    color: '#444',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 80,
  },
});

export default ChatScreen; 