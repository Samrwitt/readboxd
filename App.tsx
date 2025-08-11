// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StackNavigator from './navigation/StackNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Dark UI like Letterboxd */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <StackNavigator />
    </GestureHandlerRootView>
  );
}

