import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  members: null,
  loading: null,
  error: null,
};

export const getAllMember = createAsyncThunk('members/getAllMember', async (params, thunkAPI) => {
  const result = await axios.get('http://localhost:8000/api/users/not-user');

  //   ret;
  return result.data;
});

export const memberSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllMember.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllMember.rejected]: (state, action) => {
      state.loading = false;
      state.error = 'Error';
    },
    [getAllMember.fulfilled]: (state, action) => {
      state.loading = false;
      state.members = action.payload;
    },
  },
});

export const { reducer: memberReducer } = memberSlice;

export default memberReducer;
