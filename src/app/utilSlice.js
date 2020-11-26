import { createSlice } from '@reduxjs/toolkit';

// Part of the store that represente util components (here a loader)
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

// State selectors
export const selectLoader = state => state.util.loader;

export default utilSlice.reducer;
