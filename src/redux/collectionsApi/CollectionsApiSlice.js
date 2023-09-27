import { createSlice } from '@reduxjs/toolkit';
import { getCollections } from './CollectionsApiAsyncThunk';
const initialState = {
  collections: [],
  status: 'idle',
  error: null,
};

const getCollectionsApiSlice = createSlice({
  name: 'getProductDetails',
  initialState,
  extraReducers: builder => {
    builder.addCase(getCollections.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getCollections.fulfilled, (state, action) => {
      state.status = 'success';
      state.collections = action.payload;
    });
    builder.addCase(getCollections.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});
export default getCollectionsApiSlice.reducer;
