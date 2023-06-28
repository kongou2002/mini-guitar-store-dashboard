import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Accordion, AccordionSummary, AccordionDetails, Divider, TextField, Button, Badge, Avatar, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { getReportByInterviewer } from 'src/store/slice/reportSlice';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { submitReport } from 'src/store/slice/reportSlice';
import { getDateOfISOWeek } from '../utils/tool';
// import { errorHelper } from 'src/utils/tool';
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(3)',
            opacity: 0,
        },
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// function createData(id, mark, comment, status, room, slot, week, job_name, phone, resume_url, fullname) {
//     return { id, mark, comment, status, room, slot, week, job_name, phone, resume_url, fullname }
// }

const InterviewerTask = () => {

    const { reports_pending, reports_done } = useSelector(state => state.report)
    const notification = useSelector(state => state.notification)
    const res = reports_pending?.map(report => {
        return {
            id: report.id,
            interview_id: report.interview_id,
            mark: report.mark,
            comment: report.comment,
            status: report.status
        }
    })
    // console.log(reports_pending);
    const { staff } = useSelector(state => state.staff)
    const [reportSubmitState, setReportSubmitState] = useState(res)

    const dispatch = useDispatch()
    function groupBy(arr, property) {
        return arr.reduce((acc, cur) => {
            acc[cur[property]] = [...acc[cur[property]] || [], cur];
            return acc;
        }, {});
    }
    const reportsGroupByWeek = Object.entries(groupBy(reports_pending, 'week'))


    useEffect(() => {
        dispatch(getReportByInterviewer(staff.id))
        console.log('re-render');
    }, [notification])


    const handleSetReportById = (type, values, id) => {
        if (type === 'mark') {
            let result = [...reportSubmitState]; //<- copy roomRent into result
            result.forEach((x) => { //<- use map on result to find element to update using id
                if (x.id === id) x.mark = Number(values);
            });
            // console.log(another);

            setReportSubmitState(result)

        } else {
            let result = [...reportSubmitState]; //<- copy roomRent into result
            result.forEach((x) => { //<- use map on result to find element to update using id
                if (x.id === id) {
                    x.comment = values
                }

            });

            setReportSubmitState(result)

        }
    }
    const handleSubmit = (id) => {
        const resRep = reportSubmitState.find(rp => rp.id === id)

        const interviewId = resRep.interview_id
        const interviewerId = staff.id
        const mark = resRep.mark
        const comment = resRep.comment

        dispatch(submitReport({ interviewId, interviewerId, mark, comment }))

    }
    console.log();
    return (
        <Box>
            <Box>
                <Typography component='h1' variant='h2'>Pending task</Typography>
                <Box>
                    <Stack>
                        {reportsGroupByWeek.map((report, id) => {
                            return (
                                <Box key={id}>
                                    <Accordion defaultExpanded={true} key={id}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography variant='h3'>WEEK: {report[0]} - {getDateOfISOWeek(report[0], '1').toLocaleDateString()}</Typography>

                                        </AccordionSummary>
                                        <AccordionDetails>

                                            {/* ===real */}
                                            {/* <form > */}
                                            {
                                                report[1]?.map((rp) => (
                                                    <Accordion defaultExpanded={true} key={rp.id}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Typography fontWeight='bold'>SLOT: {rp.slot}</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Stack direction='row' justifyContent='space-around'>
                                                                <Box>
                                                                    {
                                                                        rp.interview_type === 'Online' ? (
                                                                            <StyledBadge overlap="circular"
                                                                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                                                variant="dot"
                                                                            >
                                                                                <Avatar sx={{ width: 70, height: 70 }} variant='rounded' >
                                                                                    {rp.interview_type}
                                                                                </Avatar>
                                                                            </StyledBadge>
                                                                        ) : <Avatar sx={{ width: 70, height: 70 }} variant='rounded' >
                                                                            {rp.interview_type}
                                                                        </Avatar>
                                                                    }
                                                                </Box>

                                                                <Box height={100}>
                                                                    <Stack direction='row' spacing={1} height={100}>
                                                                        <Avatar alt={rp.fullname} src={rp.avatar} sx={{ width: 60, height: 60 }} />
                                                                        <Stack >
                                                                            <Typography fontWeight='bold'>{rp.fullname}</Typography>
                                                                            <Typography>{rp.email}</Typography>
                                                                        </Stack>
                                                                    </Stack>
                                                                </Box>
                                                                <Divider orientation='verticial' variant='middle' />
                                                                <Box>
                                                                    {
                                                                        rp.interview_type === 'Online' ? (
                                                                            <StyledBadge overlap="circular"
                                                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}

                                                                                variant="dot"
                                                                            >
                                                                                <Chip label="Meeting url"
                                                                                    component="a"
                                                                                    target="_blank"
                                                                                    href={rp.join_url}
                                                                                    clickable p={1} color="success" variant="outlined" />
                                                                            </StyledBadge>
                                                                        ) : <Typography>
                                                                            ROOM: {rp.room}
                                                                        </Typography>
                                                                    }
                                                                </Box>

                                                                <Divider orientation='verticial' variant='middle' />

                                                                <TextField placeholder='mark' name='mark' type='number'
                                                                    key={rp.id}
                                                                    onChange={(e) => handleSetReportById('mark', e.target.value, rp.id)}
                                                                />
                                                                <TextField placeholder='comment' name='comment' multiline rows={4} sx={{ width: '400px' }}
                                                                    onChange={(e) => handleSetReportById('comment', e.target.value, rp.id)}
                                                                />
                                                                <Button type='submit' size='medium' onClick={() => handleSubmit(rp.id)}>Submit</Button>

                                                            </Stack>

                                                        </AccordionDetails>
                                                    </Accordion>
                                                ))
                                            }

                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            )
                        })}

                    </Stack>
                </Box>

            </Box >
            <Divider />
            <Box mt={3}>
                <Typography component='h1' variant='h2'>Result</Typography>
                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">Resume Url</StyledTableCell>
                                    <StyledTableCell align="right">Week</StyledTableCell>
                                    <StyledTableCell align="right">Slot</StyledTableCell>
                                    <StyledTableCell align="right">Mark</StyledTableCell>
                                    <StyledTableCell align="right">Comment</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reports_done?.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.fullname}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button>
                                                <a href={row.resume_url}>Resume</a>
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.week}</StyledTableCell>
                                        <StyledTableCell align="right">{row.slot}</StyledTableCell>
                                        <StyledTableCell align="right">{row.mark}</StyledTableCell>
                                        <StyledTableCell align="right">{row.comment}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box >
    );
};

export default InterviewerTask;
