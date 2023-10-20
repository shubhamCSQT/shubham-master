import React, { useCallback, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, StatusBar } from 'react-native';
import { Box, theme } from '@/atoms';
import ContentFullSection from './contentFull/ContentFullSection';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CommonSearchHeader from '@/components/CommonSearchHeader/CommonSearchHeader';
import { getNewArrival } from '@/redux/newArrivalApi/NewArrivalApiAsyncThunk';
import config from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import HomePlp from './homePlp/HomePlp';
import { getBestSellings } from '@/redux/bestSellingProductApi/BestSellingProductApiAsyncThunk';
import { customerId } from '@/utils/appUtils';
import { getCustomerDetails } from '@/redux/profileApi/ProfileApiAsyncThunk';
import { createCustomerBasket } from '@/redux/createBasketApi/CreateBasketApiAsyncThunk';
import { getCustomerBasketApi } from '@/redux/basket/BasketApiAsyncThunk';
import { AuthContext } from '@/navigators/MainNavigator';
import { useIsUserLoggedIn } from '@/hooks/useIsUserLoggedIn';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const { isUserLoggedIn } = useIsUserLoggedIn();
  const { signOut } = useContext(AuthContext);

  const customerBasket = useSelector(
    state => state.getCustomerBasketApiSlice?.customerBasket?.data,
  );
  console.log('customerBasket: ', customerBasket);

  useEffect(() => {
    if (isUserLoggedIn && customerBasket?.total >= 1) {
      dispatch(getCustomerBasketApi(`sfcc/getCustomerCart/${customerId}`)).then(
        res => {
          if (res.payload.data.status === 401) {
            signOut();
          }
        },
      );
    }
    if (isUserLoggedIn || customerBasket?.total === 0) {
      dispatch(createCustomerBasket(`sfcc/createCart`)).then(res => {
        console.log('res: ', res);
        if (res.payload.data.status === 401) {
          signOut();
        } else {
          dispatch(
            getCustomerBasketApi(`sfcc/getCustomerCart/${customerId}`),
          ).then(res => {
            if (res.payload.data.status === 401) {
              signOut();
            }
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    dispatch(getCustomerDetails(`sfcc/user-details/${customerId}`)).then(
      () => {},
    );
  }, [customerId]);

  const newArrivals = useSelector(
    state => state?.getNewArrivalApiSlice?.newArrivals?.data,
  );

  const bestSellings = useSelector(
    state => state?.getBestSellingsApiSlice?.bestSellings?.data,
  );

  const ViewData = ['ContentFullSection', 'NewArrival', 'BestSelling'];

  const renderHomeItems = useCallback(
    ({ item }: any) => {
      switch (item) {
        case 'ContentFullSection':
          return <ContentFullSection />;
        case 'NewArrival':
          return (
            <HomePlp productList={newArrivals} listTitle={'New Arrivals'} />
          );
        case 'BestSelling':
          return (
            <HomePlp productList={bestSellings} listTitle={'Best Selling'} />
          );
        default:
          return <></>;
      }
    },
    [ViewData],
  );

  useEffect(() => {
    // dispatch(getNewArrival('sfcc/new-arrivals'));
    dispatch(getNewArrival(config.collections.newArrivals));
    dispatch(getBestSellings(config.collections.bestSelling));
  }, []);

  return (
    <Box flex={1} backgroundColor="white">
      <StatusBar animated={true} backgroundColor={theme.colors.background} />
      <CommonSearchHeader />
      <FlatList
        data={ViewData}
        renderItem={renderHomeItems}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top,
        }}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 16,
  },
});

export default HomeScreen;
