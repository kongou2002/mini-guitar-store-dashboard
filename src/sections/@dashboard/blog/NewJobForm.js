import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Typography, MenuItem, formControlClasses, TextField, InputLabel, Select, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
// New form Kiet
import { useFormik } from 'formik';
import axios from 'axios';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import { success } from 'src/store/slice/notificationSlice';
import { useParams } from 'react-router-dom';
import SelectInput from '@mui/material/Select/SelectInput';

// ----------------------------------------------------------------------

export default function NewJobForm({ choosedCampaign }) {

  const navigate = useNavigate();

  const params = useParams();
  const choosedCampaignId = params.id;

  const dispatch = useDispatch();

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
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/blog', { replace: true });
  };
  // New form Kiet

  console.log(choosedCampaignId);

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
      // name: '',
      // description: '',
      // salary: '',
      // quantity: '',
      // start_date: moment(date).format('yyyy-MM-DD'),
      // end_date: moment(date).format('yyyy-MM-DD'),
      "name": '',
      "description": '',
      "salary": '',
      "quantity": '',
      start_date: moment().format('yyyy-MM-DD'),
      end_date: moment().add(7, 'days').format('yyyy-MM-DD'),
      "status": "Hiring",
      "experience": "Intern",
      "categoryId": '',
      "isRemote": "true",
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required('Job title required'),
      description: Yup.string().required('Description required'),
      salary: Yup.string().required('Salary required'),
      quantity: Yup.number().required('Quantity required'),
    }),
    validate,
    onSubmit: (value) => {
      console.log("Ngũ cung")
      console.log(value);
      axios
        .post('http://localhost:8000/api/job/add', {
          // name: "value.name",
          // description: "value.description",
          // salary: "value.salary",
          // quantity: "value.quantity",
          // start_date: "2022-12-28",
          // end_date: "2022-12-29",
          // status: "Hiring",
          // experience: "Intern",
          // categoryId: "CA-001",
          // campaignId: "CP-001"
          "name": value.name,
          "description": value.description,
          "salary": value.salary,
          "quantity": value.quantity,
          "start_date": value.start_date,
          "end_date": value.end_date,
          "status": "Hiring",
          "experience": value.experience,
          "categoryId": value.categoryId,
          "campaignId": choosedCampaignTitle[0]?.id,
          "isRemote": value.isRemote,
        })
        .then((res) => {
          
          dispatch(success("Create job successfully"));
          setTimeout(() => {
            window.location.href = `http://localhost:3000/dashboard/blog/${choosedCampaignTitle[0]?.id}`;
          }, 5000);
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
      setCategories(categories);
    }
    fetchCategory();
  }, []);

  const [campaigns, setCampaigns] = useState([]);
  React.useEffect(() => {
    async function fetchCategory() {
      const data = await axios.get('http://localhost:8000/api/campaign');
      const { campaigns } = data.data;
      console.log(campaigns);
      setCampaigns(campaigns);
    }
    fetchCategory();
  }, []);

  const renderCategory = () => {
    return categories.map((value) => {
      return <MenuItem value={value.id}>{value.name}</MenuItem>;
    });
  };

  const choosedCampaignTitle = campaigns.filter(
    camp => {
      return camp.id === choosedCampaignId
    }
  );

  console.log(choosedCampaignTitle);

  return (

    <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>

        <Typography variant="h3"> {choosedCampaignTitle[0]?.title} </Typography>

        <RHFTextField
          name="name"
          label="Job Title"
          id="name"
          //   id, name, description, salary, quantity, start_date, end_date, status, experience, isRemote, Category_id, Campaign_id
          // label="Name"
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
          name="salary"
          label="Salary per month"
          id="salary"
          type="salary"
          value={formik.values.salary}
          onChange={formik.handleChange}
          error={formik.touched.salary && Boolean(formik.errors.salary)}
          helperText={formik.touched.salary && formik.errors.salary}
        />

        <RHFTextField
          name="quantity"
          label="Quantity"
          id="standard-number"
          // type="number"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
        />

        <TextField
          label="Start date"
          fullWidth
          title="start date"
          type="date"
          value={formik.values.start_date}
          name="start_date"
          validate
          onChange={formik.handleChange}
          // defaultValue={moment(today).format('yyyy-MM-DD')}
          error={formik.touched.start_date && Boolean(formik.errors.start_date)}
          helperText={formik.touched.start_date && formik.errors.start_date}
        />

        <TextField
          label="End date"
          fullWidth
          title="end date"
          type="date"
          validate
          value={formik.values.end_date}
          name="end_date"
          onChange={formik.handleChange}
          // defaultValue={moment(formik.values.start_date).add(7, 'days').format('yyyy-MM-DD')}
          error={formik.touched.end_date && Boolean(formik.errors.end_date)}
          helperText={formik.touched.end_date && formik.errors.end_date}
        />
        <FormControl>
          <InputLabel
            id="categoryId">Category</InputLabel>
          <Select
            labelId="categoryId"
            id="categoryId"
            name='categoryId'
            value={formik.values.categoryId}
            label="Category"
            onChange={formik.handleChange}
            error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
            helperText={formik.touched.categoryId && formik.errors.categoryId}
          >
            {renderCategory()}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel
            id="experience">Experience</InputLabel>
          <Select
            labelId="experience"
            id="experience"
            name='experience'
            value={formik.values.experience}
            label="Experience"
            onChange={formik.handleChange}
            error={formik.touched.experience && Boolean(formik.errors.experience)}
            helperText={formik.touched.experience && formik.errors.experience}
          >
            <MenuItem value={"Experienced"}>Experienced</MenuItem>
            <MenuItem value={"Intern"}>Intern</MenuItem>
            <MenuItem value={"Fresher"}>Fresher</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel
            id="isRemote">Remote</InputLabel>
          <Select
            labelId="isRemote"
            id="isRemote"
            name='isRemote'
            value={formik.values.isRemote}
            label="Remote"
            onChange={formik.handleChange}
            error={formik.touched.isRemote && Boolean(formik.errors.isRemote)}
            helperText={formik.touched.isRemote && formik.errors.isRemote}
          >
            <MenuItem value={"true"}>Remote</MenuItem>
            <MenuItem value={"false"}>Office</MenuItem>
          </Select>
        </FormControl>

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
