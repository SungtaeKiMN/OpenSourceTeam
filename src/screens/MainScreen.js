import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert } from 'react-native';

const MainScreen = ({ navigation }) => {
  const [ingredient, setIngredient] = useState('');
  const [expiry, setExpiry] = useState('');

  const validateDate = (date) => {
    // YYYY.MM.DD 형식 체크
    return /^\d{4}\.\d{2}\.\d{2}$/.test(date);
  };

  const handleRegister = async () => {
    if (!ingredient) {
      Alert.alert('식자재를 입력하세요.');
      return;
    }
    if (!validateDate(expiry)) {
      Alert.alert('유통기한을 YYYY.MM.DD 형식으로 입력하세요.');
      return;
    }
    try {
      const response = await fetch('http://25.33.179.119:3000/user/user1/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: ingredient, expiry }),
      });
      if (!response.ok) throw new Error('서버 오류');
      Alert.alert('식자재가 등록되었습니다!');
      setIngredient('');
      setExpiry('');
    } catch (e) {
      Alert.alert('등록 실패', e.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Text style={styles.bell}>🔔</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image source={require('../../assets/egg.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.appName}>Eat Me!</Text>
        <Text style={styles.title}>식자재 등록</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>식자재</Text>
          <TextInput
            style={styles.input}
            placeholder="식자재 이름"
            value={ingredient}
            onChangeText={setIngredient}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>유통기한</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY.MM.DD"
            value={expiry}
            onChangeText={setExpiry}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>등록</Text>
        </TouchableOpacity>
      </View>
      {/* 하단 탭바는 네비게이터에서 처리 */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  bell: {
    fontSize: 28,
    color: '#222',
  },
  container: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 8,
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#222',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    color: '#222',
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#FFE5C2',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 2,
  },
  registerButton: {
    backgroundColor: '#FFC94A',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 18,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainScreen; 