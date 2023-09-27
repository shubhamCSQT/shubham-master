import { createSlice } from '@reduxjs/toolkit';
import { getProductDetails } from './ProductDetailsApiAsyncThunk';
const initialState = {
  productDetails: [],
  status: 'idle',
  error: null,
};

const getProductDetailsApiSlice = createSlice({
  name: 'getProductDetails',
  initialState,
  extraReducers: builder => {
    builder.addCase(getProductDetails.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.status = 'success';
      state.productDetails = action.payload;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});

export default getProductDetailsApiSlice.reducer;
