import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostDetailScreen = () => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);

  // 더미 데이터
  const post = {
    image: require('../../assets/pig.png'), // 예시 이미지
    seller: {
      name: '김땡땡',
      location: '보정동',
      profile: require('../../assets/profile.png'),
    },
    title: '돼지 목살 1kg 나눔',
    expiry: '유통기한: 1일전',
    desc: '일주일 전에 샀구요, 혼자 먹기엔 너무 많아서 나눔합니다~!',
  };

  return (
    <View style={styles.bg}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={post.image} style={styles.mainImg} resizeMode="cover" />
        <View style={styles.sellerBox}>
          <Image source={post.seller.profile} style={styles.profileImg} />
          <View>
            <Text style={styles.sellerName}>{post.seller.name}</Text>
            <Text style={styles.sellerLoc}>{post.seller.location}</Text>
          </View>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.expiry}>{post.expiry}</Text>
          <Text style={styles.desc}>{post.desc}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Image
            source={
              liked
                ? require('../../assets/heart_filled.png')
                : require('../../assets/heart_empty.png')
            }
            style={styles.heartIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chatBtn}
          onPress={() => navigation.navigate('ChatRoom', { /* postId 등 전달 가능 */ })}
        >
          <Text style={styles.chatBtnText}>채팅하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollContent: { paddingBottom: 100 },
  mainImg: {
    width: '90%',
    height: 220,
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: '#ddd',
    marginTop: 18,
    marginBottom: 18,
  },
  sellerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 12,
  },
  profileImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ddd',
    marginRight: 14,
  },
  sellerName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  sellerLoc: {
    fontSize: 14,
    color: '#888',
  },
  detailBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 16,
    padding: 18,
    marginBottom: 20,
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
    marginBottom: 8,
  },
  desc: {
    fontSize: 15,
    color: '#222',
    marginBottom: 8,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  heartIcon: {
    width: 36,
    height: 36,
    marginRight: 18,
  },
  chatBtn: {
    flex: 1,
    backgroundColor: '#FFC94A',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  chatBtnText: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PostDetailScreen; 