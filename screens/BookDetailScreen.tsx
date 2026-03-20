import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useReadboxdStore } from '../store/useReadboxdStore';
import BookCover from '../components/BookCover';
import Button from '../components/Button';
import ReviewCard from '../components/ReviewCard';
import StarRating from '../components/StarRating';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

export default function BookDetailScreen({ route, navigation }: Props) {
  const { bookId } = route.params;
  const { books, reviews } = useReadboxdStore();
  
  const book = books[bookId];
  
  if (!book) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-white">Book not found</Text>
      </View>
    );
  }

  const bookReviews = Object.values(reviews).filter(r => r.bookId === bookId);
  const avgRating = bookReviews.length > 0 
    ? bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length 
    : 0;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center pt-6 pb-4 border-b border-surface">
          <BookCover url={book.coverUrl} title={book.title} size="xl" className="mb-4" />
          <Text className="text-white text-2xl font-bold text-center px-4">{book.title}</Text>
          <Text className="text-textLight text-base mt-1">{book.author} · {book.publishYear}</Text>
          
          <View className="flex-row items-center mt-3 mb-4">
            <StarRating rating={avgRating} size={18} />
            <Text className="text-textLight ml-2 text-sm">{avgRating.toFixed(1)}</Text>
          </View>

          <View className="flex-row px-4 w-full gap-x-3 mb-2">
            <Button title="Log or Review" variant="primary" className="flex-1" onPress={() => {}} />
            <Button title="Add to List" variant="secondary" className="flex-1" onPress={() => {}} />
          </View>
        </View>

        <View className="px-4 py-6 border-b border-surface">
          <Text className="text-white text-base font-semibold uppercase tracking-wider mb-2">Synopsis</Text>
          <Text className="text-textLight text-justify leading-5">{book.description}</Text>
        </View>

        <View className="px-4 py-6">
          <Text className="text-white text-base font-semibold uppercase tracking-wider mb-4">Recent Reviews</Text>
          {bookReviews.length === 0 ? (
            <Text className="text-textLight italic">No reviews yet.</Text>
          ) : (
            bookReviews.map(review => (
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
              />
            ))
          )}
        </View>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
