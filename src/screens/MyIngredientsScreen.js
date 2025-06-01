import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyIngredientsScreen = () => {
  const navigation = useNavigation();
  const [ingredients, setIngredients] = useState([]);

  const fetchUserIngredients = async () => {
    try {
      const response = await fetch('http://25.33.179.119:3000/user/user1/ingredients');
      if (!response.ok) throw new Error('서버 오류');
      const data = await response.json();
      setIngredients(data);
    } catch (e) {
      setIngredients([]);
    }
  };

  useEffect(() => {
    fetchUserIngredients();
  }, []);

  return (
    <View style={styles.bg}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>나의 식자재</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {ingredients.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.row}>
              <View style={styles.ddayBox}>
                <Text style={styles.ddayText}>D-{{/* D-day 계산 필요시 여기에 추가 */}}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.ingredientName}>{item.name}</Text>
                <Text style={styles.expiry}>~ <Text style={styles.expiryDate}>{item.expiry}</Text></Text>
              </View>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.recipeBtn} onPress={() => navigation.navigate('Recipe')}>
                <Text style={styles.btnText}>레시피 추천</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareBtn} onPress={() => navigation.navigate('ShareWrite')}>
                <Text style={styles.btnText}>나눔하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ddayBox: {
    backgroundColor: '#FFE5C2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginRight: 16,
    minWidth: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ddayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  infoBox: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  expiry: {
    fontSize: 15,
    color: '#222',
  },
  expiryDate: {
    color: '#FF9900',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  recipeBtn: {
    backgroundColor: '#FFC94A',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 8,
    flex: 1,
    alignItems: 'center',
  },
  shareBtn: {
    backgroundColor: '#FFC94A',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    flex: 1,
    alignItems: 'center',
  },
  btnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default MyIngredientsScreen; 