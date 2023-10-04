import React, { useEffect, useState } from 'react';
import { Box, Text, theme } from '@atoms';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const CartItemQuantity = ({ cartItem }) => {
  const [isloading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const changeQuantity = async (itemId, count, sku) => {
    setIsLoading(true);

    const productCart = {
      data: {
        type: 'items',
        attributes: {
          sku: sku,
          quantity: count,
          salesUnit: {
            id: 0,
            amount: 0,
          },
          productOptions: [null],
        },
      },
    };
    const resp = await api.patch(
      `carts/${customerCart.id}/items/${itemId}`,
      JSON.stringify(productCart),
    );
    const response = resp.data;
    if (response) {
      dispatch(CustomerCartIdApiAsyncThunk('carts')).then(() => {});
      dispatch(getCartDataNew(newCartApiUrl)).then(res => {
        if (res.payload.status === 200) {
          console.log('carts api call successful');
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.log('mulesoft carts api call not successful');
        }
      });
    } else {
    }
  };

  return (
    <Box flexDirection="row" alignItems="center">
      <TouchableOpacity
        onPress={() => changeQuantity(cartItem?.itemId, cartItem?.quantity + 1)}
        style={styles.quantityButton}
      >
        <Text style={styles.quantityText}>-</Text>
      </TouchableOpacity>
      {isloading ? (
        <Box width={40} alignItems="center">
          <ActivityIndicator color={theme.colors.sushiittoRed} />
        </Box>
      ) : (
        <Box width={40} alignItems="center">
          <Text style={styles.quantity}>{cartItem?.quantity}</Text>
        </Box>
      )}
      <TouchableOpacity
        onPress={() => changeQuantity(cartItem?.itemId, cartItem?.quantity + 1)}
      >
        <Text style={styles.quantityText}>+</Text>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  quantityText: {
    fontSize: 20,
    color: 'black',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
});

export default CartItemQuantity;
