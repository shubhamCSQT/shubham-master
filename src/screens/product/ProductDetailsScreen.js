/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, Text } from '@atoms';
import CarouselCards from '@/components/imageCarousel/CarouselCards';
import { theme } from '@/atoms';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getProductDetails } from '@/redux/productDetails/ProductDetailsApiAsyncThunk';
import CommonHeader from '@/components/CommonHeader/CommonHeader';
import CommonSolidButton from '@/components/CommonSolidButton/CommonSolidButton';
const ProductDetailsScreen = props => {
  const productId = props.route.params.product_id;
  console.log('productId: ', productId);

  const navigation = useNavigation();
  const [selectedSkuId, setSelectedSkuId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [imageCarousel, setImageCarousel] = useState([]);
  const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false);
  const [productImage, setProductImage] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(getProductDetails(`get-vtex-product-by-id/${productId}`)).then(
      () => {
        setIsLoading(false);
      },
    );
  }, [productId]);

  const productDetails = useSelector(
    state => state.getProductDetailsApiSlice.productDetails?.data || [],
  );

  useEffect(() => {
    if (
      !productDetails?.error &&
      productDetails?.skus &&
      productDetails?.skus[selectedVariantIndex]
    ) {
      setProductImage(productDetails?.skus[selectedVariantIndex]?.image);
      setSelectedSkuId(productDetails?.skus[selectedVariantIndex]?.sku);
      setImageCarousel(productDetails?.skus);
    }
  }, [productDetails, selectedVariantIndex]);

  const onPressAddToCart = () => {};

  const Item = ({ item, onPress, backgroundColor, textColor, index }) => {
    return (
      <Box>
        <TouchableOpacity
          onPress={() => {
            setSelectedSkuId(item?.sku);
            setProductImage(productDetails?.skus[index]?.image);
          }}
          style={[styles.item, { backgroundColor }]}
        >
          <Text style={[styles.title, { color: textColor }]}>
            {item?.specifications?.Color}
          </Text>
        </TouchableOpacity>
      </Box>
    );
  };

  const renderItem = ({ item, index }) => {
    const backgroundColor =
      item.sku == selectedSkuId ? theme.colors.lightGrey : '#FFF';
    const color = item.sku == selectedSkuId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedSkuId(item?.sku);
          setSelectedVariantIndex(index);
        }}
        backgroundColor={backgroundColor}
        textColor={color}
        index={index}
      />
    );
  };

  return (
    <>
      <CommonHeader title={'product'} searchIcon={true} showCartIcon={true} />
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator color={theme.colors.sushiittoRed} />
        ) : (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: theme.spacing.paddingHorizontal,
                flexGrow: 1,
              }}
            >
              {!productDetails?.error && imageCarousel ? (
                <Box style={styles.productDetails}>
                  {/* <Image
                  style={styles.backImage}
                  source={{
                    uri: productImage,
                  }}
                /> */}
                  <CarouselCards images={imageCarousel} crosSelling={null} />
                  <Box>
                    <Text variant="regular18">{productDetails.name}</Text>
                    <Text variant="regular18">
                      ${productDetails?.skus?.[0]?.bestPrice}
                    </Text>
                    {productDetails?.skus?.[0]?.available ? (
                      <Text variant="regular18" color="green">
                        Available
                      </Text>
                    ) : (
                      <Text variant="regular18" color="red">
                        Not Available
                      </Text>
                    )}
                    <Box>
                      {productDetails?.skus?.length >= 1 && (
                        <Box>
                          <Text variant="bold16" mt="s4">
                            Choose Variation :{' '}
                          </Text>
                          <FlatList
                            data={productDetails?.skus}
                            renderItem={({ item, index }) =>
                              renderItem({ item, index })
                            }
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.productList}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Text mt="s6" variant="regular16"></Text>
                  <CarouselCards
                    images={imageCarousel}
                    crosSelling={productDetails?.crossSellProduct}
                  />
                </Box>
              ) : (
                <Text>Product is not available</Text>
              )}
              <Box></Box>
            </ScrollView>

            <Box
              padding="s16"
              backgroundColor="white"
              style={theme.cardVariants.bottomButtonShadow}
            >
              <CommonSolidButton
                title={!isLoadingAddToCart ? 'Add to Cart' : 'Loading...'}
                onPress={!isLoadingAddToCart ? onPressAddToCart : () => {}}
                disabled={!productDetails?.skus?.[0]?.available}
              />
            </Box>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  productList: {
    paddingHorizontal: 16,
  },

  backImage: {
    resizeMode: 'contain',
    width: '100%',
    height: 200,
  },
  item: {
    marginVertical: 4,
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButton: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'gray',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  wishListContainer: {
    width: '100%',
    height: 40,
    backgroundColor: theme.colors.red,
    borderRadius: theme.spacing.lml,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    color: 'white',
  },
});

export default ProductDetailsScreen;
