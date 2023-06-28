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

export default function NewStaffForm({ open, onClose, reloadData }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [value1, setValue1] = React.useState(null);
  const [value2, setValue2] = React.useState(null);

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().required('Job title required'),
    description: Yup.string().required('Description required'),
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
      email: '',
      avatar: 'https://image.thanhnien.vn/w1024/Uploaded/2022/dcxpcwvo/2022_03_10/phat-xuat-gia-3-979.jpg',
      fullname: '',
      password: '',
      role: 'HR Staff',
      status: 'Active',
      confirmPassword: '',
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().email('Email không hợp lệ').required('Email không được bỏ trống'),
      password: Yup.string().min(6, 'Mật khẩu phải nhiều hơn 6 kí tự.').max(200, 'Mật khẩu phải ít hơn 200 kí tự').required('Mật khẩu không được bỏ trống'),
      confirmPassword: Yup.string().required('Cần phải xác nhận lại mật khẩu').oneOf([Yup.ref('password'), null], "Mật khẩu xác nhận phải trùng khớp"),
      fullname: Yup.string().min(6, 'Họ và tên người dùng phải dài hơn 6 kí tự.').required('Họ và tên không được bỏ trống')
    }),

    onSubmit: (value) => {
      console.log(value);
      axios
        .post('http://localhost:8000/api/staff-auth/register', {
          email: value.email,
          avatar: 'https://image.thanhnien.vn/w1024/Uploaded/2022/dcxpcwvo/2022_03_10/phat-xuat-gia-3-979.jpg',
          fullname: value.name,
          password: value.password,
          role: 'HR Staff',
          status: 'Active',
          // confirmPassword: '',
        })
        .then((res) => {
          reloadData();
          onClose();
          dispatch(success("Create staff successfully"));
        });
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h3"> New Staff </Typography>

        <TextField
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

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setConfirmShowPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          id="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Create
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
