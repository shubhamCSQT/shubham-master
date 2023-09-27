import { createAsyncThunk } from '@reduxjs/toolkit';
import { commonApi } from '@/api/CommanAPI';
export const getCustomerDetails = createAsyncThunk(
  'customerDetails',
  async (endpoint, thunkAPI) => {
    try {
      const response = await commonApi.get(endpoint);
      return response.data;
    } catch (error) {
      return error;
    }
  },
);
