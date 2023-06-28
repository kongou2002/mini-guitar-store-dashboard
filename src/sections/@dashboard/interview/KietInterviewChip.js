import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Typography, Select, MenuItem, InputLabel, OutlinedInput, Box, Chip, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

// Kiet imported
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import axios from 'axios';
// import { injectIntl, FormattedMessage } from 'react-intl';
// api import
import moment from 'moment/moment';
import { add, set } from 'lodash';
import { useDispatch } from 'react-redux';
import { success } from 'src/store/slice/notificationSlice';
import { useTheme } from '@mui/material/styles';
// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};





function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export default function KietInterviewChip({ candidateId, open, onClose }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [personName, setPersonName] = React.useState([]);
    const dispatch = useDispatch();
    const [value1, setValue1] = React.useState(null);
    const [value2, setValue2] = React.useState(null);
    const [interviewers, setInterviewers] = useState([]);
    const [inter, setInter] = React.useState([]);
    // 



    const RegisterSchema = Yup.object().shape({
        title: Yup.string().required('Job title required'),
        note: Yup.string().required('Note required'),
        note: Yup.string().required('Note required'),
        quantity: Yup.string().required('Quantity required'),
        salary: Yup.string().required('Salary required'),
    });

    const defaultValues = {
        title: '',
        note: '',
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

    React.useEffect(() => {
        async function fetchCandidate() {
            const data = await axios.get('http://localhost:8000/api/staff/all-interviewers');
            const interviewers = data.data;
            setInterviewers(interviewers);
            console.log(interviewers);
        }
        fetchCandidate();
    }, []);

    const names = [...Array(interviewers.length)].map((_, index) =>
        interviewers[index]?.fullname
    );


    const formik = useFormik({
        initialValues: {
            candidateId: candidateId.id,
            interviewersId: []
        },

        onSubmit: (value) => {
            console.log(candidateId.id);
            console.log([...Array(inter.length)].map((_, index) =>
                inter[index]?.id));
            axios
                .patch('http://localhost:8000/api/report/interviewers', {
                    candidateId: candidateId.id,
                    interviewersId: [...Array(inter.length)].map((_, index) =>
                        inter[index]?.id
                    ),
                })
                .then((res) => {
                    onClose();
                    dispatch(success("Assigning 3 interviewers successfully"));
                });
        },
    });

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
        setInter(value);
    };

    return (
        <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
                <FormControl>
                    <InputLabel id="demo-multiple-chip-label">Interviews</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        label="Interviews"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Interviews" />}

                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value.fullname} label={value.fullname} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {interviewers.map((person) => (
                            <MenuItem
                                key={person}
                                value={person}
                                style={getStyles(person.fullname, personName, theme)}
                            >
                                {person.fullname}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Submit
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
