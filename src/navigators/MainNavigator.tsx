import React from 'react';
import { Example } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      {/* <Stack.Screen name="Home" component={Example} /> */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
