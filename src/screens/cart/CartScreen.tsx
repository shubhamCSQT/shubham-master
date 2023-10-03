import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Box } from '@/atoms';
import CommonHeader from '@/components/CommonHeader/CommonHeader';

const CartScreen = () => {
  return (
    <Box flex={1} backgroundColor="background">
      <CommonHeader title={'Cart'} />
      <Text>CartScreen</Text>
    </Box>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
