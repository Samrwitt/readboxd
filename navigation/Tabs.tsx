import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LogScreen from '../screens/LogScreen';
import ListsScreen from '../screens/ListsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Log: undefined;
  Lists: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#14181c', borderTopColor: '#2c3440' },
        tabBarActiveTintColor: '#00e054', // Letterboxd green
        tabBarInactiveTintColor: '#99aabb',
        tabBarIcon: ({ color, size }) => {
          let name: any;
          if (route.name === 'Home') name = 'home';
          else if (route.name === 'Search') name = 'search';
          else if (route.name === 'Log') name = 'add-circle';
          else if (route.name === 'Lists') name = 'list';
          else if (route.name === 'Profile') name = 'person';
          
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Log" component={LogScreen} />
      <Tab.Screen name="Lists" component={ListsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
