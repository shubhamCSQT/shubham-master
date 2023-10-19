import React, { useCallback, useEffect } from 'react';
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

const HomeScreen = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

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
