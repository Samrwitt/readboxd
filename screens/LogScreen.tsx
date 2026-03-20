import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useReadboxdStore } from '../store/useReadboxdStore';
import BookCover from '../components/BookCover';
import Button from '../components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LogScreen() {
  const { books, addReview, addToDiary } = useReadboxdStore();
  const navigation = useNavigation();
  
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');

  const handleLog = () => {
    if (!selectedBookId) {
      Alert.alert('Error', 'Please select a book first.');
      return;
    }
    
    if (reviewText.trim().length > 0 || rating > 0) {
      addReview({
        bookId: selectedBookId,
        rating,
        text: reviewText
      });
    }

    addToDiary({
      bookId: selectedBookId,
      dateRead: new Date().toISOString(),
      rating
    });

    Alert.alert('Success', 'Book logged successfully!', [
      { text: 'OK', onPress: () => {
        setSelectedBookId(null);
        setRating(0);
        setReviewText('');
        navigation.goBack();
      }}
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4 pt-6">
        <Text className="text-white text-2xl font-bold mb-6">I Watched... I mean, Read...</Text>
        
        {!selectedBookId ? (
          <View>
            <Text className="text-textLight mb-3 uppercase tracking-wider text-sm font-semibold">Select a book</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-6">
              {Object.values(books).map(book => (
                <TouchableOpacity 
                  key={book.id} 
                  className="mr-3"
                  onPress={() => setSelectedBookId(book.id)}
                >
                  <BookCover url={book.coverUrl} title={book.title} size="md" />
                  <Text className="text-textLight text-xs mt-1 text-center w-24" numberOfLines={1}>{book.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View className="mb-6">
            <View className="flex-row mb-4 bg-surface p-3 rounded-lg border border-secondary items-center">
              <BookCover 
                url={books[selectedBookId]?.coverUrl} 
                title={books[selectedBookId]?.title} 
                size="sm" 
              />
              <View className="ml-3 flex-1">
                <Text className="text-white font-bold text-lg">{books[selectedBookId]?.title}</Text>
                <Text className="text-textLight">{books[selectedBookId]?.author}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedBookId(null)} className="p-2">
                <Ionicons name="close-circle" size={24} color="#99aabb" />
              </TouchableOpacity>
            </View>

            <Text className="text-white mb-2 font-semibold">Rating</Text>
            <View className="flex-row mb-6">
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity key={star} onPress={() => setRating(star)} className="mr-1">
                  <Ionicons 
                    name={star <= rating ? "star" : "star-outline"} 
                    size={32} 
                    color="#00e054" 
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-white mb-2 font-semibold">Review</Text>
            <TextInput
              className="bg-surface text-white p-4 rounded-lg border border-secondary mb-6 min-h-[120px]"
              multiline
              placeholder="Write your thoughts..."
              placeholderTextColor="#99aabb"
              value={reviewText}
              onChangeText={setReviewText}
              style={{ textAlignVertical: 'top' }}
            />

            <Button title="Save" onPress={handleLog} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
