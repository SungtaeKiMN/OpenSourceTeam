import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShareWriteScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [expireDate, setExpireDate] = useState('');

  useEffect(() => {
    // 컴포넌트 마운트 시 username 가져오기
    const getUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    getUsername();
  }, []);

  const handleSubmit = async () => {
    console.log('작성 시점 username:', username);

    if (!title.trim() || !content.trim() || !expireDate.trim()) {
      Alert.alert('제목, 내용, 유통기한을 모두 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('http://25.33.179.119:9099/posts', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X2lkIjoiZWF0bWUtMDJvIiwiaWF0IjoxNzEwMjQ5NjAwfQ.eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X2lkIjoiZWF0bWUtMDJvIiwiaWF0IjoxNzEwMjQ5NjAwfQ'
        },
        body: JSON.stringify({
          title,
          content,
          username,
          expireDate,
        }),
      });

      if (response.ok) {
        Alert.alert(
          '게시글이 등록되었습니다!',
          '',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Tab', { screen: 'Share' }),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('게시글 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('게시글 등록 오류:', error);
      Alert.alert('게시글 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.bg}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeBtn}>×</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>게시글 작성</Text>
        <View style={{ width: 30 }} />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={styles.input}
          placeholder="제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>내용</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="내용을 작성해주세요."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={5}
        />
        <Text style={styles.label}>유통기한</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={expireDate}
          onChangeText={setExpireDate}
        />
      </View>
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>등록하기</Text>
      </TouchableOpacity>
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
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  closeBtn: {
    fontSize: 32,
    color: '#222',
    width: 30,
    textAlign: 'left',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    flex: 1,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 16,
    padding: 18,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: '#222',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  textarea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: '#FFC94A',
    borderRadius: 10,
    paddingVertical: 16,
    marginHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitBtnText: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShareWriteScreen; 