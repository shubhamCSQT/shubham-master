import React, { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Box } from '@/atoms';
import ContentFullSection from './contentFull/ContentFullSection';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NewArrivals from './newArrival/NewArrivals';
import BestSellingProducts from './bestSellingProducts/BestSellingProducts';
const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  const ViewData = [
    'ContentFullSection',
    'NewArrival',
    // 'BestSelling'
  ];

  const renderHomeItems = useCallback(({ item }: any) => {
    switch (item) {
      case 'ContentFullSection':
        return <ContentFullSection />;
      case 'NewArrival':
        return <NewArrivals />;
      case 'BestSelling':
        return <BestSellingProducts />;
      default:
        return <></>;
    }
  }, []);

  return (
    <Box flex={1} backgroundColor="white">
      <FlatList
        data={ViewData}
        renderItem={renderHomeItems}
        key={Math.random()}
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
