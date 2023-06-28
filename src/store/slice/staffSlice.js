import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// axios
import axios from 'axios';
import storage from 'redux-persist/lib/storage';

import { getAuthHeader, removeTokenCookie } from '../../utils/tool';
import { getCandidateByStaff } from './candidateSlice';
import { getAllMember } from './memberSlice';

import { success, error } from './notificationSlice';
import { getReportByInterviewer } from './reportSlice';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const initialState = {
  staff: {},
  token: null,
  auth: null,
  error: null,
  loading: null,
};

export const login = createAsyncThunk('staff/login', async (params, thunkAPI) => {
  const result = await axios
    .post('http://localhost:8000/api/auth/signin', {
      email: params.email,
      password: params.password,
    })
    .catch((err) => {
      console.log(err);
      thunkAPI.dispatch(error(err.response.data.message));
    });

  const { user: staff, token } = result.data;
  thunkAPI.dispatch(getAllMember());
  thunkAPI.dispatch(success('Login successfully'));
  return { staff, token };
});
export const logout = createAsyncThunk('staff/logout', async (params, thunkAPI) => {
  try {
    removeTokenCookie();
    // localStorage.removeItem('')
    storage.removeItem('persist:root');

    thunkAPI.dispatch(success('Good bye'));
  } catch (error) {
    await thunkAPI.dispatch(error(error.message));
  }
});
export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.auth = false;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.staff = action.payload.staff;
      state.token = action.payload.token;
      state.auth = true;
    },
    [logout.pending]: (state) => {
      state.loading = true;
    },
    [logout.rejected]: (state) => {
      state.loading = false;
      state.auth = true;
    },
    [logout.fulfilled]: (state) => {
      state.loading = false;
      state.staff = initialState.staff;
      state.auth = false;
      state.token = null;
    },
  },
});

export const { reducer: staffReducer } = staffSlice;
export default staffReducer;
