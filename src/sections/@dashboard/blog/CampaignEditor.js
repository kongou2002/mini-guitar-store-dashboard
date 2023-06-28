import PropTypes from 'prop-types';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { ColorManyPicker } from '../../../components/color-utils';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_CATEGORY_OPTIONS = ['All', 'Cloud Computing Engineer',
'Computer Network Specialist',
'Computer Support Specialist',
'Database Administrator',
'Information Technology Analyst',
'Information Technology Leadership',
'Information Security Specialist',
'Software/Application Developer',
'Web Developer', 'Undefined']; //Tuan Kiet customes
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];
export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

CampaignEditor.propTypes = {
  isOpenEditor: PropTypes.bool,
  onOpenEditor: PropTypes.func,
  onCloseEditor: PropTypes.func,
};

export default function CampaignEditor({ isOpenEditor, onOpenEditor, onCloseEditor }) {
  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenEditor}>
        Editors&nbsp;
      </Button>

      <Drawer
        anchor="top"
        open={isOpenEditor}
        onClose={onCloseEditor}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Typography variant="h4" gutterBottom>
            Meowwww
          </Typography>

      </Drawer>
    </>
  );
}
