import React, { useEffect, useMemo, useReducer } from 'react';
import { Example } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ProductDetailsScreen from '@/screens/product/ProductDetailsScreen';
import CollectionScreen from '@/screens/collection/CollectionsScreen';
import CollectionsScreen from '@/screens/collection/CollectionsScreen';
import ProductsByCategory from '@/screens/product/components/ProductsByCategory';
import LoginScreen from '@/screens/auth/LoginScreen';
import PersonalDetailsScreen from '@/screens/profile/PersonalDetailsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';
import SignUpScreen from '@/screens/auth/SignUpScreen';
import CartScreen from '@/screens/cart/CartScreen';
import { reduxStorage } from '@/store';
import { useIsUserLoggedIn } from '@/hooks/useIsUserLoggedIn';
import { useDispatch,useSelector } from 'react-redux';
import { getCustomerBasketApi } from '@/redux/basket/BasketApiAsyncThunk';
import { customerId } from '@/utils/appUtils';
const Stack = createStackNavigator();

export const AuthContext = React.createContext({});

// @refresh reset
const MainNavigator = () => {
  const { isUserLoggedIn } = useIsUserLoggedIn();
  const reduxDispatch = useDispatch();
  const [state, dispatch] = useReducer(
    (prevState: any, action: { type: any; token: any }) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  const authContext = useMemo(
    () => ({
      signIn: async (data: string) => {
        await Keychain.setGenericPassword('email', data);
        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: async () => {
        await Keychain.resetGenericPassword();
        AsyncStorage.removeItem('tokenExpiry');
        reduxStorage.removeItem('customerId');
        RNRestart.Restart();
        dispatch({
          type: 'SIGN_OUT',
          token: null,
        });
      },
      state: state,
    }),
    [state],
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await Keychain.getGenericPassword();
      } catch (e) {}

      userToken === false
        ? dispatch({ type: 'RESTORE_TOKEN', token: null })
        : dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    const getTokenExpiry = async () => {
      const token = await AsyncStorage.getItem('tokenExpiry');
      if (token) {
        var decoded: { exp: number } = jwt_decode(token);
        var tokenExpiryDate = new Date(0);
        tokenExpiryDate.setUTCSeconds(decoded.exp);
        var currentDate = new Date();

        var remainingTime = tokenExpiryDate.getTime() - currentDate.getTime();

        if (remainingTime / 1000 <= 0) {
          Alert.alert(
            'Your session has expired.\n',
            'Please login again to continue.',
            [
              {
                text: 'Ok',
                onPress: () => {},
                style: 'destructive',
              },
            ],
          );
          authContext.signOut();
        }
      }
    };
    getTokenExpiry();
  }, [authContext]);


  const customerBasket = useSelector(
    state => state.getCustomerBasketApiSlice.customerBasket?.data || [],
  );
    console.log('customerBasket: ', customerBasket);

  useEffect(()=>{
    console.log('isUserLoggedIn: ', isUserLoggedIn);
  if(isUserLoggedIn){
    reduxDispatch(getCustomerBasketApi(`sfcc/getCustomerCart/${customerId}`));
  }
  },[isUserLoggedIn])

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={BottomTabNavigator} />
        <Stack.Screen
          name="ProductsByCategory"
          component={ProductsByCategory}
        />
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="CollectionsScreen" component={CollectionsScreen} />
        {state.userToken == null ? (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        ) : (
          <></>
        )}
        <Stack.Screen
          name="PersonalDetailsScreen"
          component={PersonalDetailsScreen}
        />
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default MainNavigator;
