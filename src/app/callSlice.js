import { createSlice } from '@reduxjs/toolkit';
import { getRecordingFromAPI, getTranscriptFromAPI } from '../services/apiCaller';
import { setLoader } from '../app/utilSlice';

// Part of the store that represente the selected call 

export const callSlice = createSlice({
  name: 'call',
  initialState: {
    sessionId: null,
    discussionStartTime: null,
    callDuration: null,
    calledNumber: null,
    callerNumber: null,
    recording: null,
    transcript: [],
  },
  reducers: {
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    setDiscussionStartTime: (state, action) => {
      console.log(action);
      state.discussionStartTime = new Date (action.payload);
    },
    setCallDuration: (state, action) => {
      console.log(action);
      state.callDuration = new Date(action.payload * 1000);
    },
    setCalledNumber: (state, action) => {
      state.calledNumber = action.payload;
    },
    setCallerNumber: (state, action) => {
      state.callerNumber = action.payload;
    },
    setRecording: (state, action) => {
      state.recording = action.payload;
    },
    setTranscript: (state, action) => {
      state.transcript = action.payload;
    },
    ressourceIsAvailable: (state, action) => {
      state.transcript = action.payload;
    }
  },
});

export const { setSessionId, setDiscussionStartTime, setCallDuration, setCalledNumber, setCallerNumber, setRecording, setTranscript } = callSlice.actions;

// Get call recorging (call api service)
const getRecording = () => async (dispatch, getState) => {
  try {
    const response = await getRecordingFromAPI(getState().callbot.callbotName, getState().call.sessionId, getState().call.discussionStartTime);
    dispatch(setRecording(response.data.payload.url));
  } catch (e) {
    dispatch(setRecording(null));
  }
}

// Get call transcript (call api service)
const getTranscript = () => async (dispatch, getState) => {
  try {
    const response = await getTranscriptFromAPI(getState().callbot.callbotName, getState().call.sessionId, getState().call.discussionStartTime);
    dispatch(setTranscript(response.data.payload));
  } catch (e) {
    dispatch(setTranscript([]));
  }

}

// Fill state with selected call informations
export const setCall = (call) => (dispatch) => {
  dispatch(setLoader(true));
  dispatch(setSessionId(call.sessionId));
  dispatch(setDiscussionStartTime(call.discussionStartTime));
  dispatch(setCallDuration(call.callDuration));
  dispatch(setCalledNumber(call.calledNumber));
  dispatch(setCallerNumber(call.callerNumber));
  dispatch(getRecording());
  dispatch(getTranscript());
  dispatch(setLoader(false));
}

// State selectors
export const selectSessionId = state => state.call.sessionId;
export const selectRecording = state => state.call.recording;
export const selectTranscript = state => state.call.transcript;
export const selectCallerNumer = state => state.call.callerNumber;
export const selectDiscussionStartTime = state => state.call.discussionStartTime;
export const selectCallDuration = state => state.call.callDuration;

export default callSlice.reducer;
