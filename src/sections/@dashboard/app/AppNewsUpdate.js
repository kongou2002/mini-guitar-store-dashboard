import * as React from 'react';
// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user';
import CampaignMoreMenu from '../blog/CampaignMoreMenu';
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppNewsUpdate({ id, title, subheader, list, index, ...other }) {

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list
            .filter((news) => news.status !== 'Finished')
            .map((news) => (
              <NewsItem key={news.id} news={news} />
            ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function NewsItem({ news }) {
  const { id, image, title, description, status, start_date, end_date } = news;
  const [open, setOpen] = React.useState(false);
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="h5" underline="hover" noWrap component={RouterLink} to={`${id}`}>
          {title}
        </Link>
        {/* <Typography>{start_date}</Typography> */}
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {/* {fToNow(postedAt)} */}
        {status}
      </Typography>
      {/* <UserMoreMenu /> */}
      <CampaignMoreMenu post={news} />
    </Stack>
  );
}
