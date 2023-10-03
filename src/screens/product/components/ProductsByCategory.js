/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { theme } from '../../../atoms/theme';
import { Box, Text } from '@/atoms';
import { commonApi } from '@/api/CommanAPI';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsApiAsyncThunk } from '@/redux/productsApi/ProductsApiAsyncThunk';
import ProductItem from '@/components/product/ProductItem';
import CommonHeader from '@/components/CommonHeader/CommonHeader';

const ProductsByCategory = props => {
  const [isLoading, setIsLoading] = useState(false);
  const parent_id = props.route?.params.item.parent_id;
  const categoryId = props.route?.params?.item?.Id;

  const dispatch = useDispatch();

  const productsByCategory = useSelector(
    state =>
      state?.getProductsByCategoryApiSlice?.productsByCategory?.data
        ?.productData || [],
  );
  useEffect(() => {
    setIsLoading(true);
    dispatch(ProductsApiAsyncThunk(`sfcc/products-by-category/${categoryId}`))
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, [categoryId]);

  const renderItem = ({ item, index }) => (
    <>
      <ProductItem item={item} index={index} />
    </>
  );
  return (
    <Box style={styles.container}>
      <CommonHeader title={'All Products'} showCartIcon searchIcon={true} />
      <>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={productsByCategory}
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={styles.productList}
          />
        )}
      </>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    // padding: 16,
  },

  productList: {
    // justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ProductsByCategory;
