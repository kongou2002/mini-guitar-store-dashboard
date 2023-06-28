import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { success } from 'src/store/slice/notificationSlice';
import { formatRelative } from 'date-fns';
import { RHFTextField } from 'src/components/hook-form';

export default function InterviewModal({ open, handleClose, candidateId }) {
  // const [day, setDay] = useState(moment());

  const dispatch = useDispatch();

  // const handleChangeDay = (newValue) => {
  //   setDay(newValue);
  //   console.log(day);
  // };

  const slotArr = [...Array(4).keys()];
  // const [slot, setSlot] = useState(1);
  // const handleChangeSlot = (event) => {
  //   setSlot(event.target.value);
  // };

  const roomArr = [...Array(9).keys()];
  const [room, setRoom] = useState(1);
  const handleChangeRoom = (event) => {
    setRoom(event.target.value);
    console.log('room: ', event.target.value);
  };

  // const [form, setForm] = useState({
  //   candidateId: '',
  //   room: 0,
  //   slot: 0,
  // });

  // const handleSubmit = () => {
  //   const actualSlot = (moment(day).day() - 1) * 4 + slot;
  //   const week = moment(day).week();
  //   console.log(actualSlot, room, week, day);
  //   setForm({
  //     candidateId: candidateId,
  //     room: room,
  //     slot: actualSlot,
  //     week: week,
  //   });
  //   axios.post('http://localhost:8000/api/interview', form);
  //   handleClose();
  // };

  const formik = useFormik({
    initialValues: {
      candidateId: candidateId,
      room: 0,
      slot: 0,
      // day: moment(),
    },
    onSubmit: (value) => {
      axios
        .post('http://localhost:8000/api/interview', {
          candidateId: value.candidateId,
          room: value.room,
          week: moment(value.day).week(),
          slot: (moment(value.day).day() - 1) * 4 + value.slot,
        })
        .then((res) => {
          handleClose();
          dispatch(success('Booking interview successfully'));
          console.log('value: ');
        });
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {/* {value.room} */}
                {candidateId}
              </Typography>
              <Box component="form" onSubmit={formik.handleSubmit}>
                {/* Hoa coded */}
                {/* <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/DD/YYYY"
                    value={formik.values.day}
                    onChange={formik.handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider> */}
                {/* Kiet coded */}
                <TextField
                  fullWidth
                  label="Day"
                  title="day"
                  type="date"
                  value={formik.values.day}
                  name="day"
                  // validate
                  onChange={formik.handleChange}
                  defaultValue={moment().format('yyyy-MM-DD')}
                  error={formik.touched.day && Boolean(formik.errors.day)}
                  helperText={formik.touched.day && formik.errors.day}
                />

                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">Slot</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    // value={formik.values.slot}
                    onChange={formik.handleChange}
                    autoWidth
                    label="Slot"
                  >
                    {slotArr.map((value) => (
                      <MenuItem value={value + 1}>{value + 1}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">Room</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    // value={formik.values.room}
                    onChange={formik.handleChange}
                    autoWidth
                    label="Room"
                  >
                    {roomArr.map((value) => (
                      <MenuItem value={value + 1}>{value + 1}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button type="submit">Submit</Button>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Modal>
    </div>
  );
}
