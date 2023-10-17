import { api } from '@/api/SecureAPI';
import React, { useEffect, useState } from 'react';
import { Box, Text, theme } from '@atoms';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

import CommonHeader from '@/components/CommonHeader/CommonHeader';
import CommonSolidButton from '@/components/CommonSolidButton/CommonSolidButton';
import ShipmentAddress from './ShipmentAddress';
import ShippingMethod from './ShippingMethod';
import { useNavigation } from '@react-navigation/native';
import { createCustomerBasket } from '@/redux/createBasketApi/CreateBasketApiAsyncThunk';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerBasketApi } from '@/redux/basket/BasketApiAsyncThunk';
import { customerId } from '@/utils/appUtils';
import { getCustomerCartItems } from '@/redux/cartItemsApi/CartItemsAsyncThunk';
import CommonOptionsSelector from '@/components/CommonOptionsSelector/CommonOptionsSelector';
import { getShippmentMethods } from '@/redux/shippmentMethodApi/ShippmentMethodApiAsyncThunk';
const CheckoutScreen = props => {
  const basketId = props.route.params?.basketId;
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedShippmentIndex, setSelectedShippmentIndex] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const ADDRESSES_DATA = useSelector(
    state =>
      state?.getCustomerDetailsApiSlice?.customerDetails?.data?.userProfile,
  );

  const shippmentMethods = useSelector(
    state =>
      state?.getShippmentMethodsApiSlice?.shippmentMethods?.data
        ?.applicable_shipping_methods,
  );

  useEffect(() => {
    setIsLoading(true);
    dispatch(getShippmentMethods(`sfcc/shipping_method/${basketId}/me`)).then(
      () => {
        setIsLoading(false);
      },
    );
  }, [basketId, selectedShippmentIndex]);

  useEffect(() => {
    const reqBody = {
      address1: 'Ocapi',
      address2: 'Demo',
      city: ADDRESSES_DATA[selectedAddressIndex]?.city,
      first_name: ADDRESSES_DATA[selectedAddressIndex]?.firstName,
      full_name:
        ADDRESSES_DATA[selectedAddressIndex]?.firstName +
        ADDRESSES_DATA[selectedAddressIndex]?.lastName,
      id: ADDRESSES_DATA[selectedAddressIndex]?.addressNumber,
      last_name: ADDRESSES_DATA[selectedAddressIndex]?.lastName,
      phone: ADDRESSES_DATA[selectedAddressIndex]?.phone,
      postal_code: '45200',
      state_code: '45200',
      title: 'OcapiDemo',
    };
    const shipment = async () => {
      const reqBodyShippment = {
        id: shippmentMethods[selectedShippmentIndex]?.id,
      };

      const response = await api.put(
        `sfcc/new_shippment_method/${basketId}?shipment_id=me`,
        reqBodyShippment,
      );
      console.log('response: ', response?.data?.data);

      const shippment_address = await api.put(
        `sfcc/new_shipping_address/${basketId}?shipment_id=me`,
        reqBody,
      );
      console.log('shippment_address: ', shippment_address?.data?.data);

      const billingAddress = await api.put(
        `sfcc/new_billing_address/${basketId}`,
        reqBody,
      );
      console.log('billingAddress: ', billingAddress?.data?.data);
      const reqBodyPayment = {
        payment_card: {
          card_type: 'Visa',
          credit_card_expired: false,
          credit_card_token: '123',
          expiration_month: 8,
          expiration_year: 2024,
          holder: 'shubham verma',
          issue_number: '123',
          number: '411111111111',
          security_code: '123',
          valid_from_month: 4,
          valid_from_year: 21,
        },
        amount: 100000,
        payment_method_id: 'CREDIT_CARD',
      };
      const confirmPayment = await api.post(
        `sfcc/confirmPayment/${basketId}`,
        reqBodyPayment,
      );
      console.log('confirmPayment: ', confirmPayment?.data?.data);

      setIsLoading(false);
    };
    shipment();
  }, [basketId, selectedAddressIndex, selectedShippmentIndex]);

  // useEffect(() => {
  //   const shipment = async () => {
  //     const reqBodyPayment = {
  //       payment_card: {
  //         card_type: 'Visa',
  //         credit_card_expired: false,
  //         credit_card_token: '123',
  //         expiration_month: 8,
  //         expiration_year: 2024,
  //         holder: 'shubham verma',
  //         issue_number: '123',
  //         number: '411111111111',
  //         security_code: '123',
  //         valid_from_month: 4,
  //         valid_from_year: 21,
  //       },
  //       amount: 100000,
  //       payment_method_id: 'CREDIT_CARD',
  //     };
  //     const confirmPayment = await api.post(
  //       `sfcc/confirmPayment/${basketId}`,
  //       reqBodyPayment,
  //     );
  //     console.log('confirmPayment: ', confirmPayment?.data?.data);

  //     const reqBodyShippment = {
  //       id: shippmentMethods[selectedShippmentIndex]?.id,
  //     };

  //     const response = await api.put(
  //       `sfcc/new_shippment_method/${basketId}`,
  //       reqBodyShippment,
  //     );

  //     console.log('response: ', response?.data?.data);
  //   };
  //   shipment();
  // }, [basketId, selectedShippmentIndex]);

  const orderConfirm = async () => {
    // const reqBody = {
    //   payment_card: {
    //     card_type: 'Visa',
    //     credit_card_expired: false,
    //     credit_card_token: '123',
    //     expiration_month: 8,
    //     expiration_year: 2024,
    //     holder: holderName,
    //     issue_number: '123',
    //     number: '411111111111',
    //     security_code: '123',
    //     valid_from_month: 4,
    //     valid_from_year: 21,
    //   },
    //   amount: '',
    //   payment_method_id: 'CREDIT_CARD',
    // };
    // const confirmPayment = await api.post(
    //   `sfcc/confirmPayment/${basketId}`,
    //   reqBody,
    // );

    // if (confirmPayment?.data?.status == 401) {
    //   Alert.alert('Unauthorised', 'Your session is expired , Please login!');
    //   navigation.navigate('LoginScreen');
    // }
    const reqBody = {
      basket_id: basketId,
    };
    const confirmOrder = await api.post(`sfcc/placeOrder`, reqBody);
    console.log('confirmOrder: ', confirmOrder?.data?.data);
    if (confirmOrder?.data?.status == 200) {
      dispatch(createCustomerBasket(`sfcc/createCart`));
      dispatch(getCustomerBasketApi(`sfcc/getCustomerCart/${customerId}`));
      dispatch(getCustomerCartItems(`sfcc/cartDetail/${basketId}`));
      Alert.alert('Order Placed', 'Your order is placed successfully');
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Box flex={1} backgroundColor="white">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <CommonHeader title={'Checkout'} />
          {!isLoading ? (
            <>
              <Box paddingHorizontal="paddingHorizontal">
                <Box mb="s16">
                  <Text mb="s8" variant="regular16">
                    Select Address
                  </Text>
                  <CommonOptionsSelector
                    DATA={ADDRESSES_DATA}
                    selectedIndex={selectedAddressIndex}
                    setSelectedIndex={setSelectedAddressIndex}
                    hideContinueButton
                  />

                  {/* <ShipmentAddress checkoutDetails={checkoutDetails} /> */}
                </Box>
                <Box mb="s16">
                  <Text mb="s16" variant="regular16">
                    Select shipment method
                  </Text>
                  <CommonOptionsSelector
                    DATA={shippmentMethods}
                    selectedIndex={selectedShippmentIndex}
                    setSelectedIndex={setSelectedShippmentIndex}
                    hideContinueButton
                  />
                  {/* <ShippingMethod checkoutDetails={checkoutDetails} /> */}
                </Box>
                {/* <Box style={styles.borderBox}>
                  <Text variant="bold14">Order Summary</Text>
                  <Box flexDirection="row" justifyContent="space-between">
                    <Text>Subtotal</Text>
                    <Text>$ {checkoutDetails?.product_sub_total}</Text>
                  </Box>
                  <Box flexDirection="row" justifyContent="space-between">
                    <Text>Shipping</Text>
                    <Text>$ {checkoutDetails?.shipping_total}</Text>
                  </Box>
                  <Box flexDirection="row" justifyContent="space-between">
                    <Text>Sales Tax</Text>
                    <Text>$ {checkoutDetails?.tax_total}</Text>
                  </Box>
                  <Box flexDirection="row" justifyContent="space-between">
                    <Text variant="bold14">Total</Text>
                    <Text>$ {checkoutDetails?.order_total}</Text>
                  </Box>
                </Box> */}
              </Box>
            </>
          ) : (
            <>
              <ActivityIndicator color={theme.colors.sushiittoRed} />
            </>
          )}
        </ScrollView>
        <Box
          padding="s16"
          style={theme.cardVariants.bottomButtonShadow}
          backgroundColor="white"
        >
          <CommonSolidButton title="Place Order" onPress={orderConfirm} />
        </Box>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  borderBox: {
    borderWidth: 1, // Set the border width
    borderColor: 'black', // Set the border color
    borderRadius: 5, // Optional: Set border radius for rounded corners
    padding: 10, // Optional: Add padding inside the border
  },
});
export default CheckoutScreen;
