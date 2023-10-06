/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { Box, Text, theme } from '@atoms';
import { Button, FlatList, TouchableOpacity } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const ShipmentAddress = ({ checkoutDetails }) => {
  const shippmentAddress = checkoutDetails?.shipments?.[0]?.shipping_address;
  return (
    <>
      <TouchableOpacity activeOpacity={0.8}>
        {/* <Text style={styles.horizontalLine} /> */}
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
            {shippmentAddress?.full_name != undefined ? (
              <>
                <Text variant="bold14" lineHeight={20} numberOfLines={2}>
                  {shippmentAddress?.full_name}
                </Text>
                <Text
                  variant="regular14LightBlack"
                  lineHeight={20}
                  numberOfLines={2}
                >
                  {shippmentAddress?.title}
                </Text>
              </>
            ) : (
              <Text
                variant="regular14LightBlack"
                lineHeight={20}
                numberOfLines={2}
                // fontWeight="700"
              >
                {shippmentAddress?.title}
              </Text>
            )}
          </Box>
        </Box>
      </TouchableOpacity>
    </>
  );
};

export default ShipmentAddress;
