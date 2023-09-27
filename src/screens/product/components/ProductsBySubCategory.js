/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { theme } from '../../../atoms/theme';
import { Box, Text } from '@/atoms';
import { commonApi } from '@/api/CommanAPI';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsApiAsyncThunk } from '@/redux/productsApi/ProductsApiAsyncThunk';
import ProductItem from '@/components/product/ProductItem';
import { getproductsBySubCategory } from '@/redux/productsBySubCategory/SubCategoryProductsAsyncThunk';
import SubCategoryProducts from './SubCategoryProducts';
import CommonHeader from '@/components/CommonHeader/CommonHeader';

const ProductsBySubCategory = props => {
  const [isLoading, setIsLoading] = useState(false);
  const parent_id = props.route?.params.parent_id;
  const dispatch = useDispatch();
  const productsBySubCategory = useSelector(
    state =>
      state?.getProductsBySubCategoryApiSlice?.productsBySubCategory?.data ||
      [],
  );

  useEffect(() => {
    setIsLoading(true);
    dispatch(getproductsBySubCategory(`vtex-plp-by-subcategory/${parent_id}`))
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, [parent_id]);
  const renderItem = ({ item, index }) => (
    <>
      <SubCategoryProducts item={item} index={index} />
    </>
  );
  return (
    <Box style={styles.container}>
      {/* <CommonHeader title={title || 'All Products'} showCartIcon /> */}
      <CommonHeader
        title={'All Products'}
        showCartIcon={true}
        searchIcon={true}
      />
      <>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            {productsBySubCategory.length != 0 ? (
              <FlatList
                data={productsBySubCategory}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={styles.productList}
              />
            ) : (
              <Text textAlign="center" mt="s8">
                No Products
              </Text>
            )}
          </>
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

export default ProductsBySubCategory;
