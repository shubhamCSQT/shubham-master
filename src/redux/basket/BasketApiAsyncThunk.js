import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/api/SecureAPI';
export const getCustomerBasketApi = createAsyncThunk(
  'basketApi',
  async endpoint => {
    try {
      const response = await api.get(endpoint);
      console.log('response: ', response?.data);
      return response.data;
    } catch (error) {
      return error;
    }
  },
);
