import Config from 'react-native-ultimate-config';

export const { ENV } = Config;

const environments = {
  vtex: {
    baseUrl: {
      default: 'http://103.113.36.20:9005/',
    },
    collections: {
      newArrivals: 'vtex-new-arrivals',
      bestSelling: 'vtex/best-selling-products',
    },
    productsDetailsById: 'get-vtex-product-by-id',
  },
  spryker: {
    baseUrl: {
      default: 'http://103.113.36.20:9005/',
    },
    collections: {
      newArrivals: 'spryker/new-arrivals',
      bestSelling: 'spryker/best-selling-products',
    },
    productsDetailsById: 'get-a-product-by-id',
  },
  sfcc: {
    baseUrl: {
      default: 'http://103.113.36.20:9005/',
    },
    collections: {
      newArrivals: 'sfcc/new-arrivals',
      bestSelling: 'sfcc/best-selling-products',
    },
    productsDetailsById: 'sfcc/product-by-id',
  },
};

export default {
  app: {
    isSfcc: ENV === 'sfcc',
    isSpryker: ENV === 'spryker',
    isVtex: ENV === 'vtex',
  },
  baseUrl: {
    default: environments[ENV].baseUrl.default,
  },
  collections: {
    newArrivals: environments[ENV].collections.newArrivals,
    bestSelling: environments[ENV].collections.bestSelling,
  },
  productsDetailsById: environments[ENV].productsDetailsById,
};
