import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import BookDetailScreen from '../screens/BookDetailScreen';
import ImportScreen from '../screens/ImportScreen';

export type RootStackParamList = {
  Tabs: undefined;
  BookDetail: { bookId: string };
  Import: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Slightly customized dark theme
const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000',
    card: '#000',
    text: '#fff',
    primary: '#9acd32',
    border: '#111',
  },
};

export default function StackNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#9acd32',
          contentStyle: { backgroundColor: '#000' },
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookDetail"
          component={BookDetailScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Import"
          component={ImportScreen}
          options={{ title: 'Import from Goodreads', presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
