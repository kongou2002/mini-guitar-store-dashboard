// material
import { Grid, Button, Container, Stack, Typography, Modal } from '@mui/material';
// components
import Page from '../components/Page';

import * as React from 'react';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function Blog() {
  return (
    <Page title="Dashboard: Blog">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Product
          </Typography>
        </Stack>

        {/* Dat  */}
        <Grid item xs={12} md={6} lg={8} mb={5}></Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Jobs
          </Typography>
        </Stack>

        <Grid container></Grid>
      </Container>
    </Page>
  );
}
