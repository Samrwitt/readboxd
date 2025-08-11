import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

export type TabParamList = {
  Home: undefined;
  Browse: undefined;
  Activity: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000' },
        tabBarActiveTintColor: '#9acd32', // Letterboxd-ish green accent
        tabBarInactiveTintColor: '#9ca3af',
        tabBarIcon: ({ color, size }) => {
          const name =
            route.name === 'Home' ? 'home' :
            route.name === 'Browse' ? 'grid' :
            route.name === 'Activity' ? 'time' :
            'person';
          return <Ionicons name={name as any} size={size} color={color} />;
        },
        tabBarLabel: ({ color, children }) => (
          <Text style={{ color, fontSize: 12 }}>{children}</Text>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Browse" component={BrowseScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
