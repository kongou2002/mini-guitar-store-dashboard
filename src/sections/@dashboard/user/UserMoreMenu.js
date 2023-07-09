import * as React from 'react';
import { useRef, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, TextField, Box } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
// Kiet import Modal
import CampaignModalEditor from '../blog/CampaignModalEditor';
import { Grid, Button, Container, Stack, Typography, Modal } from '@mui/material';
import { setFormik } from 'formik';
import { set } from 'lodash';
import axios, { Axios } from 'axios';
// ----------------------------------------------------------------------

export default function UserMoreMenu( props ) {
  const id = props.id;
  const ref = useRef( null );
  const [ open, setOpen ] = React.useState( false );
  const handleOpen = () => setOpen( true );
  const handleClose = () => setOpen( false );
  const [ isOpen, setIsOpen ] = useState( false );
  const [ formik, setFormik ] = useState( {
    sheetNumber: 'sheet 1' || 'sheet 2' || 'sheet 3',
    startTime: '',
    endTime: '',
  } );
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  async function submit() {
    const post = await axios.post( 'http://localhost:8000/api/sheet', {
      employeeId: id,
      salaryCoefficient: formik.salaryCoefficient,
      sheetNumber: formik.sheetNumber,
      startTime: formik.startTime,
      endTime: formik.endTime,
    } );
    console.log( post );
    props.onLoading()
    alert( 'add sheet success' );
  }
  const handleChange = ( event ) => {
    const { name, value } = event.target;
    setFormik( ( prev ) => ( {
      ...prev,
      [ name ]: value,
    } ) );
  }
  const sheetsForm = () => {
    //create a model to add sheets
    return (
      <Modal
        open={ open }
        onClose={ handleClose }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={ style } bgcolor={ "white" } padding={ 4 }>
          <Grid container spacing={ 2 }>
            <Grid item xs={ 12 }>
              <Typography variant="h4" sx={ { mb: 2 } }>
                Add sheets
              </Typography>
            </Grid>
            <Grid item xs={ 12 }>
              <Typography variant="h6" sx={ { mb: 2 } }>
                sheetNumber
              </Typography>
              <TextField
                fullWidth
                label="sheet number"
                name="sheetNumber"
                onChange={ handleChange }
                required
                value={ formik?.values?.sheetNumber }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={ 12 }>
              <Typography variant="h6" sx={ { mb: 2 } }>
                startTime
              </Typography>
              <TextField
                fullWidth
                label="start time"
                name="startTime"
                onChange={ handleChange }
                required
                value={ formik?.values?.startTime }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={ 12 }>
              <Typography variant="h6" sx={ { mb: 2 } }>
                endTime
              </Typography>
              <TextField
                fullWidth
                label="end time"
                name="endTime"
                onChange={ handleChange }
                required
                value={ formik?.values?.endTime }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={ 12 }>
              <Typography variant="h6" sx={ { mb: 2 } }>
                salaryCoefficient
              </Typography>
              <TextField
                fullWidth
                label="salary coefficient"
                name="salaryCoefficient"
                onChange={ handleChange }
                required
                value={ formik?.values?.salaryCoefficient }
                variant="outlined"
              />
            </Grid>
            <Button
              color="primary"
              variant="contained"
              sx={ { mt: 3, ml: 2 } }
              onClick={ submit }
            >
              Add
            </Button>
          </Grid>

        </Box>
      </Modal>
    )
  };

  return (
    <>
      <IconButton ref={ ref } onClick={ () => setIsOpen( true ) }>
        <Iconify icon="eva:more-vertical-fill" width={ 20 } height={ 20 } />
      </IconButton>

      <Menu
        open={ isOpen }
        anchorEl={ ref.current }
        onClose={ () => setIsOpen( false ) }
        PaperProps={ {
          sx: { width: 200, maxWidth: '100%' },
        } }
        anchorOrigin={ { vertical: 'top', horizontal: 'left' } }
        transformOrigin={ { vertical: 'top', horizontal: 'left' } }
      >
        <MenuItem sx={ { color: 'text.secondary' } } onClick={ () => {
          handleOpen();
        } }>
          <ListItemIcon>
            <Iconify icon="icon-park-outline:write" width={ 24 } height={ 24 } />
          </ListItemIcon>
          <ListItemText primary="Add sheets" primaryTypographyProps={ { variant: 'body2' } } />
        </MenuItem>

        <MenuItem
          onClick={ () => {
            handleOpen();
          } }
          sx={ { color: 'text.secondary' } }
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={ 24 } height={ 24 } />
          </ListItemIcon>
          <ListItemText primary="Edit Campaign" primaryTypographyProps={ { variant: 'body2' } } />
        </MenuItem>
      </Menu>
      { sheetsForm() }
    </>
  );
}
