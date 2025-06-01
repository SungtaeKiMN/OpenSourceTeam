import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const RecipeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const ingredient = route.params?.ingredient || '계란'; // 기본값: 계란

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: 실제 백엔드 API 주소로 교체
    fetch(`https://your-backend.com/api/recipes?ingredient=${encodeURIComponent(ingredient)}`)
      .then(res => res.json())
      .then(data => {
        setRecipes(data); // [{id, name, ingredient, steps: [string, ...]}, ...]
        setLoading(false);
      })
      .catch(err => {
        setError('레시피를 불러오지 못했습니다.');
        setLoading(false);
      });
  }, [ingredient]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.recipeName}>{item.name}</Text>
      <Text style={styles.ingredientText}>재료: {item.ingredient}</Text>
      <Text style={styles.methodTitle}>방법</Text>
      {item.steps.map((step, idx) => (
        <Text key={idx} style={styles.methodText}>{idx + 1}. {step}</Text>
      ))}
    </View>
  );

  return (
    <View style={styles.bg}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'\u2039'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>나의 식자재</Text>
      </View>
      <View style={styles.tabBar}>
        <Text style={styles.tabBarText}>레시피 추천</Text>
      </View>
      <Text style={styles.ingredientTitle}>{ingredient}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#FFC94A" style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : recipes.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>추천 레시피가 없습니다</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    height: 50,
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 0,
    paddingHorizontal: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 32,
    color: '#222',
    marginRight: 2,
    marginTop: -2,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 40,
  },
  tabBar: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  tabBarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  ingredientTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#FFC94A',
    marginHorizontal: 60,
    marginBottom: 18,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#F3F3F3',
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  ingredientText: {
    fontSize: 15,
    color: '#222',
    marginBottom: 6,
  },
  methodTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  methodText: {
    fontSize: 15,
    color: '#222',
    marginLeft: 6,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
});

export default RecipeScreen; 