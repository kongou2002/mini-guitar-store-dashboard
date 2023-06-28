import { Link as RouterLink } from 'react-router-dom';
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
// Kiet code api
import axios from 'axios';
import { useState } from 'react';
import * as React from 'react';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
//Tuan Kiet customes
// export const FILTER_CATEGORY_OPTIONS = ['All', 'Cloud Computing Engineer',
//   'Computer Network Specialist',
//   'Computer Support Specialist',
//   'Database Administrator',
//   'Information Technology Analyst',
//   'Information Technology Leadership',
//   'Information Security Specialist',
//   'Software/Application Developer',
//   'Web Developer', 'Undefined'];
// Kiet import Route

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

ShopFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({ isOpenFilter, onOpenFilter, onCloseFilter }) {
  // Use api by Kiet and Dat
  const [categories, setCategories] = useState([]);
  React.useEffect(() => {
    async function fetchCategory() {
      const data = await axios.get('http://localhost:8000/api/category');
      const { categories } = data.data;

      setCategories(categories);
    }
    fetchCategory();
  }, []);

  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Category&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Categories
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {/* <div>
              <Typography variant="subtitle1" gutterBottom>
                Gender
              </Typography>
              <FormGroup>
                {FILTER_GENDER_OPTIONS.map((item) => (
                  <FormControlLabel key={item} control={<Checkbox />} label={item} />
                ))}
              </FormGroup>
            </div> */}

            <div>
              {/* <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography> */}
              <RadioGroup>
                {categories.map((item) => (
                  <FormControlLabel key={item.name} value={item.name} control={<Radio />} label={item.name} />
                ))}
              </RadioGroup>
            </div>

            {/* <div>
              <Typography variant="subtitle1" gutterBottom>
                Colors
              </Typography>
              <ColorManyPicker
                name="colors"
                colors={FILTER_COLOR_OPTIONS}
                onChecked={(color) => [].includes(color)}
                sx={{ maxWidth: 38 * 4 }}
              />
            </div> */}

            {/* <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <RadioGroup>
                {FILTER_PRICE_OPTIONS.map((item) => (
                  <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
                ))}
              </RadioGroup>
            </div> */}

            {/* <div>
              <Typography variant="subtitle1" gutterBottom>
                Rating
              </Typography>
              <RadioGroup>
                {FILTER_RATING_OPTIONS.map((item, index) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating readOnly value={4 - index} />}
                        checkedIcon={<Rating readOnly value={4 - index} />}
                      />
                    }
                    label="& Up"
                    sx={{
                      my: 0.5,
                      borderRadius: 1,
                      '& > :first-of-type': { py: 0.5 },
                      '&:hover': {
                        opacity: 0.48,
                        '& > *': { bgcolor: 'transparent' },
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </div> */}
          </Stack>
        </Scrollbar>

        <Box component={RouterLink} to="/dashboard/products" sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Modify
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
