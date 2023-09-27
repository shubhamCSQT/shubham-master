import { createSlice } from '@reduxjs/toolkit';
import { ProductsApiAsyncThunk } from './ProductsApiAsyncThunk';
const initialState = {
  productsByCategory: [],
  status: 'idle',
  error: null,
};

const getProductsByCategoryApiSlice = createSlice({
  name: 'getProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(ProductsApiAsyncThunk.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(ProductsApiAsyncThunk.fulfilled, (state, action) => {
      state.status = 'success';
      state.productsByCategory = action.payload;
    });
    builder.addCase(ProductsApiAsyncThunk.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});

export default getProductsByCategoryApiSlice.reducer;
