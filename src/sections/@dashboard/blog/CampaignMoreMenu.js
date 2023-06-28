import * as React from 'react';
import { useRef, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
// Kiet import Modal 
import JobModalEditor from '../blog/JobModalEditor';
import { Grid, Button, Container, Stack, Typography, Modal } from '@mui/material';
import CampaignModalEditor from './CampaignModalEditor';
import CampaignCreateModal from './CampaignCreateModal';
import CampaignDeleteModal from './CampaignDeleteModal';
import CampaignDeleteAlertDialog from './CampaignDeleteModal';

// ----------------------------------------------------------------------

export default function CampaignMoreMenu({ post }) {
    const ref = useRef(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
            </IconButton>

            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: { width: 200, maxWidth: '100%' },
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <CampaignDeleteAlertDialog news={post} />

                <CampaignModalEditor news={post} openMoreMenu={open} onClose={() => setIsOpen(false)} />

            </Menu>
        </>
    );
}
