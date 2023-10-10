import React, { useEffect, useState } from 'react';
import { Box, Text, theme } from '@/atoms';
import { TouchableOpacity, Image } from 'react-native';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveIcon } from '@/assets/svgs';
import { api } from '@/api/SecureAPI';
const OrderItem = ({ item }) => {
  return (
    <Box
      borderRadius={8}
      borderColor="border"
      borderWidth={1}
      mb="s8"
      padding="s8"
      flex={1}
    >
      <Box flexDirection="row" backgroundColor="white">
        <Box alignItems="center" mr="s8">
          <Box height={120} width={120}>
            <Image
              style={{ height: 120, width: 120, resizeMode: 'contain' }}
              source={{
                uri: 'https://zzkd-003.dx.commercecloud.salesforce.com/on/demandware.static/-/Sites-apparel-m-catalog/default/dw34bed4cb/images/large/PG.10228237.JJDL6XX.PZ.jpg',
              }}
            />
          </Box>
        </Box>
        <Box justifyContent="space-between">
          <Box width={'90%'}>
            <Text variant="bold14">{item?.product_name}</Text>
            <Text variant="bold14" style={{ marginTop: 4 }}>
              ${item?.price}
            </Text>
          </Box>
          <Box width={'90%'}>
            <Text>Quantity: {item?.quantity}</Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderItem;
