import { configureStore } from '@reduxjs/toolkit';
import callbotReducer from './callbotSlice';
import callReducer from './callSlice';
import utilReducer from './utilSlice';

export default configureStore({
  reducer: {
    callbot: callbotReducer,
    call: callReducer,
    util: utilReducer,
  },
});
