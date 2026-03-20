import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useReadboxdStore } from '../store/useReadboxdStore';
import BookCover from '../components/BookCover';
import ReviewCard from '../components/ReviewCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tabs'>;

export default function HomeScreen() {
  const { books, reviews } = useReadboxdStore();
  const navigation = useNavigation<NavigationProp>();
  
  const popularBooks = Object.values(books).slice(0, 5);
  const recentReviews = Object.values(reviews).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-base font-semibold uppercase tracking-wider">Popular This Week</Text>
            <Text className="text-textLight text-xs">More</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {popularBooks.map((book) => (
              <TouchableOpacity 
                key={book.id} 
                className="mr-3"
                onPress={() => navigation.navigate('BookDetail', { bookId: book.id })}
              >
                <BookCover url={book.coverUrl} title={book.title} size="md" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View className="mb-6">
          <Text className="text-white text-base font-semibold uppercase tracking-wider mb-3">New from Friends</Text>
          {recentReviews.map((review) => {
            const book = books[review.bookId];
            if (!book) return null;
            return (
              <ReviewCard 
                key={review.id}
                reviewerName={review.reviewerName}
                reviewerAvatar={review.reviewerAvatar}
                bookTitle={book.title}
                bookCover={book.coverUrl}
                rating={review.rating}
                reviewText={review.text}
                likes={review.likes}
                comments={review.comments}
                onPress={() => navigation.navigate('BookDetail', { bookId: book.id })}
              />
            );
          })}
        </View>

        <View className="h-20" /> 
      </ScrollView>
    </SafeAreaView>
  );
}
