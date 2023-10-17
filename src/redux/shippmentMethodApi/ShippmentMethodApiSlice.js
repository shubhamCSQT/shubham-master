import { createSlice } from '@reduxjs/toolkit';
import { getShippmentMethods } from './ShippmentMethodApiAsyncThunk';
const initialState = {
  shippmentMethods: [],
  status: 'idle',
  error: null,
};

const getShippmentMethodsApiSlice = createSlice({
  name: 'getCustomerDetails',
  initialState,
  extraReducers: builder => {
    builder.addCase(getShippmentMethods.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getShippmentMethods.fulfilled, (state, action) => {
      state.status = 'success';
      state.shippmentMethods = action.payload;
    });
    builder.addCase(getShippmentMethods.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});

export default getShippmentMethodsApiSlice.reducer;
