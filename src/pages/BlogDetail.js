import { faker } from '@faker-js/faker';
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Page from 'src/components/Page';
import { AppNewsUpdate, AppOrderTimeline, AppWidgetSummary } from 'src/sections/@dashboard/app';
import { BlogPostCard } from 'src/sections/@dashboard/blog';
// import Typography from 'src/theme/overrides/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../components/Iconify';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { lightGreen, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import NewJobForm from 'src/sections/@dashboard/blog/NewJobForm';
export default function BlogDetail() {
  const params = useParams();
  const campaignId = params.id;
  const [jobs, setJobs] = useState([]);
  const [campaign, setCampaign] = useState([]);
  React.useEffect(() => {
    async function fetchJobs() {
      const { data } = await axios.post('http://localhost:8000/api/job/by-campaign', {
        campaignId: campaignId,
      });
      try {
        setJobs(data.jobs);
      } catch (error) {
        console.log(error);
      }
    }
    fetchJobs();
  }, []);

  React.useEffect(() => {
    async function fetchCampaign() {
      const { data } = await axios.get(`http://localhost:8000/api/campaign/${campaignId}`);

      setCampaign(data.campaign);
      console.log(data)
    }
    fetchCampaign();
  }, []);

  const aCampaign = {
    id: campaign?.id,
    title: campaign?.title,
    startDate: campaign?.start_date,
    endDate: campaign?.end_date,
    startDate: campaign?.start_date,
    description: campaign?.descripton,
    status: campaign?.status

  }

  const CardStyle = styled(Card)(({ theme }) => ({
    backgroundImage: `url('https://thumbs.dreamstime.com/b/laptop-coffee-flowers-business-wooden-background-top-view-copy-space-151205042.jpg')`,
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    // height: '2000px',
    // width: '100%',
    // maxWidth: 464,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // margin: theme.spacing(2, 0, 2, 2),
  }));

  return (

    <Page title="Campaign Detail">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={6} lg={4}>
            <h1>{campaign.title}</h1>
            <div>{campaign.description}</div> */}
          {/* </Grid> */}
          <Grid item xs={12}>

            <CardStyle sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ ms: 1.5 }} variant="h2" component="div">
                  {aCampaign.title}
                </Typography>
                <Typography sx={{ mb: 2, marginLeft: '5px' }} color="text.secondary">
                  From {aCampaign.startDate} to {aCampaign.endDate}
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: '5px' }}>
                  {campaign.description}
                </Typography>
              </CardContent>
              <Typography variant="subtitle2" sx={{ marginLeft: '30px', mb: 2 }} color={lightGreen['A700']} >
                {aCampaign.status}
              </Typography>
            </CardStyle>
          </Grid>
          <Grid item xs={12} sx={{ margin: 0 }}>
            <Link component={RouterLink}
              to={`/dashboard/newJob/${aCampaign.id}`}>
              <Button
                variant="contained"

                startIcon={<Iconify
                  icon="eva:plus-fill" />}>
                New Job
              </Button>
            </Link>
          </Grid>

          <Grid item xs={12} md={8} >

            {jobs.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </Grid>

          <Grid item xs={12} md={4} >
            <Grid container>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={6}>
                <AppWidgetSummary xs={12} title="Jobs" total={1} icon={'ant-design:android-filled'} />
              </Grid>
              <Grid xs={6} >
                <AppWidgetSummary title="Candidate" total={3} color="info" icon={'ant-design:apple-filled'} />
              </Grid>
              <Grid xs={6}>
                <AppWidgetSummary title="Passed" total={2} color="warning" icon={'ant-design:windows-filled'} />
              </Grid>
              <Grid xs={6}>
                <AppWidgetSummary title="Not passed" total={1} color="error" icon={'ant-design:bug-filled'} />
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
