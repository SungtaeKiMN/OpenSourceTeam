import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatRoomScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>채팅방 (추후 구현)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#222',
  },
});

export default ChatRoomScreen; 