import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import * as React from 'react';

// Kiet imported
import TextField from '@mui/material/TextField';
import axios from 'axios';
// api import
import moment from 'moment/moment';
import { add, set } from 'lodash';
import { useDispatch } from 'react-redux';
import { success } from 'src/store/slice/notificationSlice';
import Iconify from 'src/components/Iconify';
// ----------------------------------------------------------------------

export default function StaffUpdateForm({ news, open, onClose, reloadData }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [value1, setValue1] = React.useState(null);
  const [value2, setValue2] = React.useState(null);

  const RegisterSchema = Yup.object().shape({
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
  const validate = values => {
    const errors = {};
    console.log(values.start_date);
    // Start date must be from today and before end_date at least 7 days ago
    if (!values.start_date) {
      errors.start_date = 'Start date required';
    } else if (moment(values.start_date).diff(moment(), 'days') < 0) {
      errors.start_date = 'Start date must be from today';
    } else if (moment(values.start_date).diff(moment(values.end_date).subtract(7, 'days'), 'days') > 0) {
      errors.start_date = 'Start date must be before end date at least 7 days ago\nAvalable end date: '
        + moment(values.start_date).add(7, 'days').format('yyyy-MM-DD');
    }

    if (!values.end_date) {
      errors.end_date = 'End date required';
    } else if (moment(values.end_date).diff(moment(), 'days') < 0) {
      errors.end_date = 'End date must be from today';
    } else if (moment(values.end_date).diff(moment(values.start_date).add(7, 'days'), 'days') < 0) {
      errors.end_date = 'End date must be after start date 7 at least';
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      id: news.id,
      email: news.email,
      fullname: news.name,
      role: news.role,
      status: news.status,
    },

    validationSchema: Yup.object().shape({
      // email: Yup.string().email('Email không hợp lệ').required('Email không được bỏ trống'),
      // fullname: Yup.string().min(6, 'Họ và tên người dùng phải dài hơn 6 kí tự.').required('Họ và tên không được bỏ trống')
    }),

    onSubmit: (value) => {
      console.log(value);
      axios
        .patch('http://localhost:8000/api/staff/profile', {
          id: value.id,
          email: value.email,
          avatar: 'https://image.thanhnien.vn/w1024/Uploaded/2022/dcxpcwvo/2022_03_10/phat-xuat-gia-3-979.jpg',
          fullname: value.fullname,
          password: value.password,
          role: value.role,
          status: value.status,
        })
        .then((res) => {
          reloadData();
          onClose();
          dispatch(success("Update staff successfully"));
        });
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h3"> Update Staff </Typography>

        <TextField
          disabled
          name="email"
          label="Email address"
          id="title"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <RHFTextField
          name="fullname"
          label="Staff Fullname"
          id="fullname"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          error={formik.touched.fullname && Boolean(formik.errors.fullname)}
          helperText={formik.touched.fullname && formik.errors.fullname}
        />
        {/* Admin','HR Staff','HR Manager','Interviewer */}
        <FormControl>
          <InputLabel
            id="role">Role</InputLabel>
          <Select
            labelId="role"
            id="role"
            name='role'
            value={formik.values.role}
            label="Role"
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          >
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"HR Staff"}>HR Staff</MenuItem>
            <MenuItem value={"HR Manager"}>HR Manager</MenuItem>
            <MenuItem value={"Interviewer"}>Interviewer</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel
            id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="status"
            name='status'
            value={formik.values.status}
            label="Status"
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          >
            <MenuItem value={"Active"}>Active</MenuItem>
            <MenuItem value={"Inactive"}>Inactive</MenuItem>
          </Select>
        </FormControl>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Update
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
