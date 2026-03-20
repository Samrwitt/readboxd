import React from 'react';
import { View, Image, Text } from 'react-native';

interface BookCoverProps {
  url?: string;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function BookCover({ url, title, size = 'md', className = '' }: BookCoverProps) {
  const sizeClasses = {
    sm: 'w-16 h-24',
    md: 'w-24 h-36',
    lg: 'w-32 h-48',
    xl: 'w-48 h-72',
  };

  if (url) {
    return (
      <Image 
        source={{ uri: url }} 
        className={`${sizeClasses[size]} rounded-md border border-[#2c3440] ${className}`}
        resizeMode="cover"
      />
    );
  }

  return (
    <View className={`${sizeClasses[size]} rounded-md border border-secondary bg-surface items-center justify-center p-2 ${className}`}>
      <Text className="text-textLight text-xs text-center" numberOfLines={3}>{title}</Text>
    </View>
  );
}
