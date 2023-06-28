// import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import * as Yup from 'yup';
// import * as React from 'react';
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Chip from '@mui/material/Chip';
// import axios from 'axios';
// import { LoadingButton } from '@mui/lab';
// import { useDispatch } from 'react-redux';
// import { success } from 'src/store/slice/notificationSlice';
// import { FormProvider, RHFTextField } from '../../../components/hook-form';


// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };





// function getStyles(name, personName, theme) {
//     return {
//         fontWeight:
//             personName.indexOf(name) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     };
// }

// export default function InterviewerChip({ open, onClose }) {
//     const theme = useTheme();
//     const [personName, setPersonName] = React.useState([]);
//     const [inter, setInter] = React.useState([]);
//     const dispatch = useDispatch();
//     const [interviewers, setInterviewers] = useState([]);

//     const { control, handleSubmit } = useForm({
//         defaultValues: {}
//     });
//     const onSubmit = data => console.log(data);



//     React.useEffect(() => {
//         async function fetchCandidate() {
//             const data = await axios.get('http://localhost:8000/api/staff/all-interviewers');
//             const interviewers = data.data;
//             setInterviewers(interviewers);
//             console.log(interviewers);
//         }
//         fetchCandidate();
//     }, []);

//     const names = [...Array(interviewers.length)].map((_, index) =>
//         interviewers[index]?.fullname
//     );

//     const isSubmitting = (value) => {
//         console.log("TROIWF OI")
//         console.log(value);
//         axios
//             .patch('http://localhost:8000/api/report/interviewers', {
//                 candidateId: '08ebb100-8a3d-4bd8-90bc-088f5dfa6f77',
//                 interviewersId: [...Array(inter.length)].map((_, index) =>
//                     inter[index]?.id
//                 ),
//             })
//             .then((res) => {
//                 onClose();
//                 dispatch(success("Assigning 3 interviewers successfully"));
//             });
//     };

//     const handleChange = (event) => {
//         const {
//             target: { value },
//         } = event;
//         setPersonName(
//             // On autofill we get a stringified value.
//             typeof value === 'string' ? value.split(',') : value,
//         );
//         setInter(value);
//         console.log(value)
//     };

//     return (
//         <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
//             <Stack spacing={3}>
//                 <Typography variant="h3">Schedule Interview</Typography>
//                 <InputLabel id="demo-multiple-chip-label">Interviews</InputLabel>
//                 <Select
//                     labelId="demo-multiple-chip-label"
//                     id="demo-multiple-chip"
//                     multiple
//                     control={control}
//                     value={personName}
//                     onChange={handleChange}
//                     input={<OutlinedInput id="select-multiple-chip" label="Interviews" />}
//                     renderValue={(selected) => (
//                         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                             {selected.map((value) => (
//                                 <Chip key={value.fullname} label={value.fullname} />
//                             ))}
//                         </Box>
//                     )}
//                     MenuProps={MenuProps}
//                 >
//                     {interviewers.map((person) => (
//                         <MenuItem
//                             key={person}
//                             value={person}
//                             style={getStyles(person.fullname, personName, theme)}
//                         >
//                             {person.fullname}
//                         </MenuItem>
//                     ))}
//                 </Select>
//                 <LoadingButton fullWidth size="large" type="submit" variant="contained" >
//                     Submit
//                 </LoadingButton>
//             </Stack>
//         </FormProvider>
//     );
// }
