import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Text } from '@atoms';

const HomeProducts = React.memo(({ item }) => {
  const navigation = useNavigation();

  return (
    <Box
      marginHorizontal="s4"
      flexShrink={1}
      mb="s8"
      borderWidth={1}
      borderColor="border"
      borderRadius={8}
      flex={1}
      padding="s8"
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductDetailsScreen', {
            product_id: item?.ProductId,
          });
        }}
      >
        <Box alignItems="center">
          <Image
            source={{ uri: item.SkuImageUrl }}
            style={styles.productImage}
          />
        </Box>
        <Text style={styles.productTitle} variant="bold18" numberOfLines={1}>
          {item.ProductName}
        </Text>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingVertical="s2"
        >
          <Box>
            <Text fontSize={14} fontWeight="600">
              $ {item?.basePrice}
            </Text>
          </Box>
          {/* <TouchableOpacity>
            <Box
              backgroundColor="purple"
              padding="s4"
              paddingHorizontal="s8"
              borderRadius={8}
              flexDirection="row"
              alignItems="center"
            >
              <Text
                fontSize={14}
                color="white"
                // fontWeight="600"
                variant="bold16"
                marginRight="s4"
              >
                Add
              </Text>
              <Image
                source={Icons.addToCartIcon}
                style={{ width: 24, height: 24, tintColor: 'white' }}
              />
            </Box>
          </TouchableOpacity> */}
        </Box>
      </TouchableOpacity>
    </Box>
  );
});

export default HomeProducts;

const styles = StyleSheet.create({
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 8,
    backgroundColor: 'white',
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    borderRadius: 14,
  },
});
