import React, { useEffect, useState } from 'react';
import { Box, Text, theme } from '@/atoms';
import { TouchableOpacity, Image } from 'react-native';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItemQuantity from './CartItemQuantity';
import { RemoveIcon } from '@/assets/svgs';
import { api } from '@/api/SecureAPI';
import { getCustomerCartItems } from '@/redux/cartItemsApi/CartItemsAsyncThunk';
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const customerCartId = useSelector(
    state =>
      state?.getCustomerBasketApiSlice?.customerBasket?.data?.baskets?.[0]
        ?.basket_id || [],
  );

  const removeItem = async itemId => {
    setIsLoading(true);
    const reqBody = {
      item_id: itemId,
    };
    const req = JSON.stringify(reqBody);
    const response = await api
      .Delete(`sfcc/removeItem/${customerCartId}`, req)
      .then(res => {
        if (res?.data?.status == 200) {
          dispatch(
            getCustomerCartItems(`sfcc/getCartDetails/${customerCartId}`),
          )
            .then(res => {
              if (res.payload.status === 200) {
                setIsLoading(false);
              } else {
                setIsLoading(false);
              }
            })
            .catch(error => {
              console.log('error: ', error);
              setIsLoading(false);
            });
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
              <Box width={'90%'}>
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
                    customerCartId={customerCartId}
                  />
                </Box>
                {/* <Box>
                  <TouchableOpacity onPress={() => removeItem(item?.itemId)}>
                    <Text>
                      <RemoveIcon />
                    </Text>
                  </TouchableOpacity>
                </Box> */}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartItem;
