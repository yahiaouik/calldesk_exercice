import { configureStore } from '@reduxjs/toolkit';
import callbotReducer from './callbotSlice';
import callReducer from './callSlice';

export default configureStore({
  reducer: {
    callbot: callbotReducer,
    call: callReducer,
  },
});
