import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  className?: string;
}

export default function Button({ title, variant = 'primary', isLoading, className, ...props }: ButtonProps) {
  let bgClass = 'bg-primary';
  let textClass = 'text-white';

  if (variant === 'secondary') {
    bgClass = 'bg-secondary';
  } else if (variant === 'outline') {
    bgClass = 'bg-transparent border border-secondary';
    textClass = 'text-textLight';
  }

  return (
    <TouchableOpacity 
      className={`rounded-md py-3 px-4 items-center justify-center flex-row ${bgClass} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className={`font-semibold text-base ${textClass}`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
