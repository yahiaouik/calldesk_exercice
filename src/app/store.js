import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import callbotReducer from './callbotSlice';
import callReducer from './callSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    callbot: callbotReducer,
    call: callReducer,
  },
});
