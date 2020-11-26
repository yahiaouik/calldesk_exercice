import { createSlice } from '@reduxjs/toolkit';
import { getCallsFromAPI } from '../services/apiCaller'

export const callbotSlice = createSlice({
  name: 'callbot',
  initialState: {
    callbotName: "bot1",
    timeStampStart: "2020-06-01",
    timeStampEnd: "2020-06-30",
    calls: null
  },
  reducers: {
    setCallbotName: (state, action) => {
      state.callbotName = action.payload;
    },
    setTimeStampStart: (state, action) => {
      state.timeStampStart = action.payload;
    },
    setTimeStampEnd: (state, action) => {
      state.timeStampEnd = action.payload;
    },
    setCalls: (state, action) => {
      state.calls = action.payload;
    }
  },
});

export const { setCallbotName, setTimeStampStart, setTimeStampEnd, setCalls } = callbotSlice.actions;

export const getBot = () => async (dispatch,getState) => {
  const response = await getCallsFromAPI(getState().callbot.callbotName,getState().callbot.timeStampStart,getState().callbot.timeStampEnd);
  dispatch(setCalls(response.data.payload.calls));
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCallbotName = state => state.callbot.callbotName;
export const selectTime = state => state.callbot.timeStampStart;
export const selectCalls = state => state.callbot.calls;
export default callbotSlice.reducer;
