/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerBasketApi } from '@/redux/basket/BasketApiAsyncThunk';
import { customerId } from '@/utils/appUtils';
import { createCustomerBasket } from '@/redux/createBasketApi/CreateBasketApiAsyncThunk';
import { getCustomerDetails } from '@/redux/profileApi/ProfileApiAsyncThunk';
import { AuthContext } from './MainNavigator';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.lightBlack,
        tabBarActiveBackgroundColor: theme.backgroundColor,
        tabBarInactiveBackgroundColor: theme.backgroundColor,
        tabBarStyle: {
          // height: 49, // default
          // height: 42,
        },
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
      {/* <Tab.Screen
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
      /> */}
      <Tab.Screen
        name="Collections"
        component={CollectionsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <BottomTabIcon
              source={Icons.collectionsIcon}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
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
