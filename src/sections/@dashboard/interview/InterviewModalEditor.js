import { Card, ListItemIcon, ListItemText, MenuItem, Modal } from '@mui/material';
import React from 'react';
import Iconify from 'src/components/Iconify';
import InterviewFormEditor from './InterviewFormEditor';
import InterviewFormUpdate from './InterviewFormUpdate';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,
};

export default function InterviewModalEditor({ candidateId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <MenuItem onClick={handleOpen}>
        <ListItemIcon>
          <Iconify icon="eva:edit-fill" width={24} height={24} />
        </ListItemIcon>
        <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
      </MenuItem>
      <Modal open={open} onClose={handleClose}>
        <Card sx={style}>
          {/* <InterviewFormEditor open={open} onClose={handleClose} candidateId={candidateId} /> */}
          <InterviewFormUpdate candidateId={candidateId} handleClose={handleClose} />
        </Card>
      </Modal>
    </div>
  );
}
