import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Typography, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

// Kiet imported
import { Field, Form, Formik, FormikProps, useFormik } from 'formik';
import axios from 'axios';
// import { injectIntl, FormattedMessage } from 'react-intl';
// api import
import moment from 'moment/moment';
import { add } from 'lodash';
import { success } from 'src/store/slice/notificationSlice';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

export default function CategoryUpdateForm({ news , open, onClose}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categorys, setcategorys] = useState();

  const [showPassword, setShowPassword] = useState(false);

  const [value1, setValue1] = React.useState(null);
  const [value2, setValue2] = React.useState(null);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Job name required'),
    description: Yup.string().required('Description required'),
    quantity: Yup.string().required('Quantity required'),
    salary: Yup.string().required('Salary required'),
  });

  const defaultValues = {
    name: '',
    description: '',
    email: '',
    password: '',
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
  const formik = useFormik({
    initialValues: {
      name: news.name,
      description: news.description,
    },
    validationSchema: Yup.object().shape({
      name: Yup
        .string()
        .matches(/^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/, 'Please enter valid name')
        .max(40, () => 'Max length of category name is 40 characters')
        .required('Category name required'),
      description: Yup
        .string()
        .max(512, () => 'Max length of category description is 512 characters')
        .required('Description required'),
    }),

    onSubmit: async (value) =>  {
      console.log('Meowwww');
      console.log(value);
       await axios
        .patch('http://localhost:8000/api/category/update', {
          id: news.id,
          name: value.name,
          description: value.description,
          start_date: value.start_date,
          end_date: value.end_date,
          status: value.status,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          onClose();
          dispatch(success("Update successfully"));
        });
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h3"> {'Update Category'} </Typography>
        <RHFTextField
          name="name"
          label="Category Name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <RHFTextField
          name="description"
          label="Description"
          id="description"
          type="description"
          multiline
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Update
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
