import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Stack, Typography, Select, MenuItem, InputLabel, Chip, Button, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import * as React from 'react';

// Kiet imported
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import axios from 'axios';
// api import
import moment from 'moment/moment';
import { add, set } from 'lodash';
import { useDispatch } from 'react-redux';
import { success } from 'src/store/slice/notificationSlice';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { errorHelper } from 'src/utils/tool';
// ----------------------------------------------------------------------

export default function KietNewInterviewForm({ candidate, open, onClose, reloadData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alignment, setAlignment] = useState('Offline');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().required('Job title required'),
    note: Yup.string().required('Note required'),
    quantity: Yup.string().required('Quantity required'),
    salary: Yup.string().required('Salary required'),
  });

  const defaultValues = {
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });
  };
  // use forkmik
  const slotArr = [...Array(4).keys()];
  const roomArr = [...Array(9).keys()];
  let today = Date.now();
  // custome date constraint
  const validate = (values) => {
    const errors = {};
    // console.log(values.date);
    // Date must be from today and before end_date at least 7 days ago
    if (!values.date) {
      errors.date = 'Date required';
    } else if (moment(values.date).diff(moment(), 'days') < 0) {
      errors.date = 'Date must be from today';
    } else if (moment(values.date).day() === 0) {
      errors.date = 'Date can not be Sunday';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      room: '',
      note: '',
      date: moment().format('yyyy-MM-DD'),
      slot: '',
      candidateId: candidate?.id,
      topic: '',
    },
    validate,
    validationSchema: Yup.object().shape({
      note: Yup.string()
        .max(512, () => 'Max length of campaign note is 512 characters')
        .required('Note required'),
      slot: Yup.string().required('Slot required'),
      room: Boolean(alignment === 'Online') ? Yup.string() : Yup.string().required('Room required'),
      topic: Boolean(alignment === 'Online') ? Yup.string().required('Online topic required') : Yup.string(),
    }),
    onSubmit: async (value) => {
      try {
        const { data } = await axios.post('http://localhost:8000/api/interview', {
          candidateId: candidate?.id,
          type: alignment,
          room: Boolean(alignment === 'Online') ? 9 : value.room,
          week: moment(value.date).week() - 1,
          slot: (moment(value.date).day() - 1) * 4 + value.slot,
        });
        const { id: interview_id } = data;

        if (alignment === 'Online') {
          const { data } = await axios.get('http://localhost:8000/api/meeting/createMeeting', {
            topic: value.topic,
            type: 1,
            settings: {
              host_video: true,
              participant_video: true,
              cn_meeting: false,
              in_meeting: true,
              join_before_host: false,
              mute_upon_entry: false,
              watermark: false,
              use_pmi: false,
              approval_type: 2,
              audio: 'both',
              auto_recording: 'local',
              enforce_login: false,
              registrants_email_notification: false,
              waiting_room: true,
              allow_multiple_devices: true,
            },
          });
          const { id: zoom_id, topic, start_url, join_url, pstn_password: pwd } = data;
          await axios.post('http://localhost:8000/api/room/online-room', {
            interview_id: interview_id,
            zoom_id,
            topic,
            join_url,
            start_url,
            pwd,
          });
        }
        reloadData();
        onClose();
        dispatch(success('Booking interview successfully!'));
      } catch (e) {
        console.log(e);
      }
      // console.log(value);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h6">Schedule Interview</Typography>
        <Stack spacing={1}>
          <Chip
            sx={{
              fontWeight: 'bold',
            }}
            color="primary"
            variant="outlined"
            label={candidate?.name}
          />
          <Chip
            sx={{
              fontWeight: 'bold',
            }}
            color="primary"
            label={candidate?.role}
            variant="outlined"
          />
        </Stack>
        <Typography variant="caption" pb={2}>
          Please pick a date and choose suitable slot and room for interview meeting
        </Typography>
        <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
          <ToggleButton value="Offline">Offline</ToggleButton>

          <ToggleButton value="Online">Online</ToggleButton>
        </ToggleButtonGroup>
        <>
          <TextField
            label="Date"
            fullWidth
            title="date"
            type="date"
            value={formik.values.date}
            name="date"
            validate
            onChange={formik.handleChange}
            defaultValue={moment(today).format('yyyy-MM-DD')}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />

          <FormControl>
            <InputLabel id="demo-simple-select-label">Slot</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.slot}
              label="Slot"
              onChange={formik.handleChange}
              name="slot"
              error={formik.touched.slot && Boolean(formik.errors.slot)}
              helperText={formik.touched.slot && formik.errors.slot}
            >
              {slotArr.map((value) => (
                <MenuItem value={value + 1}>{value + 1}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {alignment === 'Offline' && (
            <>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Room</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  label="Room"
                  id="demo-simple-select"
                  value={formik.values.room}
                  onChange={formik.handleChange}
                  name="room"
                  error={formik.touched.room && Boolean(formik.errors.room)}
                  helperText={formik.touched.room && formik.errors.room}
                >
                  {roomArr.map((value) => (
                    <MenuItem value={value + 1}>{value + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          <TextField
            name="note"
            label="Note"
            id="note"
            type="note"
            multiline
            value={formik.values.note}
            onChange={formik.handleChange}
            error={formik.touched.note && Boolean(formik.errors.note)}
            helperText={formik.touched.note && formik.errors.note}
          />
        </>
        {alignment === 'Online' && (
          <>
            <InputLabel id="online-meeting">Online topic</InputLabel>
            <TextField
              id="online-meeting"
              name="topic"
              placeholder="Interview meeting in mm/dd/yyyy"
              {...formik.getFieldProps('topic')}
              {...errorHelper(formik, 'topic')}
            />
          </>
        )}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Submit
        </LoadingButton>
      </Stack>
    </form>
  );
}
