/* eslint-disable react-native/no-inline-styles */
import { theme } from '@/atoms';
import React from 'react';
import { Image } from 'react-native';

export const BottomTabIcon = ({
  source,
  focused,
  color,
}: {
  source: any;
  focused: boolean;
  color: string;
}) => {
  return (
    <Image
      source={source}
      style={{
        width: 24,
        height: 24,
        tintColor: focused ? theme.colors.black : theme.colors.lightGrey,
      }}
    />
  );
};
