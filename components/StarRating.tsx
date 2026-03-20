import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StarRatingProps {
  rating: number; // 0 to 5
  size?: number;
  className?: string;
}

export default function StarRating({ rating, size = 16, className = '' }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <View className={`flex-row items-center ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Ionicons key={`full-${i}`} name="star" size={size} color="#00e054" />
      ))}
      {hasHalfStar && <Ionicons name="star-half" size={size} color="#00e054" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Ionicons key={`empty-${i}`} name="star-outline" size={size} color="#445566" />
      ))}
    </View>
  );
}
