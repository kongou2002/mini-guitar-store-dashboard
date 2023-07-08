
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const CreateButton = ({children, ...props}) => {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
        props?.handleOpen()
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        props?.handleAgree();
        setOpen(false);
    }
  
    return (
      <div>
        <Button onClick={handleClickOpen}>
          {children}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {props.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleAgree} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }