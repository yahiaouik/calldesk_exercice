import { createSlice } from '@reduxjs/toolkit';

export const utilSlice = createSlice({
  name: 'util',
  initialState: {
    loader: false
  },
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    }
  },
});

export const {setLoader} = utilSlice.actions;

export const selectLoader = state => state.util.loader;

export default utilSlice.reducer;
