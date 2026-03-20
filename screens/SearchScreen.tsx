import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useReadboxdStore } from '../store/useReadboxdStore';
import BookCover from '../components/BookCover';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tabs'>;

export default function SearchScreen() {
  const { books } = useReadboxdStore();
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState('');

  const filteredBooks = Object.values(books).filter(
    (b) => b.title.toLowerCase().includes(query.toLowerCase()) || 
           b.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row items-center bg-surface px-3 py-2 rounded-lg border border-secondary">
          <Ionicons name="search" size={20} color="#99aabb" />
          <TextInput
            className="flex-1 ml-2 text-white text-base"
            placeholder="Search for books, authors..."
            placeholderTextColor="#99aabb"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color="#99aabb" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text className="text-textLight text-center mt-10">No books found.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="flex-row items-center mb-4 bg-surface p-3 rounded-lg border border-secondary"
            onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
          >
            <BookCover url={item.coverUrl} title={item.title} size="md" />
            <View className="ml-4 flex-1">
              <Text className="text-white text-lg font-bold mb-1">{item.title}</Text>
              <Text className="text-textLight text-sm mb-2">{item.author}</Text>
              <Text className="text-textLight text-xs italic" numberOfLines={2}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
