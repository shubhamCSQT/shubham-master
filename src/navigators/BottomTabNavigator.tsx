/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import CartScreen from '../screens/cart/CartScreen';
import { Image } from 'react-native';
import Icons from '../assets/constants/Icons';
import CollectionScreen from '@/screens/collection/CollectionsScreen';
import CollectionsScreen from '@/screens/collection/CollectionsScreen';
import { theme } from '@/atoms';
import { useIsUserLoggedIn } from '@/hooks/useIsUserLoggedIn';
import { BottomTabIcon } from '@/components/bottomTabIcon/BottomTabIcon';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { isUserLoggedIn } = useIsUserLoggedIn();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4486c6',
        tabBarActiveBackgroundColor: theme.backgroundColor,
        tabBarInactiveBackgroundColor: theme.backgroundColor,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <BottomTabIcon
                source={Icons.homeIcon}
                focused={focused}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <BottomTabIcon
              source={Icons.cartIcon}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Collection"
        component={CollectionsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <BottomTabIcon
              source={Icons.cartIcon}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <BottomTabIcon
              source={Icons.profileIcon}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
