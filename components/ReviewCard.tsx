import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import StarRating from './StarRating';
import BookCover from './BookCover';

interface ReviewCardProps {
  reviewerName: string;
  reviewerAvatar?: string;
  bookTitle: string;
  bookCover?: string;
  rating: number;
  reviewText: string;
  likes: number;
  comments: number;
  onPress?: () => void;
}

export default function ReviewCard({
  reviewerName, reviewerAvatar, bookTitle, bookCover, rating, reviewText, likes, comments, onPress
}: ReviewCardProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onPress}
      className="bg-surface rounded-lg p-4 mb-4 border border-secondary"
    >
      <View className="flex-row items-center mb-3">
        {reviewerAvatar ? (
          <Image source={{ uri: reviewerAvatar }} className="w-8 h-8 rounded-full mr-2" />
        ) : (
          <View className="w-8 h-8 rounded-full bg-secondary mr-2 items-center justify-center">
            <Text className="text-white text-xs">{reviewerName.charAt(0)}</Text>
          </View>
        )}
        <Text className="text-textLight flex-1">
          <Text className="text-white font-bold">{reviewerName}</Text> reviewed
        </Text>
      </View>

      <View className="flex-row">
        <BookCover title={bookTitle} url={bookCover} size="sm" className="mr-3" />
        <View className="flex-1">
          <Text className="text-white font-bold text-lg mb-1">{bookTitle}</Text>
          <StarRating rating={rating} size={14} className="mb-2" />
          <Text className="text-textLight text-sm mb-3" numberOfLines={3}>
            {reviewText}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-textLight text-xs mr-4">{likes} likes</Text>
            <Text className="text-textLight text-xs">{comments} comments</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
