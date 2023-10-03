import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '@/store';

export const IS_IOS = Platform.OS === 'ios';

export const getItemFromAsyncStorage = async <T>(
  key: string,
): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage:', error);
    // You might want to handle the error in a different way based on your app's requirements.
    return null;
  }
};

export const customerId = storage.getString('customerId');
