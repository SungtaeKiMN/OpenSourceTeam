import React from 'react';
import { Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import MyIngredientsScreen from '../screens/MyIngredientsScreen';
import ShareScreen from '../screens/ShareScreen';
import NotificationScreen from '../screens/NotificationScreen';
import LoginScreen from '../screens/LoginScreen';
import RecipeScreen from '../screens/RecipeScreen';
import ShareWriteScreen from '../screens/ShareWriteScreen';
import ChatScreen from '../screens/ChatScreen';
import SearchScreen from '../screens/SearchScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import PostDetailScreen from '../screens/PostDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 70, paddingBottom: 10, paddingTop: 10 },
      }}
    >
      <Tab.Screen
        name="MyIngredients"
        component={MyIngredientsScreen}
        options={{
          tabBarLabel: '나의 식자재',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🛒</Text>, // 임시 아이콘
        }}
      />
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Image
              source={require('../../assets/egg.png')}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Share"
        component={ShareScreen}
        options={{
          tabBarLabel: '나눔',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>👥</Text>, // 임시 아이콘
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tab" component={TabNavigator} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
        <Stack.Screen name="ShareWrite" component={ShareWriteScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 