/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { Box, Text, theme } from '@atoms';
import { Button, FlatList, TouchableOpacity } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const ShippingMethod = ({ checkoutDetails }) => {
  const shippmentMethod = checkoutDetails?.shipments?.[0]?.shipping_method;

  return (
    <>
      <TouchableOpacity activeOpacity={0.8}>
        <Box flex={1} flexDirection="row" mb="s12">
          <BouncyCheckbox
            disableBuiltInState
            isChecked={true}
            iconStyle={{
              borderColor: theme.colors.sushiittoRed,
            }}
            fillColor={theme.colors.sushiittoRed}
            size={20}
          />
          <Box width={'100%'} flexShrink={1} justifyContent="center">
            <Text variant="bold14" lineHeight={20} numberOfLines={2}>
              {shippmentMethod?.name}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    </>
  );
};

export default ShippingMethod;
