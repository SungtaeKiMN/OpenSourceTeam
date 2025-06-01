import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShareWriteScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [place, setPlace] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !desc.trim() || !place.trim()) {
      Alert.alert('모든 항목을 입력해주세요.');
      return;
    }
    // TODO: 등록 API 연동, 유통기한은 백엔드에서 자동 처리
    // 예시: fetch('/api/share', { method: 'POST', body: JSON.stringify({ title, desc, place }) })
    Alert.alert('게시글이 등록되었습니다!');
    navigation.goBack();
  };

  return (
    <View style={styles.bg}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeBtn}>×</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 식자재 나눔하기</Text>
        <View style={{ width: 30 }} /> {/* 닫기 버튼 공간 맞춤 */}
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={styles.input}
          placeholder="제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>설명</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="식자재에 대한 자세한 설명을 작성해주세요."
          value={desc}
          onChangeText={setDesc}
          multiline
          numberOfLines={5}
        />
        <Text style={styles.label}>나눔 장소</Text>
        <TextInput
          style={styles.input}
          placeholder="위치 추가"
          value={place}
          onChangeText={setPlace}
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