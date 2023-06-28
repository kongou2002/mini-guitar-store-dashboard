import * as React from 'react';
import { Card, Link, Container, Typography, Button, Modal } from '@mui/material';
// Mr.Ted import library of date time and form
import Iconify from '../../../components/Iconify';
import NewStaffForm from './NewStaffForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
};

export default function StaffCreateModal({ reloadData }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button variant="contained" onClick={handleOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
                New Staff
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <NewStaffForm open={open} onClose={() => setOpen(false)} reloadData={reloadData} />
                </Card>
            </Modal>
        </div>
    );
}
