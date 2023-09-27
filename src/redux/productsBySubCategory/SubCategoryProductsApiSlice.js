import { createSlice } from '@reduxjs/toolkit';
import { getproductsBySubCategory } from './SubCategoryProductsAsyncThunk';
const initialState = {
  productsBySubCategory: [],
  status: 'idle',
  error: null,
};

const getProductsBySubCategoryApiSlice = createSlice({
  name: 'subCategoryProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(getproductsBySubCategory.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getproductsBySubCategory.fulfilled, (state, action) => {
      state.status = 'success';
      state.productsBySubCategory = action.payload;
    });
    builder.addCase(getproductsBySubCategory.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});

export default getProductsBySubCategoryApiSlice.reducer;
