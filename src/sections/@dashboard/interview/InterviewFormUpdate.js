import { Button, MenuItem, Select, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
// import moment from 'moment';
import React from 'react';
import { DatePicker } from 'formik-mui-lab';
import { LocalizationProvider } from '@mui/lab';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import axios from 'axios';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { success } from 'src/store/slice/notificationSlice';

const CustomizedSelectForFormik = ({ children, form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Select
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
    >
      {children}
    </Select>
  );
};

export default function InterviewFormUpdate({ handleClose, candidateId }) {
  const dispatch = useDispatch();

  const roomArr = [...Array(9).keys()];
  const slotArr = [...Array(4).keys()];

  return (
    <Formik
      initialValues={{
        day: new Date(),
        room: 1,
        slot: 1,
        candidateId: candidateId,
      }}
      validate={(value) => {
        const errors = {};
        if (!value.day) {
          errors.day = 'Date required';
        } else if (moment(value.day).diff(moment(), 'days') < 0) {
          errors.day = 'Date must be from today';
        } else if (moment(value.day).day() === 0) {
          errors.day = 'Date can not be Sunday';
        }
        return errors;
      }}
      onSubmit={(value) => {
        console.log(value);
        axios
          .patch('http://localhost:8000/api/interview/update-interview', {
            candidateId: value.candidateId,
            room: value.room,
            week: moment(value.day).week(),
            slot: (moment(value.day).day() - 1) * 4 + value.slot,
          })
          .then((res) => {
            handleClose();
            dispatch(success('Edited interview successfully'));
          });
      }}
    >
      {({ dirty, isValid }) => (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Form>
            {/* <Field component={TextField} name="day" type="date" /> */}
            <Field component={DatePicker} name="day" label="Date" />
            <Field component={CustomizedSelectForFormik} name="room" label="Room">
              {roomArr.map((value) => (
                <MenuItem value={value + 1}>{value + 1}</MenuItem>
              ))}
            </Field>
            <Field component={CustomizedSelectForFormik} name="slot" label="slot">
              {slotArr.map((value) => (
                <MenuItem value={value + 1}>{value + 1}</MenuItem>
              ))}
            </Field>
            <Button type="submit" disabled={!(isValid && dirty)}>
              Submit
            </Button>
          </Form>
        </LocalizationProvider>
      )}
    </Formik>
  );
}
