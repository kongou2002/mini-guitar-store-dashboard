import { createSlice } from '@reduxjs/toolkit';
// axios
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const initialState = {
  message: '',
  error: null,
  success: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    success: (state, action) => {
      state.message = action.payload;
      state.error = false;
      state.success = true;
    },
    error: (state, action) => {
      state.message = action.payload;
      state.error = true;
      state.success = false;
    },
    clear: (state) => {
      state.message = null;
      state.error = null;
      state.success = null;
    },
  },
});
export const { reducer: notificationReducer } = notificationSlice;
export const { success, error, clear } = notificationSlice.actions;

export default notificationReducer;
