/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect, useContext} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Box,Text,theme } from '@/atoms';
import {useSelector, useDispatch} from 'react-redux';
import CommonHeader from '@/components/CommonHeader/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import { useIsUserLoggedIn } from '@/hooks/useIsUserLoggedIn';
import CommonSolidButton from '@/components/CommonSolidButton/CommonSolidButton';
import { applicationProperties } from '@/utils/application.properties';
import { getCustomerCartItems } from '@/redux/cartItemsApi/CartItemsAsyncThunk';
import CartItem from './CartItem';

const CartScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [cartItemsArray, setCartItemsArray] = useState([]);
  const {isUserLoggedIn} = useIsUserLoggedIn();
  const dispatch = useDispatch();

  const customerCartId = useSelector(
    state => state?.getCustomerBasketApiSlice?.customerBasket?.data?.baskets?.[0]?.basket_id || [],
  );

    const customerCartItems = useSelector(
    state => state?.getCustomerCartItemsAliSlice?.customerCartItems?.data || [],
  );
      // console.log('customerCartItems: ', customerCartItems?.totalizers?.Items>0);

  useEffect(() => {
    if (customerCartId) {
      dispatch(getCustomerCartItems(`sfcc/getCartDetails/${customerCartId}`)).then(res => {
        if (res.payload.status === 200) {
          console.log('carts api call successful');
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.log('carts api call not successful');
        }
      });
    }
  }, []);


  const ListEmptyComponent = () => {
    return (
      <Box flex={1} justifyContent="center">
        <Text textAlign="center">No Items in cart.</Text>
      </Box>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box flex={1} backgroundColor="white">
        {isUserLoggedIn ? (
          <>
            <CommonHeader title={'Your Cart'} />
            {isLoading ? (
              <>
                <ActivityIndicator color={theme.colors.sushiittoRed} />
              </>
            ) : (
              <>
                <ScrollView
                  contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: theme.spacing.paddingHorizontal,
                  }}>
                  <Box>
                    <FlatList
                       data={customerCartItems?.products}
                      renderItem={item => {
                        const data = item?.item;
                        return <CartItem item={data} />;
                      }}
                      ListEmptyComponent={
                        isLoading === false ? (
                          <ListEmptyComponent />
                        ) : (
                          <ActivityIndicator />
                        )
                      }
                      scrollEnabled={false}
                    />
                     {customerCartItems?.totalizers?.Items>0 ? (
                      <>
                        <Box
                          justifyContent="flex-end"
                          flexDirection="row"
                          paddingVertical="s8">
                          <Text>
                            Total Discount : 
                           ${customerCartItems?.totalizers?.Discounts}
                          </Text>
                        </Box>
                        {/* <Box justifyContent="flex-end" flexDirection="row">
                          <Text>
                            Tax Included : $
                          </Text>
                        </Box> */}
                        <Box
                          justifyContent="flex-end"
                          flexDirection="row"
                          paddingVertical="s8">
                          <Text variant="bold24">
                            Total : {customerCartItems?.totalizers?.CartTotal}
                          </Text>
                        </Box>
                      </>
                    ) : (
                      <>
                        <ListEmptyComponent />
                      </>
                    )}
                  </Box>
                </ScrollView>
              </>
            )}
          </>
        ) : (
          <>
       <Box flex={1} justifyContent="center">
        <Text textAlign="center">PLease logged in first!</Text>
      </Box>
          </>
        )}
      </Box>
    </SafeAreaView>
  );
};
export default CartScreen;
