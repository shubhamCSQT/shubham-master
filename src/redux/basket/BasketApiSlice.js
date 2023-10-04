import { createSlice } from '@reduxjs/toolkit';
import { getCustomerBasketApi } from './BasketApiAsyncThunk';
const initialState = {
  customerBasket: [],
  status: 'idle',
  error: null,
};

const getCustomerBasketApiSlice = createSlice({
  name: 'getCustomerBasket',
  initialState,
  extraReducers: builder => {
    builder.addCase(getCustomerBasketApi.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getCustomerBasketApi.fulfilled, (state, action) => {
      state.status = 'success';
      state.customerBasket = action.payload;
    });
    builder.addCase(getCustomerBasketApi.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});
export default getCustomerBasketApiSlice.reducer;
