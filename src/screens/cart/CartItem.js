import React, { useEffect, useState } from 'react';
import { Box, Text, theme } from '@/atoms';
import { TouchableOpacity, Image } from 'react-native';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItemQuantity from './CartItemQuantity';
import { RemoveIcon } from '@/assets/svgs';
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const removeItem = async itemId => {
    setIsLoading(true);
    const response = await api
      .Delete(`carts/${customerCart.id}/items/${itemId}`)
      .then(res => {
        if (res.data.status == 204) {
          // dispatch(
          //   getCustomerCartItems(
          //     `carts/${customerCart.id}?include=items%2Cbundle-items`,
          //   ),
          // ).then(() => {
          //   setIsLoading(false);
          // });
          // dispatch(CustomerCartIdApiAsyncThunk('carts')).then(() => {});
          // dispatch(getCartDataNew(newCartApiUrl)).then(res => {
          //   if (res.payload.status === 200) {
          //     console.log('carts api call successful');
          //     setIsLoading(false);
          //   } else {
          //     console.log('mulesoft carts api call not successful');
          //     setIsLoading(false);
          //   }
          // });
        }
      });
  };

  return (
    <Box
      borderRadius={8}
      borderColor="border"
      borderWidth={1}
      mb="s8"
      padding="s8"
      flex={1}
    >
      {isLoading === true ? (
        <ActivityIndicator color={theme.colors.sushiittoRed} />
      ) : (
        <>
          <Box flexDirection="row" backgroundColor="white">
            <Box alignItems="center" mr="s8">
              <Box height={120} width={120}>
                <Image
                  style={{ height: 120, width: 120, resizeMode: 'contain' }}
                  source={{
                    uri: item?.imageUrl,
                  }}
                />
              </Box>
            </Box>
            <Box justifyContent="space-between">
              <Box>
                <Text variant="bold16">{item?.productName}</Text>
                <Text variant="bold16" style={{ marginTop: 4 }}>
                  ${item?.price}
                </Text>
              </Box>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <CartItemQuantity
                    cartItem={item}
                    removeItemTrigger={removeItem}
                  />
                </Box>
                <Box>
                  <TouchableOpacity onPress={() => removeItem(item?.itemId)}>
                    <Text>
                      <RemoveIcon />
                    </Text>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartItem;
