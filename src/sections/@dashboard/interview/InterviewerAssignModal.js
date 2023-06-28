import * as React from 'react';
import { Card, Link, Container, Typography, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
// Mr.Ted import library of date time and form
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../../components/Iconify';
import InterviewerChip from './InterviewerChip';
import KietInterviewChip from './KietInterviewChip';

// Kiet uses  forkmik

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
};

export default function InterviewerAssignModal({ infor }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button variant="text" color="primary" onClick={handleOpen} startIcon={<Iconify style={{ fontSize: '24px' }} icon="clarity:assign-user-solid" />}>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <Typography mb={2} variant="h3">Schedule Interview</Typography>
                    {/* {infor.company}<br />
                    {infor.avatarUrl}<br />
                    {infor.isVerified}<br /> */}
                    {/* {infor.hr_staff}<br /> */}
                    {/* {infor.address}<br />
                    {infor.identity_number}<br />
                    // {infor.phone} */}
                    <Stack mb={2} spacing={1}>
                        <Chip
                            sx={{
                                fontWeight: 'bold',
                            }}
                            color="primary"
                            variant="outlined"
                            label={infor.name}
                        />
                        <Chip
                            sx={{
                                fontWeight: 'bold',
                            }}
                            color="primary"
                            label={infor.role}
                            variant="outlined"
                        />
                        <Typography variant="subtitle2" noWrap>
                            Assigned HR: {infor.hr_staff}
                        </Typography>
                        <Typography
                            component="span"
                            variant="body1"
                            sx={{
                                color: 'text.disabled',
                            }}
                        >
                            Phone number: {infor.phone}
                        </Typography>
                    </Stack>
                    <KietInterviewChip candidateId={infor} open={open} onClose={() => setOpen(false)} />
                </Card>
            </Modal>
        </div>
    );
}
