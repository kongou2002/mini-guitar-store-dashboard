import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { error, success } from './notificationSlice';

axios.defaults.headers.post['Content-Type'] = 'application/json';
// const mailerConfig = {
//   transport: {
//     host: 'smtp.gmail.com',
//     secure: true,
//     auth: { user: process.env.STAFF_EMAIL, pass: process.env.STAFF_PASSWORD },
//   },
// };

// const mailer = Mailer(mailerConfig, emailsList)
const initialState = {
  candidates: null,
  loading: null,
  error: null,
};

export const getCandidateByStaff = createAsyncThunk('candidate/getCandidateList', async (params, thunkAPI) => {
  const result = await axios.post('http://localhost:8000/api/candidate/staffID', {
    id: params.staffID,
  });

  //   ret;
  return result.data;
});

export const changeCandidateStatus = createAsyncThunk('candidate/changeStatus', async (params, thunkAPI) => {
  const result = await axios
    .patch('http://localhost:8000/api/candidate/changeStatus', {
      status: params.status,
      id: params.id,
      member_id: params.member_id,
    })
    .then(() => {
      thunkAPI.dispatch(success(`${params.status} successfully`));
      const staffID = params.staffID;
      console.log(staffID);
      thunkAPI.dispatch(getCandidateByStaff({ staffID }));
    })
    .catch((err) => {
      console.log(err);
      thunkAPI.dispatch(error(err.response.data.message));
    });
  //   thunkAPI.dispatch(getCandidateByStaff())
  //   ret;
  return result.data;
});

export const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {},
  extraReducers: {
    [getCandidateByStaff.pending]: (state, action) => {
      state.loading = true;
    },
    [getCandidateByStaff.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getCandidateByStaff.fulfilled]: (state, action) => {
      state.loading = false;
      state.candidates = action.payload;
    },
  },
});

export const { reducer: candidateReducer } = candidateSlice;
export default candidateReducer;
