import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Typography, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import * as React from 'react';
// New form Kiet
import { useFormik } from 'formik';
import axios from 'axios';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const params = useParams();
  const meow = params.query;

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().required('Job title required'),
    description: Yup.string().required('Description required'),
    quantity: Yup.string().required('Quantity required'),
    salary: Yup.string().required('Salary required'),
    email: Yup.string().required('Last name required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    title: 'Mùa thu',
    description: 'Mùa thu',
    email: 'Mùa thu',
    password: 'Mùa thu',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    // defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/blog', { replace: true });
  };
  // New form Kiet
  let date = Date.now();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      salary: '',
      quantity: '',
      start_date: moment(date).format('yyyy-MM-DD'),
      end_date: moment(date).format('yyyy-MM-DD'),
      category: '',
      campaign: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('tên không được bỏ trống'),
      description: Yup.string().required('miêu tả không được bỏ trống'),
      salary: Yup.string().required('lương không được bỏ trống'),
      quantity: Yup.number().required('số lượng không được bỏ trống'),
    }),
    onSubmit: (value) => {
      console.log(value);
      axios
        .post('http://localhost:8000/api/job-add', {
          name: value.name,
          description: value.description,
          salary: value.salary,
          quantity: value.quantity,
          start_date: value.start_date,
          end_date: value.start_date,
          category: value.category,
          campaign: value.campaign,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
  });

  //gọi api categories để add jobs
  const [categories, setCategories] = useState([]);
  React.useEffect(() => {
    async function fetchCategory() {
      const data = await axios.get('http://localhost:8000/api/category');
      const { categories } = data.data;
      console.log(params);
      console.log(categories);
      setCategories(categories);
    }
    fetchCategory();
  }, []);

  const renderCategory = () => {
    return categories.map((value) => {
      return <MenuItem value={value.id}>{value.name}</MenuItem>;
    });
  };
  
  

  return (
    <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h3"> Campaign name </Typography>
        {meow}
        <RHFTextField
          name="name"
          label="Job Title"
          id="name"
          type="name"
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
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <RHFTextField
          name="quantity"
          label="Quantity"
          id="standard-number"
          type="number"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
        />
        <RHFTextField
          name="salary"
          label="Salary per month"
          id="standard-number"
          type="salary"
          value={formik.values.salary}
          onChange={formik.handleChange}
          error={formik.touched.salary && Boolean(formik.errors.salary)}
          helperText={formik.touched.salary && formik.errors.salary}
        />
        {/* <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Create
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}