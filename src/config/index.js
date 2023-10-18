import Config from 'react-native-ultimate-config';

export const { ENV } = Config;

const environments = {
  vtex: {
    baseUrl: {
      default: 'http://103.113.36.20:9005/',
    },
    productsDetailsById: 'vtex/product-by-id',
    addToCart: 'vtex/additem',
  },
  spryker: {
    baseUrl: {
      default: 'http://103.113.36.20:9005/',
    },
    productsDetailsById: 'spryker/product-by-id',
    addToCart: 'spryker/addItems',
  },
  sfcc: {
    baseUrl: {
      default: 'http://103.113.36.20:9005/',
    },
    productsDetailsById: 'sfcc/product-by-id',
    addToCart: 'sfcc/addItem',
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
    newArrivals: `${ENV}/new-arrivals`,
    bestSelling: `${ENV}/best-selling-products`,
  },
  productsDetailsById: `${ENV}/product-by-id`,
  addToCartUrl: environments[ENV].addToCart,
  categoryTreeUrl: `${ENV}/category-tree`,
  productsByCategory: `${ENV}/products-by-category`,
  productsBySubCategory: `${ENV}/products-by-sub-category`,
  createCartUrl: `${ENV}/createCart`,
  loginUrl: `${ENV}/login`,
};
