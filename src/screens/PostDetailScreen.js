import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function getExpiryText(expireDate) {
  if (!expireDate) return '';
  const today = new Date();
  const expiry = new Date(expireDate);
  today.setHours(0,0,0,0);
  expiry.setHours(0,0,0,0);
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0) {
    return `${Math.abs(diffDays)}일전`;
  } else if (diffDays === 0) {
    return '오늘까지';
  } else {
    return `${diffDays}일 남음`;
  }
}

const PostDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [liked, setLiked] = useState(false);

  // 전달받은 게시글 데이터
  const post = route.params?.post;
  console.log('post:', post);

  if (!post) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>게시글 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.bg}>
      {/* 상단 헤더 - 지역명, 채팅, 검색 아이콘 */}
      <View style={styles.header}>
        <Text style={styles.location}>나눔</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Image source={require('../../assets/chat.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image source={require('../../assets/search.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {/* 상단 주황색 네모칸 - 제목 */}
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>{post.title}</Text>
      </View>
      {/* 작성자 프로필, 이름, 지역 */}
      <View style={styles.sellerBox}>
        <Image source={require('../../assets/profile.png')} style={styles.profileImg} />
        <View>
          <Text style={styles.sellerName}>{post.username || '알수없음'}</Text>
          <Text style={styles.sellerLoc}>{post.location || '알수없음'}</Text>
        </View>
      </View>
      <View style={styles.profileDivider} />
      {/* 유통기한 */}
      {post.expireDate && (
        <View style={styles.expiryBox}>
          <Text style={styles.expiryText}>
            유통기한: <Text style={{fontWeight:'bold'}}>{getExpiryText(post.expireDate)}</Text>
          </Text>
        </View>
      )}
      {/* 상세 내용 */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.contentText}>{post.content}</Text>
      </ScrollView>
      {/* 하단 언더바(하트/채팅하기)는 기존 코드 그대로 유지 */}
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
  headerBox: {
    backgroundColor: '#FFE5C2',
    paddingVertical: 26,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  expiryBox: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  expiryText: {
    fontSize: 16,
    color: '#222',
  },
  contentText: {
    fontSize: 16,
    color: '#222',
    paddingHorizontal: 18,
    paddingTop: 8,
  },
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
    marginTop:12,
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
  profileDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 6,
  },
});

export default PostDetailScreen; 