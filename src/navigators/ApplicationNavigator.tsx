import React, { useRef } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useTheme } from '../hooks';
import MainNavigator from './MainNavigator';
import { useFlipper } from '@react-navigation/devtools';
import { ApplicationStackParamList } from '../../@types/navigation';
import { ThemeProvider } from '@shopify/restyle';
import { darkTheme, lightTheme } from '@/atoms';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;

  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef('');

  useFlipper(navigationRef);

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer
        theme={NavigationTheme}
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current =
            navigationRef?.current?.getCurrentRoute()?.name ?? '';
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName =
            navigationRef?.current?.getCurrentRoute()?.name || '';
          if (previousRouteName !== currentRouteName) {
            console.log('currentRouteName: ', currentRouteName);
          }
          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName;
        }}
      >
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <ThemeProvider theme={darkMode ? lightTheme : darkTheme}>
          <MainNavigator />
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
