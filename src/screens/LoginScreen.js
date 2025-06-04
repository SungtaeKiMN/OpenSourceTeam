import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  Button,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!id || !password) {
      Alert.alert('아이디와 비밀번호를 입력하세요.');
      return;
    }

    try {
      const response = await fetch('http://25.33.179.119:9099/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: id,
          password: password,
        }),
      });

      if (response.ok) {
        await AsyncStorage.setItem('username', id);
        navigation.replace('Tab', { screen: 'Main' });
      } else {
        Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
      Alert.alert('로그인 실패', '서버에 연결할 수 없습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/egg.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Eat Me!</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          value={id}
          onChangeText={setId}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupContainer}>
        <Text style={styles.signupText}>
          계정이 없으신가요? <Text style={styles.signupLink}>회원가입</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#FFC94A',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#FFC94A',
    fontWeight: 'bold',
  },
});

export default LoginScreen;