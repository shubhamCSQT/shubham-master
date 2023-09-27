import { commonApi } from '@/api/CommanAPI';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const getCollections = createAsyncThunk(
  'collections',
  async (endpoint, thunkAPI) => {
    try {
      const response = await commonApi.get(endpoint);
      return response.data;
    } catch (error) {
      return error;
    }
  },
);
