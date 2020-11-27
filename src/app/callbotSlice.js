import { createSlice } from '@reduxjs/toolkit';
import { getCallsFromAPI } from '../services/apiCaller';
import { setLoader } from '../app/utilSlice';
import { resetCall } from '../app/callSlice';

// Part of the store that represente callbot research

export const callbotSlice = createSlice({
  name: 'callbot',
  initialState: {
    bots: ["bot1", "bot2", "bot3", "bot4", "bot5", "bot6", "bot7", "bot8", "bot9", "bot10", "bot11", "bot13", "bot14", "bot15", "bot16", "bot17"],
    callbotName: "",
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

// Get callbot calls (call api service)
export const getBot = () => async (dispatch, getState) => {
  try {
    if (getState().callbot.callbotName !== "") {
      dispatch(setLoader(true));
      const response = await getCallsFromAPI(getState().callbot.callbotName, getState().callbot.timeStampStart, getState().callbot.timeStampEnd);
      dispatch(setCalls(response.data.payload.calls));
      dispatch(setLoader(false));
      dispatch(resetCall());
    }
  } catch {
    dispatch(setLoader(false));
  };
}

// State selectors
export const selectCallbotName = state => state.callbot.callbotName;
export const selectTime = state => state.callbot.timeStampStart;
export const selectCalls = state => state.callbot.calls;
export const selectBots = state => state.callbot.bots;

export default callbotSlice.reducer;
