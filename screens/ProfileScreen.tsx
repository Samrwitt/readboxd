import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useReadboxdStore } from '../store/useReadboxdStore';
import BookCover from '../components/BookCover';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { currentUser, books, diary } = useReadboxdStore();

  const favoriteBooksData = currentUser.favoriteBookIds.map(id => books[id]).filter(Boolean);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4 pt-6">
        
        {/* Header */}
        <View className="items-center mb-6 border-b border-surface pb-6">
          <View className="w-24 h-24 rounded-full bg-secondary items-center justify-center mb-4 border-2 border-primary">
            <Ionicons name="person" size={48} color="#99aabb" />
          </View>
          <Text className="text-white text-2xl font-bold">{currentUser.name}</Text>
          <Text className="text-textLight text-sm mb-2">{currentUser.handle}</Text>
          <Text className="text-textLight text-center italic px-4">{currentUser.bio}</Text>
          
          <View className="flex-row mt-4 w-full justify-evenly">
            <View className="items-center">
              <Text className="text-white font-bold text-xl">{currentUser.stats.totalBooks}</Text>
              <Text className="text-textLight text-xs uppercase tracking-wider">Books</Text>
            </View>
            <View className="items-center">
              <Text className="text-white font-bold text-xl">{currentUser.stats.thisYear}</Text>
              <Text className="text-textLight text-xs uppercase tracking-wider">This Year</Text>
            </View>
            <View className="items-center">
              <Text className="text-white font-bold text-xl">{currentUser.stats.following}</Text>
              <Text className="text-textLight text-xs uppercase tracking-wider">Following</Text>
            </View>
          </View>
        </View>

        {/* Favorite Books */}
        <View className="mb-8 items-center">
          <Text className="text-white text-base font-semibold uppercase tracking-wider mb-4 text-center">Favorite Books</Text>
          <View className="flex-row justify-center flex-wrap gap-2">
            {favoriteBooksData.map(book => (
              <View key={book.id}>
                <BookCover url={book.coverUrl} title={book.title} size="md" />
              </View>
            ))}
          </View>
        </View>

        {/* Diary Preview */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-base font-semibold uppercase tracking-wider">Recent Activity</Text>
            <Ionicons name="chevron-forward" size={16} color="#99aabb" />
          </View>
          
          {diary.slice(0, 3).map(entry => {
            const book = books[entry.bookId];
            if (!book) return null;
            return (
              <View key={entry.id} className="flex-row items-center mb-4 bg-surface p-3 rounded-lg border border-secondary">
                <BookCover url={book.coverUrl} title={book.title} size="sm" />
                <View className="ml-3 flex-1">
                  <Text className="text-white font-bold text-md mb-1">{book.title}</Text>
                  <Text className="text-textLight text-xs mb-2">Logged on {new Date(entry.dateRead).toLocaleDateString()}</Text>
                  {entry.rating && (
                    <View className="flex-row">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Ionicons 
                          key={star}
                          name={star <= entry.rating! ? "star" : "star-outline"} 
                          size={12} 
                          color="#00e054" 
                        />
                      ))}
                    </View>
                  )}
                </View>
              </View>
            )
          })}
        </View>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
