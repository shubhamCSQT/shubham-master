import React, {useCallback, useEffect} from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { Box ,Text, theme} from '@/atoms';
import ContentFullSection from './contentFull/ContentFullSection';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import NewArrivals from './newArrival/NewArrivals';
import BestSellingProducts from './bestSellingProducts/BestSellingProducts';
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const ViewData = [
    'ContentFullSection',
    'NewArrival',
    'bestSelling'
  ];

  const renderHomeItems = useCallback(({item}) => {
    switch (item) {
      case 'ContentFullSection':
        return <ContentFullSection />;
          case 'NewArrival':
        return <NewArrivals />;
         case 'bestSelling':
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
