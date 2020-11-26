import { createSlice } from '@reduxjs/toolkit';
import { getRecordingFromAPI, getTranscriptFromAPI } from '../apiCaller'

export const callSlice = createSlice({
  name: 'call',
  initialState: {
    sessionId: null,
    discussionStartTime: null,
    callDuration: null,
    calledNumber: null,
    callerNumber: null,
    recording: null,
    transcript: []
  },
  reducers: {
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    setDiscussionStartTime: (state, action) => {
      state.discussionStartTime = action.payload;
    },
    setCallDuration:(state,action) =>{
      state.callDuration = action.payload;
    },
    setCalledNumber: (state,action) => {
      state.calledNumber = action.payload;
    },
    setCallerNumber: (state,action) => {
      state.callerNumber = action.payload;
    },
    setRecording: (state, action) => {
      state.recording = action.payload;
    },
    setTranscript: (state, action) => {
      state.transcript = action.payload;
    }
  },
});

export const { setSessionId, setDiscussionStartTime, setCallDuration,setCalledNumber,setCallerNumber, setRecording, setTranscript } = callSlice.actions;

const getRecording = () => async (dispatch,getState) => {
  const response = await getRecordingFromAPI(getState().callbot.callbotName,getState().call.sessionId,getState().call.discussionStartTime);
  dispatch(setRecording(response.data.payload.url));
}

const getTranscript = () => async (dispatch,getState) => {
    const response = await getTranscriptFromAPI(getState().callbot.callbotName,getState().call.sessionId,getState().call.discussionStartTime);
    dispatch(setTranscript(response.data.payload));
  }

export const setCall = (call) => (dispatch) =>{
  dispatch(setSessionId(call.sessionId));
  dispatch(setDiscussionStartTime(call.discussionStartTime));
  dispatch(setCallDuration(call.callDuration));
  dispatch(setCalledNumber(call.calledNumber));
  dispatch(setCallerNumber(call.callerNumber));
  dispatch(getRecording());
  dispatch(getTranscript());
}

export const selectSessionId = state => state.call.sessionId;
export const selectRecording = state => state.call.recording;
export const selectTranscript = state => state.call.transcript;
export const selectCallerNumer = state => state.call.callerNumber;
export const selectDiscussionStartTime = state => state.call.discussionStartTime;
export const selectCallDuration = state => state.call.callDuration;
export default callSlice.reducer;