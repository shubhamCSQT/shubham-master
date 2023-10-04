/* eslint-disable prettier/prettier */
import { theme } from '@/atoms';
import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={'dark-content'}
      />
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
